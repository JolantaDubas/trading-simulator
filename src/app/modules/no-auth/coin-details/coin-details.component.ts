import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoinGeckoService } from 'src/app/core/services/coin-gecko.service';

@Component({
  selector: 'app-coin-details',
  templateUrl: './coin-details.component.html',
  styleUrls: ['./coin-details.component.scss'],
})
export class CoinDetailsComponent implements OnInit {
  id: string;
  details: any;
  currency = localStorage.getItem('vs_currency').toLowerCase();
  currencyUpper: string;
  loading = true;
  constructor(
    private route: ActivatedRoute,
    private coinGeckoService: CoinGeckoService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.currencyUpper = this.currency.toUpperCase();

    this.coinGeckoService.getCoinData(this.id).subscribe(
      (res: { coins: any[]; exchanges: any[] }) => {
        this.details = res;
        this.loading = false;
      },
      (err) => console.log(err)
    );
  }
}
