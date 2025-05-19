import React, { useContext, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Cartcomp from '../Cart/Cartcomp';
import Footer from '../Footer/Footer';
import { CartContext } from '../Context/CartContet';
import { toast } from 'react-toastify';
import { UserContext } from '../Context/userContext';

const Cart = () => {



  const [,,,,,,,,,,,,, removeAllCart] = useContext(CartContext);
  const [,,,,,,,,,,,,,, getCart] = useContext(CartContext);
  const [,,,,,,,,,,,,,,, isLoading] = useContext(CartContext);
  const [,,,,,,,,,,, cartProducts] = useContext(CartContext);
  const [,,,,,,,,,,,, setCartProducts] = useContext(CartContext);
  const [,,,,,,,,,, handleRemoveItem] = useContext(CartContext);
  const [originalData] = useContext(UserContext);
  const [,,fetchCartCount] = useContext(CartContext);

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [cartCount] = useContext(CartContext);
  const userId = localStorage.getItem("userId");
  const debounceMap = useRef({});

  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    if (userId) fetchCartCount();
  }, [userId]);



  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;

    setCartProducts((prev) =>
      prev.map((item) =>
        item.productId._id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );

    if (debounceMap.current[productId]) {
      clearTimeout(debounceMap.current[productId]);
    }

    debounceMap.current[productId] = setTimeout(async () => {
      try {
        await axios.post("http://localhost:5000/updatecart", {
          userId,
          productId,
          quantity: newQuantity,
        });
        toast.success("✅ Cart updated successfully");
      } catch (error) {
        console.error("Error updating cart:", error);
        toast.error("❌ Failed to update cart");
      }
    }, 3000);
  };

  const isUserDetailsComplete = (data) => {
    return (
      data?.fullName?.trim() &&
      data?.phoneNumber?.trim() &&
      data?.addressLine1?.trim() &&
      data?.addressLine2?.trim() &&
      data?.city?.trim() &&
      data?.state?.trim() &&
      data?.zipCode?.trim() &&
      data?.country?.trim()
    );
  };

  const getFormattedUserDetails = (data) => {
    return `
🧍 Full Name: ${data.fullName}
📞 Phone: ${data.phoneNumber}
🏠 Address 1: ${data.addressLine1}
🏡 Address 2: ${data.addressLine2}
🌆 City: ${data.city}
🏙️ State: ${data.state}
🧾 Zip Code: ${data.zipCode}
🌍 Country: ${data.country}
`;
  };

  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const subtotal = cartProducts.reduce((acc, item) => {
    if (item.productId?.price) {
      return acc + item.productId.price * item.quantity;
    }
    return acc;
  }, 0);

  const totalDiscount = cartProducts.reduce((acc, item) => {
    if (item.productId?.oldPrice && item.productId?.price) {
      return acc + (item.productId.oldPrice - item.productId.price) * item.quantity;
    }
    return acc;
  }, 0);

  const total = subtotal;
  const handleCheckout = async () => {
    setIsCheckingOut(true);
  
    if (!userId) {
      toast.error("❌ You must be logged in to checkout");
      setIsCheckingOut(false);
      return;
    }
  
    const requiredFields = [
      { key: "fullName", label: "Full Name" },
      { key: "phoneNumber", label: "Phone Number" },
      { key: "addressLine1", label: "Address Line 1" },
      { key: "addressLine2", label: "Address Line 2" },
      { key: "city", label: "City" },
      { key: "state", label: "State" },
      { key: "zipCode", label: "Postal Code" },
      { key: "country", label: "Country" },
    ];
  
    // 🔍 Check which fields are missing
    const getMissingFields = (data) => {
      if (!data) return requiredFields.map(f => f.label); // All missing if no data
  
      return requiredFields
        .filter(({ key }) => {
          const value = data[key];
          return !value || value.toString().trim() === "";
        })
        .map(({ label }) => label);
    };
  
    const missingFields = getMissingFields(originalData);
  
    if (missingFields.length > 0) {
      toast.warn(`⚠️ Please fill in the following fields:\n${missingFields.join(", ")}`);
      setIsCheckingOut(false);
      return;
    }
  
    const getFormattedUserDetails = (data) => {
      return `
  Name: ${data.fullName}
  Phone: ${data.phoneNumber}
  Address: ${data.addressLine1}, ${data.addressLine2}
  City: ${data.city}
  State: ${data.state}
  Postal Code: ${data.zipCode}
  Country: ${data.country}
      `;
    };
  
    const confirmed = window.confirm(
      `✅ All shipping details are complete.\n\nPlease confirm your details:\n${getFormattedUserDetails(originalData)}`
    );
  
    if (!confirmed) {
      toast.info("❌ Checkout cancelled");
      setIsCheckingOut(false);
      return;
    }
  
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
          name: originalData.fullName,
          email: "john@example.com", // Replace with real email if available
          contact: originalData.phoneNumber,
        },
        theme: { color: "#000000" },
        method: { netbanking: true, card: true, upi: true },
        upi: {
          flow: 'collect',
          vpa: 'success@razorpay',
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
                <img src="/Empty-cart.png" alt="Empty Cart" className="mx-auto w-32 mb-4" />
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
