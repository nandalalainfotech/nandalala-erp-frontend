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
import { PayementEntryManager } from 'src/app/shared/services/restcontroller/bizservice/payement-entry.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Paymententry001mb } from 'src/app/shared/services/restcontroller/entities/Paymententry001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-payment-entry',
    templateUrl: './payment-entry.component.html',
    styleUrls: ['./payment-entry.component.css']
})
export class PaymentEntryComponent implements OnInit {

    frameworkComponents: any;
    submitted = false;
    paymentForm: FormGroup | any;
    name: string = "payment.type";
    type: string = "type";
    modename: string = "payment.mode";
    modetype: string = "mode";
    ptypename: string = "party.type";
    ptypetype: string = "type";
    pname: string = "PRSupp.Type";
    ptype: string = "type";
    payentId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    entrySeries: string = "";
    postingDate: Date | null = null;
    paymentType: string = "";
    paymentMode: string = "";
    partyType: string = "";
    partyName: string = "";
    accpaidTo: string = "";
    payments: Paymententry001mb[] = [];
    systemproperties?: Systemproperties001mb[] = [];
    msystemproperties?: Systemproperties001mb[] = [];
    ptypesystemproperties?: Systemproperties001mb[] = [];
    pnamesystemproperties?: Systemproperties001mb[] = [];
    public gridOptions: GridOptions | any;

