import axios from 'axios';

const API_DOMAIN = 'http://localhost:3000/';

const axiosInstance = axios.create({
  baseURL: API_DOMAIN,
  timeout: 10000, // 10 giây
  headers: {
    'Content-Type': 'application/json',
  },
});

export const get = async (path) => {
  const response = await axiosInstance.get(path);
  return response.data;
};

export const post = async (path,data) => {
  const response = await axiosInstance.post(path, data);
  return response.data;
};

export const postFormData = async (path, formData) => {
  const response = await axios.post(API_DOMAIN + path, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const patch = async (path) => {
  console.log(path);
  
  const response = await axiosInstance.patch(path);
  return response.data;
};
