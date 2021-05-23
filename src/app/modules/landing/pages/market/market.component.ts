import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CoinGeckoService } from 'src/app/core/services/coin-gecko.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss'],
})
export class MarketComponent implements OnInit {
  trending: { coins: any[]; exchanges: any[] };
  market: any;
  resultsLength: number;
  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private coinGeckoService: CoinGeckoService) {}

  checkPrice(value: number): any {
    let color: string;
    if (value > 0) return (color = 'green');
    else return (color = 'red');
  }
  ngOnInit(): void {
    this.dtOptions = {
      ajax: (dataTablesParameters: any, callback) => {
        // that.http
        //   .post<DataTablesResponse>(
        //     'https://angular-datatables-demo-server.herokuapp.com/',
        //     dataTablesParameters, {}
        //   ).subscribe(resp => {
        //     that.persons = resp.data;

        //     callback({
        //       recordsTotal: resp.recordsTotal,
        //       recordsFiltered: resp.recordsFiltered,
        //       data: []
        //     });
        //   });
        console.log('dataTablesParameters', dataTablesParameters);
        this.coinGeckoService.getMarketData(dataTablesParameters, {}).subscribe(
          (res: { coins: any[]; exchanges: any[] }) => {
            console.log(res);
            this.market = res;
            this.resultsLength = this.market.length;
            console.log('market', this.market);

            callback({
              recordsTotal: 7459,
              recordsFiltered: 7459,
              lengthChange: true,
              data: [],
              //   data: res,
            });
          },
          (err) => console.log(err)
        );
      },
      columns: [
        { data: 'name' },
        { data: 'current_price' },
        { data: 'price_change_percentage_24h_in_currency' },
        { data: 'market_cap' },
        { data: 'ath' },
      ],
      // columns: [
      //   {
      //     title: 'Coin',
      //     data: 'name',
      //     searchable: false,
      //     render: function (name, type, data) {
      //       console.log('name');
      //       return (
      //         '<div  class="flex items-center"><img class="h-5 w-5 mr-4" src="' +
      //         data.image +
      //         '"/>' +
      //         name +
      //         ' (' +
      //         data.symbol +
      //         ')</div>'
      //       );
      //     },
      //   },
      //   {
      //     title: 'Last',
      //     data: 'current_price',
      //     searchable: false,
      //     orderable: false,
      //   },
      //   {
      //     title: '24h',
      //     data: 'price_change_percentage_24h',
      //     searchable: false,
      //     orderable: false,

      //     // render: function (price_change_percentage_24h) {
      //     //   return (
      //     //     '<app-price-change valueChange="' +
      //     //     price_change_percentage_24h +
      //     //     '"></app-price-change>'
      //     //   );
      //     // },
      //   },
      //   // {
      //   //   title: '24h',
      //   //   data: '24H',
      //   // },
      //   {
      //     title: 'MKT CAP',
      //     data: 'market_cap',
      //     searchable: false,
      //   },
      //   {
      //     title: 'ATH',
      //     data: 'ath',
      //     searchable: false,
      //   },
      // ],
      pagingType: 'full_numbers',
      pageLength: 25,
      serverSide: true,
      processing: true,
      searching: false,
      ordering: true,
      orderCellsTop: true,
      orderClasses: true,

      scrollY: 'calc(100vh - 230px)',
    };
  }
}
