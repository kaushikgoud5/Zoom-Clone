import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {
  private URL="http://localhost:8000";
  constructor(private http:HttpClient) { }
  createMeeting(data){
   return this.http.post(`${this.URL}/create-meeting`,data);
  }
  getMeetingDetails(){
    return this.http.get(`${this.URL}/upcoming`);
  }
  getPreviousMeetingDetails(){
    return this.http.get(`${this.URL}/previous`);
  }

}
