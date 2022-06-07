import { Component, OnInit, ViewChild, } from '@angular/core';
import { ChartComponent } from "ng-apexcharts";
import { ApexNonAxisChartSeries, ApexResponsive, ApexChart, ApexPlotOptions, ApexGrid, } from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries | any;
  chart: ApexChart | any;
  responsive: ApexResponsive[] | any;
  plotOptions: ApexPlotOptions | any;
  // grid: ApexGrid | any;
  labels: any;
};

@Component({
  selector: 'app-body-piechart',
  templateUrl: './body-piechart.component.html',
  styleUrls: ['./body-piechart.component.css']
})
export class BodyPiechartComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;

  ngOnInit() {
  }

  constructor() {

    this.chartOptions = {
      series: [44, 55, 13, 43, 22],
      chart: {
        type: "donut",
        height: 200,
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 80
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }
}



