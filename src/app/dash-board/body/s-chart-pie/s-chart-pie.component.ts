import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-s-chart-pie',
  templateUrl: './s-chart-pie.component.html',
  styleUrls: ['./s-chart-pie.component.css']
})
export class SChartPieComponent implements OnInit {


  // set the dimensions and margins of the graph
  width = 150;
  height = 150;
  // margin = 40;
  // width?: number;
  constructor() { }
  ngOnInit(): void {
    //set data
    let data = [2, 4, 8, 10];
    let svg = d3.select("svg");
      // width = svg.attr("450"),
      // height = svg.attr("height"),
      const radius = Math.min(this.width, this.height) / 2,
      g = svg.append("g").attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")");
    var color = d3.scaleOrdinal(['#4DAF4A', '#377EB8', '#FF7F00', '#984EA3', '#E41A1C']);
    // Generate the pie
    var pie = d3.pie();
    // Generate the arcs
    let arc: any;
    arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);
    //Generate groups
    var arcs = g.selectAll("arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc")
    //Draw arc paths
    arcs.append("path")
      .attr("fill", function (d, i: any) {
        return color(i);
      })
      .attr("d", arc);
  }
}