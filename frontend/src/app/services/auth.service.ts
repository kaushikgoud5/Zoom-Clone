import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL=environment.BASE_API_URL;
  constructor(private http:HttpClient) { }
  login(data){
    return this.http.post(`${this.URL}/login`,data);
  }
  signUp(data){
   return this.http.post(`${this.URL}/signup`,data);
  }
}
