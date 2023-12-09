import React, { useEffect } from "react";
import CustomInput from "@components/CustomInput";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import {
  createCategory,
  getProductCategory,
  resetProductCategoryState,
  updateProductCategory,
} from "@features/pcategory/pcategorySlice";
import { IoMdArrowBack } from "react-icons/io";

let schema = Yup.object().shape({
  title: Yup.string().required("Category name is required"),
});

const Addcat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const newCategory = useSelector((state) => state.pcategory);
  const {
    isSuccess,
    isError,
    isLoading,
    createdCategory,
    categoryName,
    updatedCategory,
  } = newCategory;

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getProductCategory(id));
    } else {
      dispatch(resetProductCategoryState());
    }
  }, [id]);

  useEffect(() => {
    if (categoryName) {
      formik.setFieldValue("title", categoryName);
    }
  }, [categoryName]);

  useEffect(() => {
    if (isSuccess && createdCategory) {
      toast.success("Category Added Successfully!");

      dispatch(resetProductCategoryState());
      navigate("/admin/category-list");
    }
    if (isSuccess && updatedCategory) {
      toast.success("Category Updated Successfully!");

      dispatch(resetProductCategoryState());
      navigate("/admin/category-list");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (id !== undefined) {
        dispatch(updateProductCategory({ id, ...values }));
        formik.resetForm();
      } else {
        dispatch(createCategory(values));
        formik.resetForm();
      }
    },
  });

  return (
    <div>
      <button
        className="bg-transparent border-0 mb-2"
        onClick={() => navigate("/admin/category-list")}
      >
        <IoMdArrowBack size={28} />
      </button>
      <h3 className="mb-4 title">
        {id !== undefined ? "Edit" : "Add"} Category
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Category"
            name="title"
            onCh={formik.handleChange("title")}
            onBl={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-3"
            type="submit"
          >
            {id !== undefined ? "Edit" : "Add"} Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcat;
