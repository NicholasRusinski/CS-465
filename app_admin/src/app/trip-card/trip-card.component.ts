import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent {

  @Input('trip') trip: any;

  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  public editTrip(trip: Trip): void {
    if (trip && trip.code) {
      localStorage.setItem('tripCode', trip.code);
      this.router.navigate(['edit-trip']);
    }
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
}
