import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from '../shared/users';
import { AuthService } from '../shared/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  //declare variables
  loginForm!: FormGroup;
  isSubmitted = false;
  error = '';
  loginUser: any = new Users();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    //creates a reactive form model
    this.loginForm = this.formBuilder.group({
      //FormControlname Fields
      UserName: ['', [Validators.required]],
      Password: ['', [Validators.required]],
    });
    console.log(this.loginForm.value);
  }

  //get controls for validations
  get formControls() {
    return this.loginForm.controls;
  }

  //login verify
  loginCredentials() {
    this.isSubmitted = true;
    console.log('submitted for form validations');
    if (this.loginForm.invalid) {
      console.log('invalid form');
    }
    if (this.loginForm.valid) {
      console.log('valid form');
      //calling login method authservice for authentication and authorise
      this.authService.loginVerify(this.loginForm.value).subscribe(
        (data) => {
          console.log(data);
          console.log('data returned');
          this.loginUser = data;

          //username,rolid and token
          sessionStorage.setItem('userName', this.loginUser.UserName);
          sessionStorage.setItem('password', this.loginUser.UserPassword);
          sessionStorage.setItem('token', this.loginUser.token);

          //check the role based on roleid
          if (this.loginUser.UserName === 'sreehari') {
            console.log('User');
            localStorage.setItem('userName', this.loginUser.UserName);
            localStorage.setItem('password', this.loginUser.UserPassword);
            sessionStorage.setItem('userName', this.loginUser.UserName);
            this.router.navigateByUrl('/dashboard');
          } else if (this.loginUser.UserName === 'admin') {
            console.log('Admin');
            localStorage.setItem('userName', this.loginUser.UserName);
            localStorage.setItem('password', this.loginUser.UserPassword);
            sessionStorage.setItem('userName', this.loginUser.UserName);
            this.router.navigateByUrl('/admin');
          } else {
            this.error = 'Sorry not authorised to access this page';
          }
        },
        (error) => {
          this.error = 'Invalid Username or Password';
        }
      );
    }
  }
}
