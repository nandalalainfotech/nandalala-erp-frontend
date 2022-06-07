import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent, ApexAxisChartSeries, ApexChart, ApexXAxis, ApexDataLabels,
  ApexTitleSubtitle, ApexStroke, ApexGrid, ApexFill, ApexMarkers, ApexYAxis, ApexPlotOptions} from "ng-apexcharts";

  export type ChartOptions = {
    series: ApexAxisChartSeries | any;
    chart: ApexChart | any;
    dataLabels: ApexDataLabels | any;
    plotOptions: ApexPlotOptions | any;
    yaxis: ApexYAxis | any;
    xaxis: ApexXAxis | any;
  };
  

@Component({
  selector: 'app-body-chart',
  templateUrl: './body-chart.component.html',
  styleUrls: ['./body-chart.component.css']
})
export class BodyChartComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;


  ngOnInit() {
 
  }
  
  constructor() { 
  
      this.chartOptions =  {
  
        series: [{
          name: 'Cash Flow',
          data: [1.45, 5.42, 5.9, -0.42, -12.6, -18.1, -18.2, -14.16, -11.1, -6.09, 0.34, 3.88, 13.07,
            5.8, 2, 7.37, 8.1, 13.57, 15.75, 17.1, 19.8, -27.03, -54.4, -47.2, -43.3, -18.6, -
            48.6, -41.1, -39.6, -37.6, -29.4, -21.4, -2.4
          ]
        }],
          chart: {
          type: 'bar',
          height: 250,
          // border: 20,
           toolbar: {
        show: false
      }
        },
        plotOptions: {
          bar: {
            colors: {
              ranges: [{
                from: -100,
                to: -46,
                color: '#F15B46'
              }, {
                from: -45,
                to: 0,
                color: '#FEB019'
              }]
            },
            columnWidth: '80%',
          }
        },
        dataLabels: {
          enabled: false,
        },
        yaxis: {
          title: {
            text: 'Growth',
          },
          labels: {
            formatter: function (y: any) {
              return y.toFixed(0) + "%";
            }
          }
        },
        xaxis: {
          type: 'datetime',
          categories: [
            '2011-01-01', '2011-02-01', '2011-03-01', '2011-04-01', '2011-05-01', '2011-06-01',
            '2011-07-01', '2011-08-01', '2011-09-01', '2011-10-01', '2011-11-01', '2011-12-01',
            '2012-01-01', '2012-02-01', '2012-03-01', '2012-04-01', '2012-05-01', '2012-06-01',
            '2012-07-01', '2012-08-01', '2012-09-01', '2012-10-01', '2012-11-01', '2012-12-01',
            '2013-01-01', '2013-02-01', '2013-03-01', '2013-04-01', '2013-05-01', '2013-06-01',
            '2013-07-01', '2013-08-01', '2013-09-01'
          ],
          labels: {
            rotate: -90
          }
        }
        };

      }
    }