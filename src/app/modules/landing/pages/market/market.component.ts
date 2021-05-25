import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DataTablesParameters } from 'src/app/core/models/dataTablesParameters';
import { DataTablesResponse } from 'src/app/core/models/dataTablesResponce';
import { CoinGeckoService } from 'src/app/core/services/coin-gecko.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss'],
})
export class MarketComponent implements OnInit {
  market: object[];
  resultsLength: number;
  dtOptions: DataTables.Settings = {};

  constructor(private coinGeckoService: CoinGeckoService) {}

  ngOnInit(): void {
    const curr = localStorage.getItem('vs_currency');
    this.dtOptions = {
      ajax: (dataTablesParameters: DataTablesParameters, callback) => {
        console.log('dataTablesParameters', dataTablesParameters);
        this.coinGeckoService
          .getMarketData(dataTablesParameters, { curr })
          .subscribe(
            (res: object[]) => {
              this.market = res;
              this.resultsLength = this.market.length;
              callback({
                recordsTotal: 7459,
                recordsFiltered: 7459,
                lengthChange: true,
                data: [],
              });
            },
            (err) => console.log(err)
          );
      },
      columns: [
        { data: 'id' },
        { data: 'current_price', orderable: false },
        { data: 'price_change_percentage_24h_in_currency', orderable: false },
        { data: 'market_cap' },
        { data: 'ath', orderable: false },
        { data: 'volume' },
        { data: 'sparkline', orderable: false },
      ],
      pagingType: 'full_numbers',
      pageLength: 25,
      serverSide: true,
      processing: true,
      searching: false,
      ordering: true,

      order: [[3, 'desc']],

      scrollY: 'calc(100vh - 300px)',
      scrollX: false,
    };
  }
}
