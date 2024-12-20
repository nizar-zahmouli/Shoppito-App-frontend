import React, { useEffect, useState } from "react";
import "./ProductForm.scss";
import Card from "../../Card/Card";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import UploadWidget from "./UploadWidget";
import { BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  getBrands,
  getCategory,
} from "../../../redux/features/categoryAndBrand/categoryAndBrandSlice";

const ProductForm = ({
  saveProduct,
  isEditing,
  product,
  setProduct,
  description,
  setDescription,
  files,
  setFiles,
}) => {
  const dispatch = useDispatch();
  const [filteredBrands, setFilteredBrands] = useState([]);
  const { categories, brands } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getBrands());
  }, [dispatch]);

  // filter Brands based on selectedCategory
  const filterBrands = (selectedCategory) => {
    const newBrands = brands.filter(
      (brand) => brand.category === selectedCategory
    );
    setFilteredBrands(newBrands);
  };

  useEffect(() => {
    filterBrands(product?.category);
  }, [product?.category]);

  // handleInputChange
  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // remove image
  const removeImage = (image) => {
    setFiles(files.filter((img ) => img !== image));
  };
  return (
    <div className="add-product">
      <UploadWidget files={files} setFiles={setFiles} />
      <Card cardClass={"card"}>
        <br />
        <form onSubmit={saveProduct}>
          <label>Product Images : </label>
          <aside>
            {files.length > 0 &&
              files.map((image) => (
                <div key={image} className="thumbnail">
                  <img src={image} alt="" height={100} />
                  <div>
                    <BsTrash
                      size={25}
                      className="thumbnailIcon"
                      onClick={() => removeImage(image)}
                    />
                  </div>
                </div>
              ))}
            {files.length < 1 && (
              <p className="--m">No image set for this product.</p>
            )}
          </aside>
          <label>Product Name : </label>
          <input
            type="text"
            placeholder="Product name"
            name="name"
            value={product?.name}
            onChange={handleInputChange}
            required
          />
          <label>Product category : </label>
          <select
            name="category"
            value={product?.category}
            onChange={handleInputChange}
          >
            {isEditing ? (
              <option value={product?.category}>{product?.category}</option>
            ) : (
              <option>select category</option>
            )}
            {categories.length > 0 &&
              categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
          </select>
          <label>Product brand : </label>
          <select
            name="brand"
            value={product?.brand}
            onChange={handleInputChange}
          >
            {isEditing ? (
              <option value={product?.brand}>{product?.brand}</option>
            ) : (
              <option>select brand</option>
            )}
            {filteredBrands.length > 0 &&
              filteredBrands.map((brand) => (
                <option key={brand._id} value={brand.name}>
                  {brand.name}
                </option>
              ))}
          </select>
          <label>Product color : </label>
          <input
            type="text"
            placeholder="Color"
            name="color"
            value={product?.color}
            onChange={handleInputChange}
          />
          <label>Regular Price: </label>
          <input
            type="number"
            placeholder="Regular Price"
            name="regularPrice"
            value={product?.regularPrice}
            onChange={handleInputChange}
          />
          <label>Product price : </label>
          <input
            type="number"
            placeholder="Product price"
            name="price"
            value={product?.price}
            onChange={handleInputChange}
          />
          <label>Product quantity : </label>
          <input
            type="number"
            placeholder="Product quantity"
            name="quantity"
            value={product?.quantity}
            onChange={handleInputChange}
          />
          <label>Product description : </label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            modules={ProductForm.modules}
            formats={ProductForm.formats}
          />
          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Product
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

ProductForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};

// * Quill editor formats

ProductForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
];

export default ProductForm;
