import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { UpcomingComponent } from './components/upcoming/upcoming.component';
import { PreviousComponent } from './components/previous/previous.component';
import { PersonalRoomComponent } from './components/personal-room/personal-room.component';
import { RecordingsComponent } from './components/recordings/recordings.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'dashboard',
        component:DashboardComponent
      },
      {
        path: 'upcoming',
        component: UpcomingComponent,
      },
      {
        path: 'previous',
        component: PreviousComponent,
      },
      {
        path: 'personal-room',
        component: PersonalRoomComponent,
      },
      {
        path: 'recordings',
        component: RecordingsComponent,
      },
    ],
  },
];
