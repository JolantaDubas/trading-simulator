import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';

import { SharedModule } from 'src/app/shared/shared.module';
import { MyAccountComponent } from './my-account/my-account.component';
import { LogoutComponent } from './logout/logout.component';
import { TradeComponent } from './trade/trade.component';

@NgModule({
  declarations: [
    MyAccountComponent,
    LogoutComponent,
    TradeComponent
  ],
  imports: [CommonModule, AuthRoutingModule, SharedModule],
})
export class AuthModule {}
