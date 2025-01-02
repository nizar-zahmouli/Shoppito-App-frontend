import React, { useEffect, useState } from "react";
import styles from "./CheckoutDetails.module.scss";
import Card from "../../components/card/Card";
import { CountryDropdown } from "react-country-region-selector";
import {
  SAVE_BILLING_ADDRESS,
  SAVE_SHIPPING_ADDRESS,
  selectBillingAddress,
  selectPaymentMethod,
  selectShippingAddress,
} from "../../redux/features/product/checkoutSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CheckoutSummary from "../../components/checkout/checkoutSummary/CheckoutSummary";

const initialAddressState = {
  name: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
  phone: "",
};

const CheckoutDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  });
  const [billingAddress, setBillingAddress] = useState({
    ...initialAddressState,
  });

  const paymentMethod = useSelector(selectPaymentMethod);
  const shipAddress = useSelector(selectShippingAddress);
  const billAddress = useSelector(selectBillingAddress);

  const handleShipping = (e) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };

  const handleBilling = (e) => {
    const { name, value } = e.target;
    setBillingAddress({
      ...billingAddress,
      [name]: value,
    });
  };

  useEffect(() => {
    if (Object.keys(shipAddress).length > 0) {
      setShippingAddress({ ...shipAddress });
    }
    if (Object.keys(billAddress).length > 0) {
      setBillingAddress({ ...billAddress });
    }
  }, [shipAddress, billAddress]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress));
    dispatch(SAVE_BILLING_ADDRESS(billingAddress));

    if (paymentMethod === "") {
      toast.info("Please select a payment method !!!")
      navigate("/cart")
    }
    if (paymentMethod === "stripe") {
      navigate("/checkout-stripe")
    }
    if (paymentMethod === "flutterwave") {
      navigate("/checkout-flutterwave")
    }
    if (paymentMethod === "paypal") {
      navigate("/checkout-paypal")
    }
    if (paymentMethod === "wallet") {
      navigate("/checkout-wallet")
      }
  };

  return (
    <section>
      <div className={`container ${styles.checkout}`}>
        <h2>Checkout Details</h2>
        <form onSubmit={handleSubmit}>
          <div>
            {/* shipping Address */}
            <Card cardClass={styles.card}>
              <h3>shipping Address</h3>
              <label>Recipient Name</label>
              <input
                type="text"
                placeholder="Recipient Name"
                name="name"
                required
                value={shippingAddress.name}
                onChange={(e) => handleShipping(e)}
              />
              <label>Address line 1</label>
              <input
                type="text"
                placeholder="Address line 1"
                name="line1"
                required
                value={shippingAddress.line1}
                onChange={(e) => handleShipping(e)}
              />
              <label>Address line 2</label>
              <input
                type="text"
                placeholder="Address line 2"
                name="line2"
                required
                value={shippingAddress.line2}
                onChange={(e) => handleShipping(e)}
              />
              <label>State</label>
              <input
                type="text"
                placeholder="State"
                name="state"
                required
                value={shippingAddress.state}
                onChange={(e) => handleShipping(e)}
              />
              <label>Postal Code</label>
              <input
                type="text"
                placeholder="Postal Code"
                name="postal_code"
                required
                value={shippingAddress.postal_code}
                onChange={(e) => handleShipping(e)}
              />
              <label>Country</label>
              <CountryDropdown
                className={styles.select}
                valueType="short"
                value={shippingAddress.country}
                onChange={(val) =>
                  handleShipping({
                    target: {
                      name: "country",
                      value: val,
                    },
                  })
                }
              />
              <label>Phone</label>
              <input
                type="text"
                placeholder="Phone"
                name="phone"
                required
                value={shippingAddress.phone}
                onChange={(e) => handleShipping(e)}
              />
            </Card>
            {/* Billing Address */}
            <Card cardClass={styles.card}>
              <h3>Billing Address</h3>
              <label>Recipient Name</label>
              <input
                type="text"
                placeholder="Recipient Name"
                name="name"
                required
                value={billingAddress.name}
                onChange={(e) => handleBilling(e)}
              />
              <label>Address line 1</label>
              <input
                type="text"
                placeholder="Address line 1"
                name="line1"
                required
                value={billingAddress.line1}
                onChange={(e) => handleBilling(e)}
              />
              <label>Address line 2</label>
              <input
                type="text"
                placeholder="Address line 2"
                name="line2"
                required
                value={billingAddress.line2}
                onChange={(e) => handleBilling(e)}
              />
              <label>City</label>
              <input
                type="text"
                placeholder="City"
                name="city"
                required
                value={billingAddress.city}
                onChange={(e) => handleBilling(e)}
              />
              <label>State</label>
              <input
                type="text"
                placeholder="State"
                name="state"
                required
                value={billingAddress.state}
                onChange={(e) => handleBilling(e)}
              />
              <label>Postal Code</label>
              <input
                type="text"
                placeholder="Postal Code"
                name="postal_code"
                required
                value={billingAddress.postal_code}
                onChange={(e) => handleBilling(e)}
              />
              <label>Country</label>
              <CountryDropdown
                className={styles.select}
                valueType="short"
                value={billingAddress.country}
                onChange={(val) =>
                  handleBilling({
                    target: {
                      name: "country",
                      value: val,
                    },
                  })
                }
              />
              <label>Phone</label>
              <input
                type="text"
                placeholder="Phone"
                name="phone"
                required
                value={billingAddress.phone}
                onChange={(e) => handleBilling(e)}
              />
              <button type="submit" className="--btn --btn-primary">
                Proceed To Checkout
              </button>
            </Card>
          </div>
          <div>
            <Card cardClass={styles.card}>
              <CheckoutSummary />
            </Card>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutDetails;
