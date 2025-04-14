import { createContext,useState,useEffect, act } from "react";
import axios from "axios"

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



    
      return(
        <CartContext.Provider value={[ cartCount, setCartCount, fetchCartCount , products,setProducts,getProducts ,latest,setLatest ]}>
      {children}
    </CartContext.Provider>
      )
}

export default CartProvider