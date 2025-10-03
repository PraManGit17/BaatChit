import axios, { formToJSON } from 'axios';


const API = axios.create({
  baseURL: "http://localhost:5000/api/auth"
});

export const signup = async (formData) => {
  try {
    const { data } = await API.post("/signup", formData);
    return data;
    
  } catch (error) {
    throw error.response?.data || { message: "Signup failed" };
  }
}


export const login = async (formData) => {
  try {
    const { data } = await API.post("/login", formData);
    return data;

  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
}

