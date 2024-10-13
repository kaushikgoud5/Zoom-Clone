import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { CardComponent } from '../shared/card/card.component';

@Component({
  selector: 'app-upcoming',
  standalone: true,
  imports: [HeaderComponent,CardComponent],
  templateUrl: './upcoming.component.html',
  styleUrl: './upcoming.component.scss'
})
export class UpcomingComponent {

}
