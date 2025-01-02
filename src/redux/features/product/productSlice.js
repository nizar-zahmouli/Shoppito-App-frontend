import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";
import { toast } from "react-toastify";

const initialState = {
  product: null,
  products: [],
  minPrice: null,
  maxPrice: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  totalStoreValue: 0,
  outOfStock: 0,
  category: [],
};

// Create New Product
export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (formData, thunkAPI) => {
    try {
      return await productService.createProduct(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all products
export const getAllProducts = createAsyncThunk(
  "product/getAllProducts",
  async (_, thunkAPI) => {
    try {
      return await productService.getAllProducts();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete a Product
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, thunkAPI) => {
    try {
      return await productService.deleteProduct(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get a product
export const getProduct = createAsyncThunk(
  "product/getProduct",
  async (id, thunkAPI) => {
    try {
      return await productService.getProduct(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Update product

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await productService.updateProduct(id, formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// // Review product
// export const reviewProduct = createAsyncThunk(
//   "product/reviewProduct",
//   async ({ id, formData }, thunkAPI) => {
//     try {
//       return await productService.reviewProduct(id, formData);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       console.log(message);
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );
// // Delete Review product
// export const deleteReview = createAsyncThunk(
//   "product/deleteReview",
//   async ({ id, formData }, thunkAPI) => {
//     try {
//       return await productService.deleteReview(id, formData);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       console.log(message);
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// // Update Review
// export const updateReview = createAsyncThunk(
//   "product/updateReview",
//   async ({ id, formData }, thunkAPI) => {
//     try {
//       return await productService.updateReview(id, formData);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       console.log(message);
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    RESET_PROD(state) {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
    //   CALC_STORE_VALUE(state, action) {
    //     const products = action.payload;
    //     const array = [];
    //     products.map((item) => {
    //       const { price, quantity } = item;
    //       const productValue = price * quantity;
    //       return array.push(productValue);
    //     });
    //     const totalValue = array.reduce((a, b) => {
    //       return a + b;
    //     }, 0);
    //     state.totalStoreValue = totalValue;
    //   },
    //   CALC_OUTOFSTOCK(state, action) {
    //     const products = action.payload;
    //     const array = [];
    //     products.map((item) => {
    //       const { quantity } = item;
    //       return array.push(quantity);
    //     });
    //     let count = 0;
    //     array.forEach((number) => {
    //       if (number === 0 || number === "0") {
    //         count += 1;
    //       }
    //     });
    //     state.outOfStock = count;
    //   },
    //   CALC_CATEGORY(state, action) {
    //     const products = action.payload;
    //     const array = [];
    //     products.map((item) => {
    //       const { category } = item;
    //       return array.push(category);
    //     });
    //     const uniqueCategory = [...new Set(array)];
    //     state.category = uniqueCategory;
    //   },
      GET_PRICE_RANGE(state, action) {
        const { products } = action.payload;
        const array = [];
        products.map((product) => {
          const price = product.price;
          return array.push(price);
        });
        const max = Math.max(...array);
        const min = Math.min(...array);
        state.minPrice = min;
        state.maxPrice = max;
    },
  },
  extraReducers: (builder) => {
    builder
      // create product

      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        if (action.payload && action.payload.hasOwnProperty("message")) {
          toast.error(action.payload.message);
        } else {
          state.message = "Product added successfully";
          toast.success("Product added successfully");
        }
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // get all products

      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.products = action.payload;
        console.log(action.payload);
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // delete product

      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Product deleted successfully");
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // get a single  product

      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.product = action.payload;
        // console.log(action.payload);
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // Update  product

      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        if (action.payload && action.payload.hasOwnProperty("message")) {
          toast.error(action.payload.message);
        } else {
          state.message = "Product updated successfully";
          toast.success("Product updated successfully");
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });

     // Review  product

    //       .addCase(reviewProduct.pending, (state) => {
    //         state.isLoading = true;
    //       })
    //       .addCase(reviewProduct.fulfilled, (state, action) => {
    //         state.isLoading = false;
    //         state.isSuccess = true;
    //         state.isError = false;
    //         toast.success(action.payload);
    //       })
    //       .addCase(reviewProduct.rejected, (state, action) => {
    //         state.isLoading = false;
    //         state.isError = true;
    //         state.message = action.payload;
    //         toast.error(action.payload);
    //       })
    //       .addCase(deleteReview.pending, (state) => {
    //         state.isLoading = true;
    //       })
    //       .addCase(deleteReview.fulfilled, (state, action) => {
    //         state.isLoading = false;
    //         state.isSuccess = true;
    //         state.isError = false;
    //         toast.success(action.payload);
    //       })
    //       .addCase(deleteReview.rejected, (state, action) => {
    //         state.isLoading = false;
    //         state.isError = true;
    //         state.message = action.payload;
    //         toast.error(action.payload);
    //       })
    //       .addCase(updateReview.pending, (state) => {
    //         state.isLoading = true;
    //       })
    //       .addCase(updateReview.fulfilled, (state, action) => {
    //         state.isLoading = false;
    //         state.isSuccess = true;
    //         state.isError = false;
    //         toast.success(action.payload);
    //       })
    //       .addCase(updateReview.rejected, (state, action) => {
    //         state.isLoading = false;
    //         state.isError = true;
    //         state.message = action.payload;
    //         toast.error(action.payload);
    //       });
  },
});

export const {
  RESET_PROD,
  //   CALC_STORE_VALUE,
  //   CALC_OUTOFSTOCK,
  //   CALC_CATEGORY,
    GET_PRICE_RANGE,
} = productSlice.actions;

export const selectProduct = (state) => state.product.product;
export const selectIsLoading = (state) => state.product.isLoading;
// export const selectProducts = (state) => state.product.products;
// export const selectTotalStoreValue = (state) => state.product.totalStoreValue;
// export const selectOutOfStock = (state) => state.product.outOfStock;
// export const selectCategory = (state) => state.product.category;

// export const selectMinPrice = (state) => state.product.minPrice;
// export const selectMaxPrice = (state) => state.product.maxPrice;

export default productSlice.reducer;
