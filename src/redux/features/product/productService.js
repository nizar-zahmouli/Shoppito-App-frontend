import axios from "axios";

const BACKEND_URL = "http://localhost:8000";
export const API_URL = `${BACKEND_URL}/api/product/`

// Create New Product
const createProduct = async (formData) => {
  const response = await axios.post(
    API_URL + "new",
     formData
    );
  return response.data;
};


// Get all products
const getAllProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Delete a Product
const deleteProduct = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};
// Get a Product
const getProduct = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};
// Update Product
const updateProduct = async (id, formData) => {
  const response = await axios.patch(`${API_URL}${id}`, formData);
  return response.data;
};

// Review Product
const reviewProduct = async (id, formData) => {
  const response = await axios.patch(`${API_URL}review/${id}`, formData);
  return response.data.message;
};

// Review Product
const deleteReview = async (id, formData) => {
  const response = await axios.patch(`${API_URL}deleteReview/${id}`, formData);
  return response.data.message;
};

// Review Product
const updateReview = async (id, formData) => {
  const response = await axios.patch(`${API_URL}updateReview/${id}`, formData);
  return response.data.message;
};

const productService = {
  createProduct,
  getAllProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  reviewProduct,
  deleteReview,
  updateReview,
};

export default productService;
