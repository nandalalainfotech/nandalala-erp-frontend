import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';

@Component({
    selector: 'app-customerr',
    templateUrl: './customerr.component.html',
    styleUrls: ['./customerr.component.css']
})
export class CustomerrComponent implements OnInit {

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
                headerName: '#S No',
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
                headerName: 'Year',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true

            },
            {
                headerName: 'Month',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },
            {
                headerName: 'New Customers',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },
            {
                headerName: 'Repeat Customers',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },
            {
                headerName: 'Total',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },
            {
                headerName: 'New Customer Revenue',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },
            {
                headerName: 'Repeat Customer Revenue',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },
            {
                headerName: 'Total Revenue',
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
