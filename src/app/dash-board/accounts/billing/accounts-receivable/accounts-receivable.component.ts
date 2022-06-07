import { DatePipe } from '@angular/common';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { LinkRendererComponent } from 'src/app/shared/services/renderercomponent/link-renderer-component';
import { AccountsReceivableManager } from 'src/app/shared/services/restcontroller/bizservice/accounts-receivable.service';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Accountsreceivable001mb } from 'src/app/shared/services/restcontroller/entities/Accountsreceivable001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-accounts-receivable',
    templateUrl: './accounts-receivable.component.html',
    styleUrls: ['./accounts-receivable.component.css'],
})
export class AccountsReceivableComponent implements OnInit {
    frameworkComponents: any;
    submitted = false;
    accountsReceivableForm: FormGroup | any;
    id: number | any;
    insertUser: string = '';
    insertDatetime: Date | any;
    postingdate: Date | null = null;
    customer: string = '';
    vouchertype: string = '';
    voucherno: string = '';
    duedate: Date | null = null;
    invoicedamount?: number | any;
    paidamount?: number | any;
    outstandingamount?: number | any;
    age?: number | any;
    uptothirty?: number | any;
    uptosixty?: number | any;
    uptoninety?: number | any;
    ninetyabove?: number | any;
    currency: number | any;
    territory: string = '';
    remarks: string = '';
    dummyname = 'Dummy.status';
    dummytype = 'dummy';
    accountsRec: Accountsreceivable001mb[] = [];
    dummysystemproperties: Systemproperties001mb[] = [];
    public gridOptions: GridOptions | any;

