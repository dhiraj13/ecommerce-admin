import api from "@api/api"

const login = (userData) => {
  return api.post("user/admin-login", userData).then((res) => res.data)
}

const logout = () => {
  return localStorage.removeItem("user")
}

const getOrders = () => {
  return api.get("user/get-all-orders").then((res) => res.data)
}

const getOrder = (id) => {
  return api.get(`user/get-order-by-user-id/${id}`).then((res) => res.data)
}

const getMonthlyOrders = () => {
  return api.get(`user/get-month-wise-order-income`).then((res) => res.data)
}

const getYearlyStats = () => {
  return api.get(`user/get-yearly-total-orders`).then((res) => res.data)
}

const authService = {
  login,
  logout,
  getOrders,
  getOrder,
  getMonthlyOrders,
  getYearlyStats,
}

export default authService
