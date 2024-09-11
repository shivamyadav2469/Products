import productsData from './productsData'; // Import local product data

export const getProducts = (search = '', page = 0, limit = 10) => {
  const filteredProducts = productsData.filter(product => 
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  // Simulate pagination by slicing the filtered array
  const paginatedProducts = filteredProducts.slice(page * limit, (page + 1) * limit);

  return paginatedProducts;
};
