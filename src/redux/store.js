import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import productReducer from "../redux/features/product/productSlice";
import categoryReducer from "../redux/features/categoryAndBrand/categoryAndBrandSlice";
import couponReducer from "../redux/features/coupon/couponSlice";
import filterReducer from "../redux/features/product/filterSlice";
import cartReducer from "../redux/features/product/cartSlice";
import checkoutReducer from "../redux/features/product/checkoutSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    category: categoryReducer,
    coupon: couponReducer,
    filter: filterReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
   },
});
