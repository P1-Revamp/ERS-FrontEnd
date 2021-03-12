import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/models/user.model';
import { EmailValidator } from 'src/app/validators/email-validator';
import { PasswordValidator } from 'src/app/validators/password-validator';
import { UsernameValidator } from 'src/app/validators/username-validator';
import { NavBarService } from '../../navigation/NavService/nav-bar.service';
import { HomeService } from '../HomeService/home.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  showUsernameErrorMessage: boolean = false;
  showUsernameSuccessMessage: boolean = false;
  showEmailErrorMessage: boolean = false;
  showEmailSuccessMessage: boolean = false;
  showPasswordErrorMessage: boolean = false;
  showPasswordSuccessMessage: boolean = false;

  usernameErrorMessage: string = "";
  emailErrorMessage: string = "";
  passwordErrorMessage: string = "";

  settingsForm: FormGroup;
  newUsername: string;
  newEmail: string;
  currentPassword: string;
  newPassword: string;
  reenterNewPassword: string;

  public usernameValidator: any = UsernameValidator;
  public emailValidator: any = EmailValidator;
  public passwordValidator: any = PasswordValidator;

  @ViewChild('newUsernameEntered') newUsernameInput;
  @ViewChild('newEmailEntered') newEmailInput;
  @ViewChild('currentPasswordEntered') currentPasswordInput;
  @ViewChild('newPasswordEntered') newPasswordInput;
  @ViewChild('reenterNewPasswordEntered') reenterNewPasswordInput;

  usernameId: string = "";
  emailId: string = "";
  passwordId: string = "";

  constructor(private navBarService: NavBarService, private cookieService: CookieService, private homeService: HomeService) { }

  ngOnInit(): void {
    this.navBarService.isLoggedIn();
    if (<number><unknown>this.cookieService.get("role") == 1) this.navBarService.isFinancialManager();

    this.settingsForm = new FormGroup({
      newUsername: new FormControl('', { validators: [Validators.required] }),
      newEmail: new FormControl('', { validators: [Validators.required] }),
      currentPassword: new FormControl('', { validators: [Validators.required] }),
      newPassword: new FormControl('', { validators: [Validators.required] }),
      reenterNewPassword: new FormControl('', { validators: [Validators.required] }),
    });
  }

  updateProfile(event: any) {
    if (!confirm("Are You Sure?")) return;
    if (event.target.newUsername != null) this.newUsername = event.target.newUsername.value;
    if (event.target.newEmail != null) this.newEmail = event.target.newEmail.value;
    if (event.target.currentPassword != null) this.currentPassword = event.target.currentPassword.value;
    if (event.target.newPassword != null) this.newPassword = event.target.newPassword.value;
    if (event.target.reenterNewPassword != null) this.reenterNewPassword = event.target.reenterNewPassword.value;

    this.homeService.getUser(<number><unknown>this.cookieService.get("id")).subscribe(
      (response: any) => {
        let userInfo = response;

      this.updateUsername(userInfo);
      this.updateEmail(userInfo);
      this.updatePassword(userInfo);

      this.newUsernameInput.nativeElement.value = "";
      this.newEmailInput.nativeElement.value = "";
      this.currentPasswordInput.nativeElement.value = "";
      this.newPasswordInput.nativeElement.value = "";
      this.reenterNewPasswordInput.nativeElement.value = "";
    });
  }

  updateUsername(userInfo: User): void {
    if (this.newUsername != "" && this.newUsername != undefined) {
      if (!this.usernameValidator(this.newUsername)) { //username is invalid
        this.showUsernameErrorMessage = true;
        this.usernameErrorMessage = "Username Invalid";
        this.showUsernameSuccessMessage = false;
        this.usernameId = "input-error";
      } else {
        userInfo.username = this.newUsername;

        this.homeService.checkIfUsernameExists(userInfo).subscribe(
          (response: boolean) => {
            if (response) { //true means the name is taken

              this.showUsernameErrorMessage = true;
              this.usernameErrorMessage = "Username Already Taken";
              this.showUsernameSuccessMessage = false;
              this.usernameId = "input-error";
            } else {
              this.homeService.updateUsername(userInfo).subscribe(
                (resposne: boolean) => {
                  if (resposne) { //username updated
                    this.showUsernameSuccessMessage = true;
                    this.showUsernameErrorMessage = false;
                    this.usernameId = "";
                    this.cookieService.set("username", this.newUsername);
                  } else { //error
                    this.showUsernameErrorMessage = true;
                    this.usernameErrorMessage = "Internal Issue";
                    this.showUsernameSuccessMessage = false;
                  }
                });
            }
          }, (error: any) => { //error
            this.showUsernameErrorMessage = true;
            this.usernameErrorMessage = "Internal Issue";
            this.showUsernameSuccessMessage = false;
              console.log(error);
          });
      }
  } else {
    this.showUsernameSuccessMessage = false;
    }
  }

  updateEmail(userInfo: User): void {
    if (this.newEmail != "" && this.newEmail != undefined) {

      if (!this.emailValidator(this.newEmail)) { //invalid email
        this.showEmailErrorMessage = true;
        this.emailErrorMessage = "Invalid Email";
        this.showEmailSuccessMessage = false;
        this.emailId = "input-error";
      } else {
        userInfo.email = this.newEmail;

        this.homeService.updateEmail(userInfo).subscribe(
          (response: boolean) => {
            if (response) { //updated email
              this.showEmailSuccessMessage = true;
              this.showEmailErrorMessage = false;
              this.emailId =  "";
            } else { //error
              this.showEmailErrorMessage = false;
              this.emailErrorMessage = "Internal Issue";
              this.showEmailSuccessMessage = false;
            }
          }, (error: any) => { //error
            this.showEmailErrorMessage = false;
            this.emailErrorMessage = "Internal Issue";
            this.showEmailSuccessMessage = false;
            console.log(error);
          });
      }
    } else {
      this.showEmailSuccessMessage = false;
    }
  }

  updatePassword(userInfo: User): void {
    if (this.currentPassword != "" && this.currentPassword != undefined) {
      if (this.currentPassword != this.cookieService.get("password")) { //incorrent password
        this.showPasswordErrorMessage = true;
        this.passwordErrorMessage = "Incorrect Password";
        this.showPasswordSuccessMessage = false;
        this.passwordId = "input-error"
      } else if (this.newPassword == "" || !this.passwordValidator(this.newPassword)) { //invalid new password
        this.showPasswordErrorMessage = true;
        this.passwordErrorMessage = "Invalid New Password";
        this.showPasswordErrorMessage = false;
        this.passwordId = "input-error"
      } else if (this.newPassword != this.reenterNewPassword) { //passwords don't match
        this.showPasswordErrorMessage = true;
        this.passwordErrorMessage = "Passwords Do Not Match";
        this.showPasswordSuccessMessage = true;
        this.passwordId = "input-error";
      } else {
        userInfo.password = this.newPassword;
        this.homeService.updatePassword(userInfo).subscribe(
          (response: boolean) => {
            if (response) { //updated password
              this.showPasswordSuccessMessage = true;
              this.showPasswordErrorMessage = false;
              this.passwordId = "";
              this.cookieService.set("password", this.newPassword);
            } else { //error
              this.showPasswordErrorMessage = true;
              this.passwordErrorMessage = "Internal Issue";
              this.showPasswordSuccessMessage = false;
            }
          }, (error: any) => { //error
            this.showPasswordErrorMessage = true;
            this.passwordErrorMessage = "Internal Issue";
            this.showPasswordSuccessMessage = false;
            console.log(error);
          });
      }
    } else {
      this.showPasswordSuccessMessage = false;
    }
  }
 
}
