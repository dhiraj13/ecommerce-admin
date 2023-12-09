import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/base_url";
import api from "../../api/api";

const login = async (userData) => {
  const response = await axios.post(`${base_url}user/admin-login`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  return localStorage.removeItem("user");
};

const getOrders = async () => {
  const response = await axios.get(`${base_url}user/get-all-orders`, config);

  return response.data;
};

const authService = {
  login,
  logout,
  getOrders,
};

export default authService;
