import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCoupon,
  getAllCoupons,
  getCoupon,
} from "../../../redux/features/coupon/couponSlice";
import { FaTrashAlt } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Loader from "../../loader/Loader";

const CouponList = () => {
  const { isLoading, coupons } = useSelector((state) => state.coupon);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCoupons());
    dispatch(getCoupon("PROMO 208"));
  }, [dispatch]);

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Coupon",
      message: "Are you sure you want to delete this coupon.",
      buttons: [
        {
          label: "Delete",
          onClick: () => delCoupon(id),
        },
        {
          label: "Cancel",
        },
      ],
    });
  };

  const delCoupon = async (id) => {
    await dispatch(deleteCoupon(id));
    await dispatch(getAllCoupons());
  };

  return (
      <div className="--mb2 ">
        <h3>All Coupons</h3>

        <div className={"table"}>
          {coupons.length === 0 ? (
            <p> No coupons Found</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Name</th>
                  <th>Discount (%)</th>
                  <th>Date Created</th>
                  <th>Expiry Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((coup, index) => {
                  const { _id, name, discount, createdAt, expiresAt } = coup;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{name}</td>
                      <td>{discount} {"% OFF "}</td>
                      <td>{createdAt.substring(0,10)}</td>
                      <td>{expiresAt.substring(0,10)}</td>
                      <td>
                        <span>
                          <FaTrashAlt
                            size={20}
                            color={"red"}
                            onClick={() => confirmDelete(_id)}
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
  );
};

export default CouponList;
