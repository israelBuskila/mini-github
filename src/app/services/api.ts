import axios, { AxiosInstance } from "axios";

const API_URL = "https://api.github.com";

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Authorization': `Bearer ${GITHUB_TOKEN}`,
    'Accept': 'application/vnd.github.v3+json'
  }
});