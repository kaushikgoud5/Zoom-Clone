import { Component } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  meetingDetails:any=[];
  showFewOnly:boolean;
constructor(private sharedService:SharedService,private toastr:ToastrService,private route:Router){

}
ngOnInit(){
  this.sharedService.data$.subscribe((data)=>{
    this.meetingDetails=data;
  })
  this.sharedService.showFewOnly$.subscribe((data)=>{
    this.showFewOnly= data;
  })
}
copyInvitation(link){
  if(navigator.clipboard){
    navigator.clipboard.writeText(link).then(()=>{
      this.toastr.info("Copied to clipboard")
    })
  }
}
startMeeting(data){
  console.log(data);
  window.open(data.meetingLink, '_blank');
  this.route.navigate([`${data.meetingLink}`]);
}
}
