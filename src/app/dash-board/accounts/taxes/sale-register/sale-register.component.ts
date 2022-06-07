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
import { CrmTerritoryManager } from 'src/app/shared/services/restcontroller/bizservice/crm-territory.service';
import { SalesRegisterManager } from 'src/app/shared/services/restcontroller/bizservice/sale-register.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Salesregister001mb } from 'src/app/shared/services/restcontroller/entities/Salesregister001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { Territory001mb } from 'src/app/shared/services/restcontroller/entities/Territory001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-sale-register',
    templateUrl: './sale-register.component.html',
    styleUrls: ['./sale-register.component.css']
})
export class SaleRegisterComponent implements OnInit {

    saleForm: FormGroup | any;
    submitted = false;

    regId:number|any;
    insertUser: string = "";
    insertDatetime: Date | any;
    frameworkComponents: any;
    postingDate: Date|null=null;
    customername: string = "";
    customergroup: string = "";
    terName: string = "";
    accountType: string = "";
    paymentMode: string = "";
    projectname: string = "";
    remarks: string = "";
    salesCode: string = "";
    delNote: string = "";
    currency?: string | null;
    gainloss?: string | null;
    saleswpl?: string | null;
    netTotal?: string | null;
    totalTax?: string | null;
    grandTotal?: string | null;
    roundedTotal?: string | null;
    outstandAmt?: string | null;
    accname: string = "account.type";
    acctype: string = "type";
    payname: string = "payment.mode";
    paytype: string = "mode";
    curname: string = "currency.type";
    curtype: string = "type";
    dummyname = "Dummy.status";
    dummytype = "dummy";
    dummysystemproperties: Systemproperties001mb[] = [];
    saleRegister: Salesregister001mb[] = [];
    territorys: Territory001mb[] = [];
    accsystemproperties?: Systemproperties001mb[] = [];
    paysystemproperties?: Systemproperties001mb[] = [];
    cursystemproperties?: Systemproperties001mb[] = [];
    public gridOptions: GridOptions | any;

