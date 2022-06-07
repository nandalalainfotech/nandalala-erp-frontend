import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { CustomerBalanceManager } from 'src/app/shared/services/restcontroller/bizservice/customer-credit-balance.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Customercreditbalance001mb } from 'src/app/shared/services/restcontroller/entities/Customercreditbalance001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-customer-crt-bal',
    templateUrl: './customer-crt-bal.component.html',
    styleUrls: ['./customer-crt-bal.component.css']
})
export class CustomerCrtBalComponent implements OnInit {
    @ViewChild('custcrtbal') custcrtbal: NgForm | any;

    frameworkComponents: any;
    creditForm: FormGroup | any;
    name: string = "Dummy.status";
    type: string = "dummy";
    ccid: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    creditlimit: string = "";
    customer: string = "";
    outstandingamount: string = "";
    creditbalance: string = "";
    customername: string | null = "";
    submitted = false;
    customerCreditBalance: Customercreditbalance001mb[] = [];
    systemproperties?: Systemproperties001mb[] = [];
    public gridOptions: GridOptions | any;

    constructor(private systemPropertiesService: SystemPropertiesService,
        private customerBalanceManager: CustomerBalanceManager,
        private formBuilder: FormBuilder,
        private calloutService: CalloutService,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent
        }
    }

    ngOnInit() {
        this.createDataGrid001();
        this.creditForm = this.formBuilder.group({
            creditlimit: ['', Validators.required],
            customer: ['', Validators.required],
            outstandingamount: ['', Validators.required],
            creditbalance: ['', Validators.required],
            customername: ['', Validators.required]
        })
        this.systemPropertiesService.system(this.name, this.type).subscribe(response => {
            this.systemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        });
        this.customerBalanceManager.allbalance().subscribe(response => {
            this.customerCreditBalance = deserialize<Customercreditbalance001mb[]>(Customercreditbalance001mb, response);
            if (this.customerCreditBalance.length > 0) {
                this.gridOptions?.api?.setRowData(this.customerCreditBalance);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    get f() { return this.creditForm.controls }

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
                field: 'ccid',
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
                headerName: 'Credit Limit',
                field: 'creditlimit',
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
                headerName: 'OutStanding Amount',
                field: 'outstandingamount',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Credit Balance',
                field: 'creditbalance',
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
        this.ccid = params.data.ccid;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.creditForm.patchValue({
            'creditlimit': params.data.creditlimit,
            'customer': params.data.customer,
            'outstandingamount': params.data.outstandingamount,
            'creditbalance': params.data.creditbalance,
            'customername': params.data.customername
        });
    }

    onDeleteButtonClick(params: any) {
        this.customerBalanceManager.deletebalance(params.data.ccid).subscribe((response) => {
            for (let i = 0; i < this.customerCreditBalance.length; i++) {
                if (this.customerCreditBalance[i].ccid == params.data.ccid) {
                    this.customerCreditBalance?.splice(i, 1);
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
        modalRef.componentInstance.title = "Customer Credit Balance";
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

    onOrderClick(event: any, creditForm: any) {
        this.markFormGroupTouched(this.creditForm);
        this.submitted = true;
        if (this.creditForm.invalid) {
            return;
        }
        let customercreditbalance001mb = new Customercreditbalance001mb();
        customercreditbalance001mb.creditlimit = this.f.creditlimit.value ? this.f.creditlimit.value : "";
        customercreditbalance001mb.customer = this.f.customer.value ? this.f.customer.value : "";
        customercreditbalance001mb.outstandingamount = this.f.outstandingamount.value ? this.f.outstandingamount.value : null;
        customercreditbalance001mb.creditbalance = this.f.creditbalance.value ? this.f.creditbalance.value : null;
        customercreditbalance001mb.customername = this.f.customername.value ? this.f.customername.value : null;
        if (this.ccid) {
            customercreditbalance001mb.ccid = this.ccid;
            customercreditbalance001mb.insertUser = this.insertUser;
            customercreditbalance001mb.insertDatetime = this.insertDatetime;
            customercreditbalance001mb.updatedUser = this.authManager.getcurrentUser.username;
            customercreditbalance001mb.updatedDatetime = new Date();
            this.customerBalanceManager.updatebalance(customercreditbalance001mb).subscribe(response => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let credit = deserialize<Customercreditbalance001mb>(Customercreditbalance001mb, response);
                for (let balance of this.customerCreditBalance) {
                    if (balance.ccid == credit.ccid) {
                        balance.creditlimit = credit.creditlimit;
                        balance.customer = credit.customer;
                        balance.outstandingamount = credit.outstandingamount;
                        balance.creditbalance = credit.creditbalance;
                        balance.customername = credit.customername;
                        balance.insertUser = this.insertUser;
                        balance.insertDatetime = this.insertDatetime;
                        balance.updatedUser = this.authManager.getcurrentUser.username;
                        balance.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.customerCreditBalance);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.creditForm.reset();
                this.submitted = false;
                this.ccid = null;
            });
        }
        else {
            customercreditbalance001mb.insertUser = this.authManager.getcurrentUser.username;
            customercreditbalance001mb.insertDatetime = new Date();
            this.customerBalanceManager.savebalance(customercreditbalance001mb).subscribe(response => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let credit = deserialize<Customercreditbalance001mb>(Customercreditbalance001mb, response);
                this.customerCreditBalance?.push(credit);
                const newItems = [JSON.parse(JSON.stringify(credit))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.gridOptions.api.deselectAll();
                this.creditForm.reset();
                this.submitted = false;
            })
        }
    }

    onReset() {
        this.creditForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.customerBalanceManager.customerBalancePdf().subscribe((response) =>{
            saveAs(response,"CustomerBalanceDetails");

		});
	}

	onGenerateExcelReport(){
		this.customerBalanceManager.customerBalanceExcel().subscribe((response) => {
			saveAs(response,"CustomerBalanceDetails");
        })
	}

}