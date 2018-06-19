import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { NewPasswordComponent } from './auth/new-password/new-password.component';
import { ShowComponent } from './book/show/show.component';
import { CreateComponent } from './book/create/create.component';
import {HomeContentComponent} from './home-content/home-content.component';
import { UserProfileComponent } from './profile/user-profile/user-profile.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { BookListComponent } from './book/book-list/book-list.component';
import { ShowNotificationsComponent } from './notifications/show-notifications/show-notifications.component'

import { NoAuthGuardService } from './shared/services/no-auth-guard.service';
import { AuthGuardService } from './shared/services/auth-guard.service';
import {OrderComponent} from './order/order.component'
const routes: Routes = [
  {
    path: '' ,
    component : HomeComponent
  },
  {
    path: 'login',
    component: AuthComponent,
    canActivate: [NoAuthGuardService]
  },
  {
    path: 'register',
    component: AuthComponent,
    canActivate: [NoAuthGuardService]
  },
  {
    path: 'newpassword',
    component: NewPasswordComponent,
    canActivate: [NoAuthGuardService]
  },
  {
    path: 'books/create',
    component: CreateComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'books/edit/:id',
    component: CreateComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'books/:id',
    component: ShowComponent
  },
  {
    path: 'HomeContent',
    component : HomeContentComponent
  },
  {
    path: 'userprofile',
    component : UserProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'userprofile/:id',
    component : UserProfileComponent,
    canActivate: [AuthGuardService]

  },
  {
    path: 'editprofile',
    component : EditProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'books',
    component : BookListComponent
   },
   {
     path: 'showNotifications',
     component : ShowNotificationsComponent
   },
   {
    path: 'order/:id',
    component: OrderComponent,
    canActivate: [AuthGuardService]
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