    constructor(
        private accountsReceivableManager: AccountsReceivableManager,
        private systemPropertiesService: SystemPropertiesService,
        private calloutService: CalloutService,
        private formBuilder: FormBuilder,
        private datePipe: DatePipe,
        private authManager: AuthManager,
        private modalService: NgbModal
    ) {
        this.frameworkComponents = {
            //linkRenderer: LinkRendererComponent,
            iconRenderer: IconRendererComponent,
        };
    }
    ngOnInit() {
        this.accountsReceivableForm = this.formBuilder.group({
            postingdate: ['', Validators.required],
            customer: ['', Validators.required],
            territory: ['', Validators.required],
            vouchertype: ['', Validators.required],
            voucherno: ['', Validators.required],
            duedate: ['', Validators.required],
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
        });
        this.createDataGrid001md();
        this.systemPropertiesService
            .system(this.dummyname, this.dummytype)
            .subscribe((response) => {
                this.dummysystemproperties = deserialize<
                    Systemproperties001mb[]
                >(Systemproperties001mb, response);
            });
        this.accountsReceivableManager.allaccrec().subscribe((response) => {
            this.accountsRec = deserialize<Accountsreceivable001mb[]>(
                Accountsreceivable001mb,
                response
            );
            if (this.accountsRec.length > 0) {
                this.gridOptions?.api?.setRowData(this.accountsRec);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        });
    }
    get f() {
        return this.accountsReceivableForm.controls;
    }
    createDataGrid001md(): void {
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
                headerName: 'Posting Date',
                field: 'postingdate',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: (params: any) => {
                    return params.data.postingdate
                        ? this.datePipe.transform(
                            params.data.postingdate,
                            'MM/dd/yyyy'
                        )
                        : '';
                },
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
                field: 'voucherno',
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
                    return params.data.duedate
                        ? this.datePipe.transform(
                            params.data.duedate,
                            'MM/dd/yyyy'
                        )
                        : '';
                },
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
                headerName: 'Age (Days)',
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
                headerName: 'Territory',
                field: 'territory',
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
                width: 200,
                flex: 1,
                suppressSizeToFit: true,
                cellStyle: { textAlign: 'center' },
                cellRendererParams: {
                    onClick: this.onEditButtonClick.bind(this),
                    label: 'Edit',
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
                    label: 'Delete',
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
                    label: 'Audit',
                },
            },
        ];
    }
    onEditButtonClick(params: any) {
        this.id = params.data.id;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.accountsReceivableForm.patchValue({
            age: params.data.age,
            customer: params.data.customer,
            territory: params.data.territory,
            currency: params.data.currency,
            duedate: this.datePipe.transform(params.data.duedate, 'MM/dd/yyyy'),
            invoicedamount: params.data.invoicedamount,
            postingdate: this.datePipe.transform(
                params.data.postingdate,
                'MM/dd/yyyy'
            ),
            remarks: params.data.remarks,
            supplier: params.data.supplier,
            suppliertype: params.data.suppliertype,
            uptoninety: params.data.uptoninety,
            uptosixty: params.data.uptosixty,
            uptothirty: params.data.uptothirty,
            voucherno: params.data.voucherno,
            vouchertype: params.data.vouchertype,
            paidamount: params.data.paidamount,
            outstandingamount: params.data.outstandingamount,
            ninetyabove: params.data.ninetyabove,
        });
    }
    onDeleteButtonClick(params: any) {
        this.accountsReceivableManager
            .accrecdelete(params.data.id)
            .subscribe((response) => {
                for (let i = 0; i < this.accountsRec.length; i++) {
                    if (this.accountsRec[i].id == params.data.id) {
                        this.accountsRec?.splice(i, 1);
                        break;
                    }
                }
                const selectedRows = params.api.getSelectedRows();
                params.api.applyTransaction({ remove: selectedRows });
                this.gridOptions.api.deselectAll();
                this.calloutService.showSuccess('Order Removed Successfully');
            });
    }

    onAuditButtonClick(params: any) {
        const modalRef = this.modalService.open(AuditComponent);
        modalRef.componentInstance.title = 'Accounts Receivable';
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
    onOrderClick(event: any, accountsReceivableForm: any) {
        this.markFormGroupTouched(this.accountsReceivableForm);
        this.submitted = true;

        // stop here if form is invalid
        if (this.accountsReceivableForm.invalid) {
            return;
        }
        let accountsreceivable001mb = new Accountsreceivable001mb();
        accountsreceivable001mb.age = this.f.age.value ? this.f.age.value : 0;
        accountsreceivable001mb.currency = this.f.currency.value
            ? this.f.currency.value
            : '';
        accountsreceivable001mb.customer = this.f.customer.value
            ? this.f.customer.value
            : '';
        accountsreceivable001mb.duedate = new Date(this.f.duedate.value);
        accountsreceivable001mb.invoicedamount = this.f.invoicedamount.value
            ? this.f.invoicedamount.value
            : 0;
        accountsreceivable001mb.ninetyabove = this.f.ninetyabove.value
            ? this.f.ninetyabove.value
            : 0;
        accountsreceivable001mb.outstandingamount = this.f.outstandingamount
            .value
            ? this.f.outstandingamount.value
            : 0;
        accountsreceivable001mb.paidamount = this.f.paidamount.value
            ? this.f.paidamount.value
            : 0;
        accountsreceivable001mb.postingdate = new Date(
            this.f.postingdate.value
        );
        accountsreceivable001mb.remarks = this.f.remarks.value
            ? this.f.remarks.value
            : '';
        accountsreceivable001mb.territory = this.f.territory.value
            ? this.f.territory.value
            : '';
        accountsreceivable001mb.uptoninety = this.f.uptoninety.value
            ? this.f.uptoninety.value
            : 0;
        accountsreceivable001mb.uptosixty = this.f.uptosixty.value
            ? this.f.uptosixty.value
            : 0;
        accountsreceivable001mb.uptothirty = this.f.uptothirty.value
            ? this.f.uptothirty.value
            : 0;
        accountsreceivable001mb.voucherno = this.f.voucherno.value
            ? this.f.voucherno.value
            : '';
        accountsreceivable001mb.vouchertype = this.f.vouchertype.value
            ? this.f.vouchertype.value
            : '';
        if (this.id) {
            accountsreceivable001mb.id = this.id;
            accountsreceivable001mb.insertUser = this.insertUser;
            accountsreceivable001mb.insertDatetime = this.insertDatetime;
            accountsreceivable001mb.updatedUser =
                this.authManager.getcurrentUser.username;
            accountsreceivable001mb.updatedDatetime = new Date();
            this.accountsReceivableManager
                .accrecupdate(accountsreceivable001mb)
                .subscribe((response) => {
                    this.calloutService.showSuccess(
                        'Order Updated Successfully'
                    );
                    let accrec = deserialize<Accountsreceivable001mb>(
                        Accountsreceivable001mb,
                        response
                    );
                    for (let accountsReceivables of this.accountsRec) {
                        if (accountsReceivables.id == accrec.id) {
                            accountsReceivables.territory = accrec.territory;
                            accountsReceivables.age = accrec.age;
                            accountsReceivables.customer = accrec.customer;
                            accountsReceivables.voucherno = accrec.voucherno;
                            accountsReceivables.currency = accrec.currency;
                            accountsReceivables.duedate = accrec.duedate;
                            accountsReceivables.invoicedamount =
                                accrec.invoicedamount;
                            accountsReceivables.postingdate =
                                accrec.postingdate;
                            accountsReceivables.remarks = accrec.remarks;
                            accountsReceivables.uptoninety = accrec.uptoninety;
                            accountsReceivables.uptosixty = accrec.uptosixty;
                            accountsReceivables.uptothirty = accrec.uptothirty;
                            accountsReceivables.vouchertype =
                                accrec.vouchertype;
                            accountsReceivables.paidamount = accrec.paidamount;
                            accountsReceivables.outstandingamount =
                                accrec.outstandingamount;
                            accountsReceivables.ninetyabove =
                                accrec.ninetyabove;
                            accountsReceivables.insertUser = this.insertUser;
                            accountsReceivables.insertDatetime =
                                this.insertDatetime;
                            accountsReceivables.updatedUser =
                                this.authManager.getcurrentUser.username;
                            accountsReceivables.updatedDatetime = new Date();
                        }
                    }
                    this.gridOptions.api.setRowData(this.accountsRec);
                    this.gridOptions.api.refreshView();
                    this.gridOptions.api.deselectAll();
                    this.accountsReceivableForm.reset();
                    this.submitted = false;
                    this.id = null;
                });
        } else {
            accountsreceivable001mb.insertUser =
                this.authManager.getcurrentUser.username;
            accountsreceivable001mb.insertDatetime = new Date();
            this.accountsReceivableManager.accrecsave(accountsreceivable001mb).subscribe((response) => {
                this.calloutService.showSuccess('Order Saved Successfully');
                let accrec = deserialize<Accountsreceivable001mb>(
                    Accountsreceivable001mb,
                    response
                );
                this.accountsRec?.push(accrec);
                const newItems = [JSON.parse(JSON.stringify(accrec))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.gridOptions.api.deselectAll();
                this.accountsReceivableForm.reset();
                this.submitted = false;
            });
        }
    }
    onReset() {
        this.accountsReceivableForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport() {
        this.accountsReceivableManager.accountsReceivablePdf().subscribe((response) => {
            saveAs(response, "AccountsReceivableList");

        });
    }

    onGenerateExcelReport() {
        this.accountsReceivableManager.accountsReceivableExcel().subscribe((response) => {
            saveAs(response, "AccountsReceivableList");
        })
    }

}
