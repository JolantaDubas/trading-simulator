import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { CapitalItem } from 'src/app/core/models/capitalItem';
import { ResponseModel } from 'src/app/core/models/responseModel';
import { TradeItem } from 'src/app/core/models/tradeItem';
import { CapitalService } from 'src/app/core/services/capital.service';
import { CoinGeckoService } from 'src/app/core/services/coin-gecko.service';
import { SnackBarService } from 'src/app/core/services/snackBar.service';
import { TradeService } from 'src/app/core/services/trade.service';
import { required } from 'src/app/core/validators';
import { maxValue } from 'src/app/core/validators/maxValue';
import { number } from 'src/app/core/validators/number';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.scss'],
})
export class TradeComponent implements OnInit {
  form: FormGroup;
  trades: TradeItem[];

  currency = 'eur';
  coin: string;
  type: 'buy' | 'sell';
  currentPrice: number;
  wallet: CapitalItem[];
  details: any;
  sliderMax: number;
  sliderStep: number;
  capitalChange: object;
  constructor(
    private route: ActivatedRoute,
    private tradeService: TradeService,
    private snackBar: SnackBarService,
    private coinGeckoService: CoinGeckoService,
    private fb: FormBuilder,
    private capitalService: CapitalService,
    private router: Router
  ) {
    this.coin = this.route.snapshot.paramMap.get('coin');
    this.type = this.route.snapshot.paramMap.get('type') as 'buy' | 'sell';

    this.form = this.fb.group({
      amount: [0, [number(), required()]],
      buyPrice: [0, [number(), required()]],
    });
    if (this.type !== 'buy' && this.type !== 'sell') {
      this.router.navigate(['user/my-account']);
    }
  }

  ngOnInit(): void {
    this.coinGeckoService
      .getCurrentPrice(this.coin, this.currency)
      .subscribe((res) => {
        this.currentPrice = res[this.coin][this.currency];
        this.capitalChange = res;
      });
    // setTimeout(() => {
    //   this.coinGeckoService
    //     .getCurrentPrice(this.coin, this.currency)
    //     .subscribe((res) => {
    //       this.currentPrice = res[this.coin][this.currency];
    //     });
    // }, 5000);
    this.amount.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      this.buyPrice.setValue(value * this.currentPrice, {
        emitEvent: false,
      });
    });
    this.buyPrice.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      this.amount.setValue(value / this.currentPrice, {
        emitEvent: false,
      });
    });
    this.coinGeckoService
      .getCoinData(this.coin, {
        tickers: false,
        market_data: false,
        community_data: false,
        developer_data: false,
        sparkline: false,
      })
      .subscribe(
        (res: { coins: any[]; exchanges: any[] }) => {
          this.details = res;
          this.getWallet();
        },
        (err) => console.log(err)
      );
  }

  setPrice(value: number) {
    if (this.type === 'buy') this.buyPrice.setValue(value);
    else this.amount.setValue(value);
  }
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }

  onSubmit() {
    if (this.form.valid)
      this.tradeService
        .createTrade({
          coin: this.details.name,
          currency: this.currency,
          key: this.details.id,
          symbol: this.details.symbol,
          image: this.details.image.thumb,
          amount: +this.amount.value,
          price: this.currentPrice,
          date: new Date(),
          buy: this.type === 'buy',
        })
        .subscribe((res: ResponseModel) => {
          this.snackBar.showSuccess(res.message);
          this.getWallet();
        });
  }

  getWallet() {
    this.capitalService
      .getCapitals({ byCoin: this.details.id })
      .subscribe((res: ResponseModel) => {
        this.wallet = res.data;
        console.log('wallet', this.wallet);
        if (this.type === 'buy') {
          this.sliderMax = this.wallet[0].amount;
          this.buyPrice.setValidators(
            maxValue(this.sliderMax, 'Number is bigger than your capital.')
          );
          this.buyPrice.updateValueAndValidity();
        } else {
          this.sliderMax = this.wallet[1].amount;

          this.amount.setValidators(
            maxValue(this.sliderMax, 'Number is bigger than your capital.')
          );
          this.amount.updateValueAndValidity();
        }
        if (this.sliderMax < 100) this.sliderStep = 0.001;
      });
    this.tradeService
      .getTrades({ byCoin: this.details.id })
      .subscribe((res: ResponseModel) => {
        this.trades = res.data;
      });
  }

  get amount(): FormControl {
    return this.form.get('amount') as FormControl;
  }

  get buyPrice(): FormControl {
    return this.form.get('buyPrice') as FormControl;
  }
}
