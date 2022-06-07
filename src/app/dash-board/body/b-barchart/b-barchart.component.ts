// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-b-barchart',
//   templateUrl: './b-barchart.component.html',
//   styleUrls: ['./b-barchart.component.css']
// })
// export class BBarchartComponent implements OnInit {

//   name = 'Angular';
//   view: any[] = [300, 200];
//   // let view: any[number,number];
    // view=[300, 250];
//   width: number = 500;
//   height: number = 100;
//   fitContainer: boolean = false;
//   showXAxis: boolean = true;
//   showYAxis: boolean = true;
//   gradient: boolean = true;
//   showXAxisLabel: boolean = true;
//   xAxisLabel: string = 'Country';
//   showYAxisLabel: boolean = true;
//   yAxisLabel: string = 'Sales';
//   timeline: boolean = true;
//   doughnut: boolean = true;
//   // showLegend = true;
//   colorScheme: any = {
//     domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB']
//   };
//   showLabels: boolean = true;
//   single = [
//     {
//       "name": "China",
//       "value": 22564
//     },
//     {
//       "name": "USA",
//       "value": 15987
//     },
//     {
//       "name": "Norway",
//       "value": 62150
//     },
//     {
//       "name": "Japan",
//       "value": 57363
//     },
//     {
//       "name": "Germany",
//       "value": 66750
//     },
//     {
//       "name": "France",
//       "value": 54617
//     }
//   ];
//   // public multi = [
//   //   {
//   //     "name": "China",
//   //     "series": [
//   //       {
//   //         "name": "2018",
//   //         "value": 2243772
//   //       },
//   //       {
//   //         "name": "2017",
//   //         "value": 1227770
//   //       }
//   //     ]
//   //   },
//   //   {
//   //     "name": "USA",
//   //     "series": [
//   //       {
//   //         "name": "2018",
//   //         "value": 1126000
//   //       },
//   //       {
//   //         "name": "2017",
//   //         "value": 764666
//   //       }
//   //     ]
//   //   },
//   //   {
//   //     "name": "Norway",
//   //     "series": [
//   //       {
//   //         "name": "2018",
//   //         "value": 296215
//   //       },
//   //       {
//   //         "name": "2017",
//   //         "value": 209122
//   //       }
//   //     ]
//   //   },
//   //   {
//   //     "name": "Japan",
//   //     "series": [
//   //       {
//   //         "name": "2018",
//   //         "value": 257363
//   //       },
//   //       {
//   //         "name": "2017",
//   //         "value": 205350
//   //       }
//   //     ]
//   //   },
//   //   {
//   //     "name": "Germany",
//   //     "series": [
//   //       {
//   //         "name": "2018",
//   //         "value": 196750
//   //       },
//   //       {
//   //         "name": "2017",
//   //         "value": 129246
//   //       }
//   //     ]
//   //   },
//   //   {
//   //     "name": "France",
//   //     "series": [
//   //       {
//   //         "name": "2018",
//   //         "value": 204617
//   //       },
//   //       {
//   //         "name": "2017",
//   //         "value": 149797
//   //       }
//   //     ]
//   //   }
//   // ];

//   onSelect(event: any) {

//   }
//   ngOnInit(): void {
//   }

//   constructor() { }

// }



import { Component, OnInit } from "@angular/core";

import { Chart } from "chart.js";

@Component({
     selector: 'app-b-barchart',
     templateUrl: './b-barchart.component.html',
     styleUrls: ['./b-barchart.component.css']
   })

export class BBarchartComponent {
  public chart: Chart | undefined;
  ngOnInit() {
    this.chart = new Chart("canvas", 
    {
      type: "bar",
    

      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      },
      
 
    });
  }
  onSelect(event:any){
    
  }
}