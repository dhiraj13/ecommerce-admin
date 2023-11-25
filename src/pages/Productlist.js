import { Table } from "antd";
import { useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/product/productSlice";

const Productlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const productState = useSelector((state) => state.product);
  const { products } = productState;

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
          <Link className="fs-4 text-danger" to="/">
            <BiEdit />
          </Link>
          <Link className="ms-2 fs-4 text-danger" to="/">
            <AiFillDelete />
          </Link>
        </>
      ),
    });
  }
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
    </div>
  );
};

export default Productlist;
