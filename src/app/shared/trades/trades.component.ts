import { Component, Input, OnInit } from '@angular/core';
import { TradeItem } from 'src/app/core/models/tradeItem';

@Component({
  selector: 'app-trades',
  templateUrl: './trades.component.html',
  styleUrls: ['./trades.component.scss'],
})
export class TradesComponent implements OnInit {
  @Input() trades: TradeItem[];
  @Input() coinChange: number[];
  dtOptions: DataTables.Settings;

  constructor() {
    this.dtOptions = {
      // info: false,
      paging: false,
      scrollY: 'auto',
    };
  }

  ngOnInit(): void {}
}
