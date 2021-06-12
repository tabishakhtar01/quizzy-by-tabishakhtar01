import axios from "axios";

const list = () => axios.get(`/options`);

const optionsApi = {
  list,
};

export default optionsApi;
