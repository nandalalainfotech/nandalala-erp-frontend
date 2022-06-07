import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';

@Component({
    selector: 'app-support-analytics',
    templateUrl: './support-analytics.component.html',
    styleUrls: ['./support-analytics.component.css']
})
export class SupportAnalyticsComponent implements OnInit {
    public gridOptions: GridOptions | any;

    constructor() { }

    ngOnInit(): void {
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
                headerName: 'Status',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true

            },
            {
                headerName: '31-01-2016',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },
            {
                headerName: '29-02-2016',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },

            {
                headerName: '31-03-2016',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },

            {
                headerName: '30-04-2016',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },
            {
                headerName: '31-05-2016',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },
            {
                headerName: '30-06-2016',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },
            {
                headerName: '31-07-2016',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },
            {
                headerName: '31-08-2016',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },
            {
                headerName: '30-09-2016',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },
            {
                headerName: '31-10-2016',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },
            {
                headerName: '30-11-2016',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },
            {
                headerName: '31-12-2016',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },

        ];
    }
}
