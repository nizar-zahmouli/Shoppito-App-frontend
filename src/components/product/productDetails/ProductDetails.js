import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import styles from "./ProductDetails.module.scss";

import { toast } from "react-toastify";
import { Spinner } from "../../loader/Loader";
import { getProduct } from "../../../redux/features/product/productSlice";
import { calculateAverageRating } from "../../../utils";
import ProductRating from "../productRating/ProductRating";
import DOMPurify from "dompurify";
import Card from "../../Card/Card";
import {
  ADD_TO_CART,
  DECREASE_CART,
  saveCartDB,
  selectCartItems,
} from "../../../redux/features/product/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [imageIndex, setImageIndex] = useState(0);
  const { product, isLoading } = useSelector((state) => state.product);
  const cartItems = useSelector(selectCartItems);

  const cart = cartItems.find((cart) => cart._id === id);
  const isCartAdded = cartItems.findIndex((cart) => {
    return cart._id === id;
  });

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  const slideLength = product?.image?.length;

  const nextSlide = () => {
    setImageIndex(imageIndex === slideLength - 1 ? 0 : imageIndex + 1);
  };
  let slideInterval;
  useEffect(() => {
    if (product?.image?.length > 1) {
      const auto = () => {
        slideInterval = setInterval(nextSlide, 3000);
      };
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [imageIndex, slideInterval, product]);

  const averageRating = calculateAverageRating(product?.rating);

  // Add product to cart
  const addToCart = (product) => {
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
  return (
    <section>
      <div className={`container ${styles.product}`}>
        <h2>product details</h2>
        <div>
          <Link to="/shop">&larr; Back to Products</Link>
        </div>

        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <div className={styles.details}>
              <div className={styles.img}>
                <img
                  src={product?.image[imageIndex]}
                  alt={product?.name}
                  className={styles.pImg}
                />
                <div className={styles.smallImg}>
                  {product?.image?.map((img, index) => {
                    return (
                      <img
                        key={index}
                        src={img}
                        alt="product Img"
                        onClick={() => setImageIndex(index)}
                        className={imageIndex === index ? "activeImg" : ""}
                      />
                    );
                  })}
                </div>
              </div>
              <div className={styles.content}>
                <h3>{product?.name}</h3>
                <ProductRating
                  averageRating={averageRating}
                  noOfRatings={product?.ratings?.length}
                />
                <div className="--underline">
                  <div className={styles.property}>
                    <p>
                      <b>Price:</b>
                    </p>
                    <p className={styles.price}>{`$${product?.price}`}</p>
                  </div>

                  <div className={styles.property}>
                    <p>
                      <b>SKU:</b>
                    </p>
                    <p>{product?.sku}</p>
                  </div>
                  <div className={styles.property}>
                    <p>
                      <b>Category:</b>
                    </p>
                    <p>{product?.category}</p>
                  </div>
                  <div className={styles.property}>
                    <p>
                      <b>Brand:</b>
                    </p>
                    <p>{product?.brand}</p>
                  </div>
                  <div className={styles.property}>
                    <p>
                      <b>Color:</b>
                    </p>
                    <p>{product?.color}</p>
                  </div>
                  <div className={styles.property}>
                    <p>
                      <b>quantity in Stock:</b>
                    </p>
                    <p>{product?.quantity}</p>
                  </div>
                  <div className={styles.property}>
                    <p>
                      <b>Sold:</b>
                    </p>
                    <p>{product?.sold}</p>
                  </div>
                  <div className={styles.count}>
                    {isCartAdded < 0 ? null : (
                      <>
                        <button
                          className="--btn"
                          onClick={() => decreaseCart(product)}
                        >
                          -
                        </button>
                        <p>
                          {" "}
                          <b>{cart.cartQuantity}</b>{" "}
                        </p>
                        <button
                          className="--btn"
                          onClick={() => addToCart(product)}
                        >
                          +
                        </button>
                      </>
                    )}
                  </div>
                  <div className="--flex-start">
                    {product?.quantity > 0 ? (
                      <button
                        className="--btn --btn-primary"
                        onClick={() => addToCart(product)}
                      >
                        ADD TO CART
                      </button>
                    ) : (
                      <button
                        className="--btn --btn-red"
                        onClick={() =>
                          toast.error("Sorry , Product is out of stock")
                        }
                      >
                        Out Of Stock
                      </button>
                    )}
                    <button className="--btn --btn-danger">
                      ADD TO WISHLIST
                    </button>
                  </div>
                  <div className="--underline">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(product?.description),
                      }}
                    ></div>
                  </div>
                  {/* <div className={styles.count}>
                    <button className="--btn">

                    </button> */}
                  {/* </div> */}
                </div>
              </div>
            </div>
          </>
        )}
        {/* Review section */}
        <Card cardClass={styles.card}>
          <h3>Product Reviews???</h3>
        </Card>
      </div>
    </section>
  );
};

export default ProductDetails;
