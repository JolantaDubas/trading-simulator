import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexChart,
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexFill,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip,
  ApexMarkers,
  ApexAnnotations,
  ApexStroke,
} from 'ng-apexcharts';
import { CgChartService } from 'src/app/core/services/cg-chart.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  title: ApexTitleSubtitle;
  fill: ApexFill;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  annotations: ApexAnnotations;
  colors: any;
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
    '14': {},
    '30': {},
    max: {},
  };
  public chartOptions2: Partial<ChartOptions>;

  tmin: number;
  tmax: number;
  fullData: any;
  rangeData: any;

  currency: string;
  constructor(private cgChartService: CgChartService) {
    this.currency = localStorage.getItem('vs_currency');
  }

  ngOnInit(): void {
    this.cgChartService
      .getFullData({
        id: this.id,
        vs_currency: this.currency,
        days: this.activeOptionButton,
      })
      .subscribe((res: any) => {
        this.fullData = res;
        this.tmin = res?.prices[0][0];
        let length = res?.prices?.length;
        this.tmax = this.fullData?.prices[length - 1][0];
        this.setChartData();
      });

    // this.cgChartService
    //   .getRangeData({
    //     id: this.id,
    //     vs_currency: this.currency,
    //     from: this.updateOptionsData[this.activeOptionButton].xaxis.min,
    //     to: this.updateOptionsData[this.activeOptionButton].xaxis.max,
    //   })
    //   .subscribe((res: any) => {
    //     this.rangeData = res?.prices;
    //     return res?.prices;
    //   });
  }

  setChartData() {
    this.chartOptions = {
      series: [
        {
          data: this.fullData.prices,
        },
      ],
      chart: {
        type: 'area',
        height: 500,
        // animations: {
        //   enabled: false,
        // },
        events: {
          zoomed: (chartContext, { xaxis, yaxis }) => {
            console.log(chartContext, xaxis.min, xaxis.max);

            this.generateRangeData(xaxis.min / 1000, xaxis.max / 1000);

            // ...
          },
        },
      },

      yaxis: {
        title: {
          text: 'Price',
        },
      },
      xaxis: {
        type: 'datetime',
        tickAmount: 6,
        title: {
          text: 'Time',
        },
      },
      annotations: {
        // yaxis: [
        //   {
        //     y: 30,
        //     borderColor: '#999',
        //     label: {
        //       text: 'Support',
        //       style: {
        //         color: '#fff',
        //         background: '#00E396',
        //       },
        //     },
        //   },
        // ],\

        xaxis: [
          {
            x: undefined,
            borderColor: '#999',
            label: {
              text: 'Rally',
              style: {
                color: '#fff',
                background: '#775DD0',
              },
            },
          },
        ],
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
      },

      tooltip: {
        x: {
          format: 'dd MMM yyyy',
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 100],
        },
      },
    };
    // this.chartOptions2 = {
    //   series: [
    //     {
    //       name: 'series1',
    //       data: this.fullData?.prices,
    //     },
    //   ],
    //   chart: {
    //     id: 'chart1',
    //     height: 130,
    //     type: 'area',
    //     brush: {
    //       target: 'chart2',
    //       enabled: true,
    //     },
    //     selection: {
    //       enabled: true,
    //       xaxis: {
    //         min: new Date('19 Jun 2020').getTime(),
    //         max: new Date('14 Aug 2020').getTime(),
    //       },
    //     },
    //     events: {
    //       click: function (chart2Contect, config) {
    //         console.log('mounted', chart2Contect, config);
    //         console.log(
    //           'max,min',
    //           this.chartOptions2,
    //           config.opts.chart.selection.xaxis.max
    //         );
    //         // this.cgChartService
    //         //   .getRangeData({
    //         //     id: this.id,
    //         //     vs_currency: 'usd',
    //         //     from: this.chart2Contect. .xaxis.min,
    //         //     to: this.chart2Contect. .xaxis.max,
    //         //   })
    //         //   .subscribe((res: any) => {
    //         //     console.log('rangeData', res?.prices);
    //         //     this.chartOptions1.series = [{ data: res?.prices }];
    //         //   });
    //       },
    //     },
    //   },
    //   colors: ['#008FFB'],
    //   fill: {
    //     type: 'gradient',
    //     gradient: {
    //       opacityFrom: 0.91,
    //       opacityTo: 0.1,
    //     },
    //   },
    //   xaxis: {
    //     type: 'datetime',
    //     tooltip: {
    //       enabled: false,
    //     },
    //   },
    //   yaxis: {
    //     tickAmount: 2,
    //   },
    // };
  }

  // updateSeries() {
  //   this.cgChartService
  //     .getRangeData({
  //       id: this.id,
  //       vs_currency: 'usd',
  //       from: this.chartOptions2.xaxis.min,
  //       to: this.chartOptions2.xaxis.max,
  //     })
  //     .subscribe((res: any) => {
  //       console.log('rangeData', res?.prices);
  //       this.chartOptions1.series = [{ data: res?.prices }];
  //     });
  // }

  public updateOptions(option: any): void {
    let div: number;
    this.activeOptionButton = option;
    console.log('active', this.activeOptionButton);
    this.cgChartService
      .getFullData({
        id: this.id,
        vs_currency: this.currency,
        days: option,
      })
      .subscribe((res: any) => {
        this.fullData = res;
        let filtered = res?.prices;

        this.chart.updateOptions(
          this.updateOptionsData[option],
          false,
          false,
          false
        );
        if (res?.prices.length > 500) {
          div = Math.round(res?.prices.length / 500);
          filtered = res?.prices.filter((a, i) => i % div === 0);
        }
        this.chart.updateSeries(
          [
            {
              data: filtered,
            },
          ],
          false
        );
      });
  }
  public generateRangeData(from, to): void {
    let div: number;

    this.cgChartService
      .getRangeData({
        id: this.id,
        vs_currency: this.currency,
        from: from,
        to: to,
      })
      .subscribe((res: any) => {
        console.log('rangeData', res?.prices);
        let filtered = res?.prices;

        if (res?.prices.length > 500) {
          div = Math.round(res?.prices.length / 500);
          filtered = res?.prices.filter((a, i) => i % div === 0);
        }
        this.chart.updateSeries(
          [
            {
              data: filtered,
            },
          ],
          false
        );

        return res?.prices;
      });
  }
}
