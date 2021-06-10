import { Component, Input, OnInit } from '@angular/core';
import { CoinGeckoService } from 'src/app/core/services/coin-gecko.service';

import { DataTablesParameters } from 'src/app/core/models/dataTablesParameters';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() dtOptions: DataTables.Settings;
  @Input() currency: string;

  market: object[];
  resultsLength: number;
  constructor(private coinGeckoService: CoinGeckoService) {
    console.log('dtOptions', this.dtOptions);
  }

  ngOnInit(): void {
    this.dtOptions = {
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
      responsive: true,
      ajax: (dataTablesParameters: DataTablesParameters, callback) => {
        console.log('dataTablesParameters', dataTablesParameters);
        this.coinGeckoService
          .getMarketData(this.currency, dataTablesParameters)
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
      ...this.dtOptions,
    };
    console.log('dtOptions', this.dtOptions);
  }

  checkIfNull(value): string | number {
    if (value) return value;
    else return '-';
  }
}
