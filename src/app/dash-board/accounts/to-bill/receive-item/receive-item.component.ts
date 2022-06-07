import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';

@Component({
	selector: 'app-receive-item',
	templateUrl: './receive-item.component.html',
	styleUrls: ['./receive-item.component.css']
})
export class ReceiveItemComponent implements OnInit {

	public gridOptions: GridOptions | any;
	constructor() { }

	ngOnInit() {
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
				headerName: '#ID',
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
				headerName: 'Purchase Receipt',
				field: '',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true

			},
			{
				headerName: 'Supplier',
				field: '',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true
			},
			{
				headerName: 'Supplier Name',
				field: '',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true
			},
			{
				headerName: 'Date',
				field: '',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true
			},
			{
				headerName: 'Project',
				field: '',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true
			},
			{
				headerName: 'Item',
				field: '',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true
			},
			{
				headerName: 'Pending Amount',
				field: '',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true
			},
			{
				headerName: 'Item Name',
				field: '',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true
			},
			{
				headerName: 'Description',
				field: '',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true
			},
			{
				headerName: 'Company',
				field: '',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true
			},
		];

	}
	public defaultColDef: any;


	onSelectionChange() {
	}
}
