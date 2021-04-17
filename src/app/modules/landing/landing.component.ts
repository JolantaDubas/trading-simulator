import { Component, OnInit } from '@angular/core';
import { CoinGeckoService } from 'src/app/core/services/coin-gecko.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  global: any;
  market: any;
  trending: { coins: any[]; exchanges: any[] };

  constructor(private coinGeckoService: CoinGeckoService) {}

  ngOnInit(): void {
    this.coinGeckoService.getGlobal().subscribe(
      (res: { coins: any[]; exchanges: any[] }) => {
        console.log(res);
        this.global = res;
        console.log('global', this.global);
      },
      (err) => console.log(err)
    );

    this.coinGeckoService.getMarketData('usd').subscribe(
      (res: { coins: any[]; exchanges: any[] }) => {
        console.log(res);
        this.market = res;
        console.log(this.market);
      },
      (err) => console.log(err)
    );

    this.coinGeckoService.getTrending().subscribe(
      (res: { coins: any[]; exchanges: any[] }) => {
        console.log(res);
        this.trending = res;
        console.log(this.trending.coins);
      },
      (err) => console.log(err)
    );
  }
}
