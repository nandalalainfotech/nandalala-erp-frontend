import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';

@Component({
	selector: 'app-purchase-item',
	templateUrl: './purchase-item.component.html',
	styleUrls: ['./purchase-item.component.css']
})
export class PurchaseItemComponent implements OnInit {

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
				headerName: 'Purchase Order',
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
				headerName: 'Project',
				field: '',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true
			},
			{
				headerName: 'Item Code',
				field: '',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true
			},
			{
				headerName: 'Amount',
				field: '',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true
			},
			{
				headerName: 'Billed Amount',
				field: '',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true
			},
			{
				headerName: 'Amount to Bill',
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
