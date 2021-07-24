import { Component, OnInit, ViewChild } from '@angular/core';
import { CoinGeckoService } from 'src/app/core/services/coin-gecko.service';
import {
  ApexDataLabels,
  ApexLegend,
  ApexTheme,
  ApexTooltip,
  ChartComponent,
} from 'ng-apexcharts';

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  theme: ApexTheme;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  tooltip: ApexTooltip;
};
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  global: any;
  market: any;
  trending: any[];
  currencies: any;
  dtOptions: DataTables.Settings;
  dtOptionsTrending: DataTables.Settings;

  currency: string;

  constructor(private coinGeckoService: CoinGeckoService) {
    this.currency = localStorage.getItem('vs_currency');
  }

  ngOnInit(): void {
    this.dtOptions = {
      info: false,
      paging: false,
      responsive: true,
    };
    this.dtOptionsTrending = {
      info: false,
      paging: false,
      ordering: false,
      searching: false,
    };
    this.coinGeckoService
      .getGlobal()
      .subscribe((res: { coins: any[]; exchanges: any[] }) => {
        this.global = res;
        console.log('global', this.global);
        this.setChartOptions();
      });

    this.coinGeckoService
      .getTrending()
      .subscribe((res: { coins: any[]; exchanges: any[] }) => {
        this.trending = res?.coins;
      });
  }
  setChartOptions() {
    this.chartOptions = {
      tooltip: {
        enabled: false,
      },
      series: [
        //  20, 20, 20,
        Number(this.global?.data?.market_cap_percentage.btc.toFixed(2)),
        Number(this.global?.data?.market_cap_percentage.eth.toFixed(2)),
        100 -
          this.global?.data?.market_cap_percentage.btc -
          this.global?.data?.market_cap_percentage.eth,
      ],
      chart: {
        type: 'pie',
      },

      theme: {
        palette: 'palette3',
        monochrome: {
          enabled: true,
          color: '#063970',
        },
      },
      labels: ['Bitcoin', 'Ethereum', 'Other'],
      dataLabels: {
        formatter(val) {
          return val.toFixed(2) + '%';
        },
      },
      legend: {
        show: false,
      },

      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 100,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
  }
}
