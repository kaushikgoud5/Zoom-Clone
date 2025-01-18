import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { CardComponent } from '../shared/card/card.component';
import { MeetingService } from '../../services/meeting.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-upcoming',
  standalone: true,
  imports: [HeaderComponent,CardComponent],
  templateUrl: './upcoming.component.html',
  styleUrl: './upcoming.component.scss'
})
export class UpcomingComponent {
  constructor(private meetingService:MeetingService, private sharedService:SharedService){ }
  meetingDetails:any=[];
  ngOnInit(){
    this.meetingService.getMeetingDetails().subscribe((data)=>{
      this.meetingDetails=data;
      this.sharedService.updateData(this.meetingDetails);
      this.sharedService.emitShowFewOnly(false);
    })
  }
}
