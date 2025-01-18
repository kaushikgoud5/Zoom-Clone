import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { MeetingService } from '../../../services/meeting.service';
import { Toast, ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  taskForm: FormGroup;
  baseUrl = 'http://localhost:4200/join';
  @Input() isModalActive: boolean ;
  @Output() dataChange = new EventEmitter<boolean>();
  @Output() dataChangeForMeetings = new EventEmitter<any>();
  constructor(private meetingService:MeetingService,private toastr:ToastrService){}
  ngOnInit(){
    this.taskForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
    });
  }
  onClickClose(){
    this.isModalActive=false;
    this.dataChange.emit(this.isModalActive);
  }
  createMeeting(){
    this.generateLink();
    this.dataChangeForMeetings.emit(true);
    this.isModalActive=false;
  }
  generateLink(){
    const unqId=uuidv4();
    const meetingLink=`${this.baseUrl}/${unqId}`;
    const data ={
      meetingLink:meetingLink,
      title:this.taskForm.value['title'],
      description:this.taskForm.value['description'],
      time:this.taskForm.value['time'],
    }
    this.meetingService.createMeeting(data).subscribe({
      next:(data)=>{
        this.toastr.success("Successfully Created Meeting🤝");
      },
      error:(err)=>{
        this.toastr.error("Something went wrong")
      }
    })
   }
}
