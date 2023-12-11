import React, { useEffect } from "react";
import CustomInput from "@components/CustomInput";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import {
  createBlogCategory,
  getBlogCategory,
  resetBcatState,
  updateBlogCategory,
} from "@features/bcategory/bcategorySlice";
import { IoMdArrowBack } from "react-icons/io";

let schema = Yup.object().shape({
  title: Yup.string().required("Blog Category name is required"),
});

const Addblogcat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const newBlogCategory = useSelector((state) => state.bcategory);
  const {
    isSuccess,
    isError,
    isLoading,
    createdBlogCategory,
    blogCatName,
    updatedBlogCategory,
  } = newBlogCategory;

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getBlogCategory(id));
    } else {
      dispatch(resetBcatState());
    }
  }, [id]);

  useEffect(() => {
    if (blogCatName) {
      formik.setFieldValue("title", blogCatName);
    }
  }, [blogCatName]);

  useEffect(() => {
    if (isSuccess && createdBlogCategory) {
      toast.success("Blog Category Added Successfully!");

      dispatch(resetBcatState());
      navigate("/admin/blog-category-list");
    }
    if (isSuccess && updatedBlogCategory) {
      toast.success("Brand Updated Successfully!");

      dispatch(resetBcatState());
      navigate("/admin/blog-category-list");
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
        dispatch(updateBlogCategory({ id, ...values }));
        formik.resetForm();
      } else {
        dispatch(createBlogCategory(values));
        formik.resetForm();
      }
    },
  });

  return (
    <div>
      <button
        className="bg-transparent border-0 fs-6 mb-2 d-flex align-items-center gap-1"
        onClick={() => navigate("/admin/blog-category-list")}
      >
        <IoMdArrowBack size={28} /> Go Back
      </button>
      <h3 className="mb-4 title">
        {id !== undefined ? "Edit" : "Add"} Blog Category
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Blog Category"
            name="title"
            onCh={formik.handleChange("title")}
            onBl={formik.handleBlur("title")}
            val={formik.values.title}
            id="blogcat"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-3"
            type="submit"
          >
            {id !== undefined ? "Edit" : "Add"} Blog Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addblogcat;
