import axios from "axios";

const list = () => axios.get("/attempts");
const create = payload => axios.post("/attempts/", payload);
const update = ({ slug, payload }) => axios.put(`/attempts/${slug}`, payload);

const attemptsApi = {
  list,
  create,
  update,
};

export default attemptsApi;
