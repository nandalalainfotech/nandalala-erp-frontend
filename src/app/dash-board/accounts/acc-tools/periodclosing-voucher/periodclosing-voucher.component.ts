import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { PeriodClosingManager } from 'src/app/shared/services/restcontroller/bizservice/periodclosing-voucher.service';
import { Periodclosingvoucher001mb } from 'src/app/shared/services/restcontroller/entities/Periodclosingvoucher001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-periodclosing-voucher',
    templateUrl: './periodclosing-voucher.component.html',
    styleUrls: ['./periodclosing-voucher.component.css']
})

export class PeriodclosingVoucherComponent implements OnInit {

    periodCloseForm: FormGroup | any;
    submitted = false;
    id: number|any;
    insertUser: string = "";
    insertDatetime: Date | any;
    frameworkComponents: any;
    transactiondate: Date | null = null;
    closingaccounthead: string = "";
    postingdate: Date | null = null;
    closingfiscalyear: number | any;
    company: string = "";
    remarks: string = "";
    periodClosing: Periodclosingvoucher001mb[] = [];
    public gridOptions: GridOptions | any;

    constructor(private periodClosingManager: PeriodClosingManager, 
        private formBuilder: FormBuilder,
        private calloutService: CalloutService, 
        private datePipe: DatePipe,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent,
        }
    }

    ngOnInit() {
        this.periodCloseForm = this.formBuilder.group({
            transactiondate: ['', Validators.required],
            closingaccounthead: ['', Validators.required],
            postingdate: ['', Validators.required],
            closingfiscalyear: ['', Validators.required],
            company: ['', Validators.required],
            remarks: ['', Validators.required]
        });

        this.createDataGrid001();
        this.periodClosingManager.allperiodclose().subscribe((response) => {
            this.periodClosing = deserialize<Periodclosingvoucher001mb[]>(Periodclosingvoucher001mb, response);
            if (this.periodClosing.length > 0) {
                this.gridOptions?.api?.setRowData(this.periodClosing);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    get f() { return this.periodCloseForm.controls; }

    createDataGrid001(): void {
        this.gridOptions = {
            paginationPageSize: 10,
            rowSelection: 'single',
            onFirstDataRenderer: this.onFirstDataRendered.bind(this),
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
                resizable: true,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Transaction Date',
                field: 'transactiondate',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: (params: any) => {
                    return params.data.transactiondate ? this.datePipe.transform(params.data.transactiondate, 'MM/dd/yyyy') : '';
                }
            },
            {
                headerName: 'Closing Account Head',
                field: 'closingaccounthead',
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
                headerName: 'Closing Fiscal Year',
                field: 'closingfiscalyear',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Company',
                field: 'company',
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
                width: 50,
                flex: 1,
                suppressSizeToFit: true,
                cellStyle: { textAlign: 'center' },
                cellRendererParams: {
                    onClick: this.onEditButtonClick.bind(this),
                    label: 'Edit'
                }
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
                }
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
        this.id = params.data.id;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.periodCloseForm.patchValue({
            'closingaccounthead': params.data.closingaccounthead,
            'closingfiscalyear': params.data.closingfiscalyear,
            'company': params.data.company,
            'postingdate': this.datePipe.transform(params.data.postingdate, 'MM/dd/yyyy'),
            'remarks': params.data.remarks,
            'transactiondate': this.datePipe.transform(params.data.transactiondate, 'MM/dd/yyyy'),
        });
    }

    onDeleteButtonClick(params: any) {
        this.periodClosingManager.periodclosedelete(params.data.id).subscribe((response) => {
            for (let i = 0; i < this.periodClosing.length; i++) {
                if (this.periodClosing[i].id == params.data.id) {
                    this.periodClosing?.splice(i, 1);
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
        modalRef.componentInstance.title = "Period Closing Vocher";
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

    onOrderClick(event: any, periodCloseForm: any) {
        this.markFormGroupTouched(this.periodCloseForm);
        this.submitted = true;
        if (this.periodCloseForm.invalid) {
            return;
        }

        let periodclosingvoucher001mb = new Periodclosingvoucher001mb();
        periodclosingvoucher001mb.closingaccounthead = this.f.closingaccounthead.value ? this.f.closingaccounthead.value : "";
        periodclosingvoucher001mb.closingfiscalyear = this.f.closingfiscalyear.value ? this.f.closingfiscalyear.value : 0;
        periodclosingvoucher001mb.company = this.f.company.value ? this.f.company.value : "";
        periodclosingvoucher001mb.postingdate = new Date(this.f.postingdate.value);
        periodclosingvoucher001mb.remarks = this.f.remarks.value ? this.f.remarks.value : "";
        periodclosingvoucher001mb.transactiondate = new Date(this.f.transactiondate.value);
        if (this.id) {
            periodclosingvoucher001mb.id = this.id;
            periodclosingvoucher001mb.insertUser = this.insertUser;
			periodclosingvoucher001mb.insertDatetime = this.insertDatetime;
            periodclosingvoucher001mb.updatedUser = this.authManager.getcurrentUser.username;
			periodclosingvoucher001mb.updatedDatetime = new Date();
            this.periodClosingManager.periodcloseupdate(periodclosingvoucher001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let period = deserialize<Periodclosingvoucher001mb>(Periodclosingvoucher001mb, response);
                for (let periodClose of this.periodClosing) {
                    if (periodClose.id == period.id) {
                        periodClose.closingaccounthead = period.closingaccounthead;
                        periodClose.closingfiscalyear = period.closingfiscalyear;
                        periodClose.company = period.company;
                        periodClose.postingdate = period.postingdate;
                        periodClose.remarks = period.remarks;
                        periodClose.transactiondate = period.transactiondate;
                        periodClose.insertUser = this.insertUser;
                        periodClose.insertDatetime = this.insertDatetime;
                        periodClose.updatedUser = this.authManager.getcurrentUser.username;
                        periodClose.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.periodClosing);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.periodCloseForm.reset();
                this.id = null;
                this.submitted = false;
            })

        }
        else {
            periodclosingvoucher001mb.insertUser = this.authManager.getcurrentUser.username;
			periodclosingvoucher001mb.insertDatetime = new Date();
            this.periodClosingManager.periodclosesave(periodclosingvoucher001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let period = deserialize<Periodclosingvoucher001mb>(Periodclosingvoucher001mb, response);
                this.periodClosing?.push(period);
                const newItems = [JSON.parse(JSON.stringify(period))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.periodCloseForm.reset();
                this.submitted = false;
            })
        }
    }

    onReset() {
        this.submitted = false;
        this.periodCloseForm.reset();
    }

    onGeneratePdfReport(){
		this.periodClosingManager.periodClosingPdf().subscribe((response) =>{
            saveAs(response,"PeriodClosingVoucher");

		});
	}

	onGenerateExcelReport(){
		this.periodClosingManager.periodClosingExcel().subscribe((response) => {
			saveAs(response,"PeriodClosingVoucher");
        })
	}


}
