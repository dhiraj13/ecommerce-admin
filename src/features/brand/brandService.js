import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/base_url";
import api from "../../api/api";

const getBrands = async () => {
  return api.get("brand").then((res) => res.data);
};

const createBrand = async (brand) => {
  return api.post("brand", brand).then((res) => res.data);
};

const updateBrand = async (brand) => {
  return api.put(`brand/${brand.id}`, brand).then((res) => res.data);
};

const getBrand = async (id) => {
  return api.get(`brand/${id}`).then((res) => res.data);
};

const deleteBrand = async (id) => {
  return api.delete(`brand/${id}`).then((res) => res.data);
};

const brandService = {
  getBrands,
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand,
};

export default brandService;
