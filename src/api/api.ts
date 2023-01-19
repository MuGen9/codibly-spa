import axios from 'axios';

export interface APIResponse<T> {
  data: T;
}

export interface PaginatedAPIResponse<T> {
  total_pages: number;
  per_page: number;
  total: number;
  page: number;
  data: T;
}

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

export default api;
