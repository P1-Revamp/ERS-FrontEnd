import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { SettingsComponent } from './settings/settings.component';



@NgModule({
  declarations: [HomePageComponent, SettingsComponent],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
