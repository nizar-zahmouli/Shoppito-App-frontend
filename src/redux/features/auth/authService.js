import axios from "axios";

const BACKEND_URL = "https://shopitoapp.onrender.com/";
export const API_URL = `${BACKEND_URL}/api/users/`;

// Validate email
// export const validateEmail = (email) => {
  // return email.match(
    // /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0
  // );
// };

// Register User
const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData, {
    withCredentials: true,
  });
  return response.data;
};

// Login User
const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData , {
    withCredentials: true,
  });
  return response.data;
};

// Logout User
const logout = async () => {
  const response = await axios.get(`${API_URL}/logout`,  {
    withCredentials: true,
  });
  return response.data.message;
};

// Get Login Status
const getLoginStatus = async () => {
  const response = await axios.get(`${API_URL}/getLoginStatus`, {
    withCredentials: true,
  });
  return response.data;
};

// Get User 
const getUser = async () => {
  const response = await axios.get(`${API_URL}/getUser`, {
    withCredentials: true,
  });
  return response.data;
};

// update User  Profile
const updateUser = async (userData) => {
  const response = await axios.patch(`${API_URL}/updateUser`,  userData ,
  {
    withCredentials: true,
  });
  return response.data;
};

// update User  Photo
const updatePhoto = async (userData) => {
  const response = await axios.patch(`${API_URL}/updatePhoto`, userData, {
    withCredentials: true,
  });
  return response.data;
};

const authService = {
  register,
  login,
  logout,
  getLoginStatus,
  getUser,
  updateUser,
  updatePhoto,
};
export default authService;