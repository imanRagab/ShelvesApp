import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../shared';


@Component({
  selector: 'app-auth-page',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  authType: String = '';
  title: String = '';
  error: string;
  isSubmitting = false;
  authForm: FormGroup;
  resetPasswordForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', Validators.required]
    });
    this.resetPasswordForm = this.fb.group({
      'email': ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    this.error = "";
    this.route.url.subscribe(data => {
      // Get the last piece of the URL (it's either 'login' or 'register')
      this.authType = data[data.length - 1].path;
      // Set a title for the page accordingly
      this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';
      // add form control for username if this is the register page
      if (this.authType === 'register') {
        this.authForm.addControl('password_confirmation', new FormControl('',Validators.required));
        this.authForm.addControl('name', new FormControl('',Validators.required));
        this.authForm.addControl('role', new FormControl('',Validators.required));
      }
    });
  }

  // submit login/register form
  submitForm() {
    this.isSubmitting = true;
    // this.errors = {errors: {}};
    const credentials = this.authForm.value;
    //console.log(credentials);
    this.userService
    .attemptAuth(this.authType, credentials)
    .subscribe(
      data => {
        if( data['status'] == 'FAIL' ) {
          this.error = data['message']
        }
        else {
          if( data['message'] ) {
           
            alert(data['message'])
          }
          //this.messagingService.savenotificationToken(,)
          this.router.navigateByUrl('/');
        }
    },
      err => {
        console.log(err)
      }
    );
  }

  // submit reset password form
  resetPassword() {

    this.error = "";
    this.userService.resetPassword(this.resetPasswordForm.value).subscribe(
      result => {
        alert(result.message);
        this.router.navigateByUrl('/');
      },
      error => {
        // console.log(error)
        this.error = "This email doesn't exist";
      }
    );
  }
}
