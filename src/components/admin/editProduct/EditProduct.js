import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProduct,
  RESET_PROD,
  selectProduct,
  updateProduct,
} from "../../../redux/features/product/productSlice";

import { toast } from "react-toastify";
import Loader from "../../loader/Loader";
import ProductForm from "../productForm/ProductForm";

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productEdit = useSelector(selectProduct);
  const [product, setProduct] = useState(productEdit);
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);

  const { isLoading, message } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    setProduct(productEdit);
    setDescription(
      productEdit && productEdit.description ? productEdit.description : ""
    );
    if (productEdit && productEdit.image) {
      setFiles(productEdit.image);
    }
  }, [productEdit]);

  //  save Product
  const saveProduct = async (e) => {
    e.preventDefault();

    if (files.length < 1) {
      return toast.error("Please add an image");
    }

    const formData = {
      name: product.name,
      category: product.category,
      brand: product.brand,
      color: product.color,
      quantity: Number(product.quantity),
      regularPrice: product.regularPrice,
      price: product.price,
      description,
      image: files,
    };
    await dispatch(updateProduct({ id, formData }));
  };

  useEffect(() => {
    if (message === "Product updated successfully") {
      navigate("/admin/all-products");
      dispatch(RESET_PROD());
    }
  }, [message, dispatch, navigate]);

  return (
    <section>
      <div className="container">
        {isLoading && <Loader />}
        <h3 className="--mt">Edit Product </h3>

        <ProductForm
          saveProduct={saveProduct}
          isEditing={true}
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

export default EditProduct;
