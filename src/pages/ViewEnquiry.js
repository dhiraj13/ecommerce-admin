import {
  getEnquiry,
  resetEnquiryState,
  updateEnquiry,
} from "@features/enquiry/enquirySlice";
import React, { useEffect } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { If, Then } from "react-if";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const ViewEnquiry = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const newEnquiry = useSelector((state) => state.enquiry);
  const { enquiry } = newEnquiry;
  console.log(enquiry, id);

  useEffect(() => {
    if (id) {
      dispatch(getEnquiry(id));
    }
  }, [id, dispatch]);

  const setEnquiryStatus = async (e, i) => {
    const data = { id: i, enquiryStatus: e };
    await dispatch(updateEnquiry(data));
    await dispatch(resetEnquiryState());
    await dispatch(getEnquiry(id));
  };

  return (
    <div>
      <button
        className="bg-transparent border-0 fs-6 mb-2 d-flex align-items-center gap-1"
        onClick={() => navigate("/admin/enquiries")}
      >
        <IoMdArrowBack size={28} /> Go Back
      </button>
      <h3 className="mb-4 title">View Enquiry</h3>
      <If condition={enquiry}>
        <Then>
          <div className="md-5 bg-white p-4 rounded-3">
            <div className="d-flex align-items-center gap-3">
              <h5 className="mb-0">Name:</h5>
              <p className="mb-0">{enquiry?.name}</p>
            </div>
            <div className="d-flex align-items-center gap-3">
              <h5 className="mb-0">Mobile:</h5>
              <p className="mb-0">
                <a href={`tel:+91${enquiry?.mobile}`}>{enquiry?.mobile}</a>
              </p>
            </div>
            <div className="d-flex align-items-center gap-3">
              <h5 className="mb-0">Email:</h5>
              <p className="mb-0">
                <a href={`mailto:${enquiry?.email}`}>{enquiry?.email}</a>
              </p>
            </div>
            <div className="d-flex align-items-center gap-3">
              <h5 className="mb-0">Comment:</h5>
              <p className="mb-0">{enquiry?.comment}</p>
            </div>
            <div className="d-flex align-items-center gap-3">
              <h5 className="mb-0">Status:</h5>
              <p className="mb-0">{enquiry?.status}</p>
            </div>
            <div className="d-flex align-items-center gap-3">
              <h5 className="mb-0">Change Status:</h5>
              <div>
                <select
                  name=""
                  defaultValue={enquiry?.status ?? "Submitted"}
                  className="form-control form-select"
                  id=""
                  onChange={(e) => setEnquiryStatus(e.target.value, id)}
                >
                  <option value="Submitted">Submitted</option>
                  <option value="Contacted">Contacted</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
            </div>
          </div>
        </Then>
      </If>
    </div>
  );
};

export default ViewEnquiry;
