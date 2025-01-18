import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { io } from 'socket.io-client';
import Peer from 'peerjs';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RoomSidebarComponent } from '../room-sidebar/room-sidebar.component';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  imports:[RoomSidebarComponent],
  standalone:true,
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
  roomId: string = ''; // Room ID from the URL
  myPeer: Peer; // PeerJS instance
  socket: any; // Socket.IO instance
  myVideo: HTMLVideoElement | null = null; // Local video element
  peers: { [userId: string]: any } = {}; // Map to track active peers

  constructor(private route: ActivatedRoute) {
    this.myPeer = new Peer(); // Initialize PeerJS
  }

  ngOnInit(): void {
    this.roomId = this.route.snapshot.params['id']; // Extract room ID from URL
    this.socket = io('http://localhost:8000'); // Connect to backend server

    this.initializeLocalVideo();

    // PeerJS: Handle opening of peer connection
    this.myPeer.on('open', (id: string) => {
      console.log('Peer connection established. Peer ID:', id);
      this.socket.emit('joinRoom', this.roomId, id); // Notify server about joining the room
    });

    // Handle incoming call
    this.myPeer.on('call', (call) => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          call.answer(stream); // Answer the call with local stream
          call.on('stream', (userVideoStream) => {
            this.addVideoStream(userVideoStream, call.peer); // Add remote user's stream
          });
        })
        .catch((error) => console.error('Error handling incoming call:', error));
    });

    // Socket.IO: Handle new user connection
    this.socket.on('user-connected', (userId: string) => {
      console.log('New user connected:', userId);
      this.connectToNewUser(userId);
    });

    // Socket.IO: Handle user disconnection
    this.socket.on('user-disconnected', (userId: string) => {
      console.log('User disconnected:', userId);
      if (this.peers[userId]) {
        this.peers[userId].close(); // Close the peer connection
        delete this.peers[userId]; // Remove from peers map
      }
      this.removeVideoStream(userId); // Remove their video stream
    });
  }

  // Initialize and display local video
  private initializeLocalVideo(): void {
    this.myVideo = document.createElement('video');
    this.myVideo.muted = true; // Mute local video
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        this.addVideoStream(stream, 'me'); // Add local video to the grid
      })
      .catch((error) => console.error('Error accessing local video:', error));
  }

  // Add a video stream to the grid
  private addVideoStream(stream: MediaStream, userId: string = ''): void {
    // Check if a video element for this user already exists
    const existingVideo = document.querySelector(`[data-user-id="${userId}"]`);
    if (existingVideo) {
      console.warn(`Video element for user ${userId} already exists.`);
      return;
    }

    const video = document.createElement('video');
    video.setAttribute('data-user-id', userId); // Tag video with user ID
    video.srcObject = stream; // Set stream as video source
    video.muted = userId === 'me';
    video.classList.add('img-fluid', 'rounded', 'shadow-sm');
    video.addEventListener('loadedmetadata', () => video.play());

    const videoWrapper = document.createElement('div');
    videoWrapper.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-lg-3'); // Dynamic sizing
    videoWrapper.appendChild(video);
    const videoGrid = document.getElementById('video-grid');
    if (videoGrid) {
      videoGrid.appendChild(videoWrapper);
      this.updateVideoGrid(); // Add video to the grid
    } else {
      console.error('Video grid element not found.');
    }
  }

  // Remove a video stream from the grid
  private removeVideoStream(userId: string): void {
    const videoElement = document.querySelector(`[data-user-id="${userId}"]`);
    if (videoElement) {
      videoElement.remove();
      this.updateVideoGrid();
    }
  }

  private updateVideoGrid(): void {
    const videoGrid = document.getElementById('video-grid');
    if (!videoGrid) return;
  
    const videos = videoGrid.querySelectorAll('video');
    const videoCount = videos.length;
    // Adjust video sizes based on the number of participants
    let widthPercentage;
    if (videoCount === 1) {
      widthPercentage = '100%';
    } else if (videoCount === 2) {
      widthPercentage = '50%';
    } else if (videoCount <= 4) {
      widthPercentage = '50%';
    } else if (videoCount <= 9) {
      widthPercentage = '33.33%';
    } else {
      widthPercentage = '25%'; // For more than 9 participants
    }
  
    videos.forEach((video) => {
      (video as HTMLElement).style.flex = `1 1 ${widthPercentage}`;
    });
  }
  // Connect to a new user in the room
  private connectToNewUser(userId: string): void {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        const call = this.myPeer.call(userId, stream); // Call the new user
        call.on('stream', (userVideoStream) => {
          this.addVideoStream(userVideoStream, userId); // Add their video stream
        });
        this.peers[userId] = call; // Track the connection
      })
      .catch((error) => console.error('Error connecting to new user:', error));
  }
}
