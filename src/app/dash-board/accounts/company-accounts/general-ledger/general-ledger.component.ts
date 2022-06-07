import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { GeneralLedgerManager } from 'src/app/shared/services/restcontroller/bizservice/general-ledger.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Accgenledge001mb } from 'src/app/shared/services/restcontroller/entities/Accgenledge001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-general-ledger',
    templateUrl: './general-ledger.component.html',
    styleUrls: ['./general-ledger.component.css']
})

export class GeneralLedgerComponent implements OnInit {

    frameworkComponents: any;
    genLedForm: FormGroup | any;
    accglId?: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    company: string = "";
    fromDate: Date | null = null;
    toDate: Date | null = null;
    partyType: string = "";
    partyName: string = "";
    grpbyVoucher: boolean = false;
    grobyAccount: boolean = false;
    letterHead: string = "";
    postingDate: Date | null = null;
    accountName: string = "";
    debit: number | any;
    credit: number | any;
    voucherCode: string = "";
    voucherType: string = "";
    againstAmt: number | any;
    projectname: string = "";
    costCenter: string = "";
    againvcType: string = "";
    againvcName: string = "";
    name = "party.type";
    type = "type";
    vouname = "stkvoucher.type";
    voutype = "type";
    dummyname = "Dummy.status";
    dummytype = "dummy";
    submitted = false;
    dummysystemproperties: Systemproperties001mb[] = [];
    partysystemproperties: Systemproperties001mb[] = [];
    vousystemproperties: Systemproperties001mb[] = [];
    general: Accgenledge001mb[] = [];
    public gridOptions: GridOptions | any;

