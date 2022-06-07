import { Component, OnInit } from '@angular/core';
import * as go from 'gojs';



@Component({
    selector: 'app-state-chart',
    templateUrl: './state-chart.component.html',
    styleUrls: ['./state-chart.component.css']
})
export class StateChartComponent implements OnInit {
    constructor() { }

    ngOnInit() {
  
const $ = go.GraphObject.make;
let appEl:any;
 appEl = document.getElementById("app");
appEl.innerHTML = "";

const diagramEl = document.createElement("div");
diagramEl.style.width = "800px";
diagramEl.style.height = "800px";
appEl.appendChild(diagramEl);

const diagram = $(go.Diagram, diagramEl, {
  initialContentAlignment: go.Spot.Center, // for v1.*
  layout: $(go.TreeLayout, {
    layerSpacing: 35,
    alignment: go.TreeLayout.AlignmentStart
  }),
  DocumentBoundsChanged: function(e) {
    header.elt(0).width = e.diagram.documentBounds.width - 10;
  }
});

const header = $(
  go.Part,
  { position: new go.Point(0, -10), layerName: "Grid" },
  $(go.Shape, "RoundedRectangle", {
    fill: null,
    stroke: "lightgray"
  })
);

diagram.add(header);

diagram.nodeTemplate = $(
  go.Node,
  "Auto",
  { width: 80, height: 80 },
  $(
    go.Shape,
    "RoundedRectangle",
    { parameter1: 15, fill: "white", strokeWidth: 2, portId: "" },
    new go.Binding("stroke", "color"),
    new go.Binding("fill", "color", go.Brush.lighten)
  ),
  $(go.TextBlock, { editable: true }, new go.Binding("text"))
);

diagram.groupTemplate = $(
  go.Group,
  "Vertical",
  {
    layout: $(go.GridLayout, {
      wrappingColumn: 1,
      spacing: new go.Size(0, 30)
    })
  },
  $(
    go.Panel,
    "Auto",
    { width: 80, height: 80, margin: new go.Margin(0, 0, 20, 0) },
    $(
      go.Shape,
      "RoundedRectangle",
      { parameter1: 15, fill: "white", strokeWidth: 2, portId: "" },
      new go.Binding("stroke", "color")
    ),
    $(go.TextBlock, new go.Binding("text"))
  ),
  $(
    go.Panel,
    "Auto",
    $(go.Shape, "RoundedRectangle", { fill: null, stroke: "lightgray" }),
    $(go.Placeholder, { padding: 10 })
  )
);

diagram.model = new go.GraphLinksModel(
  [
    { key: 100, text: "A", isGroup: true, color: "darkblue" },
    { key: 200, text: "B", isGroup: true, color: "darkblue" },
    { key: 300, text: "C", isGroup: true, color: "darkblue" },
    { key: 101, text: "A.1", group: 100, color: "gray" },
    { key: 102, text: "A.2", group: 100, color: "mediumpurple" },
    { key: 103, text: "A.3", group: 100, color: "goldenrod" },
    { key: 104, text: "A.4", group: 100, color: "goldenrod" },
    { key: 201, text: "B.1", group: 200, color: "moccasin" },
    { key: 202, text: "B.2", group: 200, color: "goldenrod" },
    { key: 301, text: "C.1", group: 300, color: "moccasin" },
    { key: 302, text: "C.2", group: 300, color: "moccasin" },
    { key: 303, text: "C.3", group: 300, color: "moccasin" }
  ],
  [
    { from: 100, to: 200 },
    { from: 200, to: 300 },
    { from: 102, to: 103 },
    { from: 103, to: 104 },
    { from: 201, to: 202 },
    { from: 301, to: 302 }
  ]
);


}
}

 