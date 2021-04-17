import { Component, OnInit } from '@angular/core';
import { CoinGeckoService } from 'src/app/core/services/coin-gecko.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss'],
})
export class MarketComponent implements OnInit {
  trending: { coins: any[]; exchanges: any[] };
  market: any;
  constructor(private coinGeckoService: CoinGeckoService) {}

  ngOnInit(): void {
    this.coinGeckoService.getTrending().subscribe(
      (res: { coins: any[]; exchanges: any[] }) => {
        console.log(res);
        this.trending = res;
        console.log(this.trending.coins);
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
  }
}
