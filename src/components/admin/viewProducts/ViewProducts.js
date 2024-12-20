import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import {
  deleteProduct,
  getAllProducts,
} from "../../../redux/features/product/productSlice";
import "./ViewProducts.scss";
import Search from "../../search/Search";
import { Spinner } from "../../loader/Loader";
import { AiOutlineEye } from "react-icons/ai";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { shortenText } from "../../../utils";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const ViewProducts = ({ value}) => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { products, isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getAllProducts());
    }
  }, [isLoggedIn, dispatch]);

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Product",
      message: "Are you sure you want to delete this product?",
      buttons: [
        {
          label: "Delete",
          onClick: () => delProduct(id),
        },
        {
          label: "Cancel",
        },
      ],
    });
  };

  // delete product
  const delProduct = async (id) => {
    await dispatch(deleteProduct(id));
    await dispatch(getAllProducts());
  };

  //begin paginate
  const itemsPerPage = 6;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;

    setItemOffset(newOffset);
  };

  //  end paginate

  return (
    <section>
      <div className="product-list">
        <div className="table">
          <div className="--flex-between --flex-dir-column">
            <span>
              <h3>All Products</h3>
              <p>
                ~ <b>{products.length}</b> Products found
              </p>
            </span>
            <span>
              <Search
                value={value}
                onChange={(e) => setSearch(e.target.value)}
              />
            </span>
          </div>
        </div>
        {isLoading && <Spinner />}

        <div className="table">
          {!isLoading && products.length === 0 ? (
            <p>-- No Products Found...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <td>s/n</td>
                  <td>Name</td>
                  <td>Category</td>
                  <td>Price</td>
                  <td>Quantity</td>
                  <td>Value</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((prod, index) => {
                  const { _id, name, category, price, quantity } = prod;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{shortenText(name, 16)}</td>
                      <td>{category}</td>
                      <td>
                        {"$"}
                        {price}
                      </td>
                      <td>{quantity}</td>
                      <td>
                        {"$"}
                        {price * quantity}
                      </td>
                      <td className="icons">
                        <span>
                          <Link to="/">
                            <AiOutlineEye size={25} color={"purple"} />
                          </Link>
                        </span>
                        <span>
                          <Link to={`/admin/edit-product/${_id}`}>
                            <FaEdit size={20} color={"green"} />
                          </Link>
                        </span>
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
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="prev"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
      </div>
    </section>
  );
};

export default ViewProducts;