    constructor(private salesRegisterManager: SalesRegisterManager,
        private systemPropertiesService: SystemPropertiesService,
        private calloutService: CalloutService, 
        private formBuilder: FormBuilder, 
        private datePipe: DatePipe,
        private crmTerritoryManager: CrmTerritoryManager,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            // linkRenderer: LinkRendererComponent,
            iconRenderer: IconRendererComponent
        }
    }

    ngOnInit() {
        this.saleForm = this.formBuilder.group({
            postingDate: ['', Validators.required],
            customername: ['', Validators.required],
            customergroup: ['', Validators.required],
            terName: ['', Validators.required],
            accountType: ['', Validators.required],
            paymentMode: ['', Validators.required],
            projectname: ['', Validators.required],
            remarks: ['', Validators.required],
            salesCode: ['', Validators.required],
            delNote: ['', Validators.required],
            currency: ['', Validators.required],
            gainloss: ['', Validators.required],
            saleswpl: ['', Validators.required],
            netTotal: ['', Validators.required],
            totalTax: ['', Validators.required],
            grandTotal: ['', Validators.required],
            roundedTotal: ['', Validators.required],
            outstandAmt: ['', Validators.required],
        });

        this.createDataGrid001();
        this.systemPropertiesService.system(this.dummyname, this.dummytype).subscribe(response => {
            this.dummysystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.systemPropertiesService.system(this.curname, this.curtype).subscribe(response => {
            this.cursystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.systemPropertiesService.system(this.payname, this.paytype).subscribe(response => {
            this.paysystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.systemPropertiesService.system(this.accname, this.acctype).subscribe(response => {
            this.accsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.crmTerritoryManager.allterritory().subscribe((response) => {
            this.territorys = deserialize<Territory001mb[]>(Territory001mb, response);
        })
        this.salesRegisterManager.allsalereg().subscribe((response) => {
            this.saleRegister = deserialize<Salesregister001mb[]>(Salesregister001mb, response);
            if (this.saleRegister.length > 0) {
                this.gridOptions?.api?.setRowData(this.saleRegister);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    get f() { return this.saleForm.controls; }

    createDataGrid001(): void {
        this.gridOptions = {
            paginationPageSize: 10,
            rowSelection: 'single',
            onFirstDataRendered: this.onFirstDataRendered.bind(this),
        };
        this.gridOptions.editType = 'fullRow';
        this.gridOptions.enableRangeSelection = true;
        // this.gridOptions.domLayout = 'autoHeight';
        this.gridOptions.animateRows = true;

        this.gridOptions.columnDefs = [
            {
                headerName: '#ID',
                field: 'regId',
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
                headerName: 'Posting Date',
                field: 'postingDate',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: (params: any) => {
                    return params.data.postingDate ? this.datePipe.transform(params.data.postingDate, 'MM/dd/yyyy') : '';
                }
            },
            {
                headerName: 'Customer',
                field: 'customername',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Customer Group',
                field: 'customergroup',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Territory',
                field: 'terName',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Account Type',
                field: 'accountType',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Payment Mode',
                field: 'paymentMode',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Project Name',
                field: 'projectname',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Sales Code',
                field: 'salesCode',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Delivery Note',
                field: 'delNote',
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
                headerName: 'Gain/Loss',
                field: 'gainloss',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Sales-WPL',
                field: 'saleswpl',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Net Total',
                field: 'netTotal',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Total Tax',
                field: 'totalTax',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Grand Total',
                field: 'grandTotal',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Rounded Total',
                field: 'roundedTotal',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Outstanding Amount',
                field: 'outstandAmt',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Remarks',
                field: 'remarks',
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
                width: 250,
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
                width: 300,
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
                width: 280,
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
        this.regId = params.data.regId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.saleForm.patchValue({
            'currency': params.data.currency,
            'customergroup': params.data.customergroup,
            'customername': params.data.customername,
            'delNote': params.data.delNote,
            'gainloss': params.data.gainloss,
            'grandTotal': params.data.grandTotal,
            'netTotal': params.data.netTotal,
            'outstandAmt': params.data.outstandAmt,
            'paymentMode': params.data.paymentMode,
            'postingDate': this.datePipe.transform(params.data.postingDate, 'MM/dd/yyyy'),
            'projectname': params.data.projectname,
            'remarks': params.data.remarks,
            'roundedTotal': params.data.roundedTotal,
            'salesCode': params.data.salesCode,
            'saleswpl': params.data.saleswpl,
            'terName': params.data.terName,
            'totalTax': params.data.totalTax,
            'accountType': params.data.accountType,

        })
    }

    onDeleteButtonClick(params: any) {
        this.salesRegisterManager.saleregdelete(params.data.regId).subscribe((response) => {
            for (let i = 0; i < this.saleRegister.length; i++) {
                if (this.saleRegister[i].regId == params.data.regId) {
                    this.saleRegister?.splice(i, 1);
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
        modalRef.componentInstance.title = "Sales Register";
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

    onOrderClick(event: any, saleForm: any) {
        this.markFormGroupTouched(this.saleForm);
        this.submitted = true;
        if (this.saleForm.invalid) {
            return;
        }
        let salesregister001mb = new Salesregister001mb();
        salesregister001mb.postingDate = new Date(this.f.postingDate.value);
        salesregister001mb.currency = this.f.currency.value ? this.f.currency.value : "";
        salesregister001mb.customergroup = this.f.customergroup.value ? this.f.customergroup.value : "";
        salesregister001mb.customername = this.f.customername.value ? this.f.customername.value : "";
        salesregister001mb.delNote = this.f.delNote.value ? this.f.delNote.value : "";
        salesregister001mb.gainloss = this.f.gainloss.value ? this.f.gainloss.value : "";
        salesregister001mb.grandTotal = this.f.grandTotal.value ? this.f.grandTotal.value : "";
        salesregister001mb.netTotal = this.f.netTotal.value ? this.f.netTotal.value : "";
        salesregister001mb.outstandAmt = this.f.outstandAmt.value ? this.f.outstandAmt.value : "";
        salesregister001mb.paymentMode = this.f.paymentMode.value ? this.f.paymentMode.value : "";
        salesregister001mb.projectname = this.f.projectname.value ? this.f.projectname.value : "";
        salesregister001mb.remarks = this.f.remarks.value ? this.f.remarks.value : "";
        salesregister001mb.roundedTotal = this.f.roundedTotal.value ? this.f.roundedTotal.value : "";
        salesregister001mb.salesCode = this.f.salesCode.value ? this.f.salesCode.value : "";
        salesregister001mb.saleswpl = this.f.saleswpl.value ? this.f.saleswpl.value : "";
        salesregister001mb.terName = this.f.terName.value ? this.f.terName.value : "";
        salesregister001mb.totalTax = this.f.totalTax.value ? this.f.totalTax.value : "";
        salesregister001mb.accountType = this.f.accountType.value ? this.f.accountType.value : "";
        salesregister001mb.gainloss = this.f.gainloss.value ? this.f.gainloss.value : "";
        if (this.regId) {
            salesregister001mb.regId = this.regId;
            salesregister001mb.insertUser = this.insertUser;
			salesregister001mb.insertDatetime = this.insertDatetime;
            salesregister001mb.updatedUser = this.authManager.getcurrentUser.username;
			salesregister001mb.updatedDatetime = new Date();
            this.salesRegisterManager.saleregupdate(salesregister001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let salesreg = deserialize<Salesregister001mb>(Salesregister001mb, response);
                for (let salesRegister of this.saleRegister) {
                    if (salesRegister.regId == salesreg.regId) {
                        salesRegister.currency = salesreg.currency;
                        salesRegister.customergroup = salesreg.customergroup;
                        salesRegister.customername = salesreg.customername;
                        salesRegister.delNote = salesreg.delNote;
                        salesRegister.gainloss = salesreg.gainloss;
                        salesRegister.grandTotal = salesreg.grandTotal;
                        salesRegister.netTotal = salesreg.netTotal;
                        salesRegister.outstandAmt = salesreg.outstandAmt;
                        salesRegister.paymentMode = salesreg.paymentMode;
                        salesRegister.postingDate = salesreg.postingDate;
                        salesRegister.projectname = salesreg.projectname;
                        salesRegister.remarks = salesreg.remarks;
                        salesRegister.roundedTotal = salesreg.roundedTotal;
                        salesRegister.salesCode = salesreg.salesCode;
                        salesRegister.saleswpl = salesreg.saleswpl;
                        salesRegister.terName = salesreg.terName;
                        salesRegister.totalTax = salesreg.totalTax;
                        salesRegister.accountType = salesreg.accountType;
                        salesRegister.gainloss = salesreg.gainloss;
                        salesRegister.insertUser = this.insertUser;
                        salesRegister.insertDatetime = this.insertDatetime;
                        salesRegister.updatedUser = this.authManager.getcurrentUser.username;
                        salesRegister.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.saleRegister);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.saleForm.reset();
                this.regId = null;
                this.submitted = false;
            });
        } else {
            salesregister001mb.insertUser = this.authManager.getcurrentUser.username;
			salesregister001mb.insertDatetime = new Date();
            this.salesRegisterManager.saleregsave(salesregister001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let salesreg = deserialize<Salesregister001mb>(Salesregister001mb, response);
                this.saleRegister?.push(salesreg);
                const newItems = [JSON.parse(JSON.stringify(salesreg))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.saleForm.reset();
                this.submitted = false;
            })
        }
    }

    onReset() {
        this.saleForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.salesRegisterManager.salesRegisterPdf().subscribe((response) =>{
            saveAs(response,"SalesRegisterList");

		});
	}

	onGenerateExcelReport(){
		this.salesRegisterManager.salesRegisterExcel().subscribe((response) => {
			saveAs(response,"SalesRegisterList");
        })
	}


}
