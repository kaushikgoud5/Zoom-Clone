import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-room-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './room-sidebar.component.html',
  styleUrl: './room-sidebar.component.scss'
})
export class RoomSidebarComponent {
  participants: { name: string }[] = [
    { name: 'John Doe' },
    { name: 'Jane Smith' },
    { name: 'Alice Johnson' },
    { name: 'Bob Brown' }
  ];

  constructor() { }

  ngOnInit(): void {
  }
  toggleSideNav(){
    document.getElementById("sidebar-body").classList.toggle("d-none");
    document.getElementById("sidebar-footer").classList.toggle("d-none");
    document.getElementById("room-sidebar")?.classList.toggle("w-10");
    document.getElementById("header")?.classList.toggle("d-none");

  }
  onCreateMeeting(): void {
    console.log('Meeting created!');
    // Add functionality to create a meeting (e.g., generate a link)
  }
}
