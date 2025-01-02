import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  selectCartItems,
  selectCartTotalQuantity,
  CALCULATE_TOTAL_QUANTITY,
  selectCartTotalAmount,
  CALCULATE_SUBTOTAL,
  saveCartDB,
  //   CALCULATE_SUBTOTAL,
  //   saveCartDB,
} from "../../redux/features/product/cartSlice";
import styles from "./Cart.module.scss";
import { FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import "./Radio.scss";
import VerifyCoupon from "../../components/verifyCoupon/VerifyCoupon";
import PaymentOptions from "../../components/paymentOptions/PaymentOptions";
// import {
//   SAVE_PAYMENT_METHOD,
//   selectPaymentMethod,
// } from "../../redux/features/product/checkoutSlice";
// import { getCartQuantityById } from "../../utils";
// import VerifyCoupon from "../../components/verifyCoupon/VerifyCoupon";

const Cart = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const { coupon } = useSelector((state) => state.coupon);

  // Add product to cart
  const increaseCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(
      saveCartDB({ cartItems: JSON.parse(localStorage.getItem("cartItems")) })
    );
  };

  const decreaseCart = (product) => {
    dispatch(DECREASE_CART(product));
    dispatch(
      saveCartDB({ cartItems: JSON.parse(localStorage.getItem("cartItems")) })
    );
  };

  const removeFromCart = (product) => {
    dispatch(REMOVE_FROM_CART(product));
    dispatch(
      saveCartDB({ cartItems: JSON.parse(localStorage.getItem("cartItems")) })
    );
  };
  const clearCat = () => {
    dispatch(CLEAR_CART());
    dispatch(saveCartDB({ cartItems: [] }));
  };

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY());
    dispatch(CALCULATE_SUBTOTAL({ coupon }));
  }, [dispatch, cartItems, coupon]);

  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <>
            <p>Your cart is empty.</p>
            <div>
              <Link to="/shop"> &larr; Continue shopping </Link>
            </div>
          </>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((cart, index) => {
                  const { _id, name, price, image, cartQuantity } = cart;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>
                        <p>
                          <b>{name}</b>
                        </p>
                        <img
                          src={image[0]}
                          alt={name}
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>${price}</td>
                      <td>
                        <div className={styles.count}>
                          <button
                            className="--btn"
                            onClick={() => decreaseCart(cart)}
                          >
                            -
                          </button>
                          <p>
                            {" "}
                            <b>{cart.cartQuantity}</b>{" "}
                          </p>
                          <button
                            className="--btn"
                            onClick={() => increaseCart(cart)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>{price * cartQuantity}</td>
                      <td className={styles.icons}>
                        <FaTrashAlt
                          size={19}
                          color="red"
                          onClick={() => removeFromCart(cart)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className={styles.summary}>
              <button className="--btn --btn-danger" onClick={clearCat}>
                Clear Cart
              </button>
              <div className={styles.chekout}>
                <div>
                  <Link to={"/shop"}>&larr; Continue Shopping</Link>
                </div>
                <br />
                <Card cardClass={styles.card}>
                  <p>
                    <b>{`cart item(s) : ${cartTotalQuantity}`}</b>
                  </p>
                  <div className={styles.text}>
                    <h4>Subtotal:</h4>
                    <h3>{`$${cartTotalAmount?.toFixed(2)}`}</h3>
                  </div>
                  <VerifyCoupon />
                  <div className="--underline --my"></div>
                  <PaymentOptions />
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;
