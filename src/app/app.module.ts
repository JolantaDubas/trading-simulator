import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideNavbarComponent } from './modules/navigation/side-navbar/side-navbar.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopBarComponent } from './modules/navigation/top-bar/top-bar.component';

import localePt from '@angular/common/locales/fr-BE';
import { registerLocaleData } from '@angular/common';

// Register the localization
//registerLocaleData(localePt, 'fr-BE');

@NgModule({
  declarations: [AppComponent, SideNavbarComponent, TopBarComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [
    HttpClientModule,
    // {
    //   provide: LOCALE_ID,
    //   useValue: 'fr-BE', // 'de-DE' for Germany, 'fr-FR' for France ...
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
