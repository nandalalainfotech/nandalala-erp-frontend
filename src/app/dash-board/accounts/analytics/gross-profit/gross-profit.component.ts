import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { GrossProfitManager } from 'src/app/shared/services/restcontroller/bizservice/gross-profit.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Grossprofit001mb } from 'src/app/shared/services/restcontroller/entities/Grossprofit001mb';
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
    grosForm: FormGroup | any;
    id?: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    salesinvoice: string = "";
    customer: string = "";
    postingdate: Date | null = null;
    itemname: string = "";
    description: string = "";
    warehouse: string = "";
    project: string = "";
    currency: number | any;
    quantity?: number | any;
    averagesellingrate?: number | any;
    averagebuyingrate?: number | any;
    sellingamount?: number | any;
    buyingamount?: number | any;
    grossprofit?: number | any;
    grosspercentage?: number | any;
    dummyname = "Dummy.status";
    dummytype = "dummy";
    submitted = false;
    public gridOptions: GridOptions | any;
    dummysystemproperties: Systemproperties001mb[] = [];
    grosProfit: Grossprofit001mb[] = [];


    constructor(private grossProfitManager: GrossProfitManager,
        private systemPropertiesService: SystemPropertiesService,
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
        this.grosForm = this.formBuilder.group({
            salesinvoice: ['', Validators.required],
            postingdate: ['', Validators.required],
            customer: ['', Validators.required],
            itemname: ['', Validators.required],
            description: ['', Validators.required],
            warehouse: ['', Validators.required],
            project: ['', Validators.required],
            currency: ['', Validators.required],
            quantity: ['', Validators.required],
            averagesellingrate: ['', Validators.required],
            averagebuyingrate: ['', Validators.required],
            sellingamount: ['', Validators.required],
            buyingamount: ['', Validators.required],
            grossprofit: ['', Validators.required],
            grosspercentage: ['', Validators.required]
        })
        this.systemPropertiesService.system(this.dummyname, this.dummytype).subscribe(response => {
            this.dummysystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.grossProfitManager.allgross().subscribe((response) => {
            this.grosProfit = deserialize<Grossprofit001mb[]>(Grossprofit001mb, response);
            if (this.grosProfit.length > 0) {
                this.gridOptions?.api?.setRowData(this.grosProfit);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    get f() { return this.grosForm.controls }

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
                headerName: 'ID',
                field: 'id',
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
                headerName: 'Sales Invoice',
                field: 'salesinvoice',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Customer',
                field: 'customer',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Posting Date',
                field: 'postingdate',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
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
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Description',
                field: 'description',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Warehouse',
                field: 'warehouse',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Project',
                field: 'project',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Currency',
                field: 'currency',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Quantity',
                field: 'quantity',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Average Selling Rate',
                field: 'averagesellingrate',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Average Buying Rate',
                field: 'averagebuyingrate',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Selling Amount',
                field: 'sellingamount',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Buying Amount',
                field: 'buyingamount',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Gross Profit',
                field: 'grossprofit',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Gross Profit %',
                field: 'grosspercentage',
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
                width: 250,
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
        this.grosForm.patchValue({
            'salesinvoice': params.data.salesinvoice,
            'customer': params.data.customer,
            'postingdate': this.datePipe.transform(params.data.postingdate, 'MM/dd/yyyy'),
            'itemname': params.data.itemname,
            'description': params.data.description,
            'warehouse': params.data.warehouse,
            'project': params.data.project,
            'currency': params.data.currency,
            'quantity': params.data.quantity,
            'averagesellingrate': params.data.averagesellingrate,
            'averagebuyingrate': params.data.averagebuyingrate,
            'sellingamount': params.data.sellingamount,
            'buyingamount': params.data.buyingamount,
            'grossprofit': params.data.grossprofit,
            'grosspercentage': params.data.grosspercentage
        });
    }

    onDeleteButtonClick(params: any) {
        this.grossProfitManager.grossdelete(params.data.id).subscribe((response) => {
            for (let i = 0; i < this.grosProfit.length; i++) {
                if (this.grosProfit[i].id == params.data.id) {
                    this.grosProfit?.splice(i, 1);
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


    onOrderClick(event: any, grosForm: any) {
        this.markFormGroupTouched(this.grosForm);
        this.submitted = true;
        if (this.grosForm.invalid) {
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
        grossprofits.project = this.f.project.value ? this.f.project.value : "";
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
            this.grossProfitManager.grossupdate(grossprofits).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let grossprofit001mb = deserialize<Grossprofit001mb>(Grossprofit001mb, response);
                for (let grossprofits of this.grosProfit) {
                    if (grossprofits.id == grossprofit001mb.id) {
                        grossprofits.averagebuyingrate = grossprofit001mb.averagebuyingrate;
                        grossprofits.averagesellingrate = grossprofit001mb.averagesellingrate;
                        grossprofits.buyingamount = grossprofit001mb.buyingamount;
                        grossprofits.currency = grossprofit001mb.currency;
                        grossprofits.customer = grossprofit001mb.customer;
                        grossprofits.description = grossprofit001mb.description;
                        grossprofits.grosspercentage = grossprofit001mb.grosspercentage;
                        grossprofits.grossprofit = grossprofit001mb.grossprofit;
                        grossprofits.itemname = grossprofit001mb.itemname;
                        grossprofits.postingdate = grossprofit001mb.postingdate;
                        grossprofits.project = grossprofit001mb.project;
                        grossprofits.quantity = grossprofit001mb.quantity;
                        grossprofits.salesinvoice = grossprofit001mb.salesinvoice;
                        grossprofits.sellingamount = grossprofit001mb.sellingamount;
                        grossprofits.warehouse = grossprofit001mb.warehouse;
                        grossprofits.insertUser = this.insertUser;
                        grossprofits.insertDatetime = this.insertDatetime;
                        grossprofits.updatedUser = this.authManager.getcurrentUser.username;
                        grossprofits.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.grosProfit);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.grosForm.reset();
                this.submitted = false;
                this.id = null;
            });
        }
        else {
            grossprofits.insertUser = this.authManager.getcurrentUser.username;
			grossprofits.insertDatetime = new Date();
            this.grossProfitManager.grosssave(grossprofits).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let grossprofit001mb = deserialize<Grossprofit001mb>(Grossprofit001mb, response);
                this.grosProfit?.push(grossprofit001mb);
                const newItems = [JSON.parse(JSON.stringify(grossprofit001mb))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.gridOptions.api.deselectAll();
                this.grosForm.reset();
                this.submitted = false;
            });
        }
    }

    onReset() {
        this.grosForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.grossProfitManager.grossProfitPdf().subscribe((response) =>{
            saveAs(response,"GrossProfitList");

		});
	}

	onGenerateExcelReport(){
		this.grossProfitManager.grossProfitExcel().subscribe((response) => {
			saveAs(response,"GrossProfitList");
        })
	}

}