import axios from "axios";

const BASE_URL = "http://localhost:4528";
// const BASE_URL = "";

export const addUser = async (data) => {
  try {
    let res = await axios.post(`${BASE_URL}/`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    let res = await axios.get(`${BASE_URL}/`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    let res = await axios.get(`${BASE_URL}/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    let res = await axios.delete(`${BASE_URL}/${id}`);
    return res;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (id, data) => {
  try {
    let res = await axios.put(`${BASE_URL}/${id}`, data);
    return res;
  } catch (error) {
    throw error;
  }
};
