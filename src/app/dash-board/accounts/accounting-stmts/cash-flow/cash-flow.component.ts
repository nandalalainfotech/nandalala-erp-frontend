import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { CashFlowManager } from 'src/app/shared/services/restcontroller/bizservice/cashflow.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Acccashflow001mb } from 'src/app/shared/services/restcontroller/entities/Acccashflow001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-cash-flow',
    templateUrl: './cash-flow.component.html',
    styleUrls: ['./cash-flow.component.css']
})

export class CashFlowComponent implements OnInit {
    cashForm: FormGroup | any;
    submitted = false;
    frameworkComponents: any;
    acfId:number|any;
    insertUser: string = "";
    insertDatetime: Date | any;
    company: string = "";
    startYear:number|any;
    endYear: number|any;
    periodicity: string = "";
    account: string = "";
    jan: string | null = "";
    feb: string | null = "";
    mar: string | null = "";
    apr: string | null = "";
    may: string | null = "";
    jun: string | null = "";
    jul: string | null = "";
    aug: string | null = "";
    sep: string | null = "";
    oct: string | null = "";
    nov: string | null = "";
    dece: string | null = "";
    dummyname = "Dummy.status";
    dummytype = "dummy";
    periodname="range.type";
    periodtype="type";
    startyearname = "StartYear.status";
    startyeartype = "startyear";
    endyearname = "EndYear.status";
    endyeartype = "endyear";
    dummysystemproperties: Systemproperties001mb[] = [];
    periodsystemproperties:Systemproperties001mb[] = [];
    endyearsystemproperties: Systemproperties001mb[] = [];
    startyearsystemproperties: Systemproperties001mb[] = [];
    public gridOptions: GridOptions | any;
    cashFlow: Acccashflow001mb[] = [];

