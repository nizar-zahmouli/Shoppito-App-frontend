import axios from "axios";

const BACKEND_URL = "http://localhost:8000";
export const API_URL = `${BACKEND_URL}/api/users/`;

// Save Cart
const saveCartDB = async (cartData) => {
  const response = await axios.patch(API_URL + "saveCart", cartData);
  return response.data;
};

// Get Cart
const getCartDB = async () => {
  const response = await axios.get(API_URL + "getCart");
  return response.data;
};

const cartService = {
  saveCartDB,
  getCartDB,
};

export default cartService;
