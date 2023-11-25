import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { createCategory } from "../features/pcategory/pcategorySlice";
import { IoMdArrowBack } from "react-icons/io";

let schema = Yup.object().shape({
  title: Yup.string().required("Category name is required"),
});

const Addcat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newCategory = useSelector((state) => state.pcategory);
  const { isSuccess, isError, isLoading, createdCategory } = newCategory;

  useEffect(() => {
    if (isSuccess && createdCategory) {
      toast.success("Category Added Successfully!");
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
      dispatch(createCategory(values));
      formik.resetForm();
      setTimeout(() => {
        navigate("/admin/category-list");
      }, 3000);
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
      <h3 className="mb-4 title">Add Category</h3>
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
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcat;
