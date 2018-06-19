import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../shared';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {

  token: string;
  error: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      this.confirmEmail();
    });
  }

  confirmEmail() {
    this.userService.confirmEmail(this.token).subscribe(
      result => {
        if( result['status'] == 'FAIL' ) {
          this.error = result['message']
          alert(this.error);
          this.router.navigateByUrl('/');
        }
        else {
          if( result['message'] ) {
            alert(result['message'])
            this.router.navigateByUrl('/login');
          }
        }
      },
      error => {
        console.log(error)
        if(error['message'])
          alert(error['message'])
        this.router.navigateByUrl('/');
      }
    );
  }

}
