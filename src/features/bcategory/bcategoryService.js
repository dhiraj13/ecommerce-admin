import api from "@api/api";

const getBlogCategories = async () => {
  return api.get("blog-category").then((res) => res.data);
};

const createBlogCategory = async (bcat) => {
  return api.post("blog-category", bcat).then((res) => res.data);
};

const updateBlogCategory = async (bcat) => {
  return api.put(`blog-category/${bcat.id}`, bcat).then((res) => res.data);
};

const getBlogCategory = async (id) => {
  return api.get(`blog-category/${id}`).then((res) => res.data);
};

const deleteBlogCategory = async (id) => {
  return api.delete(`blog-category/${id}`).then((res) => res.data);
};

const bcategoryService = {
  getBlogCategories,
  createBlogCategory,
  updateBlogCategory,
  getBlogCategory,
  deleteBlogCategory,
};

export default bcategoryService;
