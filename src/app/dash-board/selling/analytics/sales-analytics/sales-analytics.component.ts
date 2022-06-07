import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';

@Component({
    selector: 'app-sales-analytics',
    templateUrl: './sales-analytics.component.html',
    styleUrls: ['./sales-analytics.component.css']
})
export class SalesAnalyticsComponent implements OnInit {
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
        // this.gridOptions.domLayout = 'autoHeight';
        this.gridOptions.animateRows = true;

        this.gridOptions.columnDefs = [
            {
                headerName: 'ID',
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
                headerName: 'Customer Group / Name',
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
            }

        ];
        // this.defaultColDef= {
        // 	suppressKeyboardEvent: (params) => {
        // 		if (!params.editing) {
        // 			let isBackspaceKey = params.event.keyCode === 8;
        // 			let isDeleteKey = params.event.keyCode === 46;

        // 			if (isBackspaceKey) {
        // 				// Delete all selected rows...
        // 				return true
        // 			}

        // 			if(isDeleteKey){
        // 				// Delete all selected cell ranges...
        // 				return true
        // 			}
        // 		}
        // 		return false;
        // 	}
        // };
    }
    public defaultColDef: any;


    onSelectionChange() {
    }
}