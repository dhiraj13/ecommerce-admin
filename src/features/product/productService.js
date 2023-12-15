import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/base_url";
import api from "@api/api";

const getProducts = async () => {
  return api.get("product").then((res) => res.data);
};

const createProduct = async (product) => {
  return api.post("product", product).then((res) => res.data);
};

const updateProduct = async (product) => {
  return api.put(`product/${product.id}`, product).then((res) => res.data);
};

const getProduct = async (id) => {
  return api.get(`product/${id}`).then((res) => res.data);
};

const deleteProduct = async (id) => {
  return api.delete(`product/${id}`).then((res) => res.data);
};

const productService = {
  getProducts,
  createProduct,
  updateProduct,
  getProduct,
  deleteProduct,
};

export default productService;
