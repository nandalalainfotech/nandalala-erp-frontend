import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { LinkRendererComponent } from 'src/app/shared/services/renderercomponent/link-renderer-component';
import { AccountsPayableManager } from 'src/app/shared/services/restcontroller/bizservice/accounts-payable.service';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Accountspayable001mb } from 'src/app/shared/services/restcontroller/entities/Accountspayable001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-accountspay-summary',
    templateUrl: './accountspay-summary.component.html',
    styleUrls: ['./accountspay-summary.component.css']
})
export class AccountspaySummaryComponent implements OnInit {

    frameworkComponents: any;
    accPaySumForm: FormGroup | any;
    submitted = false;
    id:number|any;
    insertUser: string = "";
    insertDatetime: Date | any;
    postingdate: string = "";
    supplier: string = "";
    suppliertype: string = "";
    vouchertype: string = "";
    vouchernumber: string = "";
    duedate: Date|null =null;
    billno: Date|null =null;
    billdate: Date|null =null;
    invoicedamount?: number;
    paidamount?: number;
    outstandingamount?: number;
    age?: number;
    uptothirty?: number;
    uptosixty?: number;
    uptoninety?: number;
    ninetyabove?: number;
    currency: string = "";
    remarks: string = "";
    name: string = "PRSupp.Type";
    type: string = "Type";
    supname: string = "Supplier.Type";
    suptype: string = "Type";
    accountsPayable: Accountspayable001mb[] = [];
    systemproperties?: Systemproperties001mb[] = [];
    supsystemproperties?: Systemproperties001mb[] = [];
    public gridOptions: GridOptions | any;

