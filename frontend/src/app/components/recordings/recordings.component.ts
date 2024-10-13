import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { RecordingCardComponent } from './recording-card/recording-card.component';

@Component({
  selector: 'app-recordings',
  standalone: true,
  imports: [HeaderComponent,RecordingCardComponent],
  templateUrl: './recordings.component.html',
  styleUrl: './recordings.component.scss'
})
export class RecordingsComponent {

}
