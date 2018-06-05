import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  // get token from local storage
  getToken(): String {
    return window.localStorage['jwtToken'];
  }

  // save token to local storage
  saveToken(token: String) {
    window.localStorage['jwtToken'] = token;
  }

  // remove token from local storage
  destroyToken() {
    window.localStorage.removeItem('jwtToken');
  }
}
