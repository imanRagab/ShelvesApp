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
  userRole: string;
  editForm: FormGroup;
  categories: Array<Category>;
  userImage: object;
  username: string;
  photoChanged: Boolean;
  constructor(
    private userService: UserService,
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) { 
    this.editForm = this.fb.group(
      {
      'name': [ , Validators.required],
      'profile_picture': [ , Validators.required],
      'postal_code': [ , Validators.required],
      'building_number': [ , Validators.required],
      'street': [ , Validators.required],
      'region': [ , Validators.required],
      'city': [ , Validators.required]
    });
  }

  ngOnInit() {
    this.photoChanged = false;
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
          this.userRole = this.currentUser.role;
          
          this.userImage['url'] = `${environment.api_host}` + this.currentUser.profile_picture['url'];
          this.editForm.get('name').setValue(this.currentUser.name);
          this.editForm.get('postal_code').setValue(this.currentUser.addresses[0]['postal_code']);
          this.editForm.get('building_number').setValue(this.currentUser.addresses[0]['building_number']);
          this.editForm.get('street').setValue(this.currentUser.addresses[0]['street']);
          this.editForm.get('region').setValue(this.currentUser.addresses[0]['region']);
          this.editForm.get('city').setValue(this.currentUser.addresses[0]['city']);

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

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();  
      reader.onload = (event:any) => {
        this.userImage['url'] = event.target.result;
        this.photoChanged = true;
      }  
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  updateProfile() {

    this.photoChanged
    ?this.editForm.get('profile_picture').setValue(this.userImage)
    :this.editForm.get('profile_picture').setValue(this.currentUser.profile_picture);

    this.userService.update(this.editForm.value, this.currentUser.id).subscribe(
      result => {
        console.log(result)
      },
      error => {
        console.log(error);
      }
    );
  }
}
