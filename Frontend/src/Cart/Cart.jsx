import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Cartcomp from '../Cart/Cartcomp';
import Footer from '../Footer/Footer';
import { CartContext } from '../Context/CartContet';

const Cart = () => {
  const [,,,,,,,,,,,cartProducts ] =useContext(CartContext)
  const[,,,,,,,,,,,,setCartProducts]=useContext(CartContext)
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const userId = localStorage.getItem("userId");
  const [,,,,,,,,,,handleRemoveItem] =useContext(CartContext)


  const getCart = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`http://localhost:5000/cart/${userId}`);
      if (res.data && Array.isArray(res.data.products)) {
        const updatedProducts = res.data.products.map((item) => ({
          ...item,
          quantity: item.quantity || 1,
        }));
        setCartProducts(updatedProducts);
      } else {
        setCartProducts([]);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      toast.error("❌ Failed to load cart");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchCartCount();
    }
  }, [userId]);

  const fetchCartCount = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/cart/${userId}`);
      if (res.data && Array.isArray(res.data.products)) {
        setCartCount(res.data.products.length);
      }
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };

 

  const removeAllCart = async () => {
    try {
      const res = await axios.post("http://localhost:5000/deleteallcart", {
        userId,
      });
      if (res.status === 200) {
        toast.success("🛒 All items removed!");
        getCart();
      }
    } catch (err) {
      console.error("Failed to clear cart:", err);
      toast.error("❌ Could not clear cart");
    }
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartProducts((prev) =>
      prev.map((item) =>
        item.productId._id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const subtotal = cartProducts.reduce((acc, item) => acc + item.productId.price * item.quantity, 0);
  const totalDiscount = cartProducts.reduce(
    (acc, item) =>
      acc + (item.productId.oldPrice - item.productId.price) * item.quantity,
    0
  );
  const total = subtotal;
  const handleCheckout = async () => {
    setIsCheckingOut(true);
    const amountInRupees = total - totalDiscount;
    const amountInPaise = Math.round(amountInRupees * 100);
  
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      toast.error("⚠️ Razorpay SDK failed to load");
      setIsCheckingOut(false);
      return;
    }
  
    try {
      const res = await axios.post("http://localhost:5000/createOrder", {
        amount: amountInPaise,
      });
  
      const options = {
        key: "rzp_test_rKiMueoMmDr4F8",
        amount: res.data.amount,
        currency: res.data.currency,
        name: "Wearin",
        description: "Order Checkout",
        order_id: res.data.id,
        handler: async function (response) {
          try {
            await axios.post("http://localhost:5000/verifyPayment", {
              userId,
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature,
              amount: amountInRupees,
            });
            toast.success("✅ Payment successful!");
            removeAllCart();
          } catch (err) {
            toast.error("⚠️ Payment verification failed");
            console.error("Verification error:", err);
          }
        },
        prefill: {
          name: "John Doe",
          email: "john@example.com",
          contact: "9876543210",
        },
        theme: {
          color: "#000000",
        },
        method: {
          netbanking: true,
          card: true,
          upi: true, // ✅ Enables UPI
        },
        upi: {
          flow: 'collect',
          vpa: 'success@razorpay', // ✅ Prefills UPI ID for test success
        },
        modal: {
          ondismiss: function () {
            toast.info("Payment popup closed");
          },
        },
      };
  
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Checkout error:", err);
      toast.error("❌ Something went wrong during checkout");
    } finally {
      setIsCheckingOut(false);
    }
  };
  

  return (
    <div className="w-full">
     
      <div className="px-4 sm:px-6 md:px-10 lg:px-20">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold">Your Cart</h2>
          <p className="text-red-600 cursor-pointer" onClick={removeAllCart}>
            Clear
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
    
          <div className="w-full border border-gray-300 rounded-2xl px-4 py-4 max-h-[500px] overflow-auto">
            {isLoading ? (
              <p>Loading cart...</p>
            ) : cartProducts.length > 0 ? (
              cartProducts.map((product, index) => (
                <Cartcomp
                  key={index}
                  product={product}
                  handleRemove={handleRemoveItem}
                  handleQuantityChange={handleQuantityChange}
                />
              ))
            ) : (
              <div className="text-center text-gray-500">
                <img
                  src="/empty-cart.svg"
                  alt="Empty Cart"
                  className="mx-auto w-32 mb-4"
                />
                <p>Your cart is empty.</p>
              </div>
            )}
          </div>

      
          <div className="w-full border border-gray-300 rounded-2xl px-4 py-4 flex flex-col gap-4">
            <h2 className="text-xl font-bold">Order Summary</h2>
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>₹{subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-green-600">
              <p>Discount</p>
              <p>- ₹{totalDiscount.toFixed(2)}</p>
            </div>
            <hr />
            <div className="flex justify-between font-semibold">
              <p>Total</p>
              <p>₹{(total - totalDiscount).toFixed(2)}</p>
            </div>
            <button
              onClick={handleCheckout}
              className="bg-black text-white py-2 rounded flex items-center justify-center gap-2 disabled:opacity-50"
              disabled={isCheckingOut || cartProducts.length === 0}
            >
              {isCheckingOut ? (
                <span className="flex items-center gap-2">
                  <span className="animate-cart-move">🛒</span> Processing...
                </span>
              ) : (
                "Checkout"
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
};

export default Cart;
