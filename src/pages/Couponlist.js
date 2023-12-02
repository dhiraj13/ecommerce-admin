import { Table } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCoupons } from "../features/coupon/couponSlice";
import { Link, useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

const Couponlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCoupons());
  }, []);

  const couponState = useSelector((state) => state.coupon);
  const { coupons } = couponState;

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
      title: "Discount",
      dataIndex: "discount",
      sorter: (a, b) => a.discount.length - b.discount.length,
    },
    {
      title: "Expiry",
      dataIndex: "expiry",
      sorter: (a, b) => a.expiry.length - b.expiry.length,
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  const data1 = [];
  for (let i = 0; i < coupons.length; i++) {
    data1.push({
      key: i + 1,
      name: coupons[i].name,
      discount: coupons[i].discount,
      expiry: new Date(coupons[i].expiry).toLocaleString(),
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
        <h3 className="title">Coupons</h3>
        <button
          className="btn btn-primary rounded-3"
          onClick={() => navigate("/admin/coupon")}
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

export default Couponlist;
