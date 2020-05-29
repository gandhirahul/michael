import axios from "axios";

import config from "../../config";

axios.interceptors.request.use(request => {
  request.baseURL = config.api;
  return request;
});
