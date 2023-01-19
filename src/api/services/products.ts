import type { PaginatedAPIResponse, APIResponse } from 'api/api';
import api from 'api/api';

export interface Product {
  pantone_value: string;
  color: string;
  name: string;
  year: number;
  id: number;
}

export const getProducts = async (
  page: number,
  perPage: number
): Promise<APIResponse<PaginatedAPIResponse<Product[]>>> => {
  return await api.get(`/products?page=${page}&per_page=${perPage}`);
};

export const searchProduct = async (query: string): Promise<APIResponse<{ data: Product }>> => {
  return await api.get(`/products?id=${query}`);
};
