import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogoutComponent } from './logout/logout.component';

import { MyAccountComponent } from './my-account/my-account.component';
import { TradeComponent } from './trade/trade.component';

const routes: Routes = [
  { path: 'my-account', component: MyAccountComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'trade/:coin/:type', component: TradeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
