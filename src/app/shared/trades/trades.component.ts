import { Component, Input, OnInit } from '@angular/core';
import { TradeItem } from 'src/app/core/models/tradeItem';

@Component({
  selector: 'app-trades',
  templateUrl: './trades.component.html',
  styleUrls: ['./trades.component.scss'],
})
export class TradesComponent implements OnInit {
  @Input() trades: TradeItem[];
  @Input() capitalChange: number[][];
  dtOptions: DataTables.Settings;
  @Input() coinChange: number[];

  constructor() {
    this.dtOptions = {
      // info: false,
      paging: false,
      responsive: true,
      //ordering: false,
      order: [],
    };
  }

  ngOnInit(): void {
    console.log('capitalChange', this.capitalChange);
    this.coinChange = this.trades.map(
      (trade) =>
        trade.amount * this.capitalChange[trade.key]['eur'] -
        trade.amount * trade.price
    );
  }
}
