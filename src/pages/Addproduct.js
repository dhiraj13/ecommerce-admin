import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import CustomInput from "@components/CustomInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "antd";
import { getBrands } from "@features/brand/brandSlice";
import { getCategories } from "@features/pcategory/pcategorySlice";
import {
  createProduct,
  getProduct,
  resetProductState,
  updateProduct,
} from "@features/product/productSlice";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "@features/upload/uploadSlice";
import { toast } from "react-toastify";
import { IoMdArrowBack } from "react-icons/io";
import { getColors } from "@features/color/colorSlice";

let schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number().required("Price is required"),
  brand: Yup.string().required("Brand is required"),
  category: Yup.string().required("Category is required"),
  tags: Yup.string().required("Tag is required"),
  color: Yup.array().required("Colors are required"),
  quantity: Yup.number().required("Quantity is required"),
});

const Addproduct = () => {
  const [color, setColor] = useState([
    // "6551a5aba19eb165dcba9369",
    // "6551a5baa19eb165dcba9375",
  ]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [images, setImages] = useState([]);

  const brandState = useSelector((state) => state.brand.brands);
  const catState = useSelector((state) => state.pcategory.pcategories);
  const colorState = useSelector((state) => state.color.colors);
  const imgState = useSelector((state) => state.upload.images);
  const newProduct = useSelector((state) => state.product);
  const {
    isSuccess,
    isError,
    isLoading,
    createdProduct,
    productDetail,
    updatedProduct,
  } = newProduct;

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getColors());
    if (id !== undefined) {
      dispatch(getProduct(id));
    } else {
      dispatch(resetProductState());
    }

    return () => {
      dispatch(resetProductState());
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (imgState) {
      const img = [];
      imgState.forEach((i) => {
        img.push({
          public_id: i.public_id,
          url: i.url,
        });
      });
      formik.setFieldValue("images", img);
      setImages(imgState);
    }
  }, [imgState]);

  useEffect(() => {
    if (productDetail) {
      formik.setValues(productDetail);
      const img = [];
      if (productDetail.images) {
        productDetail.images.forEach((i) => {
          img.push({
            public_id: i.public_id,
            url: i.url,
          });
        });
      }
      formik.setFieldValue("images", img);
      setImages(img);
      setColor(productDetail.color);
    }
  }, [productDetail]);

  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Product Added Successfully!");

      dispatch(resetProductState());
      navigate("/admin/product-list");
    }
    if (isSuccess && updatedProduct) {
      toast.success("Product Updated Successfully!");

      dispatch(resetProductState());
      navigate("/admin/product-list");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);

  const coloropt = [];
  colorState.forEach((i) => {
    coloropt.push({
      label: i.title,
      value: i._id,
    });
  });

  useEffect(() => {
    formik.values.color = color ?? [];
  }, [color]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      tags: "",
      color: [],
      quantity: "",
      images: [],
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (id !== undefined) {
        dispatch(updateProduct({ id, ...values }));
        formik.resetForm();
      } else {
        dispatch(createProduct(values));
        formik.resetForm();
      }
    },
  });

  const handleColors = (value) => {
    setColor(value);
  };

  return (
    <div>
      <button
        className="bg-transparent border-0 fs-6 mb-2 d-flex align-items-center gap-1"
        onClick={() => navigate("/admin/product-list")}
      >
        <IoMdArrowBack size={28} /> Back
      </button>
      <h3 className="mb-4 title">Add Product</h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <CustomInput
            type="text"
            label="Enter Product Title"
            name="title"
            onCh={formik.handleChange("title")}
            onBl={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <div className="">
            <ReactQuill
              theme="snow"
              name="description"
              onChange={formik.handleChange("description")}
              value={formik.values.description}
            />
          </div>
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>
          <CustomInput
            type="number"
            label="Enter Product Price"
            name="price"
            onCh={formik.handleChange("price")}
            onBl={formik.handleBlur("price")}
            val={formik.values.price}
          />
          <div className="error">
            {formik.touched.price && formik.errors.price}
          </div>
          <select
            name="brand"
            onChange={formik.handleChange("brand")}
            onBlur={formik.handleBlur("brand")}
            value={formik.values.brand}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Select Brand</option>
            {brandState.map((i, j) => (
              <option key={j} value={i.title}>
                {i.title}
              </option>
            ))}
          </select>
          <div className="error">
            {formik.touched.brand && formik.errors.brand}
          </div>
          <select
            name="category"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Select Category</option>
            {catState.map((i, j) => (
              <option key={j} value={i.title}>
                {i.title}
              </option>
            ))}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>
          <select
            name="tags"
            onChange={formik.handleChange("tags")}
            onBlur={formik.handleBlur("tags")}
            value={formik.values.tags}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Select Tags</option>
            <option value="featured">Featured</option>
            <option value="popular">Popular</option>
            <option value="special">Special</option>
          </select>
          <div className="error">
            {formik.touched.tags && formik.errors.tags}
          </div>
          <Select
            mode="multiple"
            allowClear
            className="w-100"
            placeholder="Select colors"
            // defaultValue={color}
            name="color"
            value={formik.values.color}
            onChange={(value) => formik.setFieldValue("color", value)}
            onBlur={formik.handleBlur}
            onSelect={formik.handleChange}
            options={coloropt}
          />
          <div className="error">
            {formik.touched.color && formik.errors.color}
          </div>
          <CustomInput
            name="quantity"
            onCh={formik.handleChange("quantity")}
            onBl={formik.handleBlur("quantity")}
            val={formik.values.quantity}
            type="number"
            label="Enter Product Quantity"
          />
          <div className="error">
            {formik.touched.quantity && formik.errors.quantity}
          </div>
          <div className="bg-white border-1 p-5 text-center">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages d-flex flex-wrap gap-3">
            {images?.map((i, j) => (
              <div className="position-relative" key={j}>
                <button
                  type="button"
                  onClick={() => dispatch(delImg(i.public_id))}
                  className="btn-close position-absolute"
                  style={{ top: "10px", right: "10px" }}
                ></button>
                <img
                  className="w-100 object-fit-cover"
                  src={i.url}
                  alt=""
                  width={200}
                  height={200}
                />
              </div>
            ))}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-3"
            type="submit"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
