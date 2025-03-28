import axios from 'axios';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class AuthService {
    private apiUrl = 'https://dummyjson.com'

    async login(username: string, password: string) {
        const response = await axios.post(`${this.apiUrl}/auth/login`, { username, password });
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('firstName', response.data.firstName);
        localStorage.setItem('lastName', response.data.lastName);
        localStorage.setItem('email', response.data.email);
        return response;
    }
}