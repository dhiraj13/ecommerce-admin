import api from "../../api/api";

const getProductCategories = async () => {
  return api.get("product-category").then((res) => res.data);
};

const createCategory = async (category) => {
  return api.post("product-category", category).then((res) => res.data);
};

const updateProductCategory = async (category) => {
  return api
    .put(`product-category/${category.id}`, category)
    .then((res) => res.data);
};

const getProductCategory = async (id) => {
  return api.get(`product-category/${id}`).then((res) => res.data);
};

const deleteProductCategory = async (id) => {
  return api.delete(`product-category/${id}`).then((res) => res.data);
};

const pcategoryService = {
  getProductCategories,
  createCategory,
  updateProductCategory,
  getProductCategory,
  deleteProductCategory,
};

export default pcategoryService;
