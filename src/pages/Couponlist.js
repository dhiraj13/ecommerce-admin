import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCoupon, getCoupons } from "../features/coupon/couponSlice";
import { Link, useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from "../components/CustomModal";

const Couponlist = () => {
  const [open, setOpen] = useState(false);
  const [couponId, setCouponId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setCouponId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
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
          <Link
            className="fs-4 text-danger"
            to={`/admin/coupon/${coupons[i]._id}`}
          >
            <BiEdit />
          </Link>
          <button
            className="ms-2 fs-4 text-danger bg-transparent border-0"
            onClick={() => showModal(coupons[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const handleDeleteCoupon = async (id) => {
    await dispatch(deleteCoupon(id));
    await dispatch(getCoupons());
    setOpen(false);
  };

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
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => handleDeleteCoupon(couponId)}
        title="Are you sure you want to delete this coupon?"
      />
    </div>
  );
};

export default Couponlist;
