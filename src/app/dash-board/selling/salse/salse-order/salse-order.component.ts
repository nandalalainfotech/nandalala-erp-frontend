import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { LinkRendererComponent } from 'src/app/shared/services/renderercomponent/link-renderer-component';
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
    selector: 'app-salse-order',
    templateUrl: './salse-order.component.html',
    styleUrls: ['./salse-order.component.css']
})
export class SalseOrderComponent implements OnInit {

    slordersForm: FormGroup | any;
    submitted = false;
    frameworkComponents: any;
    itemname: string = "Dummy.status";
    itemtype: string = "dummy";
    grpname: string = "Dummy.status";
    grptype: string = "dummy";
    poname: string = "Recruit.OfferLetter";
    potype: string = "OfferLetter";
    onname: string = "PRSupp.Type";
    ontype: string = "Type";
    sorder: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    itemcode: string = "";
    ordername: string | null = "";
    sorderdate: Date | null = null;
    sdeliverydate: Date | null = null;
    cpurchaseorder: string | null = "";
    customername: string = "";
    statusname: string | null = "";
    public gridOptions: GridOptions | any;
    itsystemproperties?: Systemproperties001mb[] = [];
    gpsystemproperties?: Systemproperties001mb[] = [];
    posystemproperties?: Systemproperties001mb[] = [];
    onsystemproperties?: Systemproperties001mb[] = [];
    salseOrder: Salesorder001mb[] = [];
    itemlist: Itemdt001mb[] = [];

    constructor(private salesitemManager: SalesItemManager, 
        private systemPropertyServeice: SystemPropertiesService,
        private salseOrderManager: SalseOrderManager,
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
        this.slordersForm = this.formBuilder.group({
            itemcode: ['', Validators.required],
            ordername: ['', Validators.required],
            sorderdate: ['', Validators.required],
            sdeliverydate: ['', Validators.required],
            cpurchaseorder: ['', Validators.required],
            statusname: ['', Validators.required],
            customername: ['', Validators.required],
        });

        this.createDataGrid001md();
        this.systemPropertyServeice.system(this.itemname, this.itemtype,).subscribe((response) => {
            this.itsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.salesitemManager.allsalesitem().subscribe(response => {
            this.itemlist = deserialize<Itemdt001mb[]>(Itemdt001mb, response);
        })
        this.systemPropertyServeice.system(this.grpname, this.grptype,).subscribe((response) => {
            this.gpsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.systemPropertyServeice.system(this.poname, this.potype,).subscribe((response) => {
            this.posystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.systemPropertyServeice.system(this.onname, this.ontype,).subscribe((response) => {
            this.onsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.salseOrderManager.allsalseorder().subscribe((response) => {
            this.salseOrder = deserialize<Salesorder001mb[]>(Salesorder001mb, response);
            if (this.salseOrder.length > 0) {
                this.gridOptions?.api?.setRowData(this.salseOrder);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    get f() { return this.slordersForm.controls; }

    createDataGrid001md(): void {
        this.gridOptions = {
            paginationPageSize: 10,
            rowSelection: 'single',
            onFirstDataRendered: this.onFirstDataRendered.bind(this)
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
                resizabla: true,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilterOnly: true,
                checkboxSelection: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Item Code',
                field: 'itemcode',
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
                headerName: 'Order Date',
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
                headerName: 'Delivery Date',
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
                headerName: 'Purchase Order',
                field: 'cpurchaseorder',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
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
                }
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
        this.slordersForm.patchValue({
            'itemcode': params.data.itemcode,
            'ordername': params.data.ordername,
            'sorderdate': this.datePipe.transform(params.data.sorderdate, 'MM/dd/yyyy'),
            'sdeliverydate': this.datePipe.transform(params.data.sdeliverydate, 'MM/dd/yyyy'),
            'cpurchaseorder': params.data.cpurchaseorder,
            'customername': params.data.customername,
            'statusname': params.data.statusname,
        })
    }

    onDeleteButtonClick(params: any) {
        this.salseOrderManager.deletesalesorder(params.data.sorder).subscribe((response) => {
            for (let i = 0; i < this.salseOrder.length; i++) {
                if (this.salseOrder[i].sorder == params.data.sorder) {
                    this.salseOrder?.splice(i, 1);
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

    onOrderClick(event: any, slordersForm: any) {

        this.markFormGroupTouched(this.slordersForm);
        this.submitted = true;
        if (this.slordersForm.invalid) {
            return;
        }

        let salesorder001mb = new Salesorder001mb();

        salesorder001mb.sorderdate = new Date(this.f.sorderdate.value);
        salesorder001mb.sdeliverydate = new Date(this.f.sdeliverydate.value);
        salesorder001mb.itemcode = this.f.itemcode.value ? this.f.itemcode.value : "";
        salesorder001mb.ordername = this.f.ordername.value ? this.f.ordername.value : "";
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
                let salesorder001mb = deserialize<Salesorder001mb>(Salesorder001mb, response);
                for (let salseorders of this.salseOrder) {
                    if (salseorders.sorder == salesorder001mb.sorder) {
                        salseorders.sorder = salesorder001mb.sorder;
                        salseorders.itemcode = salesorder001mb.itemcode;
                        salseorders.ordername = salesorder001mb.ordername;
                        salseorders.sorderdate = salesorder001mb.sorderdate;
                        salseorders.sdeliverydate = salesorder001mb.sdeliverydate;
                        salseorders.cpurchaseorder = salesorder001mb.cpurchaseorder;
                        salseorders.customername = salesorder001mb.customername;
                        salseorders.statusname = salesorder001mb.statusname;
                        salseorders.insertUser = this.insertUser;
                        salseorders.insertDatetime = this.insertDatetime;
                        salseorders.updatedUser = this.authManager.getcurrentUser.username;
                        salseorders.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.salseOrder);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.slordersForm.reset();
                this.sorder = null;
                this.submitted = false;
            });
        } else {
            salesorder001mb.insertUser = this.authManager.getcurrentUser.username;
            salesorder001mb.insertDatetime = new Date();
            this.salseOrderManager.savesalseorder(salesorder001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let salesorder001mb = deserialize<Salesorder001mb>(Salesorder001mb, response);
                this.salseOrder?.push(salesorder001mb);
                const newItems = [JSON.parse(JSON.stringify(salesorder001mb))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.gridOptions.api.deselectAll();
                this.slordersForm.reset();
                this.submitted = false;
            });
        }
    }

    onReset() {
        this.slordersForm.reset();
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