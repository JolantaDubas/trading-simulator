import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideNavbarComponent } from './modules/navigation/side-navbar/side-navbar.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopBarComponent } from './modules/navigation/top-bar/top-bar.component';

import { ToastrModule } from 'ngx-toastr';
import { TokenInterceptor } from './core/auth/token.interceptor';

@NgModule({
  declarations: [AppComponent, SideNavbarComponent, TopBarComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    HttpClientModule,

    // {
    //   provide: LOCALE_ID,
    //   useValue: 'fr-BE', // 'de-DE' for Germany, 'fr-FR' for France ...
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