    constructor(private payementEntryManager: PayementEntryManager,
        private systemPropertiesService: SystemPropertiesService,
        private calloutService: CalloutService,
        private formBuilder: FormBuilder,
        private datePipe: DatePipe,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            //linkRenderer: LinkRendererComponent,
            iconRenderer: IconRendererComponent
        }
    }
    ngOnInit() {
        this.paymentForm = this.formBuilder.group({
            postingDate: ['', Validators.required],
            entrySeries: ['', Validators.required],
            paymentType: ['', Validators.required],
            paymentMode: ['', Validators.required],
            partyType: ['', Validators.required],
            partyName: ['', Validators.required],
            accpaidTo: ['', Validators.required],
        })
        this.createDataGrid001md();
        this.systemPropertiesService.system(this.name, this.type).subscribe(response => {
            this.systemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        });
        this.systemPropertiesService.system(this.modename, this.modetype).subscribe(response => {
            this.msystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        });
        this.systemPropertiesService.system(this.ptypename, this.ptypetype).subscribe(response => {
            this.ptypesystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        });
        this.systemPropertiesService.system(this.pname, this.ptype).subscribe(response => {
            this.pnamesystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        });
        this.payementEntryManager.allpayentry().subscribe(response => {
            this.payments = deserialize<[Paymententry001mb]>(Paymententry001mb, response);
            if (this.payments.length > 0) {
                this.gridOptions?.api?.setRowData(this.payments);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        });
    }
    get f() { return this.paymentForm.controls; }
    createDataGrid001md(): void {
        this.gridOptions = {
            paginationPageSize: 10,
            rowSelection: 'single',
            onFirstDataRendered: this.onFirstDataRendered.bind(this),
        }
        this.gridOptions.editType = 'fullRow';
        this.gridOptions.enableRangeSelection = true;
        this.gridOptions.animateRows = true;
        this.gridOptions.columnDefs = [
            {
                headerName: '#ID',
                field: 'payentId',
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
                headerName: 'Series',
                field: 'entrySeries',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
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
                headerName: 'Payment Type',
                field: 'paymentType',
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
                headerName: 'Party Type',
                field: 'partyType',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Party Name',
                field: 'partyName',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Account PaidTo',
                field: 'accpaidTo',
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
                width:150,
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
        this.payentId = params.data.payentId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.paymentForm.patchValue({
            'accpaidTo': params.data.accpaidTo,
            'entrySeries': params.data.entrySeries,
            'partyName': params.data.partyName,
            'partyType': params.data.partyType,
            'paymentMode': params.data.paymentMode,
            'paymentType': params.data.paymentType,
            'postingDate': this.datePipe.transform(params.data.postingDate, 'MM/dd/yyyy'),
        });
    }
    onDeleteButtonClick(params: any) {
        this.payementEntryManager.payentrydelete(params.data.payentId).subscribe((response) => {
            for (let i = 0; i < this.payments.length; i++) {
                if (this.payments[i].payentId == params.data.payentId) {
                    this.payments?.splice(i, 1);
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
        modalRef.componentInstance.title = "Payment Entry";
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

    onOrderClick(event: any, payment: any) {
        this.markFormGroupTouched(this.paymentForm);
        this.submitted = true;

        // stop here if form is invalid
        if (this.paymentForm.invalid) {
            return;
        }
        let paymententry = new Paymententry001mb();
        paymententry.accpaidTo = this.f.accpaidTo.value ? this.f.accpaidTo.value : "";
        paymententry.entrySeries = this.f.entrySeries.value ? this.f.entrySeries.value : "";
        paymententry.partyName = this.f.partyName.value ? this.f.partyName.value : "";
        paymententry.partyType = this.f.partyType.value ? this.f.partyType.value : "";
        paymententry.paymentMode = this.f.paymentMode.value ? this.f.paymentMode.value : "";
        paymententry.paymentType = this.f.paymentType.value ? this.f.paymentType.value : "";
        paymententry.postingDate = new Date(this.f.postingDate.value);
        if (this.payentId) {
            paymententry.payentId = this.payentId;
            paymententry.insertUser = this.insertUser;
            paymententry.insertDatetime = this.insertDatetime;
            paymententry.updatedUser = this.authManager.getcurrentUser.username;
            paymententry.updatedDatetime = new Date();
            this.payementEntryManager.payentrysave(paymententry).subscribe(response => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let paymententry001mb = deserialize<Paymententry001mb>(Paymententry001mb, response);
                for (let paymentsentry of this.payments) {
                    if (paymentsentry.payentId == paymententry001mb.payentId) {
                        paymentsentry.accpaidTo = paymententry001mb.accpaidTo;
                        paymentsentry.entrySeries = paymententry001mb.entrySeries;
                        paymentsentry.partyName = paymententry001mb.partyName;
                        paymentsentry.partyType = paymententry001mb.partyType;
                        paymentsentry.paymentMode = paymententry001mb.paymentMode;
                        paymentsentry.paymentType = paymententry001mb.paymentType;
                        paymentsentry.postingDate = paymententry001mb.postingDate;
                        paymentsentry.insertUser = this.insertUser;
                        paymentsentry.insertDatetime = this.insertDatetime;
                        paymentsentry.updatedUser = this.authManager.getcurrentUser.username;
                        paymentsentry.updatedDatetime = new Date();

                    }
                }
                this.gridOptions.api.setRowData(this.payments);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.paymentForm.reset();
                this.submitted = false;
                this.payentId = null;
            });
        } else {
            paymententry.insertUser = this.authManager.getcurrentUser.username;
            paymententry.insertDatetime = new Date();
            this.payementEntryManager.payentrysave(paymententry).subscribe(response => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let paymententry001mb = deserialize<Paymententry001mb>(Paymententry001mb, response);
                this.payments?.push(paymententry001mb);
                const newItems = [JSON.parse(JSON.stringify(paymententry001mb))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.gridOptions.api.deselectAll();
                this.paymentForm.reset();
                this.submitted = false;
            });
        }
    }
    onReset() {
        this.paymentForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.payementEntryManager.payementEntryPdf().subscribe((response) =>{
            saveAs(response,"PaymentEntryList");

		});
	}

	onGenerateExcelReport(){
		this.payementEntryManager.payementEntryExcel().subscribe((response) => {
			saveAs(response,"PaymentEntryList");
        })
	}

}