import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { LoginService } from '../LoginService/login.service';
import { ticketArray$, environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { NavBarComponent } from '../../navigation/nav-bar/nav-bar.component';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  faSignInAlt = faSignInAlt;

  loginForm: FormGroup;
  password: string;
  username: string;
  showErrorMessage: boolean = false;

  constructor(private loginService: LoginService, private router: Router, private cookieService : CookieService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', { validators: [Validators.required] }),
      password: new FormControl('', { validators: [Validators.required] }),
    });
  }

  login(event: any) {

    this.username = event.target.username.value;
    this.password = event.target.password.value;

    // this.loginService.verifyCredentials(this.username, this.password).subscribe(
    //   (userInfo: number[]) => {
    //       this.cookieService.set("id", <string><unknown>userInfo[0]);
    //       this.cookieService.set("role", <string><unknown>userInfo[1]);
    //       this.cookieService.set("isLoggedIn", "true");
    //       this.router.navigate(['/home']);
    //   },
    //   (error) => {
    //     this.showErrorMessage = true;
    //   });

    this.loginService.verifyCredentials(this.username, this.password).subscribe(
      (response: number[]) => {

          // let userInfoJSON: JSON = JSON.parse(response);
          // let userInfoObj: number[] = <number[]><unknown>userInfoJSON;

          this.cookieService.set("isLoggedIn", "true");

          this.cookieService.set("username", this.username);
          this.cookieService.set("password", this.password);

          this.cookieService.set("id", <string><unknown>response[0]);
          this.cookieService.set("role", <string><unknown>response[1]);

          this.router.navigate(['/home']);
      }, (error: any) => {
        this.showErrorMessage = true;
        console.log(error);
      }
    )


  }

}
