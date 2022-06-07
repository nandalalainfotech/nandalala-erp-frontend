import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
@Component({
    selector: 'app-salse-per-tar-var-itm-grp',
    templateUrl: './salse-per-tar-var-itm-grp.component.html',
    styleUrls: ['./salse-per-tar-var-itm-grp.component.css']
})
export class SalsePerTarVarItmGrpComponent implements OnInit {
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
                headerName: 'Sales Person',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true

            },
            {
                headerName: 'Item Group',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },
            {
                headerName: 'Target (Jan)',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },

            {
                headerName: 'Achieved (Jan)',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },
            {
                headerName: 'Variance (Jan)',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },
            {
                headerName: 'Target (Feb)',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },
            {
                headerName: 'Achieved (Feb)',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },
            {
                headerName: 'Variance (Feb)',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },
            {
                headerName: 'Target (Mar)',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },
            {
                headerName: 'Achieved (Mar)',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },
            {
                headerName: 'Variance (Mar)',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },
            {
                headerName: 'Target (Apr)',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },
            {
                headerName: 'Achieved (Apr)',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },
            {
                headerName: 'Variance (Apr)',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },
            {
                headerName: 'Target (May)',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },
            {
                headerName: 'Achieved (May)',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },
            {
                headerName: 'Variance (May)',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },
            {
                headerName: 'Target (Jun)',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },
            {
                headerName: 'Achieved (Jun)',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },
            {
                headerName: 'Variance (Jun)',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },
            {
                headerName: 'Target (Jul)',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },
            {
                headerName: 'Achieved (Jul)',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },
            {
                headerName: 'Variance (Jul)',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },
            {
                headerName: 'Target (Aug)',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },
            {
                headerName: 'Achieved (Aug)',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },
            {
                headerName: 'Variance (Aug)',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },
            {
                headerName: 'Target (Sept)',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },
            {
                headerName: 'Achieved (Sept)',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },
            {
                headerName: 'Variance (Sept)',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },
            {
                headerName: 'Target (Oct)',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },
            {
                headerName: 'Achieved (Oct)',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },
            {
                headerName: 'Variance (Oct)',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },
            {
                headerName: 'Target (Nov)',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },
            {
                headerName: 'Achieved (Nov)',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            }, {
                headerName: 'Variance (Nov)',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },
            {
                headerName: 'Target (Dec)',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },
            {
                headerName: 'Achieved (Dec)',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },
            {
                headerName: 'Variance (Dec)',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },
            {
                headerName: 'Achieved (Dec)',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },
            {
                headerName: 'Total Target',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },
            {
                headerName: 'Total Achieved',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },
            {
                headerName: 'Total Variance',
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
