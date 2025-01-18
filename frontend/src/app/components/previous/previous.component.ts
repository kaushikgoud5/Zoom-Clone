import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { CardComponent } from '../shared/card/card.component';
import { MeetingService } from '../../services/meeting.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-previous',
  standalone: true,
  imports: [HeaderComponent,CardComponent],
  templateUrl: './previous.component.html',
  styleUrl: './previous.component.scss'
})
export class PreviousComponent {
  constructor(private meetingService:MeetingService, private sharedService:SharedService){ }
  meetingDetails:any=[];
  ngOnInit(){
    this.meetingService.getPreviousMeetingDetails().subscribe((data)=>{
      this.meetingDetails=data;
      this.sharedService.updateData(this.meetingDetails);
      this.sharedService.emitShowFewOnly(false);
    })
  }
}
