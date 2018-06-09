import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../shared';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  loginForm;
  isSubmitting = false;
  authForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {
   }


  ngOnInit() {
  }

}
