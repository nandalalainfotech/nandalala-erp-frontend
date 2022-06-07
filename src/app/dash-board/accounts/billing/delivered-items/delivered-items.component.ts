import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';

@Component({
    selector: 'app-delivered-items',
    templateUrl: './delivered-items.component.html',
    styleUrls: ['./delivered-items.component.css']
})
export class DeliveredItemsComponent implements OnInit {
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
                headerName: 'Delivery Note',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizabla: true,
            },
            {
                headerName: 'Customer',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizabla: true,
            },
            {
                headerName: 'Customer Name',
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
                headerName: 'Project',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizabla: true,
            },
            {
                headerName: 'Item',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizabla: true,
            },
            {
                headerName: 'Pending Amount',
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
    onSelectionChange() {
    }
}