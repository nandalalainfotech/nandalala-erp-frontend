import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';

@Component({
	selector: 'app-quot-trends',
	templateUrl: './quot-trends.component.html',
	styleUrls: ['./quot-trends.component.css']
})
export class QuotTrendsComponent implements OnInit {
	public gridOptions: GridOptions | any;

	constructor() { }

	ngOnInit() {
		this.createDataGrid001mb();
		setTimeout(() => {
			this.gridOptions?.api?.setRowData([]);
		}, 100);
	}

	createDataGrid001mb(): void {
		this.gridOptions = {
			pagintionPageSize: 10,
			rowSelection: 'single'
		}
		this.gridOptions.editType = 'fullRow';
		this.gridOptions.enableRangeSelection = true;
		this.gridOptions.animateRows = true;
		this.gridOptions.columnDefs = [
			{
				headerName: '#ID',
				field: '',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizabla: true,
				headerCheckboxSelection: true,
				headerCheckboxSelectionFilterOnly: true,
				checkboxSelection: true
			},
			{
				headerName: 'Item Name',
				field: '',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizabla: true,
			},
			{
				headerName: 'Jan (Qty)',
				field: '',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizabla: true,
			},
			{
				headerName: 'Jan (Amt)',
				field: '',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizabla: true,
			},
			{
				headerName: 'Feb (Qty)',
				field: '',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizabla: true,
			},
			{
				headerName: 'Feb (Amt)',
				field: '',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizabla: true,
			},
			{
				headerName: 'March (Qty)',
				field: '',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizabla: true,
			},
			{
				headerName: 'March (Amt)',
				field: '',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizabla: true,
			},
			{
				headerName: 'April (Qty)',
				field: '',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizabla: true,
			},
			{
				headerName: 'April (Amt)',
				field: '',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizabla: true,
			},
			{
				headerName: 'May (Qty)',
				field: '',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizabla: true,
			},
			{
				headerName: 'May (Amt)',
				field: '',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizabla: true,
			},
			{
				headerName: 'June (Qty)',
				field: '',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizabla: true,
			},
			{
				headerName: 'June (Amt)',
				field: '',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizabla: true,
			},
			{
				headerName: 'July (Qty)',
				field: '',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizabla: true,
			},
			{
				headerName: 'July (Amt)',
				field: '',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizabla: true,
			},
			{
				headerName: 'Aug (Qty)',
				field: '',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizabla: true,
			},
			{
				headerName: 'Aug (Amt)',
				field: '',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizabla: true,
			},
			{
				headerName: 'Sept (Qty)',
				field: '',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizabla: true,
			},
			{
				headerName: 'Sept (Amt)',
				field: '',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizabla: true,
			},
			{
				headerName: 'Oct (Qty)',
				field: '',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizabla: true,
			},
			{
				headerName: 'Oct (Amt)',
				field: '',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizabla: true,
			},
			{
				headerName: 'Nov (Qty)',
				field: '',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizabla: true,
			},
			{
				headerName: 'Nov (Amt)',
				field: '',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizabla: true,
			},
			{
				headerName: 'Dec (Qty)',
				field: '',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizabla: true,
			},
			{
				headerName: 'Dec (Amt)',
				field: '',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizabla: true,
			},
			{
				headerName: 'Total (Qty)',
				field: '',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizabla: true,
			},
			{
				headerName: 'Total (Amt)',
				field: '',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizabla: true,
			},
		];
	}

	public defaultColDef: any;

	onSelectionChange() {
	}

}