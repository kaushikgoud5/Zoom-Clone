import { Component } from '@angular/core';
import { CardComponent } from '../shared/card/card.component';
import { HeaderComponent } from '../shared/header/header.component';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardComponent,HeaderComponent,ModalComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  isModalActive:boolean=false;
  onClickNewMeeting(){
    this.isModalActive=!this.isModalActive;
  }
}
