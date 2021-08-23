import { Component, Input, OnInit } from '@angular/core';
import { CapitalItem } from 'src/app/core/models/capitalItem';
import { ResponseModel } from 'src/app/core/models/responseModel';
import { CapitalService } from 'src/app/core/services/capital.service';
import { CoinGeckoService } from 'src/app/core/services/coin-gecko.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
})
export class WalletComponent implements OnInit {
  @Input() wallet: CapitalItem[];
  change: object;
  constructor(
    private capitalService: CapitalService,
    private coinGeckoService: CoinGeckoService
  ) {}
  currency = 'eur';

  ngOnInit(): void {
    if (!this.wallet) {
      this.capitalService.getCapitals().subscribe((res: ResponseModel) => {
        this.wallet = res.data;
        this.getCurrentChange();
      });
    } else {
      this.getCurrentChange();
    }
  }
  getCurrentChange() {
    const coins = this.wallet.map((item) => item.key).join(',');
    this.coinGeckoService
      .getCurrentPrice(coins, this.currency)
      .subscribe((res) => {
        this.change = res;
      });
  }
}
