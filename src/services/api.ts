import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://159.223.179.117:3333',
});
