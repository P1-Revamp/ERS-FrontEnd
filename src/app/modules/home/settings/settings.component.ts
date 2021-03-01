import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
