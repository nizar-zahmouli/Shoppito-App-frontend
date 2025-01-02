import React, { useEffect } from "react";
import Slider from "../../components/slider/Slider";
import HomeInfoBox from "./HomeInfoBox";
import "./Home.scss";
import ProductCarousel from "../../components/carousel/Carousel";
import { productData } from "../../components/carousel/data";
import CarouselItem from "../../components/carousel/CarouselItem";
import ProductCategory from "./ProductCategory";
import FooterLinks from "../../components/footer/FooterLinks";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/features/product/productSlice";

const PageHeading = ({ heading, btnText }) => {
  return (
    <>
      <div className="--flex-between">
        <h2 className="--fw-thin">{heading}</h2>
        <button className="--btn">{btnText}</button>
      </div>
      <div className="--hr"></div>
    </>
  );
};

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  const { products } = useSelector((state) => state.product);

  // Latest Products
  const latest = products
    ?.filter((product) => {
      return product?.quantity > 0;
    })
    ?.filter((product, index) => index < 7);


  const latestProducts = latest.map((item) => (
    <div key={item.id}>
      <CarouselItem
        name={item.name}
        image={item.image[0]}
        price={item.price}
        regularPrice={item.regularPrice}
        description={item.description}
        product={item}
      />
    </div>
  ));

  // Phones Products
  const phones = products
    ?.filter((product) => {
      return product?.quantity > 0;
    })
    ?.filter((product) => {
      return product?.category === "phone";
    })
    ?.filter((product, index) => index < 7);

  const phoneProducts = phones.map((item) => (
    <div key={item.id}>
      <CarouselItem
        name={item.name}
        image={item.image[0]}
        price={item.price}
        regularPrice={item.regularPrice}
        description={item.description}
        product={item}
      />
    </div>
  ));
  //     const productss = productData.map((item) => (
  //       <div key={item?.id}>
  //         <CarouselItem
  //           name={item?.name}
  //           image={item?.image}
  //           price={item.price}
  //           description={item.description}
  //         />
  //       </div>
  // ));
  return (
    <div>
      <>
        <Slider />
        <section>
          <div className="container">
            <HomeInfoBox />
            <PageHeading heading={"Latest Products"} btnText={"Shop Now>>>"} />
            <ProductCarousel products={latestProducts} />
          </div>
        </section>
        <section className="--bg-grey">
          <div className="container">
            <h3>Categories</h3>
            <ProductCategory />
          </div>
        </section>
        <section>
          <div className="container">
            <PageHeading heading={"Mobile Phones"} btnText={"Shop Now>>>"} />
            <ProductCarousel products={phoneProducts} />
          </div>
        </section>
        <FooterLinks />
      </>
    </div>
  );
};

export default Home;
