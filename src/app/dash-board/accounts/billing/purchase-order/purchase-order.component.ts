import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';

@Component({
    selector: 'app-purchase-order',
    templateUrl: './purchase-order.component.html',
    styleUrls: ['./purchase-order.component.css']
})
export class PurchaseOrderComponent implements OnInit {
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
                headerName: 'Purchase Order',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizabla: true,
            },
            {
                headerName: 'Date',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizabla: true,
            },
            {
                headerName: 'Supplier',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizabla: true,
            },
            {
                headerName: 'Supplier Name',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizabla: true,
            },
            {
                headerName: 'Project',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizabla: true,
            },
            {
                headerName: 'Item Code',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizabla: true,
            },
            {
                headerName: 'Amount',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizabla: true,
            },
            {
                headerName: 'Billed Amount',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizabla: true,
            },
            {
                headerName: 'Amount to Billed',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizabla: true,
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
                headerName: 'Description',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizabla: true,
            },
            {
                headerName: 'Company',
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
