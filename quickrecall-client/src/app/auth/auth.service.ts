import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = 'https://quickrecall-server.onrender.com'; 

  constructor(private http: HttpClient) {}

  register(data: any) {
    return this.http.post(`${this.API_URL}/register`, data);
  }

  login(credentials: { email: string; password: string }) {
    return this.http.post<{ token: string }>(`${this.API_URL}/login`, credentials);
  }

  saveToken(token: string) {
    localStorage.setItem('auth-token', token);
  }

  getToken() {
    return localStorage.getItem('auth-token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('auth-token');
  }
}
