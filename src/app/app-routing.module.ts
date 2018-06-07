import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {HomeContentComponent} from './home-content/home-content.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
// import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path:"" , 
    component : HomeComponent
  },
  {
    path:"HomeContent" , 
    component : HomeContentComponent
  },
  {
    path:"SignIn",
    component : SignInComponent
  },
  {
    path:"Signup",
    component : SignUpComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
