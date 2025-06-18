import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Destinations } from './pages/destinations/destinations';
import { TripDetails } from './pages/trip-details/trip-details';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'destinations', component: Destinations },
  { path: 'trip/:id', component: TripDetails },
  { path: '**', redirectTo: '' }
];
