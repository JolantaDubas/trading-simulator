import { Component, Input, OnInit } from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexTooltip,
  ApexXAxis,
  ApexLegend,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexPlotOptions,
  ApexYAxis,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  markers: any; //ApexMarkers;
  stroke: any; //ApexStroke;
  yaxis: ApexYAxis | ApexYAxis[];
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  colors: string[];
  labels: string[] | number[];
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
  legend: ApexLegend;
  fill: ApexFill;
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

  public chartLineSparkline1Options: Partial<ChartOptions>;

  public commonLineSparklineOptions = {
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
      fixed: {
        enabled: false,
      },
      x: {
        show: false,
      },
      y: {
        // title: {
        //   formatter: function (seriesName) {
        //     return '';
        //   },
        // },
      },
      marker: {
        show: false,
      },
    },
  };
  constructor() {
    window.Apex = {
      stroke: {
        width: 3,
      },
      markers: {
        size: 0,
      },
      tooltip: {
        fixed: {
          enabled: true,
        },
      },
    };
  }

  ngOnInit(): void {
    let div: number;
    let filtered = this.data;
    if (this.data.length > 20) {
      div = Math.round(this.data.length / 20);
      filtered = this.data.filter((a, i) => i % div === 0);
    }
    this.chartLineSparkline1Options = {
      series: [
        {
          name: 'chart-line-sparkline',
          data: filtered,
        },
      ],
    };
  }
}
