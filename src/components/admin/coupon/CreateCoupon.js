import React, { useState } from "react";
import Card from "../../Card/Card";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { createCoupon } from "../../../redux/features/coupon/couponSlice";
import Loader from "../../loader/Loader";
import { toast } from "react-toastify";

const CreateCoupon = () => {
  const [name, setName] = useState("");
  const [discount, setDiscount] = useState(0);
  const [expiresAt, setExpiresAt] = useState(new Date());

  const { isLoading, coupons } = useSelector((state) => state.coupon);
  const dispatch = useDispatch();

  const saveCoupon = async (e) => {
    e.preventDefault();
    if (name.length < 5) {
      return toast.error("Coupon must be up to 5 characters")
    }
    const formData = {
      name,
      expiresAt,
      discount,
    }
    await dispatch(createCoupon(formData))
    // await dispatch(getCoupon())
    setName("")
  } 
 

  return (
    <>
      {isLoading && <Loader />}
      <div className="--underline"></div>
      <br />
      <div className="--mb2">
        <h3>Create Coupon</h3>
        <p>
          Use the form to <b>Create a Coupon.</b>
        </p>
        <Card cardClass={"card"}>
          <br />
          <form onSubmit={saveCoupon} >
            <label>Coupon Name:</label>
            <input
              type="text"
              placeholder="Coupon name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value.toUpperCase())}
              required
            />
            <label>Discount %:</label>
            <input
              type="number"
              placeholder="Coupon Discount"
              name="discount"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              required
            />
            <label>Expiry date:</label>
            <DatePicker
              selected={expiresAt}
              value={expiresAt}
              onChange={(date) => setExpiresAt(date)}
              required
            />
            <div className="--my">
              <button type="submit" className="--btn --btn-primary">
                Save Coupon
              </button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
};

export default CreateCoupon;
