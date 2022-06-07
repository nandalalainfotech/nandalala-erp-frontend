import { Component, OnInit, ViewChild } from '@angular/core';
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
  ApexYAxis
} from "ng-apexcharts";

export type ChartOptions = {
  series?: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  xaxis: ApexXAxis | any;
  markers: any; //ApexMarkers;
  stroke: any; //ApexStroke;
  yaxis: ApexYAxis | ApexYAxis[] | any;
  plotOptions: ApexPlotOptions | any;
  dataLabels: ApexDataLabels | any;
  // colors: string[];
  labels: string[] | number[] | any;
  title: ApexTitleSubtitle | any;
  subtitle: ApexTitleSubtitle | any;
  legend: ApexLegend | any;
  fill: ApexFill | any;
  tooltip: ApexTooltip | any;
};

declare global {
  interface Window {
    Apex: any;
  }
}

const sparkLineData = [
  47,
  45,
  54,
  38, 
  20,
  55,
  23,
  48,
  98,
  29,
  55,
  87,
  70,
  57,
  88,
  80,
  76,
  60,
  68,
  91,
  71,
  50,
  25,
  24,
  10,
  25,
  55,
  88,
  77

];

@Component({
  selector: 'app-card-chart2',
  templateUrl: './card-chart2.component.html',
  styleUrls: ['./card-chart2.component.css']
})
export class CardChart2Component implements OnInit {
  

  [x: string]: any;

  @ViewChild("chart") chart?: ChartComponent;
  public chartOptions?: Partial<ChartOptions>;
  public commonAreaSparlineOptions: Partial<ChartOptions> = {
    chart: {
      type: "area",
      height: 160,
      width:250,
    
      sparkline: {
        enabled: true
      }
    },
    stroke: {
      curve: "smooth"
    },
    fill: {
      opacity: 0.3
    },
    yaxis: {
      min: 0
    }
  };

  ngOnInit(): void {
  }

  constructor() { 

    window.Apex = {
        stroke: {
          width: 3
        },
        markers: {
          size: 0
        },
        tooltip: {
          fixed: {
            enabled: true
          }
        }
      };
  
      this.chartAreaSparkline1Options = {
        series: [
          {
            name: "chart-big-sparkline",
            data: this.randomizeArray(sparkLineData)
          }
        ],
        colors: ["rgb 209, 27, 64"],
        title: {
          text: "$424,652",
          offsetX: 0,
          style: {
            fontSize: "20px",
  
          }
        },
        subtitle: {
          text: "Sales",
          offsetX: 0,
          style: {
            fontSize: "14px"
          }
        }
      };
    }
  
  
    public randomizeArray(arg: any): number[] {
      var array = arg.slice();
      var currentIndex = array.length,
        temporaryValue,
        randomIndex;
  
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
  
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
  
      return array;
    }
  }
  
 

