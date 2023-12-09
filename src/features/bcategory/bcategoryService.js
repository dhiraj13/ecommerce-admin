import api from "../../api/api";

const getBlogCategories = async () => {
  return api.get("blog-category").then((res) => res.data);
};

const createBlogCategory = async (bcat) => {
  return api.post("blog-category", bcat).then((res) => res.data);
};

const bcategoryService = {
  getBlogCategories,
  createBlogCategory,
};

export default bcategoryService;
