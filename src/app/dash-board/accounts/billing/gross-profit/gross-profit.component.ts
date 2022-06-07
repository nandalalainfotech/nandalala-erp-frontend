import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { LinkRendererComponent } from 'src/app/shared/services/renderercomponent/link-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { GrossProfitManager } from 'src/app/shared/services/restcontroller/bizservice/gross-profit.service';
import { SalesItemManager } from 'src/app/shared/services/restcontroller/bizservice/sales-item.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Grossprofit001mb } from 'src/app/shared/services/restcontroller/entities/Grossprofit001mb';
import { Itemdt001mb } from 'src/app/shared/services/restcontroller/entities/Itemdt001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-gross-profit',
    templateUrl: './gross-profit.component.html',
    styleUrls: ['./gross-profit.component.css']
})
export class GrossProfitComponent implements OnInit {

    frameworkComponents: any;
    submitted = false;
    grossForm: FormGroup | any;
    id: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    salesinvoice: string = "";
    customer: string = "";
    postingdate: Date | null = null;
    itemname: string = "";
    description: string = "";
    warehouse: string = "";
    project: string = "";
    currency: number | any; ;
    quantity?: number;
    averagesellingrate?: number;
    averagebuyingrate?: number;
    sellingamount?: number;
    buyingamount?: number;
    grossprofit?: number;
    grosspercentage?: number;
    dummyname = "Dummy.status";
    dummytype = "dummy";
    itemlist: Itemdt001mb[]=[];
    grossProfit001: Grossprofit001mb[] = [];
    dummysystemproperties: Systemproperties001mb[] = [];
    public gridOptions: GridOptions | any;

