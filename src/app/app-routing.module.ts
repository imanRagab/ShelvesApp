import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { ShowComponent } from './book/show/show.component';
import { CreateComponent } from './book/create/create.component';
import {HomeContentComponent} from './home-content/home-content.component';
import { UserProfileComponent } from './profile/user-profile/user-profile.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { BookListComponent } from './book/book-list/book-list.component';

import { NoAuthGuard } from './shared/services/no-auth-guard.service';

const routes: Routes = [
  {
    path: '' ,
    component : HomeComponent
  },
  {
    path: 'login',
    component: AuthComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'register',
    component: AuthComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'books/create',
    component: CreateComponent
  },
  {
    path: 'books/edit/:id',
    component: CreateComponent
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
    component : UserProfileComponent
  },
  {
    path: 'userprofile/:id',
    component : UserProfileComponent
  },
  {
    path: 'editprofile',
    component : EditProfileComponent
  },
  {
    path: 'books',
    component : BookListComponent
  }

];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
