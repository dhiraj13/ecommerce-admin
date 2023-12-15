import { Table } from "antd";
import { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "@features/product/productSlice";
import { getColors } from "@features/color/colorSlice";
import CustomModal from "@components/CustomModal";

const Productlist = () => {
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setProductId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getColors());
  }, []);

  const productState = useSelector((state) => state.product);
  const { products } = productState;
  const colorState = useSelector((state) => state.color);
  const { colors } = colorState;

  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Title",
      dataIndex: "title",
      sorter: (a, b) => a.title.length - b.title.length,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      sorter: (a, b) => a.brand.length - b.brand.length,
    },
    {
      title: "Category",
      dataIndex: "category",
      sorter: (a, b) => a.category.length - b.category.length,
    },
    {
      title: "Color",
      dataIndex: "color",
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price.length - b.price.length,
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  const data1 = [];
  for (let i = 0; i < products.length; i++) {
    data1.push({
      key: i + 1,
      title: products[i].title,
      brand: products[i].brand,
      category: products[i].category,
      color: products[i].color ? products[i].color.join(", ") : "",
      price: `$ ${products[i].price}`,
      action: (
        <>
          <Link
            className="fs-4 text-danger"
            to={`/admin/product/${products[i]._id}`}
          >
            <BiEdit />
          </Link>
          <button
            className="ms-2 fs-4 text-danger bg-transparent border-0"
            onClick={() => showModal(products[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const handleDeleteProduct = async (id) => {
    await dispatch(deleteProduct(id));
    await dispatch(getProducts());
    setOpen(false);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="title">Products</h3>
        <button
          className="btn btn-primary rounded-3"
          onClick={() => navigate("/admin/product")}
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
        performAction={() => handleDeleteProduct(productId)}
        title="Are you sure you want to delete this product?"
      />
    </div>
  );
};

export default Productlist;
