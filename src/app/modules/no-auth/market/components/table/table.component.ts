import { Component, Input, OnInit } from '@angular/core';
import { CoinGeckoService } from 'src/app/core/services/coin-gecko.service';

import { DataTablesParameters } from 'src/app/core/models/dataTablesParameters';
import { AuthService } from 'src/app/core/auth/auth.service';
import { MarketItem } from 'src/app/core/models/marketItem';
import { ResponseModel } from 'src/app/core/models/responseModel';
import { CapitalService } from 'src/app/core/services/capital.service';
import { CapitalItem } from 'src/app/core/models/capitalItem';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() dtOptions: any;
  @Input() currency: string;

  loggedIn: boolean;
  market: MarketItem[];
  resultsLength: number;
  wallet: CapitalItem[];

  constructor(
    private coinGeckoService: CoinGeckoService,
    public authService: AuthService,
    private capitalService: CapitalService
  ) {
    this.loggedIn = this.authService.loggedIn();
  }

  ngOnInit(): void {
    const currencyLength = localStorage.getItem('activeCurrencies');
    this.dtOptions = {
      columns: [
        { data: 'id' },
        { data: 'current_price', orderable: false },
        { data: 'price_change_percentage_24h_in_currency', orderable: false },
        { data: 'market_cap' },
        { data: 'ath', orderable: false },
        { data: 'volume' },
        { data: 'sparkline', orderable: false },
        { data: 'actions', orderable: false },
      ],
      pagingType: 'full_numbers',
      pageLength: 25,
      lengthMenu: [10, 25, 50],
      serverSide: true,
      pending: true,
      processing: true,
      searching: false,
      ordering: true,
      order: [[3, 'desc']],
      scrollY: 'calc(100vh - 300px)',
      responsive: true,
      ajax: (dataTablesParameters: DataTablesParameters, callback) => {
        this.coinGeckoService
          .getMarketData(this.currency, dataTablesParameters)
          .subscribe(
            (res: MarketItem[]) => {
              this.market = res;
              this.resultsLength = this.market.length;
              callback({
                recordsTotal: currencyLength,
                recordsFiltered: currencyLength,
                lengthChange: true,
                data: [],
              });
            },
            (err) => console.log(err)
          );
      },
      ...this.dtOptions,
    };

    if (this.loggedIn) {
      this.capitalService.getCapitals().subscribe((res: ResponseModel) => {
        this.wallet = res.data;
      });
    }
  }

  checkIfNull(value): string | number {
    if (value) return value;
    else return '-';
  }
}
