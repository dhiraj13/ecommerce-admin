import * as Yup from "yup";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import Dropzone from "react-dropzone";
import "react-quill/dist/quill.snow.css";
import { Stepper } from "react-form-stepper";

import CustomInput from "@components/CustomInput";
import { delImg, uploadImg } from "@features/upload/uploadSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { IoMdArrowBack } from "react-icons/io";
import { getCategories } from "@features/bcategory/bcategorySlice";
import {
  createBlog,
  getBlog,
  resetBlogState,
  updateBlog,
} from "@features/blog/blogSlice";

let schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.string().required("Category is required"),
});

const Addblog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [images, setImages] = useState([]);

  const imgState = useSelector((state) => state.upload.images);
  const bCatState = useSelector((state) => state.bcategory.bcategories);
  const blogState = useSelector((state) => state.blog);
  const { isSuccess, isError, isLoading, createdBlog, blog, updatedBlog } =
    blogState;

  useEffect(() => {
    if (id) {
      dispatch(getBlog(id));
    } else {
      dispatch(resetBlogState());
    }
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
    if (blog) {
      formik.setFieldValue("title", blog?.title);
      formik.setFieldValue("description", blog?.description);
      formik.setFieldValue("category", blog?.category);
      const img = [];
      if (blog.images) {
        blog.images.forEach((i) => {
          img.push({
            public_id: i.public_id,
            url: i.url,
          });
        });
      }
      formik.setFieldValue("images", img);
      setImages(img);
    }
  }, [blog]);

  useEffect(() => {
    if (isSuccess && createdBlog) {
      toast.success("Blog Added Successfully!");

      dispatch(resetBlogState());
      navigate("/admin/blog-list");
    }
    if (isSuccess && updatedBlog) {
      toast.success("Blog Updated Successfully!");

      dispatch(resetBlogState());
      navigate("/admin/blog-list");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (id !== undefined) {
        dispatch(updateBlog({ id, ...values }));
        formik.resetForm();
      } else {
        dispatch(createBlog(values));
        formik.resetForm();
      }
    },
  });

  return (
    <div>
      <button
        className="bg-transparent border-0 fs-6 mb-2 d-flex align-items-center gap-1"
        onClick={() => navigate("/admin/blog-list")}
      >
        <IoMdArrowBack size={28} /> Go Back
      </button>
      <h3 className="mb-4 title">{id !== undefined ? "Edit" : "Add"} Blog</h3>
      <Stepper
        steps={[
          { label: "Add Blog Details" },
          { label: "Upload Images" },
          { label: "Finish" },
        ]}
        activeStep={1}
      />
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <div className="mt-4">
            <CustomInput
              type="text"
              label="Enter Blog Title"
              name="title"
              onCh={formik.handleChange("title")}
              onBl={formik.handleBlur("title")}
              val={formik.values.title}
            />
          </div>
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <select
            name="category"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
            className="form-control py-3 mt-3"
            id=""
          >
            <option value="">Select Blog Category</option>
            {bCatState.map((i, j) => (
              <option key={j} value={i.title}>
                {i.title}
              </option>
            ))}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>
          <ReactQuill
            theme="snow"
            className="mt-3"
            name="description"
            onChange={formik.handleChange("description")}
            value={formik.values.description}
          />
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>
          <div className="bg-white border-1 p-5 text-center mt-3">
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
          <div className="showimages d-flex flex-wrap mt-3 gap-3">
            {images?.map((i, j) => (
              <div className="position-relative" key={j}>
                <button
                  type="button"
                  onClick={() => dispatch(delImg(i.public_id))}
                  className="btn-close position-absolute"
                  style={{ top: "10px", right: "10px" }}
                ></button>
                <img src={i.url} alt="" width={200} height={200} />
              </div>
            ))}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-3"
            type="submit"
          >
            {id !== undefined ? "Edit" : "Add"} Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addblog;
