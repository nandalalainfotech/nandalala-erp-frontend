import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-go-js-chart-model1',
  templateUrl: './go-js-chart-model1.component.html',
  styleUrls: ['./go-js-chart-model1.component.css']
})
export class GoJsChartModel1Component implements OnInit {
  @ViewChild("chart",{ static: true }) chart?:GoJsChartModel1Component ;
  // @ViewChild('chart', { static: true })
  // public chartContainer?: ElementRef<any>;
  // constructor(
  //   public dialogRef: MatDialogRef<GoJsChartModel1Component>,
  //   @Inject(MAT_DIALOG_DATA) public data: any) {}

  // ngOnInit() {
  // 
  public dialogRef!: MatDialogRef<GoJsChartModel1Component>
    @Inject(MAT_DIALOG_DATA) public data: any
  constructor(public dialog: MatDialog) {

  // openPopup(){
  //   this.dialogRef = this.dialog.open(DialogComponent , {
  //                                   width: '250px',
  //                                   height: '25%',
  //                                   data: { errorcode: errorCode, errormessage: errorMessage }
  //                               });
  //                               this.dialogRef.updatePosition({ top: '3%', left: '20%' });
}
    ngOnInit() {
    
    }
  }