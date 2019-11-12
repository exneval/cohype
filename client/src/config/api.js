import axios from 'axios';
import {BASE_URL} from 'react-native-dotenv';

export const API = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const setHeaderAuth = token => {
  API.defaults.headers.common['Authorization'] = 'Bearer ' + token;
};
