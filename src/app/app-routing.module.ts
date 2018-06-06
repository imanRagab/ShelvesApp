import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import {HomeComponent} from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { ShowComponent } from './book/show/show.component';
const routes: Routes = [
  {
    path: '' , 
    component : HomeComponent
  },
  {
    path: 'login',
    component: AuthComponent,
  },
  {
    path: 'register',
    component: AuthComponent,
  },
  {
    path: 'books/:id',
    component: ShowComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
