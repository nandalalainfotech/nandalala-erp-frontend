import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { SalesItemManager } from 'src/app/shared/services/restcontroller/bizservice/sales-item.service';
import { SalseOrderManager } from 'src/app/shared/services/restcontroller/bizservice/salse-order.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Itemdt001mb } from 'src/app/shared/services/restcontroller/entities/Itemdt001mb';
import { Salesorder001mb } from 'src/app/shared/services/restcontroller/entities/Salesorder001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-sales-order-trends',
    templateUrl: './sales-order-trends.component.html',
    styleUrls: ['./sales-order-trends.component.css']
})
export class SalesOrderTrendsComponent implements OnInit {

    frameworkComponents: any;
    slOrderForm: FormGroup | any;
    sorder: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    itemcode: string | null = "";
    ordername: string | null = "";
    sorderdate: Date | null = null;
    sdeliverydate: Date | null = null;
    cpurchaseorder: string | null = "";
    customername: string = "";
    statusname: string | null = "";
    dummyname = "Dummy.status";
    dummytype = "dummy";
    itemname = "Item.Status";
    itemtype = "Status";
    onname = "PRSupp.Type";
    ontype = "Type";
    submitted = false;
    itemsystemproperties: Systemproperties001mb[] = [];
    dummysystemproperties: Systemproperties001mb[] = [];
    onsystemproperties?: Systemproperties001mb[] = [];
    public gridOptions: GridOptions | any;
    saleOrder: Salesorder001mb[] = [];
    itemlist: Itemdt001mb[] = [];
    saleItms: Itemdt001mb[] = [];

