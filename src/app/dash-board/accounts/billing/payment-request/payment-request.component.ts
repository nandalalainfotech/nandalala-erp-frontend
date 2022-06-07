import { DatePipe } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { LinkRendererComponent } from 'src/app/shared/services/renderercomponent/link-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { PayementRequestManager } from 'src/app/shared/services/restcontroller/bizservice/payement-request.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Paymentrequest001mb } from 'src/app/shared/services/restcontroller/entities/Paymentrequest001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-payment-request',
    templateUrl: './payment-request.component.html',
    styleUrls: ['./payment-request.component.css']
})
export class PaymentRequestComponent implements OnInit {
    frameworkComponents: any;
    submitted = false;
    paymentForm: FormGroup | any;
    payreqId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    prName: string = "";
    status: string = "";
    name: string = "payreq.status";
    type: string = "status";
    systemproperties?: Systemproperties001mb[] = [];
    payRequst: Paymentrequest001mb[] = [];
    public gridOptions: GridOptions | any;

    constructor(private payementRequestManager: PayementRequestManager,
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
        this.paymentForm = this.formBuilder.group({
            prName: ['', Validators.required],
            status: ['', Validators.required],

        })
        this.createDataGrid001md();
        this.systemPropertiesService.system(this.name, this.type).subscribe(response => {
            this.systemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.payementRequestManager.allpay().subscribe(response => {
            this.payRequst = deserialize<Paymentrequest001mb[]>(Paymentrequest001mb, response);
            if (this.payRequst.length > 0) {
                this.gridOptions?.api?.setRowData(this.payRequst);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
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
                field: 'payreqId',
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
                headerName: 'Name',
                field: 'prName',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Status',
                field: 'status',
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
                width: 50,
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
                width: 55,
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
                width: 55,
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
        this.payreqId = params.data.payreqId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.paymentForm.patchValue({
            'prName': params.data.prName,
            'status': params.data.status,
        })
    }
    onDeleteButtonClick(params: any) {
        this.payementRequestManager.paydelete(params.data.payreqId).subscribe((response) => {
            for (let i = 0; i < this.payRequst.length; i++) {
                if (this.payRequst[i].payreqId == params.data.payreqId) {
                    this.payRequst?.splice(i, 1);
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
        modalRef.componentInstance.title = "Payment Request";
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
        let paymentrequest = new Paymentrequest001mb();
        paymentrequest.prName = this.f.prName.value ? this.f.prName.value : "";
        paymentrequest.status = this.f.status ? this.f.status.value : "";
        if (this.payreqId) {
            paymentrequest.payreqId = this.payreqId;
            paymentrequest.insertUser = this.insertUser;
            paymentrequest.insertDatetime = this.insertDatetime;
            paymentrequest.updatedUser = this.authManager.getcurrentUser.username;
            paymentrequest.updatedDatetime = new Date();
            this.payementRequestManager.paysave(paymentrequest).subscribe(response => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let paymentrequest001mb = deserialize<Paymentrequest001mb>(Paymentrequest001mb, response);
                for (let paymentsrequest of this.payRequst) {
                    if (paymentsrequest.payreqId == paymentrequest001mb.payreqId) {
                        paymentsrequest.prName = paymentrequest001mb.prName;
                        paymentsrequest.status = paymentrequest001mb.status;
                        paymentsrequest.insertUser = this.insertUser;
                        paymentsrequest.insertDatetime = this.insertDatetime;
                        paymentsrequest.updatedUser = this.authManager.getcurrentUser.username;
                        paymentsrequest.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.payRequst);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.paymentForm.reset();
                this.submitted = false;
                this.payreqId = null;
            });
        } else {
            paymentrequest.insertUser = this.authManager.getcurrentUser.username;
            paymentrequest.insertDatetime = new Date();
            this.payementRequestManager.paysave(paymentrequest).subscribe(response => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let paymentrequest001mb = deserialize<Paymentrequest001mb>(Paymentrequest001mb, response);
                this.payRequst?.push(paymentrequest001mb);
                const newItems = [JSON.parse(JSON.stringify(paymentrequest001mb))];
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
		this.payementRequestManager.payementRequestPdf().subscribe((response) =>{
            saveAs(response,"PaymentRequestList");

		});
	}

	onGenerateExcelReport(){
		this.payementRequestManager.payementRequestExcel().subscribe((response) => {
			saveAs(response,"PaymentRequestList");
        })
	}

}