import React, { useState } from "react";
import Card from "../../card/Card";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../loader/Loader";
import { toast } from "react-toastify";
import {
  createCategory,
  getCategory,
} from "../../../redux/features/categoryAndBrand/categoryAndBrandSlice";

const CreateCategory = () => {
  const [name, setName] = useState("")
  const { isLoading } = useSelector((state) => state.category);
  const dispatch = useDispatch();
 
  const saveCategory = async (e) => {
    e.preventDefault();
    if (name.length < 3) {
      return toast.error("Coupon must be up to 3 characters")
    }
    const formData = {
      name
    }
    await dispatch(createCategory(formData))
    await dispatch(getCategory())
    setName("")
  } 
  
  return (
    <>
    {isLoading && <Loader />}
      <div className="--mb2">
        <h3>Create Category</h3>
        <p>
          Use the forrm to <b>Create a Category.</b>
        </p>
        <Card cardClass={"card"}>
          <br />
          <form onSubmit={saveCategory}>
            <label>Category Name: </label>
            <input 
              type= "text"
              placeholder="Category name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <div className="--my">
              <button type="submit" className="--btn --btn-primary">
                Save Category
              </button>
            </div>
          </form>
          
        </Card>
      </div>
    </>
  );
};

export default CreateCategory;
