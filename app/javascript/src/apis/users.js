import axios from "axios";

const list = () => axios.get("/users");
const create = payload => axios.post("/users/", payload);

const usersApi = {
  list,
  create,
};

export default usersApi;
