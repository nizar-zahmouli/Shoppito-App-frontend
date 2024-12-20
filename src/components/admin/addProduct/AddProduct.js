import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../loader/Loader";
import ProductForm from "../productForm/ProductForm";
import { useNavigate } from "react-router-dom";
import "./AddProduct.scss";
import {
  createProduct,
  RESET_PROD,
} from "../../../redux/features/product/productSlice";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  category: "",
  brand: "",
  quantity: "",
  price: "",
  color: "",
  regularPrice: "",
  image: "",
};

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(initialState);
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);

  const { isLoading, message } = useSelector((state) => state.product);
  const { name, category, brand, price, quantity, color, regularPrice } =
    product;

  // generate SKU
  const generateSKU = (category) => {
    const letter = category.slice(0, 3).toUpperCase();
    const number = Date.now();
    const sku = letter + "-" + number;
    return sku;
  };
  //  save product
  const saveProduct = async (e) => {
    e.preventDefault();

    if (files.length < 1) {
      return toast.error("Please add an image");
    }
    const formData = {
      name,
      sku: generateSKU(category),
      category,
      brand,
      color,
      quantity: Number(quantity),
      regularPrice,
      price,
      description,
      image: files,
    };
    await dispatch(createProduct(formData));
    console.log(formData);
  };
  useEffect(() => {
    if (message === "Product added successfully") {
      navigate("/admin/all-products");
      dispatch(RESET_PROD());
    }
  }, [message, dispatch, navigate]);

  return (
    <section>
      <div className="container">
        {isLoading && <Loader />}
        <h3 className="--mt">Add New Product </h3>

        <ProductForm
          saveProduct={saveProduct}
          isEditing={false}
          product={product}
          setProduct={setProduct}
          description={description}
          setDescription={setDescription}
          files={files}
          setFiles={setFiles}
        />
      </div>
    </section>
  );
};

export default AddProduct;
