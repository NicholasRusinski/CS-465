import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { TripListingComponent } from '../trip-listing/trip-listing.component';

@Component({
selector: 'app-navbar',
standalone: true,
imports: [CommonModule, RouterLink],
templateUrl: './navbar.component.html',
styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

constructor(
 private authenticationService: AuthenticationService
) { }

ngOnInit() { }

public isLoggedIn(): boolean {
 return this.authenticationService.isLoggedIn();
 }

public onLogout(): void {
 return this.authenticationService.logout();
 }


} 

