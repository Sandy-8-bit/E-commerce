import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SingleProduct from "../SingleProduct/SingleProduct";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const ProductShowcase = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    minPrice: 0,
    maxPrice: 200,
    minRating: '',
    title: ''
  });
  const [loading, setLoading] = useState(false);
  const [debouncedTitle, setDebouncedTitle] = useState(filters.title);
  const [currentPage, setCurrentPage] = useState(1);

  const categories = ["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"];
  const brands = ["Brand A", "Brand B", "Brand C", "Brand D"];
  const dressStyles = ["Casual", "Formal", "Party", "Gym"];
  const sizes = ["XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "3X-Large", "4X-Large"];
  const [selectedSize, setSelectedSize] = useState("Large");

  const [expandedSections, setExpandedSections] = useState({
    price: true,
    size: true,
    dressStyle: true
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/filterProducts', {
        params: { ...filters, page: currentPage, limit: 10 },
      });

      if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else {
        console.error("Unexpected response format:", response.data);
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    // Optional: link to filters
  };

  const handlePriceChange = (value) => {
    setFilters((prev) => ({
      ...prev,
      minPrice: value[0],
      maxPrice: value[1]
    }));
  };

  const applyFilters = () => {
    fetchProducts();
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFilters((prev) => ({ ...prev, title: debouncedTitle }));
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [debouncedTitle]);

  useEffect(() => {
    fetchProducts();
    
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">

       
        <div className="w-full md:w-1/4 p-4 border rounded-2xl shadow-lg bg-white h-fit sticky top-6">
          <h2 className="text-xl font-bold mb-6 text-gray-800">🧰 Filter Products</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Category</label>
            <select name="category" value={filters.category} onChange={handleFilterChange} className="w-full p-2 border rounded-md bg-gray-50">
              <option value="">All</option>
              {categories.map((c, i) => <option key={i} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Brand</label>
            <select name="brand" value={filters.brand} onChange={handleFilterChange} className="w-full p-2 border rounded-md bg-gray-50">
              <option value="">All</option>
              {brands.map((b, i) => <option key={i} value={b}>{b}</option>)}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Price Range: ₹{filters.minPrice} - ₹{filters.maxPrice}</label>
            <Slider
              range
              min={0}
              max={500}
              defaultValue={[filters.minPrice, filters.maxPrice]}
              onChange={handlePriceChange}
              trackStyle={{ backgroundColor: '#000', height: 6 }}
              handleStyle={[
                { backgroundColor: '#000', borderColor: '#000', height: 16, width: 16 },
                { backgroundColor: '#000', borderColor: '#000', height: 16, width: 16 }
              ]}
              railStyle={{ backgroundColor: '#ddd', height: 6 }}
            />
          </div>


          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium">Size</label>
              <button onClick={() => toggleSection('size')}>
                <svg className={`h-5 w-5 transform transition-transform ${expandedSections.size ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            {expandedSections.size && (
              <div className="flex flex-wrap gap-2">
                {sizes.map((size, i) => (
                  <button key={i} onClick={() => handleSizeSelect(size)} className={`px-3 py-1 rounded-full text-sm ${selectedSize === size ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'}`}>
                    {size}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium">Dress Style</label>
              <button onClick={() => toggleSection('dressStyle')}>
                <svg className={`h-5 w-5 transform transition-transform ${expandedSections.dressStyle ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            {expandedSections.dressStyle && (
              <div className="space-y-2">
                {dressStyles.map((style, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span>{style}</span>
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                ))}
              </div>
            )}
          </div> */}

          <button onClick={applyFilters} className="w-full mt-4 py-3 bg-black text-white rounded-md">
            Apply Filter
          </button>
        </div>

    
        <div className="w-full md:w-3/4">
          {loading ? (
            <p className="text-center">Loading products...</p>
          ) : (
            <div className="flex flex-wrap gap-6">
              {products.length > 0 ? (
                products.map((product, index) => (
                  <SingleProduct
                    key={index}
                    product={product}
                    index={index}
                    renderStars={(rating) => (
                      <div>
                        {'★'.repeat(Math.floor(rating))}
                        {'☆'.repeat(5 - Math.floor(rating))}
                      </div>
                    )}
                  />
                ))
              ) : (
                <p>No products found with these filters.</p>
              )}
            </div>
          )}

          <div className="flex justify-between mt-6">
            <button
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="px-4 py-2 bg-gray-500 text-white rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-4 py-2 bg-gray-500 text-white rounded-md"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;
