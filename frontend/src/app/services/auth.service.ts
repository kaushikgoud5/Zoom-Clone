import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL="http://localhost:8000";
  constructor(private http:HttpClient) { }
  login(data){
    return this.http.post(`${this.URL}/login`,data);
  }
  signUp(data){
   return this.http.post(`${this.URL}/signup`,data);
  }
}
