import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  deleteCategory,
  getCategory,
} from "../../../redux/features/categoryAndBrand/categoryAndBrandSlice";


const CategoryList = () => {
  const { isLoading  , categories} = useSelector((state) => state.category) ;
  const dispatch = useDispatch();
  
  useEffect(() => {
     dispatch(getCategory())
  } , [dispatch])

  const confirmDelete = (slug) => {

    confirmAlert({
      title: 'Delete Category',
      message: 'Are you sure to delete this category?.',
      buttons: [
        {
          label: 'Delete',
          onClick: () => deleteCat(slug)
        },
        {
          label: 'Cancel',
          // onClick: () => alert('Click No')
        }
      ]
    });
  };
 const deleteCat = async (slug) => {
  await dispatch(deleteCategory(slug))     
  await dispatch(getCategory())

 } ; 
  return (
    <div className="--mb2">
      <h3> All Categories </h3>
      <div className="table">
        {categories.length === 0 ? (
          <p> No category </p>
        ) : (
          <table>
             <thead>
              <tr>
                <th>s/n</th>
                <th>Name</th>
                <th>action</th>
              </tr>
             </thead>
             <tbody>
              {categories.map((cat, index) => {
                const { _id , name , slug } = cat 
                  return (
                    <tr key={_id}>
                       <td>{index + 1 }</td>
                       <td>{name}</td>
                       <td>
                        <span>
                           <FaTrashAlt 
                            size={20} 
                            color={"red"}
                            onClick={() => confirmDelete(slug)}
                            />
                        </span>
                       </td>
                    </tr>
                  )
              })}
             </tbody>
          </table>
        )}
      </div>
      </div>
  )
}


export default CategoryList

































