    constructor(private cashFlowManager: CashFlowManager, 
        private formBuilder: FormBuilder, 
        private systemPropertiesService: SystemPropertiesService, 
        private calloutService: CalloutService,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent,
        }
    }

    ngOnInit() {
        this.cashForm = this.formBuilder.group({
            company: ['', Validators.required],
            startYear: ['', Validators.required],
            endYear: ['', Validators.required],
            periodicity: ['', Validators.required],
            account: ['', Validators.required],
            jan: ['', Validators.required],
            feb: ['', Validators.required],
            mar: ['', Validators.required],
            apr: ['', Validators.required],
            may: ['', Validators.required],
            jun: ['', Validators.required],
            jul: ['', Validators.required],
            aug: ['', Validators.required],
            sep: ['', Validators.required],
            oct: ['', Validators.required],
            nov: ['', Validators.required],
            dece: ['', Validators.required]
        });

        this.createDataGrid001();
        this.systemPropertiesService.system(this.startyearname, this.startyeartype).subscribe(response => {
            this.startyearsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.systemPropertiesService.system(this.endyearname, this.endyeartype).subscribe(response => {
            this.endyearsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.systemPropertiesService.system(this.periodname, this.periodtype).subscribe(response => {
            this.periodsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.cashFlowManager.allcashflow().subscribe((response) => {
            this.cashFlow = deserialize<Acccashflow001mb[]>(Acccashflow001mb, response);
            if (this.cashFlow.length > 0) {
                this.gridOptions?.api?.setRowData(this.cashFlow);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    get f() { return this.cashForm.controls; }

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
                headerName: '#Id',
                field: 'acfId',
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
                headerName: 'Start year',
                field: 'startYear',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'End year',
                field: 'endYear',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Period',
                field: 'periodicity',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Account',
                field: 'account',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Jan',
                field: 'jan',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Feb',
                field: 'feb',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Mar',
                field: 'mar',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Apr',
                field: 'apr',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'May',
                field: 'may',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Jun',
                field: 'jun',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Jul',
                field: 'jul',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Aug',
                field: 'aug',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Sep',
                field: 'sep',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Oct',
                field: 'oct',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Nov',
                field: 'nov',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Dec',
                field: 'dece',
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
        this.acfId = params.data.acfId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.cashForm.patchValue({
            'company': params.data.company,
            'startYear': params.data.startYear,
            'endYear': params.data.endYear,
            'periodicity': params.data.periodicity,
            'account': params.data.account,
            'jan': params.data.jan,
            'feb': params.data.feb,
            'mar': params.data.mar,
            'apr': params.data.apr,
            'may': params.data.may,
            'jun': params.data.jun,
            'jul': params.data.jul,
            'aug': params.data.aug,
            'sep': params.data.sep,
            'oct': params.data.oct,
            'nov': params.data.nov,
            'dece': params.data.dece,
        });
    }

    onDeleteButtonClick(params: any) {
        this.cashFlowManager.cashflowdelete(params.data.acfId).subscribe((response) => {
            for (let i = 0; i < this.cashFlow.length; i++) {
                if (this.cashFlow[i].acfId == params.data.acfId) {
                    this.cashFlow?.splice(i, 1);
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
        modalRef.componentInstance.title = "Cash Flow";
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

    onOrderClick(event: any, cashForm: any) {
        this.markFormGroupTouched(this.cashForm);
        this.submitted = true;
        if (this.cashForm.invalid) {
            return;
        }

        let acccashflow001mb = new Acccashflow001mb();
        acccashflow001mb.account = this.f.account.value ? this.f.account.value : "";
        acccashflow001mb.apr = this.f.apr.value ? this.f.apr.value : "";
        acccashflow001mb.aug = this.f.aug.value ? this.f.aug.value : "";
        acccashflow001mb.company = this.f.company.value ? this.f.company.value : "";
        acccashflow001mb.dece = this.f.dece.value ? this.f.dece.value : "";
        acccashflow001mb.endYear = this.f.endYear.value ? this.f.endYear.value : "";
        acccashflow001mb.feb = this.f.feb.value ? this.f.feb.value : "";
        acccashflow001mb.jan = this.f.jan.value ? this.f.jan.value : "";
        acccashflow001mb.jul = this.f.jul.value ? this.f.jul.value : "";
        acccashflow001mb.jun = this.f.jun.value ? this.f.jun.value : "";
        acccashflow001mb.mar = this.f.mar.value ? this.f.mar.value : "";
        acccashflow001mb.may = this.f.may.value ? this.f.may.value : "";
        acccashflow001mb.nov = this.f.nov.value ? this.f.nov.value : "";
        acccashflow001mb.oct = this.f.oct.value ? this.f.oct.value : "";
        acccashflow001mb.periodicity = this.f.periodicity.value ? this.f.periodicity.value : "";
        acccashflow001mb.sep = this.f.sep.value ? this.f.sep.value : "";
        acccashflow001mb.startYear = this.f.startYear.value ? this.f.startYear.value : "";
        if (this.acfId) {
            acccashflow001mb.acfId = this.acfId;
            acccashflow001mb.insertUser = this.insertUser;
			acccashflow001mb.insertDatetime = this.insertDatetime;
            acccashflow001mb.updatedUser = this.authManager.getcurrentUser.username;
			acccashflow001mb.updatedDatetime = new Date();
            this.cashFlowManager.cashflowupdate(acccashflow001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let acccashflowres = deserialize<Acccashflow001mb>(Acccashflow001mb, response);
                for (let cashflow001 of this.cashFlow) {
                    if (cashflow001.acfId == acccashflowres.acfId) {
                        cashflow001.account = acccashflowres.account;
                        cashflow001.apr = acccashflowres.apr;
                        cashflow001.aug = acccashflowres.aug;
                        cashflow001.company = acccashflowres.company;
                        cashflow001.dece = acccashflowres.dece;
                        cashflow001.endYear = acccashflowres.endYear;
                        cashflow001.feb = acccashflowres.feb;
                        cashflow001.jan = acccashflowres.jan;
                        cashflow001.jul = acccashflowres.jul;
                        cashflow001.jun = acccashflowres.jun;
                        cashflow001.mar = acccashflowres.mar;
                        cashflow001.may = acccashflowres.may;
                        cashflow001.nov = acccashflowres.nov;
                        cashflow001.oct = acccashflowres.oct;
                        cashflow001.periodicity = acccashflowres.periodicity;
                        cashflow001.sep = acccashflowres.sep;
                        cashflow001.startYear = acccashflowres.startYear;
                        cashflow001.insertUser = this.insertUser;
                        cashflow001.insertDatetime = this.insertDatetime;
                        cashflow001.updatedUser = this.authManager.getcurrentUser.username;
                        cashflow001.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.cashFlow);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.cashForm.reset();
                this.acfId = null;
                this.submitted = false;
            });
        }
        else {
            acccashflow001mb.insertUser = this.authManager.getcurrentUser.username;
			acccashflow001mb.insertDatetime = new Date();
            this.cashFlowManager.cashflowsave(acccashflow001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let acccashflow = deserialize<Acccashflow001mb>(Acccashflow001mb, response);
                this.cashFlow?.push(acccashflow);
                const newItems = [JSON.parse(JSON.stringify(acccashflow))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.cashForm.reset();
                this.submitted = false;
            })
        }
    }
    onReset() {
        this.submitted = false;
        this.cashForm.reset();
    }

    onGeneratePdfReport(){
		this.cashFlowManager.cashFlowPdf().subscribe((response) =>{
            saveAs(response,"CashFlowDetails");

		});
	}

	onGenerateExcelReport(){
		this.cashFlowManager.cashFlowExcel().subscribe((response) => {
			saveAs(response,"CashFlowDetails");
        })
	}

}
