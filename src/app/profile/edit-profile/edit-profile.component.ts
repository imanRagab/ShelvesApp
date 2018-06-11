import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

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
  profileData: User;
  userRole: string;
  editForm: FormGroup;
  categories: Array<Category>;
  userImage: object;
  username: string;
  userAddresse;
  constructor(
    private userService: UserService,
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.categories = [];
    this.currentUser = <User>{};
    this.currentUser.phones = <Array<string>>[];
    this.currentUser.addresses = <Array<string>>[];
    this.userImage = {};
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
          this.profileData = userData;
          this.userRole = this.currentUser.role;
          this.userImage['url'] = `${environment.api_host}` + this.profileData.profile_picture['url'];
          this.editForm = this.fb.group({
            'name': [this.profileData.name, Validators.required],
            'profile_picture': [this.profileData.profile_picture, Validators.required],
            'postal_code': [this.profileData.addresses[0]['postal_code'], ],
            'building_number': [this.profileData.addresses[0]['building_number'],],
            'street': [this.profileData.addresses[0]['street'],],
            'region': [this.profileData.addresses[0]['region'],],
            'city': [this.profileData.addresses[0]['citys'],]
          });
          if(this.userRole == 'Normal user'){
            this.editForm.addControl('gender', new FormControl(this.profileData.gender,Validators.required));
          }
        }
      }
    );  
  }

  // update user 
  updateUser() {
    this.userService.update(this.editForm.value).subscribe(
      result => {
        this.currentUser = result;
      },
      error => {
        console.log(error);
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

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();  
      reader.onload = (event:any) => {
        this.profileData.profile_picture['url'] = event.target.result;
      }  
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  updateProfile() {
    alert(this.editForm.value);
  }
}
