import { Component } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private sharesService:SharedService,private router:ActivatedRoute){}
  onClickSeeAll(){
    this.sharesService.emitShowFewOnly(false);
  }
  route;
  ngOnInit(){
    this.route = this.router.snapshot.url[0].path
  }
}
