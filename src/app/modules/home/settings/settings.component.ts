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
  showUsernameInvalidMessage: boolean = false;
  showUsernameTakenMessage: boolean = false;
  showEmailInvalidMessage: boolean = false;
  showCurrentPasswordIncorrectMessage: boolean = false;
  showNewPasswordInvalidMessage: boolean = false;
  showPasswordsDoNotMatchMessage: boolean = false;
  showErrorMessage: boolean = false;

  showUsernameSuccessMessage: boolean = false;
  showEmailSuccessMessage: boolean = false;
  showPasswordSuccessMessage: boolean = false;

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
      (response: User) => {
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
      if (!this.usernameValidator(this.newUsername)) {
        this.showUsernameInvalidMessage = true;
        this.usernameId = "input-error";
      } else {
        userInfo.username = this.newUsername;

        this.homeService.checkIfUsernameExists(userInfo).subscribe(
          (response: boolean) => {
            if (response) { //true means the name is taken
              this.showUsernameTakenMessage = true;
              this.showUsernameInvalidMessage = false;
              this.showUsernameSuccessMessage = false;
              this.usernameId = "input-error";
            } else {
              this.homeService.updateUsername(userInfo).subscribe(
                (resposne: boolean) => {
                  if (resposne) {
                    this.showUsernameSuccessMessage = true;
                    this.showUsernameInvalidMessage = false;
                    this.showUsernameTakenMessage = false;
                    this.usernameId = "";
                  } else {
                    this.showUsernameInvalidMessage = false;
                    this.showUsernameSuccessMessage = false;
                    this.showUsernameTakenMessage = false;
                    this.showErrorMessage = true;
                  }
                });
            }
          }
        )
      }
  } else {
    this.showUsernameSuccessMessage = false;
    }
  }

  updateEmail(userInfo: User): void {
    if (this.newEmail != "" && this.newEmail != undefined) {

      if (!this.emailValidator(this.newEmail)) {
        this.showEmailInvalidMessage = true;
        this.showEmailSuccessMessage = false;
        this.emailId = "input-error";
      } else {
        userInfo.email = this.newEmail;

        this.homeService.updateEmail(userInfo).subscribe(
          (response: boolean) => {
            if (response) {
              this.showEmailSuccessMessage = true;
              this.showEmailInvalidMessage = false;
              this.emailId =  "";
            } else {
              this.showEmailInvalidMessage = false;
              this.showEmailSuccessMessage = false;
              this.showErrorMessage = true;
            }
          });
      }
    } else {
      this.showEmailSuccessMessage = false;
    }
  }

  updatePassword(userInfo: User): void {
    if (this.currentPassword != "" && this.currentPassword != undefined) {
      if (this.currentPassword != userInfo.password) {
        //incorrent password
        this.showCurrentPasswordIncorrectMessage = true;
        this.showNewPasswordInvalidMessage = false;
        this.showPasswordsDoNotMatchMessage = false;
        this.showPasswordSuccessMessage = false;
        this.passwordId = "input-error"
      } else if (this.newPassword == "" || !this.passwordValidator(this.newPassword)) {
        //invalid new password
        this.showNewPasswordInvalidMessage = true;
        this.showPasswordsDoNotMatchMessage = false;
        this.showCurrentPasswordIncorrectMessage = false;
        this.showPasswordSuccessMessage = false;
        this.passwordId = "input-error"
      } else if (this.newPassword != this.reenterNewPassword) {
        //passwords don't match
        this.showPasswordsDoNotMatchMessage = true;
        this.showNewPasswordInvalidMessage = false;
        this.showCurrentPasswordIncorrectMessage = false;
        this.showPasswordSuccessMessage = false;
        this.passwordId = "input-error";
      } else {
        userInfo.password = this.newPassword;
        this.homeService.updatePassword(userInfo).subscribe(
          (response: boolean) => {
            if (response) {
              this.showPasswordSuccessMessage = true;
              this.showPasswordsDoNotMatchMessage = false;
              this.showNewPasswordInvalidMessage = false;
              this.showCurrentPasswordIncorrectMessage = false;
              this.passwordId = "";
            } else {
              this.showErrorMessage = true;
            }
          }
        )
      }
    } else {
      this.showPasswordSuccessMessage = false;
    }
  }
 
}
