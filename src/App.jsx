import React, { useState } from 'react';
import AddProductButton from './components/AddProductButton';
// import ProductList from './components/ProductList';
// import ProductPicker from './components/ProductPicker';
// import AddProductButton from './components/AddProductButton';

const App = () => {
  // const [products, setProducts] = useState([]);
  // const [isPickerOpen, setIsPickerOpen] = useState(false);
  // const [editProductIndex, setEditProductIndex] = useState(null); // Track which product is being edited

  // const handleAddProduct = () => {
  //   setIsPickerOpen(true);
  //   setEditProductIndex(null);
  // };

  // const handleEditProduct = (index) => {
  //   setIsPickerOpen(true);
  //   setEditProductIndex(index); // Set the product being edited
  // };

  // const handleSelectProduct = (selectedProducts) => {
  //   if (editProductIndex !== null) {
  //     const updatedProducts = [...products];
  //     updatedProducts.splice(editProductIndex, 1, ...selectedProducts);
  //     setProducts(updatedProducts);
  //   } else {
  //     setProducts([...products, ...selectedProducts]);
  //   }
  //   setIsPickerOpen(false);
  // };

  return (
    // <div className="container mx-auto p-6">
    //   <h1 className="text-3xl font-bold mb-4">Product List</h1>
    //   <ProductList products={products} setProducts={setProducts} onEditProduct={handleEditProduct} />
    //   <AddProductButton onAddProduct={handleAddProduct} />
    //   {isPickerOpen && (
    //     <ProductPicker
    //       onClose={() => setIsPickerOpen(false)}
    //       onSelect={handleSelectProduct}
    //     />
    //   )}
    // </div>
    <div className='p-2'>
      <h1>Shivam</h1>
      <AddProductButton/>
    </div>
  );
};

export default App;
