import axios from 'axios';

const baseURL = process.env.API_URL;

export const api = axios.create({
  baseURL,
});

export const adminApi = axios.create({
  baseURL,
});
