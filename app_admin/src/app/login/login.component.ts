import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service.js';
import { User } from '../models/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthResponse } from '../models/authresponse.js';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  public formError: string = '';
  public credentials = {
    name: '',
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {}

  public onLoginSubmit(): void {
    this.formError = ''; 
    if (!this.credentials.email || !this.credentials.password) {
      this.formError = 'All fields are required, please try again';
    } else {
      this.doLogin(); 
    }
  }
  
  private doLogin(): void {
    this.authenticationService.login(this.credentials)
      .subscribe({
        next: (authResp: AuthResponse) => {
          this.authenticationService.saveToken(authResp.token);
          this.router.navigateByUrl('#');  
        },
        error: (message) => {
          this.formError = message;  
        }
      });
  } 
};
