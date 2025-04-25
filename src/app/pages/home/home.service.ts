import axios from 'axios';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private apiUrl = 'https://dummyjson.com';

  async getProducts() {
    const response = await axios.get(`${this.apiUrl}/products`);
    return response;
  }

  async getProductId(productId: number) {
    const response = await axios.get(`${this.apiUrl}/products/${productId}`);
    return response.data;
  }
  async getSearchProduct(word: string) {
    const response = await axios.get(
      `${this.apiUrl}/products/search?q=${word}`
    );
    return response.data;
  }

  async getCategories() {
    const response = await axios.get(`${this.apiUrl}/products/categories`);
    return response.data;
  }

  async getSearchProductByCategories(categories: string) {
    const response = await axios.get(
      `${this.apiUrl}/products/category/${categories}`
    );
    return response.data;
  }

  async postProduct(newProduct: any) {
    const response = await axios.post(
      `${this.apiUrl}/products/add`,
      newProduct
    );
    return response.data;
  }

  async putProduct(productId: number, newProduct: any) {
    const response = await axios.put(
      `${this.apiUrl}/products/${productId}`,
      newProduct
    );
    return response.data;
  }

  async deleteProduct(productId: number) {
    const response = await axios.delete(
      `${this.apiUrl}/products/${productId}`
    );
    return response.data;
  }
}
