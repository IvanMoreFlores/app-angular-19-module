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
}