    constructor(private grossProfitManager: GrossProfitManager,
        private systemPropertiesService: SystemPropertiesService, 
        private calloutService: CalloutService, 
        private formBuilder: FormBuilder, 
        private datePipe: DatePipe,
        private salesitemManager: SalesItemManager,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            // linkRenderer: LinkRendererComponent,
            iconRenderer: IconRendererComponent
        }
    }
    ngOnInit() {
        this.grossForm = this.formBuilder.group({
            postingdate: ['', Validators.required],
            customer: ['', Validators.required],
            salesinvoice: ['', Validators.required],
            itemname: ['', Validators.required],
            description: ['', Validators.required],
            warehouse: ['', Validators.required],
            project: ['', Validators.required],
            currency: ['', Validators.required],
            averagesellingrate: ['', Validators.required],
            averagebuyingrate: ['', Validators.required],
            buyingamount: ['', Validators.required],
            grossprofit: ['', Validators.required],
            grosspercentage: ['', Validators.required],
            quantity: ['', Validators.required],
            sellingamount: ['', Validators.required],
        })
        this.createDataGrid001mb();
        this.salesitemManager.allsalesitem().subscribe(response => {
            this.itemlist = deserialize<Itemdt001mb[]>(Itemdt001mb, response);
        })
        this.systemPropertiesService.system(this.dummyname, this.dummytype).subscribe(response => {
            this.dummysystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.grossProfitManager.allgross().subscribe(response => {
            this.grossProfit001 = deserialize<Grossprofit001mb[]>(Grossprofit001mb, response);
            if (this.grossProfit001.length > 0) {
                this.gridOptions?.api?.setRowData(this.grossProfit001);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        });
    }
    get f() { return this.grossForm.controls; }
    createDataGrid001mb(): void {
        this.gridOptions = {
            pagintionPageSize: 10,
            rowSelection: 'single',
            onFirstDataRendered: this.onFirstDataRendered.bind(this),
        }
        this.gridOptions.editType = 'fullRow';
        this.gridOptions.enableRangeSelection = true;
        this.gridOptions.animateRows = true;
        this.gridOptions.columnDefs = [
            {
                headerName: '#ID',
                field: 'id',
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
                headerName: 'Sales Invoice',
                field: 'salesinvoice',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizabla: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Customer',
                field: 'customer',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizabla: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Posting Date',
                field: 'postingdate',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizabla: true,
                suppressSizeToFit: true,
                valueGetter: (params: any) => {
                    return params.data.postingdate ? this.datePipe.transform(params.data.postingdate, 'MM/dd/yyyy') : '';
                }
            },
            {
                headerName: 'Item Name',
                field: 'itemname',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizabla: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Warehouse',
                field: 'warehouse',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizabla: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Project',
                field: 'project',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizabla: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Currency',
                field: 'currency',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizabla: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Quantity',
                field: 'quantity',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizabla: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Average Selling Rate',
                field: 'averagesellingrate',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizabla: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Average Buying Rate',
                field: 'averagebuyingrate',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizabla: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Selling Amount',
                field: 'sellingamount',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizabla: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Buying Amount',
                field: 'buyingamount',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizabla: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Gross Profit',
                field: 'grossprofit',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizabla: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Gross Profit %',
                field: 'grosspercentage',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizabla: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Edit',
                cellRenderer: 'iconRenderer',
                width: 200,
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
                width: 250,
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
                width: 200,
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
        this.id = params.data.id;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.grossForm.patchValue({
            'averagebuyingrate': params.data.averagebuyingrate,
            'averagesellingrate': params.data.averagesellingrate,
            'buyingamount': params.data.buyingamount,
            'currency': params.data.currency,
            'customer': params.data.customer,
            'description': params.data.description,
            'grosspercentage': params.data.grosspercentage,
            'grossprofit': params.data.grossprofit,
            'itemname': params.data.itemname,
            'postingdate': this.datePipe.transform(params.data.postingdate, 'MM/dd/yyyy'),
            'project': params.data.project,
            'quantity': params.data.quantity,
            'salesinvoice': params.data.salesinvoice,
            'sellingamount': params.data.sellingamount,
            'warehouse': params.data.warehouse,
        })
    }
    onDeleteButtonClick(params: any) {
        this.grossProfitManager.grossdelete(params.data.id).subscribe((response) => {
            for (let i = 0; i < this.grossProfit001.length; i++) {
                if (this.grossProfit001[i].id == params.data.id) {
                    this.grossProfit001?.splice(i, 1);
                    break;
                }
            }
            const selectedRows = params.api.getSelectedRows();
            params.api.applyTransaction({ remove: selectedRows });
            this.gridOptions.api.deselectAll();
            this.calloutService.showSuccess("Order Removed Successfully");
        });
    }

    onAuditButtonClick(params: any) {
		const modalRef = this.modalService.open(AuditComponent);
        modalRef.componentInstance.title = "Gross Profit";
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
    onOrderClick(event: any, gross: any) {
        this.markFormGroupTouched(this.grossForm);
        this.submitted = true;

        // stop here if form is invalid
        if (this.grossForm.invalid) {
            return;
        }
        let grossprofits = new Grossprofit001mb();
        grossprofits.averagebuyingrate = this.f.averagebuyingrate.value ? this.f.averagebuyingrate.value : null;
        grossprofits.averagesellingrate = this.f.averagesellingrate.value ? this.f.averagesellingrate.value : null;
        grossprofits.buyingamount = this.f.buyingamount.value ? this.f.buyingamount.value : null;
        grossprofits.currency = this.f.currency.value ? this.f.currency.value : null;
        grossprofits.customer = this.f.customer.value ? this.f.customer.value : "";
        grossprofits.description = this.f.description.value ? this.f.description.value : "";
        grossprofits.grosspercentage = this.f.grosspercentage.value ? this.f.grosspercentage.value : null;
        grossprofits.grossprofit = this.f.grossprofit.value ? this.f.grossprofit.value : null;
        grossprofits.itemname = this.f.itemname.value ? this.f.itemname.value : "";
        grossprofits.postingdate = new Date(this.f.postingdate.value);
        grossprofits.project = this.f.project ? this.f.project.value : "";
        grossprofits.quantity = this.f.quantity.value ? this.f.quantity.value : null;
        grossprofits.salesinvoice = this.f.salesinvoice.value ? this.f.salesinvoice.value : "";
        grossprofits.sellingamount = this.f.sellingamount.value ? this.f.sellingamount.value : null;
        grossprofits.warehouse = this.f.warehouse.value ? this.f.warehouse.value : "";
        if (this.id) {
            grossprofits.id = this.id;
            grossprofits.insertUser = this.insertUser;
			grossprofits.insertDatetime = this.insertDatetime;
            grossprofits.updatedUser = this.authManager.getcurrentUser.username;
			grossprofits.updatedDatetime = new Date();
            this.grossProfitManager.grossupdate(grossprofits).subscribe(response => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let gros = deserialize<Grossprofit001mb>(Grossprofit001mb, response);
                for (let grossprofit of this.grossProfit001) {
                    if (grossprofit.id == gros.id) {
                        grossprofit.averagebuyingrate = gros.averagebuyingrate;
                        grossprofit.averagesellingrate = gros.averagesellingrate;
                        grossprofit.buyingamount = gros.buyingamount;
                        grossprofit.currency = gros.currency;
                        grossprofit.customer = gros.customer;
                        grossprofit.description = gros.description;
                        grossprofit.grosspercentage = gros.grosspercentage;
                        grossprofit.grossprofit = gros.grossprofit;
                        grossprofit.itemname = gros.itemname;
                        grossprofit.project = gros.project;
                        grossprofit.quantity = gros.quantity;
                        grossprofit.salesinvoice = gros.salesinvoice;
                        grossprofit.sellingamount = gros.sellingamount;
                        grossprofit.warehouse = gros.warehouse;
                        grossprofit.postingdate = gros.postingdate;
                        grossprofit.insertUser = this.insertUser;
                        grossprofit.insertDatetime = this.insertDatetime;
                        grossprofit.updatedUser = this.authManager.getcurrentUser.username;
                        grossprofit.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.grossProfit001);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.grossForm.reset();
                this.submitted = false;
                this.id = null;
            });
        } else {
            grossprofits.insertUser = this.authManager.getcurrentUser.username;
			grossprofits.insertDatetime = new Date();
            this.grossProfitManager.grosssave(grossprofits).subscribe(response => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let gros = deserialize<Grossprofit001mb>(Grossprofit001mb, response);
                this.grossProfit001.push(gros);
                const newItems = [JSON.parse(JSON.stringify(gros))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.gridOptions.api.deselectAll();
                this.grossForm.reset();
                this.submitted = false;
            });
        }
    }
    onReset() {
        this.grossForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport() {
        this.grossProfitManager.grossProfitPdf().subscribe((response) => {
            saveAs(response, "GrossProfitList");

        });
    }

    onGenerateExcelReport() {
        this.grossProfitManager.grossProfitExcel().subscribe((response) => {
            saveAs(response, "GrossProfitList");
        })
    }


}