import axios from "axios";
// Default config for the axios instance
const axiosParams = {
  // Set different base URL based on the environment
  baseURL: "http://localhost:5000/api/",
};

// Create axios instance with default params
const axiosInstance = axios.create(axiosParams);

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers = config.headers ?? {};
    const user = localStorage.getItem("user");
    const userObject = JSON.parse(user);
    const token = userObject ? userObject.token : "";
    const auth = token ? `Bearer ${token}` : "";
    config.headers.Authorization = auth;
    return config;
  },
  (error) => Promise.reject(error)
);

export const didAbort = (error) => axios.isCancel(error);

const getCancelSource = () => axios.CancelToken.source();

export const isApiError = (error) => {
  return axios.isAxiosError(error);
};

const withAbort = (fn) => {
  const executor = async (...args) => {
    const originalConfig = args[args.length - 1];
    // Extract abort property from the config
    const { abort, ...config } = originalConfig;

    // Create cancel token and abort method only if abort
    // function was passed
    if (typeof abort === "function") {
      const { cancel, token } = getCancelSource();
      config.cancelToken = token;
      abort(cancel);
    }

    try {
      if (args.length > 2) {
        const [url, body] = args;
        return await fn(url, body, config);
      } else {
        const [url] = args;
        return await fn(url, config);
      }
    } catch (error) {
      // Add "aborted" property to the error if the request was cancelled
      if (didAbort(error)) {
        error.aborted = true;
      }

      throw error.response.data.message;
    }
  };

  return executor;
};

// Main api function
const api = (axios) => {
  return {
    get: (url, config = {}) => withAbort(axios.get)(url, config),
    delete: (url, config = {}) => withAbort(axios.delete)(url, config),
    post: (url, body, config = {}) => withAbort(axios.post)(url, body, config),
    patch: (url, body, config = {}) =>
      withAbort(axios.patch)(url, body, config),
    put: (url, body, config = {}) => withAbort(axios.put)(url, body, config),
  };
};
export default api(axiosInstance);
