import api from "@api/api";

const getBlogs = async () => {
  return api.get("blog").then((res) => res.data);
};

const createBlog = async (blog) => {
  return api.post("blog", blog).then((res) => res.data);
};

const updateBlog = async (blog) => {
  return api.put(`blog/${blog.id}`, blog).then((res) => res.data);
};

const getBlog = async (id) => {
  return api.get(`blog/${id}`).then((res) => res.data);
};

const deleteBlog = async (id) => {
  return api.delete(`blog/${id}`).then((res) => res.data);
};

const blogService = {
  getBlogs,
  createBlog,
  updateBlog,
  getBlog,
  deleteBlog,
};

export default blogService;
