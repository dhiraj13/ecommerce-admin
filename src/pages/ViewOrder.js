import { Table } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "@features/auth/authSlice";
import { Link, useParams } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

const ViewOrder = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const orderState = useSelector((state) => state.auth.order);

  useEffect(() => {
    dispatch(getOrder(id));
  }, [dispatch, id]);

  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Product Name",
      dataIndex: "name",
    },
    {
      title: "Brand",
      dataIndex: "brand",
    },
    {
      title: "Count",
      dataIndex: "count",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Color",
      dataIndex: "color",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  const data1 = [];
  for (let i = 0; i < orderState?.products?.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState?.products?.[i].product?.title,
      brand: orderState?.products?.[i].product?.brand,
      count: orderState?.products?.[i].product?.count,
      amount: orderState?.products?.[i].product?.price,
      color: orderState?.products?.[i].product?.color,
      date: orderState?.products?.[i].product?.createdAt,
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
      <h3 className="mb-4 title">View Order</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default ViewOrder;
