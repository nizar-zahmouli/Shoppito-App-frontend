import axios from "axios";

const BACKEND_URL = "http://localhost:8000";
const API_URL = `${BACKEND_URL}/api/coupon/`;

// Create New Coupon
const createCoupon = async (formData) => {
  const response = await axios.post(API_URL + "new", formData);
  return response.data;
};

// Get all Coupons
const getAllCoupons = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get a Product
const getCoupon = async (couponName) => {
  const response = await axios.get(API_URL + couponName);
  return response.data;
};

// Delete a Product
const deleteCoupon = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data.message;
};

const couponService = {
  createCoupon,
  getAllCoupons,
  getCoupon,
  deleteCoupon,
};

export default couponService;
