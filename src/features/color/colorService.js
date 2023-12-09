import api from "@api/api";

const getColors = async () => {
  return api.get("color").then((res) => res.data);
};

const createColor = async (color) => {
  return api.post("color", color).then((res) => res.data);
};

const updateColor = async (color) => {
  return api.put(`color/${color.id}`, color).then((res) => res.data);
};

const getColor = async (id) => {
  return api.get(`color/${id}`).then((res) => res.data);
};

const deleteColor = async (id) => {
  return api.delete(`color/${id}`).then((res) => res.data);
};

const colorService = {
  getColors,
  createColor,
  updateColor,
  getColor,
  deleteColor,
};

export default colorService;
