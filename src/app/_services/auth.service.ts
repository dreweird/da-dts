import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';

import { Credentials, User } from '../_models/user';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  private BASE_URL = 'http://172.16.130.10:4001';

  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private snackBar: MatSnackBar,) {
  }

  verify(){
    const url = `${this.BASE_URL}/verify`;
    var token = localStorage.getItem('token');
    return this.http.post<any>(url, {token} );
  }

  login({ username, password }: Credentials): Observable<User> {
    const url = `${this.BASE_URL}/login`;
    try {
      return this.http.post<User>(url, { username, password }).pipe(
        map(user => {
          if (user && user.token) {
            localStorage.setItem('currentUser', JSON.stringify(user));
          }
          else{
            this.snackBar.open('Please retry your request with correct credentials', 'Please try again', {duration: 3000,});
          }
          return user;
        })
      );
    } catch (error) {
        return null;
    }
    
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    return of(true);
  }
}
