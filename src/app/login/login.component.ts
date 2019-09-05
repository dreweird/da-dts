import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/index.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isAuthenticating = false;
  loginForm: FormGroup;

  constructor(private router: Router, 
    private authService: AuthService, private fb: FormBuilder,  private snackBar: MatSnackBar,) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ]),
    });
   }

  ngOnInit() {
    this.authService.verify().subscribe(data => {
      if(data){
        this.router.navigate(['/home', 'main']);
      }else{
        if(localStorage.getItem("token")!=undefined) 
        this.snackBar.open('Invalid token', 'Please login', {duration: 3000,});
      }
    });
  }
  login(){
    this.isAuthenticating = true;
    // Use the backend service to login
    this.authService.login(this.loginForm.value)
    .subscribe(data => {
            this.isAuthenticating = false;
            if(data.token!=undefined){
              console.log("logged in");
              localStorage.setItem('token', data.token);
              localStorage.setItem('currentUser', data.username);
              this.router.navigate(['/home', 'main']);
            }            
           
        });
   
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login', '']);
  }

}
