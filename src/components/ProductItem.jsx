import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const ProductItem = ({ product, index, moveProduct, handleRemoveProduct, onEditProduct }) => {
  const [, ref] = useDrop({
    accept: 'product',
    hover: (item) => {
      if (item.index !== index) {
        moveProduct(item.index, index);
        item.index = index;
      }
    },
  });

  const [, drag] = useDrag({
    type: 'product',
    item: { index },
  });

  return (
    <div ref={(node) => drag(ref(node))} className="bg-white rounded-lg shadow-md p-4 relative">
      <img src={product.image.src} alt={product.title} className="w-full h-48 object-cover rounded-lg" />
      <h4 className="text-lg font-semibold mt-2">{product.title}</h4>
      <button className="absolute top-2 right-2 text-red-500" onClick={handleRemoveProduct}>
        {index > 0 ? 'X' : null} {/* Show remove only if not the first product */}
      </button>
      <button
        onClick={onEditProduct}
        className="absolute bottom-2 right-2 bg-blue-500 text-white px-2 py-1 rounded"
      >
        Edit
      </button>
    </div>
  );
};

export default ProductItem;
