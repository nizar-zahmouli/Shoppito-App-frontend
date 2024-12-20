import axios from "axios";

const BACKEND_URL = "http://localhost:8000";
export const API_URL = `${BACKEND_URL}/api/`;

// Create Category
const createCategory = async (formData) => {
  const response = await axios.post(
    API_URL + "category/new",
    formData
  );
  return response.data;
};

// Get all Categories
const getCategory = async () => {
  const response = await axios.get(API_URL + "category/");
  return response.data;
};

// Delete a Categorie
const deleteCategory = async (slug) => {
  const response = await axios.delete(API_URL + "category/" + slug);
  return response.data.message;
};

// Create Brand
const createBrand = async (formData) => {
  const response = await axios.post(API_URL + "brand/new", formData);
  return response.data;
};

// Get all brands
const getBrands = async () => {
  const response = await axios.get(API_URL + "brand/");
  return response.data;
};

// Delete a brand
const deleteBrand = async (slug) => {
  const response = await axios.delete(API_URL + "brand/" + slug);
  return response.data.message;
};


const categoryAndBrandService = {
  createCategory,
  createBrand,
  getCategory,
  getBrands,
  deleteCategory,
  deleteBrand,
};

export default categoryAndBrandService;
