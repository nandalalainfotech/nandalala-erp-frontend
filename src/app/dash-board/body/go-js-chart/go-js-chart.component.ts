import { Component, OnInit,  } from '@angular/core';
import * as go from 'gojs';


@Component({
  selector: 'app-go-js-chart',
  templateUrl: './go-js-chart.component.html',
  styleUrls: ['./go-js-chart.component.css']
})
export class GoJsChartComponent implements OnInit {
  constructor() {}
  ngOnInit() {
    
  }
 
   model = new go.GraphLinksModel(
    [
      { key: 1, text: "Enterprise Co", color: "lightblue" },
      { key: 2, text: "East Coast Group", color: "orange" },
      { key: 3, text: "West Coast Group", color: "orange" },
      { key: 4, text: "Eastern Foreign", color: "orange" },
      { key: 5, text: "Eastern Domestic", color: "orange" },
      { key: 6, text: "Western Foreign", color: "orange" },
      { key: 11, text: 'Boston BMW', color: "pink", otherInfo: { stuff: 'things' } },
      { key: 12, text: 'Baltimore BMW', color: "pink" },
      { key: 18, text: 'Nissan Nashville', color: "pink" },
      { key: 15, text: 'Cleveland Chevy', color: "pink" },
      { key: 13, text: 'Tucson Toyota', color: "pink" },
      { key: 14, text: 'Houston Honda', color: "pink" },
      { key: 16, text: 'Seattle Subaru', color: "pink" },
      { key: 17, text: 'Kirkland Kia', color: "pink" },
      { key: 19, text: 'Volvo Vancouver', color: "pink" }
    ],
    [
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 4 },
      { from: 2, to: 5 },
      { from: 3, to: 6 },
      { from: 4, to: 11 },
      { from: 4, to: 12 },
      { from: 4, to: 18 },
      { from: 5, to: 15 },
      { from: 6, to: 13 },
      { from: 6, to: 14 },
      { from: 6, to: 16 },
      { from: 6, to: 17 },
      { from: 6, to: 19 }
    ]);
}
  



// name = 'Angular';

//   @ViewChild(DiagramComponent, {static: false}) diagramComponent!: DiagramComponent;

