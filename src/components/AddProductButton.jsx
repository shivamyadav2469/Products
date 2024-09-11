import React, { useState } from "react";
import Modal from "./Modal";
import { RxDragHandleDots2, RxCross1 } from "react-icons/rx";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const AddProductButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductsList, setSelectedProductsList] = useState([
    {
      id: 0,
      product: { title: "" },
      variants: [],
      discount: "",
      discountType: "",
      showDiscountSection: false,
      showVariants: false,
    },
  ]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddProducts = (selectedProducts) => {
    const productsWithDiscountSection = selectedProducts.map(
      ({ product, variants }) => ({
        product,
        variants,
        discount: "",
        discountType: "",
        showDiscountSection: false,
        showVariants: false,
      })
    );
  
    // Only update the title of the currently selected product, do not add new products.
    setSelectedProductsList((prevProducts) => {
      const updatedProducts = [...prevProducts];
      updatedProducts[updatedProducts.length - 1] = {
        ...updatedProducts[updatedProducts.length - 1],
        ...productsWithDiscountSection[0],
      };
      return updatedProducts;
    });
  
    closeModal();
  };
  

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...selectedProductsList];
    updatedProducts[index] = {
      ...updatedProducts[index],
      [field]: value,
    };
    setSelectedProductsList(updatedProducts);
  };

  const addNewProductField = () => {
    const lastProduct = selectedProductsList[selectedProductsList.length - 1];
    if (lastProduct.product.title !== "") {
      const newId = selectedProductsList.length;
      setSelectedProductsList((prev) => [
        ...prev,
        {
          id: newId,
          product: { title: "" },
          variants: [],
          discount: "",
          discountType: "",
          showDiscountSection: false,
          showVariants: false,
        },
      ]);
    } else {
      alert("Please fill the current product details before adding a new one.");
    }
  };
  

  const toggleDiscountSection = (index) => {
    const updatedProducts = [...selectedProductsList];
    updatedProducts[index].showDiscountSection =
      !updatedProducts[index].showDiscountSection;
    setSelectedProductsList(updatedProducts);
  };

  const toggleVariantsVisibility = (index) => {
    const updatedProducts = [...selectedProductsList];
    updatedProducts[index].showVariants = !updatedProducts[index].showVariants;
    setSelectedProductsList(updatedProducts);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
  
    const { source, destination } = result;
    const sourceIndex = source.index;
    const destinationIndex = destination.index;
    const sourceDroppableId = source.droppableId;
    const destinationDroppableId = destination.droppableId;
  
    if (sourceDroppableId.startsWith("variants")) {
      const productIndex = parseInt(sourceDroppableId.split("-")[1], 10);
      const updatedProducts = [...selectedProductsList];
      const productVariants = Array.from(updatedProducts[productIndex].variants || []);
      const [movedVariant] = productVariants.splice(sourceIndex, 1);
      productVariants.splice(destinationIndex, 0, movedVariant);
      updatedProducts[productIndex].variants = productVariants;
      setSelectedProductsList(updatedProducts);
    }else {
      // Product drag and drop logic
      const updatedProducts = Array.from(selectedProductsList);
      const [movedProduct] = updatedProducts.splice(sourceIndex, 1);
      updatedProducts.splice(destinationIndex, 0, movedProduct);
      setSelectedProductsList(updatedProducts);
    }
  };


  return (
    <div className="mt-6">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={`droppable-${selectedProductsList.length}`}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {selectedProductsList.map((product, index) => (
                <Draggable
                  key={product.id}
                  draggableId={`product-${index}`}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="mt-4 border border-gray-300 rounded p-4 bg-white shadow-md"
                    >
                      <div className="flex items-center gap-3">
                        <div>
                          <RxDragHandleDots2 className="text-3xl text-gray-700" />
                        </div>
                        <input
                          type="text"
                          placeholder="Select product"
                          value={product.product.title || ""}
                          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
                          onClick={openModal}
                          readOnly
                        />
                        {product.showDiscountSection && (
                          <div className="flex gap-2">
                            <input
                              type="number"
                              placeholder="Enter discount"
                              value={product.discount}
                              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 pr-3"
                              onChange={(e) =>
                                handleProductChange(
                                  index,
                                  "discount",
                                  e.target.value
                                )
                              }
                            />
                            <select
                              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                              value={product.discountType}
                              onChange={(e) =>
                                handleProductChange(
                                  index,
                                  "discountType",
                                  e.target.value
                                )
                              }
                            >
                              <option value="">Select Discount Type</option>
                              <option value="flat">Flat</option>
                              <option value="off">Percentage Off</option>
                            </select>
                          </div>
                        )}

                        {!product.showDiscountSection && (
                          <button
                            className="bg-green-500 text-white font-semibold px-4 py-2 rounded hover:bg-green-600"
                            onClick={() => toggleDiscountSection(index)}
                          >
                            Add Discount
                          </button>
                        )}
                      </div>
                      <button
                        className="mt-2 text-blue-500"
                        onClick={() => toggleVariantsVisibility(index)}
                      >
                        {product.showVariants
                          ? "Hide Variants"
                          : "Show Variants"}
                      </button>
                      {product.showVariants && (
                        <Droppable
                          droppableId={`variants-${index}`}
                          type="variant"
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              className="mt-2"
                            >
                              {product.variants.map((variant, variantIndex) => (
                                <Draggable
                                  key={`${index}-variant-${variant.id}`} 
                                  draggableId={`${index}-variant-${variant.id}`} 
                                  index={variantIndex}
                                >
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className="flex items-center"
                                    >
                                      <div>
                                        <RxDragHandleDots2 className="text-3xl text-gray-700" />
                                      </div>
                                      <div className="flex items-center gap-4 border-2 rounded-md m-2 p-2 w-[50%]">
                                        <span className="text-sm text-gray-600">
                                          {variant.title} - $
                                          {Number(variant.price).toFixed(2)}
                                        </span>
                                      </div>
                                      <div>
                                        <RxCross1 className="text-2xl text-gray-700" />
                                      </div>
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <button
        className="bg-green-500 text-white font-semibold px-4 py-2 rounded hover:bg-green-600 mt-4"
        onClick={addNewProductField}
      >
        Add Product
      </button>
      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        onAdd={handleAddProducts}
      />
    </div>
  );
};

export default AddProductButton;
