import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000/api/products";

export const getProducts = () => axios.get(BASE_URL);

export const deleteProductAPI = (id: string) =>
  axios.delete(`${BASE_URL}/${id}`);
