import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Trip } from '../models/trip';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { BROWSER_STORAGE } from '../storage';

@Injectable({
  providedIn: 'root'
})

export class TripDataService {

  private url = 'http://localhost:3000/api/trips';
  private baseurl = 'http://localhost:3000/api';

  constructor(private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage) {}

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.url).pipe(catchError(this.handleError));
  }

  addTrip(formData: Trip): Observable<Trip[]> {
    return this.http.post<Trip[]>(this.url, formData).pipe(catchError(this.handleError));
  }

  getTrip(tripCode: string): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.url}/${tripCode}`).pipe(catchError(this.handleError));
  }

  updateTrip(formData: Trip): Observable<Trip[]> {
    return this.http.put<Trip[]>(`${this.url}/${formData.code}`, formData).pipe(catchError(this.handleError));
  }

  public login(user: User): Observable<AuthResponse> {
    return this.makeAuthApiCall('login', user);
  }

  public register(user: User): Observable<AuthResponse> {
    return this.makeAuthApiCall('register', user);
  }

  deleteTrip(tripCode: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${tripCode}`).pipe(catchError(this.handleError));
  }

  private makeAuthApiCall(urlPath: string, user: User): Observable<AuthResponse> {
    const url: string = `${this.baseurl}/${urlPath}`;
    return this.http
      .post<AuthResponse>(url, user)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Server returned code: ${error.status}, message: ${error.message}`;
    }
    console.error(errorMessage); 
    return throwError(() => new Error(errorMessage)); 
  }
}

