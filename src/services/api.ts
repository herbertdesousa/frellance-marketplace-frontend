import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://159.223.179.117:3333',
});
