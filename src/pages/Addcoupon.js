import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import {
  createCoupon,
  getCoupon,
  resetCouponState,
  updateCoupon,
} from "../features/coupon/couponSlice";
import { toast } from "react-toastify";
import { IoMdArrowBack } from "react-icons/io";
import dayjs from "dayjs";

let schema = Yup.object().shape({
  name: Yup.string().required("Coupon Name is required"),
  expiry: Yup.date().required("Expiry Date is required"),
  discount: Yup.number().required("Discount Percentage is required"),
});

const Addcoupon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const newCoupon = useSelector((state) => state.coupon);
  const {
    isSuccess,
    isError,
    isLoading,
    createdCoupon,
    coupon,
    updatedCoupon,
  } = newCoupon;

  useEffect(() => {
    if (id) {
      dispatch(getCoupon(id));
    } else {
      dispatch(resetCouponState());
    }
  }, []);

  useEffect(() => {
    if (coupon) {
      formik.setFieldValue("name", coupon?.name);
      formik.setFieldValue(
        "expiry",
        coupon?.expiry ? dayjs(coupon?.expiry).format("YYYY-MM-DD") : ""
      );
      formik.setFieldValue("discount", coupon?.discount);
    }
  }, [coupon]);

  useEffect(() => {
    if (isSuccess && createdCoupon) {
      toast.success("Coupon Added Successfully!");

      dispatch(resetCouponState());
      navigate("/admin/coupon-list");
    }
    if (isSuccess && updatedCoupon) {
      toast.success("Coupon Updated Successfully!");

      dispatch(resetCouponState());
      navigate("/admin/coupon-list");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    initialValues: {
      name: "",
      expiry: "",
      discount: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (id !== undefined) {
        dispatch(updateCoupon({ id, ...values }));
        formik.resetForm();
      } else {
        dispatch(createCoupon(values));
        formik.resetForm();
      }
    },
  });

  return (
    <div>
      <button
        className="bg-transparent border-0 mb-2"
        onClick={() => navigate("/admin/coupon-list")}
      >
        <IoMdArrowBack size={28} />
      </button>
      <h3 className="mb-4 title">{id !== undefined ? "Edit" : "Add"} Coupon</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Coupon Name"
            name="name"
            onCh={formik.handleChange("name")}
            onBl={formik.handleBlur("name")}
            val={formik.values.name}
            id="name"
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>
          <CustomInput
            type="date"
            label="Enter Expiry Date"
            name="expiry"
            onCh={formik.handleChange("expiry")}
            onBl={formik.handleBlur("expiry")}
            val={formik.values.expiry}
            id="date"
          />
          <div className="error">
            {formik.touched.expiry && formik.errors.expiry}
          </div>
          <CustomInput
            type="number"
            label="Enter Discount"
            name="discount"
            onCh={formik.handleChange("discount")}
            onBl={formik.handleBlur("discount")}
            val={formik.values.discount}
            id="discount"
          />
          <div className="error">
            {formik.touched.discount && formik.errors.discount}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-3"
            type="submit"
          >
            {id !== undefined ? "Edit" : "Add"} Coupon
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcoupon;
