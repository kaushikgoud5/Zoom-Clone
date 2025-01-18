import { Component } from '@angular/core';
import { CardComponent } from '../shared/card/card.component';
import { HeaderComponent } from '../shared/header/header.component';
import { ModalComponent } from './modal/modal.component';
import { MeetingService } from '../../services/meeting.service';
import { SharedService } from '../../services/shared.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardComponent,HeaderComponent,ModalComponent,CardComponent,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  isModalActive:boolean=false;
  currentTime: string = '';
  period: string = '';
  currentDate: string = '';
  upcomingMeetingTime:string = '';
  constructor(private meetingService :MeetingService,private sharedService:SharedService){}
  onClickNewMeeting(){
    this.isModalActive=!this.isModalActive;
  }
  updateModalStatus(event){
    this.isModalActive=event
  }
  updateMeetings(data){
    if (data) {
      this.getMeetingDetails();
    }
 }
  ngOnInit(){
    this.updateTime();
    setInterval(() => {
      this.updateTime();
    }, 1000);
    this.getMeetingDetails();
    this.sharedService.emitShowFewOnly(true);
  }
  updateTime(): void {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    this.period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12; 
    this.currentTime = `${displayHours}:${formattedMinutes}`;

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const dayName = days[now.getDay()];
    const monthName = months[now.getMonth()];
    const day = now.getDate();
    const year = now.getFullYear();

    this.currentDate = `${dayName}, ${day} ${monthName} ${year}`;
  }
  getMeetingDetails(){
    this.meetingService.getMeetingDetails().subscribe((data)=>{
      this.sharedService.updateData(data);
      this.upcomingMeetingTime=data[0].time
    })
  }
}
