import { Component, OnInit } from '@angular/core';
import { single } from './Data';

@Component({
  selector: 'app-tree-chart',
  templateUrl: './tree-chart.component.html',
  styleUrls: ['./tree-chart.component.css']
})
export class TreeChartComponent implements OnInit {
  single?: any[];
  // view: any[] = [];
  // domain?: any[];

  colorScheme:any = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  cardColor: any = '#232837';

  constructor() {
    Object.assign(this, { single });
  }

  onSelect(event: any) {
    console.log(event);
  }

  ngOnInit() {
  }
}
