import React, { useState, useEffect } from 'react';
import { getProducts } from '../utils/api'; // Fetch products from local data

const ProductPicker = ({ onClose, onSelect }) => {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const newProducts = getProducts(search, page);
    setProducts((prevProducts) => [...prevProducts, ...newProducts]);
  }, [search, page]);

  const handleScroll = (e) => {
    if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) {
      setPage(page + 1);
    }
  };

  const handleProductSelect = (product) => {
    onSelect([product]); // Pass the selected product array
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg overflow-y-auto" onScroll={handleScroll}>
        <h2 className="text-2xl font-bold mb-4">Select Products</h2>
        <input
          type="text"
          className="border border-gray-300 p-2 w-full mb-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for products..."
        />
        <div className="grid gap-4 grid-cols-1">
          {products.map((product) => (
            <div key={product.id} className="bg-gray-100 p-4 rounded-lg cursor-pointer" onClick={() => handleProductSelect(product)}>
              <img src={product.image.src} alt={product.title} className="w-full h-32 object-cover mb-2 rounded" />
              <h4 className="text-lg font-semibold">{product.title}</h4>
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProductPicker;
