import { CommonModule } from '@angular/common';
import { Component, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  taskForm: FormGroup;
  baseUrl = 'https://yoom.com/join';
  @Input() isModalActive: boolean ;
  ngOnInit(){
    this.taskForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }
  onClickClose(){
    this.isModalActive=false;
  }
  onClickContinue(){
    this.generateLink();
  }
  generateLink(){
    const unqId=uuidv4();
    const meetingLink=`${this.baseUrl}/${unqId}`;
  }
}