//   familyData = [
//     { key: 0, name: 'George V', gender: 'M', birthYear: '1865', deathYear: '1936', reign: '1910-1936' },
//     { key: 1, parent: 0, name: 'Edward VIII', gender: 'M', birthYear: '1894', deathYear: '1972', reign: '1936' },
//     { key: 2, parent: 0, name: 'George VI', gender: 'M', birthYear: '1895', deathYear: '1952', reign: '1936-1952' },
//     { key: 7, parent: 2, name: 'Elizabeth II', gender: 'F', birthYear: '1926', reign: '1952-' },
//     { key: 16, parent: 7, name: 'Charles, Prince of Wales', gender: 'M', birthYear: '1948' },
//     { key: 38, parent: 16, name: 'Prince William', gender: 'M', birthYear: '1982' },
//     { key: 39, parent: 16, name: 'Prince Harry of Wales', gender: 'M', birthYear: '1984' },
//     { key: 17, parent: 7, name: 'Anne, Princess Royal', gender: 'F', birthYear: '1950' },
//     { key: 40, parent: 17, name: 'Peter Phillips', gender: 'M', birthYear: '1977' },
//     { key: 82, parent: 40, name: 'Savannah Phillips', gender: 'F', birthYear: '2010' },
//     { key: 41, parent: 17, name: 'Zara Phillips', gender: 'F', birthYear: '1981' },
//     { key: 18, parent: 7, name: 'Prince Andrew', gender: 'M', birthYear: '1960' },
//     { key: 42, parent: 18, name: 'Princess Beatrice of York', gender: 'F', birthYear: '1988' },
//     { key: 43, parent: 18, name: 'Princess Eugenie of York', gender: 'F', birthYear: '1990' },
//     { key: 19, parent: 7, name: 'Prince Edward', gender: 'M', birthYear: '1964' },
//     { key: 44, parent: 19, name: 'Lady Louise Windsor', gender: 'F', birthYear: '2003' },
//     { key: 45, parent: 19, name: 'James, Viscount Severn', gender: 'M', birthYear: '2007' },
//     { key: 8, parent: 2, name: 'Princess Margaret', gender: 'F', birthYear: '1930', deathYear: '2002' },
//     { key: 20, parent: 8, name: 'David Armstrong-Jones', gender: 'M', birthYear: '1961' },
//     { key: 21, parent: 8, name: 'Lady Sarah Chatto', gender: 'F', birthYear: '1964' },
//     { key: 46, parent: 21, name: 'Samuel Chatto', gender: 'M', birthYear: '1996' },
//     { key: 47, parent: 21, name: 'Arthur Chatto', gender: 'M', birthYear: '1999' },
//     { key: 3, parent: 0, name: 'Mary, Princess Royal', gender: 'F', birthYear: '1897', deathYear: '1965' },
//     { key: 9, parent: 3, name: 'George Lascelles', gender: 'M', birthYear: '1923', deathYear: '2011' },
//     { key: 22, parent: 9, name: 'David Lascelles', gender: 'M', birthYear: '1950' },
//     { key: 48, parent: 22, name: 'Emily Shard', gender: 'F', birthYear: '1975' },
//     { key: 49, parent: 22, name: 'Benjamin Lascelles', gender: 'M', birthYear: '1978' },
//     { key: 50, parent: 22, name: 'Alexander Lascelles', gender: 'M', birthYear: '1980' },
//     { key: 51, parent: 22, name: 'Edward Lascelles', gender: 'M', birthYear: '1982' },
//     { key: 23, parent: 9, name: 'James Lascelles', gender: 'M', birthYear: '1953' },
//     { key: 52, parent: 23, name: 'Sophie Lascelles', gender: 'F', birthYear: '1973' },
//     { key: 53, parent: 23, name: 'Rowan Lascelles', gender: 'M', birthYear: '1977' },
//     { key: 54, parent: 23, name: 'Tanit Lascelles', gender: 'F', birthYear: '1981' },
//     { key: 55, parent: 23, name: 'Tewa Lascelles', gender: 'M', birthYear: '1985' },
//     { key: 24, parent: 9, name: 'Jeremy Lascelles', gender: 'M', birthYear: '1955' },
//     { key: 56, parent: 24, name: 'Thomas Lascelles', gender: 'M', birthYear: '1982' },
//     { key: 57, parent: 24, name: 'Ellen Lascelles', gender: 'F', birthYear: '1984' },
//     { key: 58, parent: 24, name: 'Amy Lascelles', gender: 'F', birthYear: '1986' },
//     { key: 59, parent: 24, name: 'Tallulah Lascelles', gender: 'F', birthYear: '2005' },
//     { key: 25, parent: 9, name: 'Mark Lascelles', gender: 'M', birthYear: '1964' },
//     { key: 60, parent: 25, name: 'Charlotte Lascelles', gender: 'F', birthYear: '1996' },
//     { key: 61, parent: 25, name: 'Imogen Lascelles', gender: 'F', birthYear: '1998' },
//     { key: 62, parent: 25, name: 'Miranda Lascelles', gender: 'F', birthYear: '2000' },
//     { key: 10, parent: 3, name: 'Gerald Lascelles', gender: 'M', birthYear: '1924', deathYear: '1998' },
//     { key: 26, parent: 10, name: 'Henry Lascelles', gender: 'M', birthYear: '1953' },
//     { key: 63, parent: 26, name: 'Maximilian Lascelles', gender: 'M', birthYear: '1991' },
//     { key: 27, parent: 10, name: 'Martin David Lascelles', gender: 'M', birthYear: '1962' },
//     { key: 64, parent: 27, name: 'Alexander Lascelles', gender: 'M', birthYear: '2002' },
//     { key: 4, parent: 0, name: 'Prince Henry', gender: 'M', birthYear: '1900', deathYear: '1974' },
//     { key: 11, parent: 4, name: 'Prince William of Gloucester', gender: 'M', birthYear: '1941', deathYear: '1972' },
//     { key: 12, parent: 4, name: 'Prince Richard', gender: 'M', birthYear: '1944' },
//     { key: 28, parent: 12, name: 'Alexander Windsor', gender: 'M', birthYear: '1974' },
//     { key: 65, parent: 28, name: 'Xan Windsor', gender: 'M', birthYear: '2007' },
//     { key: 66, parent: 28, name: 'Lady Cosima Windsor', gender: 'F', birthYear: '2010' },
//     { key: 29, parent: 12, name: 'Lady Davina Lewis', gender: 'F', birthYear: '1977' },
//     { key: 67, parent: 29, name: 'Senna Lewis', gender: 'F', birthYear: '2010' },
//     { key: 30, parent: 12, name: 'Lady Rose Gilman', gender: 'F', birthYear: '1980' },
//     { key: 68, parent: 30, name: 'Lyla Gilman', gender: 'F', birthYear: '2010' },
//     { key: 5, parent: 0, name: 'Prince George', gender: 'M', birthYear: '1902', deathYear: '1942' },
//     { key: 13, parent: 5, name: 'Prince Edward', gender: 'M', birthYear: '1935' },
//     { key: 31, parent: 13, name: 'George Windsor', gender: 'M', birthYear: '1962' },
//     { key: 69, parent: 31, name: 'Edward Windsor', gender: 'M', birthYear: '1988' },
//     { key: 70, parent: 31, name: 'Lady Marina-Charlotte Windsor', gender: 'F', birthYear: '1992' },
//     { key: 71, parent: 31, name: 'Lady Amelia Windsor', gender: 'F', birthYear: '1995' },
//     { key: 32, parent: 13, name: 'Lady Helen Taylor', gender: 'F', birthYear: '1964' },
//     { key: 72, parent: 32, name: 'Columbus Taylor', gender: 'M', birthYear: '1994' },
//     { key: 73, parent: 32, name: 'Cassius Taylor', gender: 'M', birthYear: '1996' },
//     { key: 74, parent: 32, name: 'Eloise Taylor', gender: 'F', birthYear: '2003' },
//     { key: 75, parent: 32, name: 'Estella Taylor', gender: 'F', birthYear: '2004' },
//     { key: 33, parent: 13, name: 'Lord Nicholas Windsor', gender: 'M', birthYear: '1970' },
//     { key: 76, parent: 33, name: 'Albert Windsor', gender: 'M', birthYear: '2007' },
//     { key: 77, parent: 33, name: 'Leopold Windsor', gender: 'M', birthYear: '2009' },
//     { key: 14, parent: 5, name: 'Princess Alexandra', gender: 'F', birthYear: '1936' },
//     { key: 34, parent: 14, name: 'James Ogilvy', gender: 'M', birthYear: '1964' },
//     { key: 78, parent: 34, name: 'Flora Ogilvy', gender: 'F', birthYear: '1994' },
//     { key: 79, parent: 34, name: 'Alexander Ogilvy', gender: 'M', birthYear: '1996' },
//     { key: 35, parent: 14, name: 'Marina Ogilvy', gender: 'F', birthYear: '1966' },
//     { key: 80, parent: 35, name: 'Zenouska Mowatt', gender: 'F', birthYear: '1990' },
//     { key: 81, parent: 35, name: 'Christian Mowatt', gender: 'M', birthYear: '1993' },
//     { key: 15, parent: 5, name: 'Prince Michael of Kent', gender: 'M', birthYear: '1942' },
//     { key: 36, parent: 15, name: 'Lord Frederick Windsor', gender: 'M', birthYear: '1979' },
//     { key: 37, parent: 15, name: 'Lady Gabriella Windsor', gender: 'F', birthYear: '1981' },
//     { key: 6, parent: 0, name: 'Prince John', gender: 'M', birthYear: '1905', deathYear: '1919' }
//   ];

