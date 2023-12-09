import api from "@api/api";

const getCoupons = async () => {
  return api.get("coupon").then((res) => res.data);
};

const createCoupon = async (coupon) => {
  return api.post("coupon", coupon).then((res) => res.data);
};

const updateCoupon = async (coupon) => {
  return api.put(`coupon/${coupon.id}`, coupon).then((res) => res.data);
};

const getCoupon = async (id) => {
  return api.get(`coupon/${id}`).then((res) => res.data);
};

const deleteCoupon = async (id) => {
  return api.delete(`coupon/${id}`).then((res) => res.data);
};

const couponService = {
  getCoupons,
  createCoupon,
  updateCoupon,
  getCoupon,
  deleteCoupon,
};

export default couponService;
