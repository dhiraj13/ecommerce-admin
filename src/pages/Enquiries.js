import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEnquiry,
  getEnquiries,
  resetEnquiryState,
  updateEnquiry,
} from "@features/enquiry/enquirySlice";
import { Link } from "react-router-dom";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import CustomModal from "@components/CustomModal";

const Enquiries = () => {
  const [open, setOpen] = useState(false);
  const [enquiryId, setEnquiryId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setEnquiryId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetEnquiryState());
    dispatch(getEnquiries());
  }, [dispatch]);

  const enquiryState = useSelector((state) => state.enquiry);
  const { enquiries } = enquiryState;

  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];

  const data1 = [];
  for (let i = 0; i < enquiries.length; i++) {
    data1.push({
      key: i + 1,
      name: enquiries[i].name,
      email: enquiries[i].email,
      mobile: enquiries[i].mobile,
      status: (
        <>
          <select
            name=""
            defaultValue={enquiries[i]?.status ?? "Submitted"}
            className="form-control form-select"
            id=""
            onChange={(e) => setEnquiryStatus(e.target.value, enquiries[i]._id)}
          >
            <option value="Submitted">Submitted</option>
            <option value="Contacted">Contacted</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </>
      ),
      action: (
        <>
          <Link
            className="ms-2 fs-4 text-danger"
            to={`/admin/enquiries/${enquiries[i]._id}`}
          >
            <AiOutlineEye />
          </Link>
          <button
            className="ms-2 fs-4 text-danger bg-transparent border-0"
            onClick={() => showModal(enquiries[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const setEnquiryStatus = (e, i) => {
    const data = { id: i, enquiryStatus: e };
    dispatch(updateEnquiry(data));
  };

  const handleDeleteEnq = async (id) => {
    await dispatch(deleteEnquiry(id));
    await dispatch(getEnquiries());
    setOpen(false);
  };

  return (
    <div>
      <h3 className="mb-4 title">Enquiries</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => handleDeleteEnq(enquiryId)}
        title="Are you sure you want to delete this enquiry?"
      />
    </div>
  );
};

export default Enquiries;
