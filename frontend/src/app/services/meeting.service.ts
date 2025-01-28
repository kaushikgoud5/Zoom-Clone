import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {
  private URL=environment.BASE_API_URL;
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
