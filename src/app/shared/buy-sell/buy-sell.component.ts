import { Component, Input, OnInit } from '@angular/core';
import { CapitalItem } from 'src/app/core/models/capitalItem';
import { TradeItem } from 'src/app/core/models/tradeItem';
import { CapitalService } from 'src/app/core/services/capital.service';
import { SnackBarService } from 'src/app/core/services/snackBar.service';
import { TradeService } from 'src/app/core/services/trade.service';
import { ResponseModel } from '../../core/models/responseModel';

@Component({
  selector: 'app-buy-sell',
  templateUrl: './buy-sell.component.html',
  styleUrls: ['./buy-sell.component.scss'],
})
export class BuySellComponent implements OnInit {
  @Input() coin: any;
  wallet: CapitalItem[];
  isBought: boolean;
  constructor(private capitalService: CapitalService) {}

  ngOnInit(): void {
    console.log('input wallet', this.wallet);
    if (!this.wallet) {
      this.capitalService.getCapitals().subscribe((res: ResponseModel) => {
        this.wallet = res.data;
        console.log(this.wallet);

        this.isBought = this.wallet.map((item) => item.key).includes(this.coin);
      });
    } else {
      this.isBought = this.wallet.map((item) => item.key).includes(this.coin);
    }
  }
}
