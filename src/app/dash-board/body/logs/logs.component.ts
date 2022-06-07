import { Component, OnInit } from '@angular/core';


export interface ILog {
  key: number;
  label: string;
  time: string;
  color: string;
}

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  data: ILog[] = [
    {
      label: 'Gym Equipments',
      time: '11:12',
      color: 'red',
      key: 0
    },
    {
      label: 'Food Items',
      time: '12:20',
      color: 'border-theme-2',
      key: 1
    },
    {
      label: 'Furniture',
      time: '12:55',
      color: 'border-danger',
      key: 2
    },
    {
      label: 'Electronics',
      time: '13:44',
      color: 'border-theme-2',
      key: 3
    },
    {
      label: 'Clothes',
      time: '14:30',
      color: 'border-theme-2',
      key: 4
    },
    {
      label: 'Toys',
      time: '15:00',
      color: 'border-theme-2',
      key: 5
    },
    {
      label: 'Kids Clothes',
      time: '15:20',
      color: 'border-danger',
      key: 6
    },
    {
      label: 'Jewellery',
      time: '17:38',
      color: 'border-theme-2',
      key: 7
    },
    {
      label: 'Garden items',
      time: '19:29',
      color: 'border-theme-2',
      key: 8
    },
    {
      label: 'Mobile Accesories',
      time: '20:40',
      color: 'border-theme-2',
      key: 9
    },
    {
      label: 'Home Appliences',
      time: '21:10',
      color: 'border-theme-2',
      key: 10
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
