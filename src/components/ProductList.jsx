import React from 'react';
import ProductItem from './ProductItem';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ProductList = ({ products, setProducts, onEditProduct }) => {
  const handleRemoveProduct = (index) => {
    if (products.length > 1) {
      const updatedProducts = [...products];
      updatedProducts.splice(index, 1);
      setProducts(updatedProducts);
    }
  };

  const moveProduct = (dragIndex, hoverIndex) => {
    const updatedProducts = [...products];
    const [draggedProduct] = updatedProducts.splice(dragIndex, 1);
    updatedProducts.splice(hoverIndex, 0, draggedProduct);
    setProducts(updatedProducts);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => (
          <ProductItem
            key={product.id}
            product={product}
            index={index}
            moveProduct={moveProduct}
            handleRemoveProduct={() => handleRemoveProduct(index)}
            onEditProduct={() => onEditProduct(index)}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default ProductList;
