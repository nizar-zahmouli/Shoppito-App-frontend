import React from "react";

import styles from "./Navbar.module.scss";
import { selectUser } from "../../../redux/features/auth/authSlice";
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Navbar = () => {
  const user = useSelector(selectUser);
  const username = user?.name;

  return (
    <div className={styles.navbar}>
      <div className={styles.user}>
        <FaUserCircle size={40} color="#fff" />
        <h4>{username}</h4>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to={"/admin/home"} className={activeLink}>
              Home
            </NavLink>
          </li>
          
          <li>
            <NavLink to={"/admin/all-products"} className={activeLink}>
              All Products
            </NavLink>
          </li>
          <li>
            <NavLink to={"/admin/add-product"} className={activeLink}>
              Add Product
            </NavLink>
          </li>
          <li>
            <NavLink to={"/admin/orders"} className={activeLink}>
              Orders
            </NavLink>
          </li>
          <li>
            <NavLink to={"/admin/coupon"} className={activeLink}>
              Coupon
            </NavLink>
          </li>
          <li>
            <NavLink to={"/admin/category"} className={activeLink}>
              Categories
            </NavLink>
          </li>
          <li>
            <NavLink to={"/admin/brand"} className={activeLink}>
              Brands
            </NavLink>
          </li>
        
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
