import { getCurrencySymbol } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexChart,
  ApexAxisChartSeries,
  ApexDataLabels,
  ApexFill,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip,
} from 'ng-apexcharts';
import { CgChartService } from 'src/app/core/services/cg-chart.service';
import { NomicsService } from 'src/app/core/services/nomics.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  fill: ApexFill;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  tooltip: ApexTooltip;
  toolbar: any;
};

@Component({
  selector: 'app-diagrams',
  templateUrl: './diagrams.component.html',
  styleUrls: ['./diagrams.component.scss'],
})
export class DiagramsComponent implements OnInit {
  @Input() id: string;
  @ViewChild('chart', { static: false }) chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public activeOptionButton = '1';
  public updateOptionsData = {
    '1': {},
    '7': {},
    '14': {},
    '30': {},
    max: {},
  };

  tmin: number;
  tmax: number;
  fullData: any;
  rangeData: any;

  current: number;
  percentChange: number;
  currency: string;
  constructor(
    private cgChartService: CgChartService,
    private nomicsService: NomicsService
  ) {
    this.currency = localStorage.getItem('vs_currency');
  }

  ngOnInit(): void {
    if (this.id === 'market_cap') {
      this.nomicsService
        .getMarketCap({
          start: new Date(
            Date.now() - Number(this.activeOptionButton) * 24 * 60 * 60 * 1000
          ).toISOString(),
          end: new Date().toISOString(),
          currency: this.currency,
        })
        .subscribe((res: any[]) => {
          this.fullData = res.map(
            (item: { timestamp: string; market_cap: string }) => {
              return [Date.parse(item.timestamp), item.market_cap];
            }
          );

          this.setChartData(this.currency);
        });
    } else {
      this.cgChartService
        .getFullData({
          id: this.id,
          vs_currency: this.currency,
          days: this.activeOptionButton,
        })
        .subscribe((res: any) => {
          this.fullData = res.prices;
          this.setChartData(this.currency);
        });
    }
  }

  setChartData(currency) {
    let length = this.fullData.length;
    this.tmin = this.fullData[0][0];
    this.tmax = this.fullData[length - 1][0];
    this.current = this.fullData[length - 1][1];
    this.percentChange =
      (100 * (this.current - this.fullData[0][1])) / this.fullData[0][1];
    this.chartOptions = {
      series: [
        {
          data: this.fullData,
        },
      ],
      chart: {
        type: 'area',
        height: 500,
        events: {
          zoomed: (context, { xaxis }) => {
            if (this.id !== 'market_cap')
              this.generateRangeData(xaxis.min / 1000, xaxis.max / 1000);
            else this.generateMarketCapRangeData(xaxis.min, xaxis.max);
          },
        },
        toolbar: {
          tools: {
            pan: false,
            reset: false,
          },
        },
      },

      yaxis: {
        title: {
          text: 'Price',
        },
        labels: {
          formatter: function (value) {
            return (
              value.toLocaleString() +
              ' ' +
              getCurrencySymbol(currency, 'narrow')
            );
          },
        },
      },
      xaxis: {
        type: 'datetime',
        tickAmount: 6,
        title: {
          text: 'Time',
        },
        labels: {
          datetimeUTC: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        fixed: {
          enabled: false,
        },
        x: {
          format: 'dd MMM yyyy HH:mm',
        },
      },
      fill: {
        type: 'gradient',
      },
    };
  }

  public updateOptions(option: string) {
    this.activeOptionButton = option;

    this.cgChartService
      .getFullData({
        id: this.id,
        vs_currency: this.currency,
        days: option,
      })
      .subscribe((res: any) => {
        this.updateSeries(res?.prices);
      });
  }

  public updateMarketCapOptions(option: string) {
    this.activeOptionButton = option;

    const end = new Date().toISOString();
    let start: string;
    if (option === 'max') start = '2011-09-17T02:00:00-00:00';
    else
      start = new Date(
        Date.now() - Number(option) * 24 * 60 * 60 * 1000
      ).toISOString();

    this.nomicsService
      .getMarketCap({
        start: start,
        end: end,
        currency: this.currency,
      })
      .subscribe(
        (res: { timestamp: string; market_cap: string }[]) => {
          const fullData = res.map((item) => {
            return [Date.parse(item.timestamp), item.market_cap];
          });
          this.updateSeries(fullData);
        },
        (err) => console.log(err)
      );
  }
  public generateRangeData(from, to): void {
    this.activeOptionButton = '';
    this.cgChartService
      .getRangeData({
        id: this.id,
        vs_currency: this.currency,
        from: from,
        to: to,
      })
      .subscribe((res: any) => {
        this.updateSeries(res?.prices);
      });
  }

  public generateMarketCapRangeData(from, to): void {
    this.activeOptionButton = '';
    this.nomicsService
      .getMarketCap({
        start: new Date(from).toISOString(),
        end: new Date(to).toISOString(),
        currency: this.currency,
      })
      .subscribe((res: { timestamp: string; market_cap: string }[]) => {
        const fullData = res.map((item) => [
          Date.parse(item.timestamp),
          item.market_cap,
        ]);

        this.updateSeries(fullData);
      });
  }

  updateSeries(filtered, option?) {
    this.percentChange =
      (100 * (this.current - filtered[0][1])) / filtered[0][1];

    let div: number;
    if (option) {
      this.chart.updateOptions(
        this.updateOptionsData[option],
        false,
        false,
        false
      );
    }
    if (filtered.length > 500) {
      div = Math.round(filtered.length / 500);
      filtered = filtered.filter((a, i) => i % div === 0);
    }
    this.chart.updateSeries(
      [
        {
          data: filtered,
        },
      ],
      false
    );
  }
}
