import axios from "axios";

const list = () => axios.get(`/options`);
const show = id => axios.get(`/options/${id}`);

const optionsApi = {
  list,
  show,
};

export default optionsApi;
