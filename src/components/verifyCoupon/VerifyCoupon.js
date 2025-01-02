import React, { useState } from "react";
import "./VerifyCoupon.scss";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/Card";
import { getCoupon, REMOVE_COUPON } from "../../redux/features/coupon/couponSlice";

const CartDiscount = () => {
  const { coupon } = useSelector((state) => state.coupon);

  const { initialCartTotalAmount } = useSelector((state) => state.cart);
  return (
    <>
      {coupon !== null && (
        <Card cardClass={"coupon-msg"}>
          <p className="--center-all">
            Initial Total: ${initialCartTotalAmount} | Coupon: {coupon?.name}{" "}
            | Discount: {coupon?.discount}% |
          </p>
        </Card>
      )}
    </>
  );
};

const VerifyCoupon = () => {
  const dispatch = useDispatch();
  const [couponName, setCouponName] = useState("");
  const [showForm, setShowForm] = useState(false);
  const { coupon } = useSelector((state) => state.coupon);

  const { cartTotalAmount, initialCartTotalAmount } = useSelector(
    (state) => state.cart
  );

  const verifyCoupon = (e) => {
    e.preventDefault();
    dispatch(getCoupon(couponName))
  };

  const removeCoupon = () => {
    dispatch(REMOVE_COUPON())
  };

  return (
    <>
      <CartDiscount />
      <div className="--flex-between">
        <p>Have a coupon?</p>
        {coupon === null ? (
          <p
            className="--cursor --color-primary"
            onClick={() => setShowForm(true)}
          >
            <b>Add Coupon</b>
          </p>
        ) : (
          <p className="--cursor --color-primary" onClick={removeCoupon}>
            <b>Remove Coupon</b>
          </p>
        )}
      </div>
      {showForm && (
        <form onSubmit={verifyCoupon} className="coupon-form --form-control">
          <input
            type="text"
            placeholder="Coupon name"
            name="name"
            value={couponName}
            onChange={(e) => setCouponName(e.target.value.toUpperCase())}
            required
          />
          <button type="submit" className="--btn --btn-primary">
            Verify
          </button>
        </form>
      )}
    </>
  );
};

export default VerifyCoupon;
