import React, { useState, useEffect } from "react";
import { getProducts } from './../utils/api';

const ProductList = ({ isOpen, closeModal, onAdd }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [pageLimit] = useState(10);
  const [selectedProducts, setSelectedProducts] = useState(new Set());
  const [selectedVariants, setSelectedVariants] = useState(new Set());

  useEffect(() => {
    if (isOpen) {
      const fetchProducts = async () => {
        const fetchedProducts = await getProducts(search, currentPage, pageLimit);
        setProducts(fetchedProducts);
      };
      fetchProducts();
    }
  }, [isOpen, search, currentPage]);

  useEffect(() => {
    if (!isOpen) {
      setSelectedProducts(new Set());
      setSelectedVariants(new Set());
    }
  }, [isOpen]);

  const handleProductSelect = (productId) => {
    setSelectedProducts((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(productId)) {
        newSelected.delete(productId);
        const newSelectedVariants = new Set([...selectedVariants].filter(variantId => !products.find(p => p.id === productId)?.variants.some(v => v.id === variantId)));
        setSelectedVariants(newSelectedVariants);
      } else {
        newSelected.add(productId);
        const productVariants = products.find(p => p.id === productId)?.variants.map(v => v.id) || [];
        const newSelectedVariants = new Set([...selectedVariants, ...productVariants]);
        setSelectedVariants(newSelectedVariants);
      }
      return newSelected;
    });
  };

  const handleVariantSelect = (variantId) => {
    setSelectedVariants((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(variantId)) {
        newSelected.delete(variantId);
      } else {
        newSelected.add(variantId);
      }
  
      const variant = products.find((p) => p.variants.some((v) => v.id === variantId));
      const productId = variant?.id;
      if (productId) {
        const productVariants = products.find((p) => p.id === productId)?.variants.map((v) => v.id) || [];
        const anyVariantSelected = productVariants.some((vId) => newSelected.has(vId));
        setSelectedProducts((prev) => {
          const updated = new Set(prev);
          if (anyVariantSelected) {
            updated.add(productId);
          } else {
            updated.delete(productId);
          }
          return updated;
        });
      }
  
      return newSelected;
    });
  };

  const isProductSelected = (productId) => {
    const product = products.find((p) => p.id === productId);
    const allVariantsSelected = product?.variants.every((v) => selectedVariants.has(v.id)) || false;
    return selectedProducts.has(productId) || allVariantsSelected;
  };

  const handleAddButtonClick = () => {
    const selected = [...selectedProducts].map(productId => {
      const product = products.find(p => p.id === productId);
      return {
        product,
        variants: product?.variants.filter(v => selectedVariants.has(v.id)) || []
      };
    });
    
    if (onAdd && typeof onAdd === 'function') {
      onAdd(selected);
    }
  
    closeModal();
  };
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-full md:max-w-4xl w-full overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800">Select a Product</h2>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            onClick={closeModal}
          >
            Close
          </button>
        </div>

        <form className="mb-4">
          <div className="relative">
            <input
              type="search"
              id="product-search"
              className="w-full p-4 pl-10 text-lg text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search Products..."
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              required
            />
            <svg
              className="absolute inset-y-0 left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
        </form>

        <div className="max-h-80 overflow-y-auto mb-4">
          {products.length > 0 ? (
            <ul className="space-y-4">
              {products.map((product) => (
                <li key={product.id} className="flex flex-col gap-4 border border-gray-200 rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={isProductSelected(product.id)}
                      onChange={() => handleProductSelect(product.id)}
                      className="form-checkbox"
                    />
                    <img
                      src={product.image.src}
                      alt={product.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <span className="text-base md:text-lg font-medium text-gray-700">{product.title}</span>
                  </div>

                  <div className="mt-2 space-y-2">
                    {product.variants.map((variant) => {
                      const price = Number(variant.price);
                      return (
                        <div key={variant.id} className="flex items-center gap-4 border-t pt-2">
                          <input
                            type="checkbox"
                            checked={selectedVariants.has(variant.id)}
                            onChange={() => handleVariantSelect(variant.id)}
                            className="form-checkbox"
                          />
                          <span className="text-sm text-gray-600">
                            {variant.title} - ${price.toFixed(2)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">No products found.</p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between mt-4">
          <div className="mb-2 sm:mb-0">{selectedProducts.size} products selected</div>
          <button
            onClick={handleAddButtonClick}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
