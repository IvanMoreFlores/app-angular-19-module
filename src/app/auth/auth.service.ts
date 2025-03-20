import axios from 'axios';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class AuthService {
    private apiUrl = 'https://dummyjson.com'

    async login(username: string, password: string) {
        const response = await axios.post(`${this.apiUrl}/auth/login`, { username, password });
        localStorage.setItem('token', response.data.token);
        return response.data;
    }
}