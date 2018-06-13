import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

import {
  User,
  UserService,
  Category,
  CategoryService
} from '../../shared';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  currentUser: User;
  userRole: string;
  editForm: FormGroup;
  categories: Array<Category>;
  userImage: string;
  username: string;
  userInterests: Array<any>;
  photoChanged: Boolean;
  constructor(
    private userService: UserService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private router: Router,
  ) { 
    this.editForm = this.fb.group(
      {
      'name': [ , Validators.required],
      'gender': [, Validators.required],
      'postal_code': [ , Validators.required],
      'building_number': [ , Validators.required],
      'street': [ , Validators.required],
      'region': [ , Validators.required],
      'city': [ , Validators.required],
      'phone': [, Validators.required],
      'interests': [[], Validators.required]
    });
  }

  ngOnInit() {
    this.photoChanged = false;
    this.categories = [];
    this.currentUser = <User>{};
    this.currentUser.phones = <Array<string>>[];
    this.currentUser.addresses = <Array<string>>[];
    this.userImage = "";
    this.userInterests = [];
    this.getCategories();
    this.loadCurrentUser();
    this.getCategories();
  }

  // load the current user's data
  loadCurrentUser() {
    this.userService.currentUser.subscribe(
      (userData: User) => {
        if(userData.name){
          this.currentUser = userData;
          this.userRole = this.currentUser.role;
          
          this.userImage = `${environment.api_host}` + this.currentUser.profile_picture['url'];
          for(let intrest of this.currentUser.interests) {
            this.userInterests.push(intrest['id']);
          }
          this.editForm.setValue({
            name: this.currentUser.name,
            gender: this.currentUser.gender,
            postal_code: this.currentUser.addresses[0]['postal_code'],
            building_number: this.currentUser.addresses[0]['building_number'],
            street: this.currentUser.addresses[0]['street'],
            region: this.currentUser.addresses[0]['region'],
            city: this.currentUser.addresses[0]['city'],
            phone: this.currentUser.phones[0]['phone'],
            interests: this.userInterests
          });
          if(this.userRole == 'Normal user'){
            this.editForm.addControl('gender', new FormControl(this.currentUser.gender,Validators.required));
          }
        }
      }
    );  
  }
  // get categories
  getCategories() {
    this.categoryService.getCategories().subscribe(
      result => {
        this.categories = result['data'];
      },
      error => {
        console.log(error);
      }
    );
  }

  // in image file change
  onFileChange(event) {

    if(!this.photoChanged)
      this.editForm.addControl('profile_picture', new FormControl('' ,));

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();  
      reader.onload = (event:any) => {
        this.userImage = event.target.result;
        this.photoChanged = true;
      }  
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  updateProfile() {

    if(this.photoChanged)
      this.editForm.get('profile_picture').setValue(this.userImage);

    this.userService.update(this.editForm.value, this.currentUser.id).subscribe(
      result => {
        this.router.navigateByUrl('/userprofile');
      },
      error => {
        console.log(error);
      }
    );
  }
}
