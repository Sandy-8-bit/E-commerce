import { createContext,useState,useEffect,  } from "react";
import axios from "axios"

import { toast } from "react-toastify";


export const CartContext = createContext();


const CartProvider = ({children})=>{

  //cart Count
  const userId = localStorage.getItem("userId");
    const [cartCount, setCartCount] = useState(0); // State to hold cart count

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

    useEffect(() => {
      fetchCartCount(); // Fetch cart count when the component mounts
    }, [userId]);


    //top selling context 

      const getProducts = async () => {
        try {
          const response = await axios.get("http://localhost:5000/products");
          setProducts(response.data);
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          setLoading(false);
        }
      };

      const [products, setProducts] = useState([]);
      const [loading, setLoading] = useState(true);



      useEffect(() => {
        getProducts();
      }, []);
    
      

      //New Arrival

      const [latest, setLatest] = useState([]); 
      const [load, setLoad] = useState(false);

      const getLatestProducts = async () => {
        setLoad(true);
        try {
          const res = await axios.get("http://localhost:5000/latestProducts");
          setLatest(res.data); 
        } catch (error) {
          console.log(error);
        }
        setLoad(false);
      };
    
      useEffect(() => {
        getLatestProducts();
      }, []);

      
      //add Cart

      const addCart = async (productId) => {
        try {
          
          const { data } = await axios.get(`http://localhost:5000/cart/${userId}`);
          const cartItems = data.products || [];
      
         
          const alreadyInCart = cartItems.some(item => item.productId._id === productId || item.productId === productId);
      
          if (alreadyInCart) {
            toast.error("⚠️ Already in cart!");
            return;
          }
      
          await axios.post("http://localhost:5000/addCart", {
            userId,
            productId,
          });
      
          fetchCartCount();
          toast.success("🛒 Added to cart!");
        } catch (error) {
          console.log("Error adding to cart:", error);
          toast.error("❌ Failed to add to cart");
        }
      };
      
      

      //remove cart

      const removeCart = async (productId) => {
        try {
          await axios.delete("http://localhost:5000/removeCart", {
            data: {
              userId,
              productId,
            },
          });
          fetchCartCount();
          toast.info("❌ Removed from cart!");
          
        } catch (error) {
          console.error("Error removing from cart:", error);
        }
      };
      
      const handleRemoveItem = async (productId) => {
        try {
          await axios.delete("http://localhost:5000/removeCart", {
            data: { userId, productId },
          });
          setCartProducts((prev) =>
            prev.filter((item) => item.productId._id !== productId)
          );
          fetchCartCount()
          toast.success("🗑️ Item removed");
        } catch (error) {
          console.error("Error removing item:", error);
          toast.error("❌ Failed to remove item");
        }
      };
      const [cartProducts, setCartProducts] = useState([]);



      //remove all cart

      const removeAllCart = async () => {
        try {
          
          const res = await axios.post("http://localhost:5000/deleteallcart", {
            userId,
          });
          
          if (res.status === 200) {
            fetchCartCount()
            toast.success("🛒 All items removed!");
            getCart();
          }

        } catch (err) {
          console.error("Failed to clear cart:", err);
          toast.error("❌ Could not clear cart");
        }
      };


      //getcart 


        const [isLoading, setIsLoading] = useState(true);
      const getCart = async () => {
          try {
            setIsLoading(true);
            const res = await axios.get(`http://localhost:5000/cart/${userId}`);
            if (res.data && Array.isArray(res.data.products)) {
              const updatedProducts = res.data.products
                .filter(item => item.productId && item.productId.price)
                .map((item) => ({
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
      
    
      
    
      return(
        <CartContext.Provider value={[ cartCount, setCartCount, fetchCartCount ,addCart, products,setProducts,getProducts ,latest,setLatest,removeCart ,handleRemoveItem,cartProducts,setCartProducts,removeAllCart,getCart,isLoading]}>
      {children}
    </CartContext.Provider>
      )
}

export default CartProvider