    constructor(private salseOrderManager: SalseOrderManager,
        private systemPropertiesService: SystemPropertiesService,
        private calloutService: CalloutService,
        private formBuilder: FormBuilder,
        private salesItemManager: SalesItemManager,
        private datePipe: DatePipe,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent
        }
    }

    ngOnInit() {
        this.createDataGrid001();
        this.slOrderForm = this.formBuilder.group({
            itemcode: ['', Validators.required],
            ordername: ['', Validators.required],
            sorderdate: ['', Validators.required],
            sdeliverydate: ['', Validators.required],
            cpurchaseorder: ['', Validators.required],
            customername: ['', Validators.required],
            statusname: ['', Validators.required]
        })
        this.systemPropertiesService.system(this.dummyname, this.dummytype).subscribe(response => {
            this.dummysystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.systemPropertiesService.system(this.itemname, this.itemtype).subscribe(response => {
            this.itemsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.systemPropertiesService.system(this.onname, this.ontype).subscribe(response => {
            this.onsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.salesItemManager.allsalesitem().subscribe(response => {
            this.saleItms = deserialize<Itemdt001mb[]>(Itemdt001mb, response);
        })
        this.salseOrderManager.allsalseorder().subscribe(response => {
            this.saleOrder = deserialize<Salesorder001mb[]>(Salesorder001mb, response);
            if (this.saleOrder.length > 0) {
                this.gridOptions?.api?.setRowData(this.saleOrder);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    get f() { return this.slOrderForm.controls }

    createDataGrid001(): void {
        this.gridOptions = {
            paginationPageSize: 10,
            rowSelection: 'single',
            onFirstDataRendered: this.onFirstDataRendered.bind(this),
        };
        this.gridOptions.editType = 'fullRow';
        this.gridOptions.enableRangeSelection = true;
        this.gridOptions.animateRows = true;
        this.gridOptions.columnDefs = [
            {
                headerName: '#ID',
                field: 'sorder',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Customer Name',
                field: 'customername',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Deleivery date',
                field: 'sdeliverydate',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: (params: any) => {
                    return params.data.sdeliverydate ? this.datePipe.transform(params.data.sdeliverydate, 'MM/dd/yyyy') : '';
                }
            },
            {
                headerName: 'Order date',
                field: 'sorderdate',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: (params: any) => {
                    return params.data.sorderdate ? this.datePipe.transform(params.data.sorderdate, 'MM/dd/yyyy') : '';
                }
            },
            {
                headerName: 'Purchase order',
                field: 'cpurchaseorder',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Status Name',
                field: 'statusname',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Order Name',
                field: 'ordername',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Item Name',
                field: 'itemcode',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Edit',
                cellRenderer: 'iconRenderer',
                width: 150,
                flex: 1,
                suppressSizeToFit: true,
                cellStyle: { textAlign: 'center' },
                cellRendererParams: {
                    onClick: this.onEditButtonClick.bind(this),
                    label: 'Edit'
                },
            },
            {
                headerName: 'Delete',
                cellRenderer: 'iconRenderer',
                width: 155,
                flex: 1,
                suppressSizeToFit: true,
                cellStyle: { textAlign: 'center' },
                cellRendererParams: {
                    onClick: this.onDeleteButtonClick.bind(this),
                    label: 'Delete'
                },
            },
            {
                headerName: 'Audit',
                cellRenderer: 'iconRenderer',
                width: 155,
                flex: 1,
                suppressSizeToFit: true,
                cellStyle: { textAlign: 'center' },
                cellRendererParams: {
                    onClick: this.onAuditButtonClick.bind(this),
                    label: 'Audit'
                },
            },
        ];
    }

    onEditButtonClick(params: any) {
        this.sorder = params.data.sorder;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.slOrderForm.patchValue({
            'itemcode': params.data.itemcode,
            'ordername': params.data.ordername,
            'sorderdate': this.datePipe.transform(params.data.sorderdate, 'MM/dd/yyyy'),
            'sdeliverydate': this.datePipe.transform(params.data.sdeliverydate, 'MM/dd/yyyy'),
            'cpurchaseorder': params.data.cpurchaseorder,
            'customername': params.data.customername,
            'statusname': params.data.statusname
        });
    }

    onDeleteButtonClick(params: any) {
        this.salseOrderManager.deletesalesorder(params.data.sorder).subscribe((response) => {
            for (let i = 0; i < this.saleOrder.length; i++) {
                if (this.saleOrder[i].sorder == params.data.sorder) {
                    this.saleOrder?.splice(i, 1);
                    break;
                }
            }
            const selectedRows = params.api.getSelectedRows();
            params.api.applyTransaction({ remove: selectedRows });
            this.calloutService.showSuccess("Order Removed Successfully");
        })
    }

    onAuditButtonClick(params: any) {
        const modalRef = this.modalService.open(AuditComponent);
        modalRef.componentInstance.title = "Sales Order Trends";
        modalRef.componentInstance.details = params.data;
    }

    onFirstDataRendered(params: any) {
        params.api.sizeColumnsToFit();
    }

    private markFormGroupTouched(formGroup: FormGroup) {
        (<any>Object).values(formGroup.controls).forEach((control: any) => {
            control.markAsTouched();
            if (control.controls) {
                this.markFormGroupTouched(control);
            }
        });
    }

    onOrderClick(event: any, slOrderForm: any) {
        this.markFormGroupTouched(this.slOrderForm);
        this.submitted = true;
        if (this.slOrderForm.invalid) {
            return;
        }
        let salesorder001mb = new Salesorder001mb();
        salesorder001mb.itemcode = this.f.itemcode.value ? this.f.itemcode.value : "";
        salesorder001mb.ordername = this.f.ordername.value ? this.f.ordername.value : "";
        salesorder001mb.sorderdate = new Date(this.f.sorderdate.value);
        salesorder001mb.sdeliverydate = new Date(this.f.sdeliverydate.value);
        salesorder001mb.cpurchaseorder = this.f.cpurchaseorder.value ? this.f.cpurchaseorder.value : "";
        salesorder001mb.customername = this.f.customername.value ? this.f.customername.value : "";
        salesorder001mb.statusname = this.f.statusname.value ? this.f.statusname.value : "";
        if (this.sorder) {
            salesorder001mb.sorder = this.sorder;
            salesorder001mb.insertUser = this.insertUser;
            salesorder001mb.insertDatetime = this.insertDatetime;
            salesorder001mb.updatedUser = this.authManager.getcurrentUser.username;
            salesorder001mb.updatedDatetime = new Date();
            this.salseOrderManager.updatesalseorder(salesorder001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let sale = deserialize<Salesorder001mb>(Salesorder001mb, response);
                for (let salesOrder of this.saleOrder) {
                    if (salesOrder.sorder == sale.sorder) {
                        salesOrder.itemcode = sale.itemcode;
                        salesOrder.ordername = sale.ordername;
                        salesOrder.sorderdate = sale.sorderdate;
                        salesOrder.sdeliverydate = sale.sdeliverydate;
                        salesOrder.cpurchaseorder = sale.cpurchaseorder;
                        salesOrder.customername = sale.customername;
                        salesOrder.statusname = sale.statusname;
                        salesOrder.insertUser = this.insertUser;
                        salesOrder.insertDatetime = this.insertDatetime;
                        salesOrder.updatedUser = this.authManager.getcurrentUser.username;
                        salesOrder.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.saleOrder);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.slOrderForm.reset();
                this.submitted = false;
                this.sorder = null;
            });
        }
        else {
            salesorder001mb.insertUser = this.authManager.getcurrentUser.username;
            salesorder001mb.insertDatetime = new Date();
            this.salseOrderManager.savesalseorder(salesorder001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let sale = deserialize<Salesorder001mb>(Salesorder001mb, response);
                this.saleOrder.push(sale);
                const newItems = [JSON.parse(JSON.stringify(sale))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.gridOptions.api.deselectAll();
                this.slOrderForm.reset();
                this.submitted = false;
            })
        }
    }

    onReset() {
        this.slOrderForm.reset();
        this.submitted = false;
    }


    onGeneratePdfReport(){
		this.salseOrderManager.salseOrderPdf().subscribe((response) =>{
            saveAs(response,"SalesOrderDetailsList");

		});
	}

	onGenerateExcelReport(){
		this.salseOrderManager.salseOrderExcel().subscribe((response) => {
			saveAs(response,"SalesOrderDetailsList");
        })
	}
}