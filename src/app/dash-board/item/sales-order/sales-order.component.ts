import { Component, OnInit } from '@angular/core';
import { deserialize } from 'serializer.ts/Serializer';
import { Salesorder001mb } from 'src/app/shared/services/restcontroller/entities/Salesorder001mb';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Itemdt001mb } from 'src/app/shared/services/restcontroller/entities/Itemdt001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { GridOptions } from 'ag-grid-community';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { SalseOrderManager } from 'src/app/shared/services/restcontroller/bizservice/salse-order.service';
import { DatePipe } from '@angular/common';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { SalesItemManager } from 'src/app/shared/services/restcontroller/bizservice/sales-item.service';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-sales-order',
    templateUrl: './sales-order.component.html',
    styleUrls: ['./sales-order.component.css']
})
export class SalesOrderComponent implements OnInit {

    frameworkComponents: any;
    slordForm: FormGroup | any;
    sorder: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    itemname: string = "Dummy.status";
    itemtype: string = "dummy";
    grpname: string = "Dummy.status";
    grptype: string = "dummy";
    poname: string = "Recruit.OfferLetter";
    potype: string = "OfferLetter";
    itemcode: string = "";
    ordername: string | null = "";
    sorderdate: Date | null = null;
    sdeliverydate: Date | null = null;
    cpurchaseorder: string | null = "";
    customername: string = "";
    statusname: string | null = "";
    submitted = false;
    itsystemproperties?: Systemproperties001mb[] = [];
    gpsystemproperties?: Systemproperties001mb[] = [];
    posystemproperties?: Systemproperties001mb[] = [];
    slOrders: Salesorder001mb[] = [];
    public gridOptions: GridOptions | any;
    itemlist: Itemdt001mb[] = [];

    constructor(private systemPropertyServeice: SystemPropertiesService,
        private salseOrderManager: SalseOrderManager,
        private salesitemManager: SalesItemManager,
        private calloutService: CalloutService,
        private formBuilder: FormBuilder,
        private datePipe: DatePipe,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent
        }
    }

    ngOnInit() {
        this.createDataGrid001();
        this.slordForm = this.formBuilder.group({
            itemcode: ['', Validators.required],
            ordername: ['', Validators.required],
            sorderdate: ['', Validators.required],
            sdeliverydate: ['', Validators.required],
            cpurchaseorder: ['', Validators.required],
            customername: ['', Validators.required],
            statusname: ['', Validators.required]
        })
        this.systemPropertyServeice.system(this.itemname, this.itemtype,).subscribe((response) => {
            this.itsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.systemPropertyServeice.system(this.grpname, this.grptype,).subscribe((response) => {
            this.gpsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.systemPropertyServeice.system(this.poname, this.potype,).subscribe((response) => {
            this.posystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.salesitemManager.allsalesitem().subscribe(response => {
            this.itemlist = deserialize<Itemdt001mb[]>(Itemdt001mb, response);
        })
        this.salseOrderManager.allsalseorder().subscribe((response) => {
            this.slOrders = deserialize<Salesorder001mb[]>(Salesorder001mb, response);
            if (this.slOrders.length > 0) {
                this.gridOptions?.api?.setRowData(this.slOrders);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    get f() { return this.slordForm.controls }


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
                headerName: 'delivery Date',
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
                width: 100,
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
                width: 150,
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
                width: 150,
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
        this.slordForm.patchValue({
            'customername': params.data.customername,
            'cpurchaseorder': params.data.cpurchaseorder,
            'statusname': params.data.statusname,
            'itemcode': params.data.itemcode,
            'ordername': params.data.ordername,
            'sdeliverydate': this.datePipe.transform(params.data.sdeliverydate, 'MM/dd/yyyy'),
            'sorderdate': this.datePipe.transform(params.data.sorderdate, 'MM/dd/yyyy')
        });
    }

    onDeleteButtonClick(params: any) {
        this.salseOrderManager.deletesalesorder(params.data.sorder).subscribe((response) => {
            for (let i = 0; i < this.slOrders.length; i++) {
                if (this.slOrders[i].sorder == params.data.sorder) {
                    this.slOrders?.splice(i, 1);
                    break;
                }
            }
            const selectedRows = params.api.getSelectedRows();
            params.api.applyTransaction({ remove: selectedRows });
            this.calloutService.showSuccess("Order Removed Successfully");
        });
    }

    onAuditButtonClick(params: any) {
        const modalRef = this.modalService.open(AuditComponent);
        modalRef.componentInstance.title = "Sales Order";
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

    onOrderClick(event: any, slordForm: any) {
        this.markFormGroupTouched(this.slordForm);
        this.submitted = true;
        if (this.slordForm.invalid) {
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
            this.salseOrderManager.updatesalseorder(salesorder001mb).subscribe(response => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let slaorder = deserialize<Salesorder001mb>(Salesorder001mb, response);
                for (let order of this.slOrders) {
                    if (order.sorder == slaorder.sorder) {
                        order.itemcode = slaorder.itemcode;
                        order.ordername = slaorder.ordername;
                        order.sorderdate = slaorder.sorderdate;
                        order.sdeliverydate = slaorder.sdeliverydate;
                        order.cpurchaseorder = slaorder.cpurchaseorder;
                        order.customername = slaorder.customername;
                        order.statusname = slaorder.statusname;
                        order.insertUser = this.insertUser;
                        order.insertDatetime = this.insertDatetime;
                        order.updatedUser = this.authManager.getcurrentUser.username;
                        order.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.slOrders);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.slordForm.reset();
                this.submitted = false;
                this.sorder = null;
            })
        }
        else {
            salesorder001mb.insertUser = this.authManager.getcurrentUser.username;
            salesorder001mb.insertDatetime = new Date();
            this.salseOrderManager.savesalseorder(salesorder001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let slaorder = deserialize<Salesorder001mb>(Salesorder001mb, response);
                this.slOrders?.push(slaorder);
                const newItems = [JSON.parse(JSON.stringify(slaorder))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.slordForm.reset();
                this.submitted = false;
            })
        }
    }

    onReset() {
        this.slordForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.salseOrderManager.salseOrderPdf().subscribe((response) =>{
            saveAs(response,"SalesOrderDetails");

		});
	}

	onGenerateExcelReport(){
		this.salseOrderManager.salseOrderExcel().subscribe((response) => {
			saveAs(response,"SalesOrderDetails");
        })
	}

}