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
  return api.get(`user/get-order/${id}`).then((res) => res.data)
}

const udpateOrder = (data) => {
  return api
    .put(`user/update-order/${data?.id}`, { status: data?.status })
    .then((res) => res.data)
}

const getMonthlyOrders = () => {
  return api.get(`user/get-month-wise-order-income`).then((res) => res.data)
}

const getYearlyStats = () => {
  return api.get(`user/get-yearly-total-orders`).then((res) => res.data)
}

const deleteOrder = (id) => {
  return api.delete(`user/order/${id}`).then((res) => res.data)
}

const authService = {
  login,
  logout,
  getOrders,
  getOrder,
  udpateOrder,
  getMonthlyOrders,
  getYearlyStats,
  deleteOrder,
}

export default authService
