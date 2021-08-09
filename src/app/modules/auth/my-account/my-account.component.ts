import { Component, Input, OnInit } from '@angular/core';

import { UserService } from 'src/app/core/services/user.service';
import { TradeService } from 'src/app/core/services/trade.service';
import { ResponseModel } from 'src/app/core/models/responseModel';
import { CapitalItem } from 'src/app/core/models/capitalItem';
import { TradeItem } from 'src/app/core/models/tradeItem';
import { User } from 'src/app/core/models/user';
import { CapitalService } from 'src/app/core/services/capital.service';
import { CoinGeckoService } from 'src/app/core/services/coin-gecko.service';
import { ChartOptions } from '../../no-auth/landing/landing.component';
@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
})
export class MyAccountComponent implements OnInit {
  @Input() trades?: TradeItem[];

  profile: User;
  wallet: CapitalItem[];
  currency = 'eur';
  totalCapital: number;
  capitalChange: object;

  coinChange: number[];
  coinValues: number[];

  public chartOptions: Partial<ChartOptions>;

  constructor(
    private userService: UserService,
    private capitalService: CapitalService,
    private coinGeckoService: CoinGeckoService,
    private tradeService: TradeService
  ) {}

  ngOnInit(): void {
    this.userService.getProfile().subscribe((res: ResponseModel) => {
      this.profile = res.data;
    });

    this.capitalService.getCapitals().subscribe((res: ResponseModel) => {
      this.wallet = res.data;
      if (!this.trades)
        this.tradeService.getTrades().subscribe((res: ResponseModel) => {
          this.trades = res.data;

          this.getCurrentChange();
        });
    });
  }

  getCurrentChange() {
    const coins = this.wallet.map((item) => item.key).join(',');
    this.coinGeckoService
      .getCurrentPrice(coins, this.currency)
      .subscribe((res) => {
        this.capitalChange = res;

        this.coinValues = this.wallet?.map((item, index) =>
          item.key === 'eur'
            ? +item.amount
            : item.amount * this.capitalChange[item.key][this.currency]
        );

        this.totalCapital = this.coinValues.reduce((a, b) => a + b, 0);
        this.setChartOptions();
      });
  }

  setChartOptions() {
    this.chartOptions = {
      tooltip: {
        enabled: false,
      },
      series: this.coinValues,
      chart: {
        type: 'donut',
      },

      theme: {
        palette: 'palette3',
      },
      labels: this.wallet.map((item) => item.name),

      // dataLabels: {
      //   formatter(v) {
      //     return val.toFixed(2) + '%';
      //   },
      // },
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 100,
            },
          },
        },
      ],
    };
  }
}
