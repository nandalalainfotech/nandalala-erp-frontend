import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ElementRef  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';


import * as go from 'gojs';
import { DraggingTool } from 'gojs';
import { GoJsChartModel1Component } from '../go-js-chart-model1/go-js-chart-model1.component';

@Component({
  selector: 'app-go-js-chart-model',
  templateUrl: './go-js-chart-model.component.html',
  styleUrls: ['./go-js-chart-model.component.css']
})
export class GoJsChartModelComponent implements OnInit {

  private diagram: go.Diagram = new go.Diagram();
  // private palette: go.Palette = new go.Palette();

  @ViewChild('diagramDiv', { static: true })
  private diagramRef!: ElementRef;

  // @ViewChild('paletteDiv' , { static: true })
  // private paletteRef!: ElementRef;

  @Input()
  get model(): go.Model { return this.diagram.model; }
  set model(val: go.Model) { this.diagram.model = val; }

  @Output()
  nodeSelected = new EventEmitter<go.Node|null>();

  @Output()
  modelChanged = new EventEmitter<go.ChangedEvent>();

  constructor(public dialog: MatDialog) {
    const $ = go.GraphObject.make;
    // Place GoJS license key here:
    // (go as any).licenseKey = "..."
    this.diagram = new go.Diagram();
    this.diagram.initialContentAlignment = go.Spot.Center;
    this.diagram.allowDrop = true;
    this.diagram.undoManager.isEnabled = true;
    this.diagram.toolManager.draggingTool = new DraggingTool();
    this.diagram.addDiagramListener("ChangedSelection",
        e => {
          const node = e.diagram.selection.first();
          this.nodeSelected.emit(node instanceof go.Node ? node : null);
        });
    this.diagram.addModelChangedListener(e => e.isTransactionFinished && this.modelChanged.emit(e));

    this.diagram.nodeTemplate =
      $(go.Node, "Auto",
        // {
        //   click: (e, node: go.Node) => { this.openDialog(node.data); }
        // },
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape,
          {
            fill: "white", strokeWidth: 0,
            portId: "", cursor: "pointer",
            // allow many kinds of links
            fromLinkable: true, toLinkable: true,
            fromLinkableSelfNode: true, toLinkableSelfNode: true,
            fromLinkableDuplicates: true, toLinkableDuplicates: true
          },
          new go.Binding("fill", "color")),
        $(go.TextBlock,
          { margin: 8 /*, editable: true*/ },
          new go.Binding("text")/*.makeTwoWay()*/)
      );

    this.diagram.linkTemplate =
      $(go.Link,
        // allow relinking
        { relinkableFrom: true, relinkableTo: true },
        $(go.Shape),
        $(go.Shape, { toArrow: "OpenTriangle" })
      );

    // this.palette = new go.Palette();
    // this.palette.nodeTemplateMap = this.diagram.nodeTemplateMap;

    // initialize contents of Palette
    // this.palette.model.nodeDataArray =
    //   [
    //     { text: "Alpha", color: "lightblue" },
    //     { text: "Beta", color: "orange" },
    //     { text: "Gamma", color: "lightgreen" },
    //     { text: "Delta", color: "pink" },
    //     { text: "Epsilon", color: "yellow" }
    //   ];
  }



  openDialog(data: any): void {
    const dialogRef = this.dialog.open(GoJsChartModel1Component, {
      width: '250px',
      data: { key: data.key, text: data.text, color: data.color }
    });

    dialogRef.afterClosed().subscribe((result: { text: any; color: any; }) => {
      if (result) {
        this.diagram.model.commit(function(m) {
          m.set(data, "text", result.text);
          m.set(data, "color", result.color);
        }, "modified node properties");
      }
    });
  }
  ngOnInit() {
    this.diagram.div = this.diagramRef.nativeElement;
    // this.palette.div = this.paletteRef.nativeElement;
  }
}


