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
      // fixed: {
      //   enabled: false,
      // },
      // x: {
      //   show: false,
      // },

      // marker: {
      //   show: false,
      // },
      // shared: true,
      // intersect: false,
      // y: [
      //   {
      //     formatter: function (y) {
      //       if (typeof y !== 'undefined') {
      //         return y.toLocaleString();
      //       }
      //       return y;
      //     },
      //   },
      // ],
    },
    stroke: {
      width: 2,
    },
  };
  constructor() {
    // window.Apex = {
    //   stroke: {
    //     width: 2,
    //   },
    //   tooltip: {
    //     fixed: {
    //       enabled: true,
    //     },
    //   },
    // };
  }

  ngOnInit(): void {
    let div: number;
    let filtered = [];
    if (this.data.length > 10) {
      div = Math.round(this.data.length / 10);

      // for (let i = 0, j = 0; i < this.data.length; i++) {
      //   if (i % div === 0) {
      //     filtered[j] = this.data[i];
      //     j++;
      //   }

      //   // filtered = this.data[i].
      //   // console.log ("Block statement execution no." + i);
      // }

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
