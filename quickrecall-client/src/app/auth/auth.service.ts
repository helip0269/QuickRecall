import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 register(data: any) {
  return this.http.post('http://localhost:5000/api/auth/register', data);
}
  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }) {
    return this.http.post<{ token: string }>('http://localhost:5000/api/auth/login', credentials);
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
