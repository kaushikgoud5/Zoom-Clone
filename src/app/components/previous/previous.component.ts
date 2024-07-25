import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { CardComponent } from '../shared/card/card.component';

@Component({
  selector: 'app-previous',
  standalone: true,
  imports: [HeaderComponent,CardComponent],
  templateUrl: './previous.component.html',
  styleUrl: './previous.component.scss'
})
export class PreviousComponent {

}