//   public diagramDivClassName = 'myDiagramDiv';
//   public diagramModelData = { prop: 'value', color: 'red' };

//   public dia: any;

//   @ViewChild('myDiag', {static: false}) myDiag!: DiagramComponent;

//   constructor() {}

//   ngOnInit() {

//   }

//   ngAfterViewInit() {
//     const $ = go.GraphObject.make;
//     const appComp: GoJsChartComponent = this;
//     this.myDiag.diagram.nodeTemplate.contextMenu = 
//       $('ContextMenu', 
//         $('ContextMenuButton', 
//           $(go.TextBlock, 'Working Button 1'),
//           {
//             click: (e, obj) => {
//               console.log('e: ', e.diagram.model.modelData.color);
//               // this.buttonCallback(e, obj);  // not calling; buttonCallback is not a function error
//             }
//           }
//         ),
//         $('ContextMenuButton',
//           $(go.TextBlock, 'Not Working Button 2'),
//           {
//             click: (e, obj) => {
//               appComp.buttonCallback;
//             }
//           }
//         )
//       );
//   }

//   initDiagram(): go.Diagram {
//     const $ = go.GraphObject.make;
//     const dia = $(go.Diagram, {
//       'toolManager.hoverDelay': 100,  // 100 milliseconds instead of the default 850
//       allowCopy: false,
    //   layout:  // create a TreeLayout for the family tree
    //     $(go.TreeLayout,
    //       { angle: 90, nodeSpacing: 10, layerSpacing: 40, layerStyle: go.TreeLayout.LayerUniform })
    // });

    // const bluegrad = '#90CAF9';
    // const pinkgrad = '#F48FB1';

    // dia.add(
    //   $(go.Part, 'Table', { position: new go.Point(300, 10), selectable: false },
    //     $(go.TextBlock, 'Key', {row: 0, font: '700 14px Droid Serif, sans-serif'}),
    //     $(go.Panel, 'Horizontal', {row: 1, alignment: go.Spot.Left},
    //       $(go.Shape, 'Rectangle', {desiredSize: new go.Size(30, 30), fill: bluegrad, margin: 5}),
    //       $(go.TextBlock, 'Males', {font: '700 13px Droid Serif, sans-serif'})),
    //     $(go.Panel, 'Horizontal', {row: 2, alignment: go.Spot.Left},
    //       $(go.Shape, 'Rectangle', {desiredSize: new go.Size(30, 30), fill: pinkgrad, margin: 5}),
    //       $(go.TextBlock, 'Female', {font: '700 13px Droid Serif, sans-serif'})
    //     )
    //   )
    // );

    // dia.nodeTemplate = $(go.Node, 'Auto', {
    //   deletable: false
    // }, new go.Binding('text', 'name'),
    //   $(go.Shape, 'Rectangle', {
    //     fill: 'lightgray',
    //     stroke: null,
    //     strokeWidth: 0,
    //     stretch: go.GraphObject.Fill,
    //     alignment: go.Spot.Center
    //   }, new go.Binding('fill', 'gender', (gender) => {
    //     if (gender === 'M') { return bluegrad; }
    //     if (gender === 'F') { return pinkgrad; }
    //     return 'orange';
    //   })),
    //   $(go.TextBlock, {
    //     font: '700 12px Droid Serif, sans-serif',
    //     textAlign: 'center',
    //     margin: 10, maxSize: new go.Size(80, NaN)
    //   }, new go.Binding('text', 'name'))
    //   );

    // dia.linkTemplate = $(go.Link, {
    //   routing: go.Link.Orthogonal,
    //   corner: 5,
    //   selectable: false
    // }, $(go.Shape, {
    //   strokeWidth: 3,
    //   stroke: '#424242'
    // }));




// not needed

    // dia.nodeTemplate.contextMenu = 
    //   $('ContextMenu', 
    //     $('ContextMenuButton', 
    //       $(go.TextBlock, 'Working Button'),
    //       {
    //         click: (e, obj) => {
    //           console.log('e: ', e.diagram.model.modelData.color);
              // this.buttonCallback(e, obj);  // not calling; buttonCallback is not a function error
        //     }
        //   }
        // ),
        // $('ContextMenuButton',
        //   $(go.TextBlock, 'Not Working Button'),
        //   {
        //     click: this.buttonCallback
        //   }
        // )
//       );
          

//     dia.model = new go.TreeModel(this.familyData);

//     this.dia = dia;

//     return dia;
//   }

//   buttonCallback(e: { diagram: { model: { modelData: { color: any; }; }; }; }, obj: any) {
//     console.log('e2: ', e.diagram.model.modelData.color);
//     console.log('this: ', this.name);
    // console.log('e2 obj: ', obj);
//   }

//   onModelChange($event: any) {
//     console.log('Event: ', $event);
//   }

//   save() {
//     const data = this.diagramComponent.diagram.model.toJson();
//     console.log('data: ', data);
//   }
// }
// }


