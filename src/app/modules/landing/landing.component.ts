import { Component, OnInit } from '@angular/core';
import { CoinGeckoService } from 'src/app/core/services/coin-gecko.service';
import { NomicsService } from 'src/app/core/services/nomics.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  global: any;
  market: any;
  trending: { coins: any[]; exchanges: any[] };
  currencies: any;
  constructor(
    private coinGeckoService: CoinGeckoService,
    private nomicsService: NomicsService
  ) {}

  ngOnInit(): void {
    // localStorage.setItem('vs_currency', 'USD');

    this.coinGeckoService.getGlobal().subscribe(
      (res: { coins: any[]; exchanges: any[] }) => {
        this.global = res;
      },
      (err) => console.log(err)
    );

    this.nomicsService.getCurrenciesTicker().subscribe(
      (res) => {
        this.currencies = res;
      },
      (err) => console.log(err)
    );

    // this.coinGeckoService.getMarketData({}).subscribe(
    //   (res: { coins: any[]; exchanges: any[] }) => {
    //     console.log(res);
    //     this.market = res;
    //     console.log('market', this.market);
    //   },
    //   (err) => console.log(err)
    // );

    this.coinGeckoService.getTrending().subscribe(
      (res: { coins: any[]; exchanges: any[] }) => {
        this.trending = res;
      },
      (err) => console.log(err)
    );
  }
}
