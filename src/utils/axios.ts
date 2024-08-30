import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://jp-dev.cityremit.global/web-api/config/v1/",
});

export default axiosClient;
