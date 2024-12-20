import React, { useEffect } from "react";
import CategoryList from "./CategoryList";
import CreateCategory from "./CreateCategory";
import "./Category.scss"
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../../redux/features/categoryAndBrand/categoryAndBrandSlice";

const Category = () => {
  const dispatch = useDispatch();
  // const { categories } = useSelector((state) => state.category);

  
  // useEffect(() => {
  //   dispatch(getCategory());
  // }, [dispatch]);

  return (
    <section>
      <div className="container coupon">
        <CreateCategory  />
        <CategoryList />
      </div>
    </section>
  );
};

export default Category;
