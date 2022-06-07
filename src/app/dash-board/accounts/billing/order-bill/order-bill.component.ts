import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';

@Component({
    selector: 'app-order-bill',
    templateUrl: './order-bill.component.html',
    styleUrls: ['./order-bill.component.css']
})
export class OrderBillComponent implements OnInit {
    public gridOptions: GridOptions | any;
    constructor() { }
    ngOnInit(): void {
        this.createdataGrid001md();
        setTimeout(() => {
            this.gridOptions?.api?.setRowData([]);
        }, 100);
    }
    createdataGrid001md(): void {
        this.gridOptions = {
            paginationPageSize: 10,
            rowSelection: 'single'
        }
        this.gridOptions.editType = 'fullRow',
            this.gridOptions.enableRangeSelection = true,
            this.gridOptions.animateRows = true,
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
                    headerName: 'Sales Order',
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
                    headerName: 'Status',
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
    public defaultColDef: any;
    onSelectionChange() {
    }

}
