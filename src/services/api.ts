import axios from 'axios';

const baseApiURl = 'http://localhost:3333';

export const api = axios.create({
  baseURL: baseApiURl,
});

export const adminApi = axios.create({
  baseURL: baseApiURl,
});