    constructor(private  accountsPayableManager:  AccountsPayableManager,
        private systemPropertiesService: SystemPropertiesService, 
        private calloutService: CalloutService, 
        private formBuilder: FormBuilder, 
        private datePipe: DatePipe,
        private authManager: AuthManager,
        private modalService: NgbModal) {
            this.frameworkComponents = {
               // linkRenderer: LinkRendererComponent,
               iconRenderer: IconRendererComponent
            }
        }
    ngOnInit() {
        this.accPaySumForm = this.formBuilder.group({
            postingdate: ['', Validators.required],
            supplier: ['', Validators.required],
            suppliertype: ['', Validators.required],
            vouchertype: ['', Validators.required],
            vouchernumber: ['', Validators.required],
            duedate: ['', Validators.required],
            billno: ['', Validators.required],
            billdate: ['', Validators.required],
            invoicedamount: ['', Validators.required],
            paidamount: ['', Validators.required],
            outstandingamount: ['', Validators.required],
            age: ['', Validators.required],
            uptothirty: ['', Validators.required],
            uptosixty: ['', Validators.required],
            uptoninety: ['', Validators.required],
            ninetyabove: ['', Validators.required],
            currency: ['', Validators.required],
            remarks: ['', Validators.required],
        })
        this.createDataGrid001mb();
        this.systemPropertiesService.system(this.name, this.type).subscribe(response => {
            this.systemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.systemPropertiesService.system(this.supname, this.suptype).subscribe(response => {
            this.supsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.accountsPayableManager.allaccpay().subscribe(response => { 
            this.accountsPayable = deserialize<Accountspayable001mb[]>(Accountspayable001mb, response);
            if (this.accountsPayable.length > 0) {
                this.gridOptions?.api?.setRowData(this.accountsPayable);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }
    get f() { return this.accPaySumForm.controls; }
    createDataGrid001mb(): void {
        this.gridOptions = {
            paginationPageSize: 10,
            rowSelection: 'single',
            onFirstDataRendered: this.onFirstDataRendered.bind(this),
        }
        this.gridOptions.editType = "fullRow",
            this.gridOptions.enableRangeSelection = true,
            this.gridOptions.animateRows = true,
            this.gridOptions.columnDefs = [
                {
                    headerName: '#ID',
                    field: 'id',
                    width: 200,
                    flex: 1,
                    sortable: true,
                    filter: true,
                    resizable: true,
                    headerCheckboxSelection: true,
                    headerCheckboxSelectionFilterOnly: true,
                    checkboxSelection: true,
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
                    headerName: 'Supplier',
                    field: 'supplier',
                    width: 200,
                    flex: 1,
                    sortable: true,
                    filter: true,
                    resizable: true,
                    suppressSizeToFit: true,
                },
                {
                    headerName: 'Supplier Type',
                    field: 'suppliertype',
                    width: 200,
                    flex: 1,
                    sortable: true,
                    filter: true,
                    resizable: true,
                    suppressSizeToFit: true,
                },
                {
                    headerName: 'Voucher Type',
                    field: 'vouchertype',
                    width: 200,
                    flex: 1,
                    sortable: true,
                    filter: true,
                    resizable: true,
                    suppressSizeToFit: true,
                },
                {
                    headerName: 'Voucher No',
                    field: 'vouchernumber',
                    width: 200,
                    flex: 1,
                    sortable: true,
                    filter: true,
                    resizable: true,
                    suppressSizeToFit: true,
                },
                {
                    headerName: 'Due Date',
                    field: 'duedate',
                    width: 200,
                    flex: 1,
                    sortable: true,
                    filter: true,
                    resizable: true,
                    suppressSizeToFit: true,
                    valueGetter: (params: any) => {
                        return params.data.duedate ? this.datePipe.transform(params.data.duedate, 'MM/dd/yyyy') : '';
                    }
                },
                {
                    headerName: 'Bill No',
                    field: 'billno',
                    width: 200,
                    flex: 1,
                    sortable: true,
                    filter: true,
                    resizable: true,
                    suppressSizeToFit: true,
                },
                {
                    headerName: 'Bill Date',
                    field: 'billdate',
                    width: 200,
                    flex: 1,
                    sortable: true,
                    filter: true,
                    resizable: true,
                    suppressSizeToFit: true,
                    valueGetter: (params: any) => {
                        return params.data.billdate ? this.datePipe.transform(params.data.billdate, 'MM/dd/yyyy') : '';
                    }
                },
                {
                    headerName: 'Invoiced Amount',
                    field: 'invoicedamount',
                    width: 200,
                    flex: 1,
                    sortable: true,
                    filter: true,
                    resizable: true,
                    suppressSizeToFit: true,
                },
                {
                    headerName: 'Paid Amount',
                    field: 'paidamount',
                    width: 200,
                    flex: 1,
                    sortable: true,
                    filter: true,
                    resizable: true,
                    suppressSizeToFit: true,
                },
                {
                    headerName: 'Outstanding Amount',
                    field: 'outstandingamount',
                    width: 200,
                    flex: 1,
                    sortable: true,
                    filter: true,
                    resizable: true,
                    suppressSizeToFit: true,
                },
                {
                    headerName: 'Age',
                    field: 'age',
                    width: 200,
                    flex: 1,
                    sortable: true,
                    filter: true,
                    resizable: true,
                    suppressSizeToFit: true,
                },
                {
                    headerName: '0-30',
                    field: 'uptothirty',
                    width: 200,
                    flex: 1,
                    sortable: true,
                    filter: true,
                    resizable: true,
                    suppressSizeToFit: true,
                },
                {
                    headerName: '31-60',
                    field: 'uptosixty',
                    width: 200,
                    flex: 1,
                    sortable: true,
                    filter: true,
                    resizable: true,
                    suppressSizeToFit: true,
                },
                {
                    headerName: '61-90',
                    field: 'uptoninety',
                    width: 200,
                    flex: 1,
                    sortable: true,
                    filter: true,
                    resizable: true,
                    suppressSizeToFit: true,
                },
                {
                    headerName: '91 Above',
                    field: 'ninetyabove',
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
                    width: 280,
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
        this.id = params.data.id;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.accPaySumForm.patchValue({
            'age': params.data.age,
            'billdate': this.datePipe.transform(params.data.billdate, 'MM/dd/yyyy'),
            'billno': params.data.billno,
            'currency': params.data.currency,
            'duedate': this.datePipe.transform(params.data.duedate, 'MM/dd/yyyy'),
            'invoicedamount': params.data.invoicedamount,
            'postingdate': this.datePipe.transform(params.data.postingdate, 'MM/dd/yyyy'),
            'remarks': params.data.remarks,
            'supplier': params.data.supplier,   
            'suppliertype': params.data.suppliertype,
            'uptoninety': params.data.uptoninety,
            'uptosixty': params.data.uptosixty,
            'uptothirty': params.data.uptothirty,
            'vouchernumber': params.data.vouchernumber,
            'vouchertype': params.data.vouchertype,
            'paidamount': params.data.paidamount,
            'outstandingamount': params.data.outstandingamount,
            'ninetyabove': params.data.ninetyabove,
        });
    }
    onDeleteButtonClick(params: any) {
        this.accountsPayableManager.accpaydelete(params.data.id).subscribe((response) => {
            for (let i = 0; i < this. accountsPayable.length; i++) {
                if (this.accountsPayable[i].id == params.data.id) {
                    this.accountsPayable?.splice(i, 1);
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
        modalRef.componentInstance.title = "Accounts Payable Summary";
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
    onOrderClick(event: any, accPaySumForm: any) {
        this.markFormGroupTouched(this.accPaySumForm);
        this.submitted = true;

        // stop here if form is invalid
        if (this.accPaySumForm.invalid) {
            return;
        }
        let accountspayable = new Accountspayable001mb();
        accountspayable.age = this.f.age.value ? this.f.age.value : 0;
        accountspayable.billdate =  new Date(this.f.billdate.value);
        accountspayable.billno = this.f.billno.value ? this.f.billno.value : "";
        accountspayable.currency = this.f.currency.value ? this.f.currency.value : "";
        accountspayable.duedate =  new Date(this.f.duedate.value);
        accountspayable.invoicedamount = this.f.invoicedamount.value ? this.f.invoicedamount.value : 0;
        accountspayable.postingdate =  new Date(this.f.postingdate.value);
        accountspayable.remarks = this.f.remarks.value ? this.f.remarks.value : "";
        accountspayable.supplier = this.f.supplier.value ? this.f.supplier.value : "";
        accountspayable.suppliertype = this.f.suppliertype.value ? this.f.suppliertype.value : "";
        accountspayable.uptoninety = this.f.uptoninety.value ? this.f.uptoninety.value : 0;
        accountspayable.uptosixty = this.f.uptosixty.value ? this.f.uptosixty.value : 0;
        accountspayable.uptothirty = this.f.uptothirty.value ? this.f.uptothirty.value : 0;
        accountspayable.vouchernumber = this.f.vouchernumber.value ? this.f.vouchernumber.value : "";
        accountspayable.vouchertype = this.f.vouchertype.value ? this.f.vouchertype.value : "";
        accountspayable.paidamount = this.f.paidamount.value ? this.f.paidamount.value : 0;
        accountspayable.outstandingamount = this.f.outstandingamount.value ? this.f.outstandingamount.value : 0;
        accountspayable.ninetyabove = this.f.ninetyabove.value ? this.f.ninetyabove.value : 0;
		if(this.id) {
			accountspayable.id =this.id;
            accountspayable.insertUser = this.insertUser;
			accountspayable.insertDatetime = this.insertDatetime;
            accountspayable.updatedUser = this.authManager.getcurrentUser.username;
			accountspayable.updatedDatetime = new Date();
            this.accountsPayableManager.accpayupdate(accountspayable).subscribe(response => {
                this.calloutService.showSuccess("Order Updated Successfully");
                 let accpay = deserialize<Accountspayable001mb>(Accountspayable001mb, response);
				for(let accPaySums of this.accountsPayable) {
					if(accPaySums.id ==accpay.id) {
					   accPaySums.billdate = accpay.billdate;
                        accPaySums.age = accpay.age;
                        accPaySums.billno = accpay.billno;
                        accPaySums.currency = accpay.currency;
                        accPaySums.duedate = accpay.duedate;
                        accPaySums.invoicedamount = accpay.invoicedamount;
                        accPaySums.postingdate = accpay.postingdate;
                        accPaySums.remarks = accpay.remarks;
                        accPaySums.supplier = accpay.supplier;
                        accPaySums.uptoninety = accpay.uptoninety;
                        accPaySums.uptosixty = accpay.uptosixty;
                        accPaySums.vouchernumber = accpay.vouchernumber;
                        accPaySums.suppliertype = accpay.suppliertype;
                        accPaySums.vouchertype = accpay.vouchertype;
                        accPaySums.paidamount = accpay.paidamount;
                        accPaySums.outstandingamount = accpay.outstandingamount;
                        accPaySums.ninetyabove = accpay.ninetyabove;
                        accPaySums.insertUser = this.insertUser;
                        accPaySums.insertDatetime = this.insertDatetime;
                        accPaySums.updatedUser = this.authManager.getcurrentUser.username;
                        accPaySums.updatedDatetime = new Date();
					}
				}
                this.gridOptions.api.setRowData(this.accountsPayable);
				this.gridOptions.api.refreshView();
				this.accPaySumForm.reset();
                this.submitted = false;
			     this.id = null;
			});
		} else {
            accountspayable.insertUser = this.authManager.getcurrentUser.username;
			accountspayable.insertDatetime = new Date();
            this.accountsPayableManager.accpaysave(accountspayable).subscribe(response => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let accpay = deserialize<Accountspayable001mb>(Accountspayable001mb, response);
                this.accountsPayable?.push(accpay);
                const newItems = [JSON.parse(JSON.stringify(accpay))];
                this.gridOptions.api.applyTransaction({add: newItems});
				this.gridOptions.api.deselectAll();
				this.accPaySumForm.reset();
                this.submitted = false;
			});
		}
	}
    onReset() {
        this.accPaySumForm.reset();
                this.submitted = false;
    }

    onGeneratePdfReport(){
		this.accountsPayableManager.accountsPayablePdf().subscribe((response) =>{
            saveAs(response,"AccountsPayableSummaryList");

		});
	}

	onGenerateExcelReport(){
		this.accountsPayableManager.accountsPayableExcel().subscribe((response) => {
			saveAs(response,"AccountsPayableSummaryList");
        })
	}

}