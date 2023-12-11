import api from "@api/api";

const getEnquiries = () => {
  return api.get("enquiry").then((res) => res.data);
};

const updateEnquiry = async (enquiry) => {
  return api
    .put(`enquiry/${enquiry.id}`, { status: enquiry.enquiryStatus })
    .then((res) => res.data);
};

const getEnquiry = (id) => {
  return api.get(`enquiry/${id}`).then((res) => res.data);
};

const deleteEnquiry = (id) => {
  return api.delete(`enquiry/${id}`).then((res) => res.data);
};

const enquiryService = {
  getEnquiries,
  updateEnquiry,
  getEnquiry,
  deleteEnquiry,
};

export default enquiryService;
