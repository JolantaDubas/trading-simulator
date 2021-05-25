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
  currValue = localStorage.getItem('vs_currency').toLowerCase();
  currValueUpper: string;
  loading = true;
  constructor(
    private route: ActivatedRoute,
    private coinGeckoService: CoinGeckoService
  ) {
    // this.route.queryParams.subscribe((params) => {
    //   console.log('params', params);
    //   this.id = params['id'];
    //   console.log('id', this.id);
    // });
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.currValueUpper = this.currValue.toUpperCase();

    this.coinGeckoService.getCoinData(this.id).subscribe(
      (res: { coins: any[]; exchanges: any[] }) => {
        this.details = res;
        // this.trending = res;
        // console.log(this.trending.coins);
        this.loading = false;
      },
      (err) => console.log(err)
    );
  }
}
