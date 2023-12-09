import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBlogCategory,
  getCategories,
} from "@features/bcategory/bcategorySlice";
import { Link, useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from "@components/CustomModal";

const Blogcatlist = () => {
  const [open, setOpen] = useState(false);
  const [blogCatId, setBlogCatId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setBlogCatId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const bcategoryState = useSelector((state) => state.bcategory);
  const { bcategories } = bcategoryState;

  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];

  const data1 = [];
  for (let i = 0; i < bcategories.length; i++) {
    data1.push({
      key: i + 1,
      name: bcategories[i].title,
      action: (
        <>
          <Link
            className="fs-4 text-danger"
            to={`/admin/blog-category/${bcategories[i]._id}`}
          >
            <BiEdit />
          </Link>
          <button
            className="ms-2 fs-4 text-danger bg-transparent border-0"
            onClick={() => showModal(bcategories[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const handleDeleteBlogCat = async (id) => {
    await dispatch(deleteBlogCategory(id));
    await dispatch(getCategories());
    setOpen(false);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="title">Blog Categories</h3>
        <button
          className="btn btn-primary rounded-3"
          onClick={() => navigate("/admin/blog-category")}
        >
          Add
        </button>
      </div>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => handleDeleteBlogCat(blogCatId)}
        title="Are you sure you want to delete this Blog Category?"
      />
    </div>
  );
};

export default Blogcatlist;
