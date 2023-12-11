import React, { useEffect } from "react";
import CustomInput from "@components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import {
  createBrand,
  getBrand,
  resetBrandState,
  updateBrand,
} from "@features/brand/brandSlice";
import { toast } from "react-toastify";
import { IoMdArrowBack } from "react-icons/io";

let schema = Yup.object().shape({
  title: Yup.string().required("Brand name is required"),
});

const Addbrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const newBrand = useSelector((state) => state.brand);
  const {
    isSuccess,
    isError,
    isLoading,
    createdBrand,
    brandName,
    updatedBrand,
  } = newBrand;

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getBrand(id));
    } else {
      dispatch(resetBrandState());
    }
  }, [id]);

  useEffect(() => {
    if (brandName) {
      formik.setFieldValue("title", brandName);
    }
  }, [brandName]);

  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast.success("Brand Added Successfully!");

      dispatch(resetBrandState());
      navigate("/admin/brand-list");
    }
    if (isSuccess && updatedBrand) {
      toast.success("Brand Updated Successfully!");

      dispatch(resetBrandState());
      navigate("/admin/brand-list");
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
        dispatch(updateBrand({ id, ...values }));
        formik.resetForm();
      } else {
        dispatch(createBrand(values));
        formik.resetForm();
      }
    },
  });

  return (
    <div>
      <button
        className="bg-transparent border-0 fs-6 mb-2 d-flex align-items-center gap-1"
        onClick={() => navigate("/admin/brand-list")}
      >
        <IoMdArrowBack size={28} /> Go Back
      </button>
      <h3 className="mb-4 title">{id !== undefined ? "Edit" : "Add"} Brand</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Brand"
            name="title"
            onCh={formik.handleChange("title")}
            onBl={formik.handleBlur("title")}
            val={formik.values.title}
            id="brand"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-3"
            type="submit"
          >
            {id !== undefined ? "Edit" : "Add"} Brand
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addbrand;
