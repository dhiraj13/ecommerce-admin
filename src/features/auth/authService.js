import api from "../../api/api";

const login = async (userData) => {
  return api.post("user/admin-login", userData).then((res) => {
    localStorage.setItem("user", JSON.stringify(res.data));
    return res.data;
  });
};

const logout = () => {
  return localStorage.removeItem("user");
};

const getOrders = async () => {
  return api.get("user/get-all-orders").then((res) => res.data);
};

const authService = {
  login,
  logout,
  getOrders,
};

export default authService;
