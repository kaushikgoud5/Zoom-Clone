import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';

@Component({
  selector: 'app-personal-room',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './personal-room.component.html',
  styleUrl: './personal-room.component.scss'
})
export class PersonalRoomComponent {

}
