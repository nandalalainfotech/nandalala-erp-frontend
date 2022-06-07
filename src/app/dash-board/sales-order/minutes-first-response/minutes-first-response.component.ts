import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';

@Component({
    selector: 'app-minutes-first-response',
    templateUrl: './minutes-first-response.component.html',
    styleUrls: ['./minutes-first-response.component.css']
})
export class MinutesFirstResponseComponent implements OnInit {
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
                headerName: 'Date',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true

            },
            {
                headerName: 'Minutes to First Response',
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