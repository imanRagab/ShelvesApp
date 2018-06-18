import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../shared';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['../auth.component.scss']
})
export class NewPasswordComponent implements OnInit {

  passwordResetToken: string;
  newPasswordForm: FormGroup;
  error: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {

    this.newPasswordForm = this.fb.group({
      'password': ['', Validators.required],
      'password_confirmation': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.passwordResetToken = params['token'];
      console.log(this.passwordResetToken)
    });
  }

  // create new password
  createNewPassword() {
    
    // check if two passwords match
    let password = this.newPasswordForm.get('password').value;
    let password_confirmation = this.newPasswordForm.get('password_confirmation').value;

    if(password === password_confirmation) {

      this.userService.newPassword(this.passwordResetToken, this.newPasswordForm.value).subscribe(
        result => {
          alert("Password changed successfully.")
          this.router.navigateByUrl('/');
        },
        error => {
          this.error = error.error;
          console.log(error);
        }
      );
    }
    else {
      this.error = "Passwords don't match";
    }
  }

}
