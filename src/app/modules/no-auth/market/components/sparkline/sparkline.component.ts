import { getCurrencySymbol } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

import { ApexAxisChartSeries, ApexChart, ApexTooltip } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  stroke: any; //ApexStroke;

  tooltip: ApexTooltip;
};

declare global {
  interface Window {
    Apex: any;
  }
}
@Component({
  selector: 'app-sparkline',
  templateUrl: './sparkline.component.html',
  styleUrls: ['./sparkline.component.scss'],
})
export class SparklineComponent implements OnInit {
  @Input() data: number[];
  @Input() currency: string;

  public chartLineSparkline1Options: Partial<ChartOptions>;

  public commonLineSparklineOptions: Partial<ChartOptions> = {
    chart: {
      type: 'line',
      width: 100,
      height: 35,
      sparkline: {
        enabled: true,
      },
      animations: {
        enabled: false,
      },
    },
    tooltip: {
      enabled: false,
    },
    stroke: {
      width: 2,
    },
  };
  constructor() {}

  ngOnInit(): void {
    let div: number;
    let filtered = [];
    if (this.data.length > 10) {
      div = Math.round(this.data.length / 10);

      filtered = this.data.filter((a, i) => i % div === 0);
    } else filtered = this.data;
    this.chartLineSparkline1Options = {
      series: [
        {
          name: '',
          data: filtered,
        },
      ],
    };
  }
}
