import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
  theme: ApexTheme;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  @Input() current: number;
  @Input() full: number;
  @Input() currency: number;

  public chartOptions: Partial<ChartOptions>;

  global: any;
  market: any;
  trending: any[];
  currencies: any;
  dtOptions: any;
  dtOptionsTrending: any;

  constructor() {}

  ngOnInit(): void {
    this.setChartOptions();
  }
  setChartOptions() {
    this.chartOptions = {
      series: [this.current, this.full - this.current],
      chart: {
        type: 'pie',
      },
      dataLabels: {
        enabled: false,
      },
      theme: {
        monochrome: {
          enabled: true,
        },
      },
      legend: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
    };
  }
}
