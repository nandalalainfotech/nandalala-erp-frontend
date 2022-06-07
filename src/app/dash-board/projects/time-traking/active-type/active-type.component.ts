import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-active-type',
  templateUrl: './active-type.component.html',
  styleUrls: ['./active-type.component.css']
})
export class ActiveTypeComponent implements OnInit {
  public gridOptions: GridOptions | any;
  constructor() { }

  ngOnInit(){
    this.createDataGrid001();
    setTimeout(() => {
      this.gridOptions?.api?.setRowData([]);
    }, 100);
  }
  createDataGrid001(): void {
		this.gridOptions = {
			paginationPageSize: 10,
			rowSelection: 'single'
		};
		this.gridOptions.editType = 'fullRow';
		this.gridOptions.enableRangeSelection = true;
		// this.gridOptions.domLayout = 'autoHeight';
		this.gridOptions.animateRows = true;

		this.gridOptions.columnDefs = [
			{
				headerName: 'Id',
				field: '',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				headerCheckboxSelection: true,
				headerCheckboxSelectionFilteredOnly: true,
				checkboxSelection: true
			},
			{
				headerName: 'Activity Type',
				field: '',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true
			}
		];
  }
    public defaultColDef: any;
    onSelectionChange() {
    }
}

