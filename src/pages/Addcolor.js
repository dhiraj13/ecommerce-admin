import React, { useEffect } from "react";
import CustomInput from "@components/CustomInput";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import {
  createColor,
  getColor,
  resetColorState,
  updateColor,
} from "@features/color/colorSlice";

let schema = Yup.object().shape({
  title: Yup.string().required("Color name is required"),
});

const Addcolor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const newColor = useSelector((state) => state.color);
  const {
    isSuccess,
    isError,
    isLoading,
    createdColor,
    colorName,
    updatedColor,
  } = newColor;

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getColor(id));
    } else {
      dispatch(resetColorState());
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (colorName) {
      formik.setFieldValue("title", colorName);
    }
  }, [colorName]);

  useEffect(() => {
    if (isSuccess && createdColor) {
      toast.success("Color Added Successfully!");

      dispatch(resetColorState());
      navigate("/admin/color-list");
    }
    if (isSuccess && updatedColor) {
      toast.success("Color Updated Successfully!");

      dispatch(resetColorState());
      navigate("/admin/color-list");
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
        dispatch(updateColor({ id, ...values }));
        formik.resetForm();
      } else {
        dispatch(createColor(values));
        formik.resetForm();
      }
    },
  });

  return (
    <div>
      <button
        className="bg-transparent border-0 fs-6 mb-2 d-flex align-items-center gap-1"
        onClick={() => navigate("/admin/color-list")}
      >
        <IoMdArrowBack size={28} /> Go Back
      </button>
      <h3 className="mb-4 title">{id !== undefined ? "Edit" : "Add"} Color</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            name="title"
            type="color"
            label="Enter Product Color"
            onCh={formik.handleChange("title")}
            onBl={formik.handleBlur("title")}
            val={formik.values.title}
            id="color"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-3"
            type="submit"
          >
            {id !== undefined ? "Edit" : "Add"} Color
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcolor;