    constructor(private systemPropertiesService: SystemPropertiesService,
        private generalLedgerManager: GeneralLedgerManager,
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
        this.genLedForm = this.formBuilder.group({
            company: ['', Validators.required],
            fromDate: ['', Validators.required],
            toDate: ['', Validators.required],
            partyType: ['', Validators.required],
            partyName: ['', Validators.required],
            grpbyVoucher: [''],
            grobyAccount: [''],
            letterHead: ['', Validators.required],
            postingDate: ['', Validators.required],
            accountName: ['', Validators.required],
            debit: ['', Validators.required],
            credit: ['', Validators.required],
            voucherType: ['', Validators.required],
            voucherCode: ['', Validators.required],
            projectname: ['', Validators.required],
            costCenter: ['', Validators.required],
            againvcType: ['', Validators.required],
            againvcName: ['', Validators.required],
            againstAmt: ['', Validators.required]
        })
        this.systemPropertiesService.system(this.dummyname, this.dummytype).subscribe(response => {
            this.dummysystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.systemPropertiesService.system(this.name, this.type).subscribe(response => {
            this.partysystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.systemPropertiesService.system(this.vouname, this.voutype).subscribe(response => {
            this.vousystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.generalLedgerManager.allgeneral().subscribe(response => {
            this.general = deserialize<[Accgenledge001mb]>(Accgenledge001mb, response);
            if (this.general.length > 0) {
                this.gridOptions?.api?.setRowData(this.general);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        });
    }

    get f() { return this.genLedForm.controls }

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
                field: 'accglId',
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
                headerName: 'From Date',
                field: 'fromDate',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: (params: any) => {
                    return params.data.fromDate ? this.datePipe.transform(params.data.fromDate, 'MM/dd/yyyy') : '';
                }
            },
            {
                headerName: 'To Date',
                field: 'toDate',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: (params: any) => {
                    return params.data.toDate ? this.datePipe.transform(params.data.toDate, 'MM/dd/yyyy') : '';
                }
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
                headerName: 'Party',
                field: 'partyName',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Group By Voucher',
                field: 'grpbyVoucher',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: (param: any) => {
                    return param.data.grpbyVoucher == 1 ? true : false;
                }
            },
            {
                headerName: 'Group By Account',
                field: 'grobyAccount',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: (param: any) => {
                    return param.data.grobyAccount == 1 ? true : false;
                }
            },
            {
                headerName: 'Letter Head',
                field: 'letterHead',
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
                headerName: 'Account',
                field: 'accountName',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Debit',
                field: 'debit',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Credit',
                field: 'credit',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Voucher Type',
                field: 'voucherCode',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Voucher Number',
                field: 'voucherType',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Against Account',
                field: 'againstAmt',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Project',
                field: 'projectname',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Cost Center',
                field: 'costCenter',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Against VoucherType',
                field: 'againvcType',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Against Voucher',
                field: 'againvcName',
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
                }
            },
            {
                headerName: 'Delete',
                cellRenderer: 'iconRenderer',
                width: 205,
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
        this.accglId = params.data.accglId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.genLedForm.patchValue({
            'company': params.data.company,
            'fromDate': this.datePipe.transform(params.data.fromDate, 'MM/dd/yyyy'),
            'toDate': this.datePipe.transform(params.data.toDate, 'MM/dd/yyyy'),
            'partyType': params.data.partyType,
            'partyName': params.data.partyName,
            'grpbyVoucher': params.data.grpbyVoucher,
            'grobyAccount': params.data.grobyAccount,
            'letterHead': params.data.letterHead,
            'postingDate': this.datePipe.transform(params.data.postingDate, 'MM/dd/yyyy'),
            'accountName': params.data.accountName,
            'debit': params.data.debit,
            'credit': params.data.credit,
            'voucherType': params.data.voucherType,
            'voucherCode': params.data.voucherCode,
            'projectname': params.data.projectname,
            'costCenter': params.data.costCenter,
            'againvcType': params.data.againvcType,
            'againvcName': params.data.againvcName,
            'againstAmt': params.data.againstAmt
        });
    }

    onDeleteButtonClick(params: any) {
        this.generalLedgerManager.generaldelete(params.data.accglId).subscribe(response => {
            for (let i = 0; i < this.general.length; i++) {
                if (this.general[i].accglId == params.data.accglId) {
                    this.general?.splice(i, 1);
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
        modalRef.componentInstance.title = "General Ledger";
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

    onOrderClick(event: any, genLedForm: any) {
        this.markFormGroupTouched(this.genLedForm);
        this.submitted = true;
        if (this.genLedForm.invalid) {
            return;
        }
        let accgenledge001mb = new Accgenledge001mb();
        accgenledge001mb.company = this.f.company.value ? this.f.company.value : "";
        accgenledge001mb.accountName = this.f.accountName.value ? this.f.accountName.value : "";
        accgenledge001mb.costCenter = this.f.costCenter.value ? this.f.costCenter.value : "";
        accgenledge001mb.credit = this.f.credit.value ? this.f.credit.value : null;
        accgenledge001mb.debit = this.f.debit.value ? this.f.debit.value : null;
        accgenledge001mb.fromDate = new Date(this.f.fromDate.value);
        accgenledge001mb.grobyAccount = this.f.grobyAccount.value ? this.f.grobyAccount.value : false;
        accgenledge001mb.grpbyVoucher = this.f.grpbyVoucher.value ? this.f.grpbyVoucher.value : false;
        accgenledge001mb.letterHead = this.f.letterHead.value ? this.f.letterHead.value : "";
        accgenledge001mb.partyName = this.f.partyName.value ? this.f.partyName.value : "";
        accgenledge001mb.partyType = this.f.partyType.value ? this.f.partyType.value : "";
        accgenledge001mb.postingDate = new Date(this.f.postingDate.value);
        accgenledge001mb.projectname = this.f.projectname.value ? this.f.projectname.value : "";
        accgenledge001mb.toDate = new Date(this.f.toDate.value);
        accgenledge001mb.voucherCode = this.f.voucherCode.value ? this.f.voucherCode.value : "";
        accgenledge001mb.voucherType = this.f.voucherType.value ? this.f.voucherType.value : "";
        accgenledge001mb.againvcType = this.f.againvcType.value ? this.f.againvcType.value : "";
        accgenledge001mb.againvcName = this.f.againvcName.value ? this.f.againvcName.value : "";
        accgenledge001mb.againstAmt = this.f.againstAmt.value ? this.f.againstAmt.value : "";
        if (this.accglId) {
            accgenledge001mb.accglId = this.accglId;
            accgenledge001mb.insertUser = this.insertUser;
            accgenledge001mb.insertDatetime = this.insertDatetime;
            accgenledge001mb.updatedUser = this.authManager.getcurrentUser.username;
            accgenledge001mb.updatedDatetime = new Date();
            this.generalLedgerManager.generalupdate(accgenledge001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let accgenledge001mb = deserialize<Accgenledge001mb>(Accgenledge001mb, response);
                for (let genLed of this.general) {
                    if (genLed.accglId == accgenledge001mb.accglId) {
                        genLed.company = accgenledge001mb.company;
                        genLed.accountName = accgenledge001mb.accountName;
                        genLed.costCenter = accgenledge001mb.costCenter;
                        genLed.credit = accgenledge001mb.credit;
                        genLed.debit = accgenledge001mb.debit;
                        genLed.fromDate = accgenledge001mb.fromDate;
                        genLed.grobyAccount = accgenledge001mb.grobyAccount;
                        genLed.grpbyVoucher = accgenledge001mb.grpbyVoucher;
                        genLed.letterHead = accgenledge001mb.letterHead;
                        genLed.partyName = accgenledge001mb.partyName;
                        genLed.partyType = accgenledge001mb.partyType;
                        genLed.postingDate = accgenledge001mb.postingDate;
                        genLed.projectname = accgenledge001mb.projectname;
                        genLed.toDate = accgenledge001mb.toDate;
                        genLed.voucherCode = accgenledge001mb.voucherCode;
                        genLed.voucherType = accgenledge001mb.voucherType;
                        genLed.againvcType = accgenledge001mb.againvcType;
                        genLed.againvcName = accgenledge001mb.againvcName;
                        genLed.againstAmt = accgenledge001mb.againstAmt;
                        genLed.insertUser = this.insertUser;
                        genLed.insertDatetime = this.insertDatetime;
                        genLed.updatedUser = this.authManager.getcurrentUser.username;
                        genLed.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.general);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.genLedForm.reset();
                this.submitted = false;
                this.accglId = null;
            });
        } else {
            accgenledge001mb.insertUser = this.authManager.getcurrentUser.username;
            accgenledge001mb.insertDatetime = new Date();
            this.generalLedgerManager.generalsave(accgenledge001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let accgenledge001mb = deserialize<Accgenledge001mb>(Accgenledge001mb, response);
                this.general?.push(accgenledge001mb);
                const newItems = [JSON.parse(JSON.stringify(accgenledge001mb))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.gridOptions.api.deselectAll();
                this.genLedForm.reset();
                this.submitted = false;
            });
        }
    }

    onReset() {
        this.genLedForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.generalLedgerManager.generalLedgerPdf().subscribe((response) =>{
            saveAs(response,"GeneralLedgerList");

		});
	}

	onGenerateExcelReport(){
		this.generalLedgerManager.generalLedgerExcel().subscribe((response) => {
			saveAs(response,"GeneralLedgerList");
        })
	}

}