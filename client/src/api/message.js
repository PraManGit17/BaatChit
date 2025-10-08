import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const usersList = async () => {
  try {
    const { data } = await API.get("/users");
    return data;
  } catch (error) {
    console.error(error);
    throw error.response?.data || { message: "Fetch users failed" };
  }
};