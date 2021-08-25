import { Component, Input, OnInit } from '@angular/core';
import { TradeItem } from 'src/app/core/models/tradeItem';

@Component({
  selector: 'app-trades',
  templateUrl: './trades.component.html',
})
export class TradesComponent implements OnInit {
  @Input() trades: TradeItem[];
  @Input() walletSymbols: object;
  @Input() capitalChange: number[][];
  dtOptions: DataTables.Settings;

  constructor() {
    this.dtOptions = {
      paging: true,
      responsive: true,
      orderMulti: true,
      order: [],
    };
  }

  ngOnInit(): void {}
}
