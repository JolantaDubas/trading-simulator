import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { LandingPageComponent } from '../modules/landing-page/landing-page.component';
import { AuthComponent } from '../modules/auth/auth.component';


@NgModule({
  declarations: [SharedComponent, LandingPageComponent, AuthComponent],
  imports: [
    CommonModule,
    SharedRoutingModule
  ]
})
export class SharedModule { }
