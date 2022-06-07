import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { BalanceSheetManager } from 'src/app/shared/services/restcontroller/bizservice/balancesheet.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Accbalancesheet001mb } from 'src/app/shared/services/restcontroller/entities/Accbalancesheet001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-balance-sheet',
    templateUrl: './balance-sheet.component.html',
    styleUrls: ['./balance-sheet.component.css']
})

export class BalanceSheetComponent implements OnInit {
    balanceForm: FormGroup | any;
    submitted = false;
    frameworkComponents: any;
    absId:number|any;
    insertUser: string = "";
    insertDatetime: Date | any;
    company: string = "";
    startYear: number|any;
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
    startyearname = "StartYear.status";
    startyeartype = "startyear";
    endyearname = "EndYear.status";
    endyeartype = "endyear";
    periodname="range.type";
    periodtype="type";
    dummysystemproperties: Systemproperties001mb[] = [];
    public gridOptions: GridOptions | any;
    balanceSheet: Accbalancesheet001mb[] = [];
    periodsystemproperties:Systemproperties001mb[] = [];
    endyearsystemproperties: Systemproperties001mb[] = [];
    startyearsystemproperties: Systemproperties001mb[] = [];

    constructor(private balancesheetManager: BalanceSheetManager, 
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
        this.balanceForm = this.formBuilder.group({
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
        this.balancesheetManager.allbalance().subscribe((response) => {
            this.balanceSheet = deserialize<Accbalancesheet001mb[]>(Accbalancesheet001mb, response);
            if (this.balanceSheet.length > 0) {
                this.gridOptions?.api?.setRowData(this.balanceSheet);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    get f() { return this.balanceForm.controls; }

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
                field: 'absId',
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
        this.absId = params.data.absId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.balanceForm.patchValue({
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
        this.balancesheetManager.balancedelete(params.data.absId).subscribe((response) => {
            for (let i = 0; i < this.balanceSheet.length; i++) {
                if (this.balanceSheet[i].absId == params.data.absId) {
                    this.balanceSheet?.splice(i, 1);
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
        modalRef.componentInstance.title = "Balance Sheet";
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

    onOrderClick(event: any, balanceForm: any) {
        this.markFormGroupTouched(this.balanceForm);
        this.submitted = true;
        if (this.balanceForm.invalid) {
            return;
        }

        let accbalancesheet001mb = new Accbalancesheet001mb();
        accbalancesheet001mb.account = this.f.account.value ? this.f.account.value : "";
        accbalancesheet001mb.apr = this.f.apr.value ? this.f.apr.value : "";
        accbalancesheet001mb.aug = this.f.aug.value ? this.f.aug.value : "";
        accbalancesheet001mb.company = this.f.company.value ? this.f.company.value : "";
        accbalancesheet001mb.dece = this.f.dece.value ? this.f.dece.value : "";
        accbalancesheet001mb.endYear = this.f.endYear.value ? this.f.endYear.value : "";
        accbalancesheet001mb.feb = this.f.feb.value ? this.f.feb.value : "";
        accbalancesheet001mb.jan = this.f.jan.value ? this.f.jan.value : "";
        accbalancesheet001mb.jul = this.f.jul.value ? this.f.jul.value : "";
        accbalancesheet001mb.jun = this.f.jun.value ? this.f.jun.value : "";
        accbalancesheet001mb.mar = this.f.mar.value ? this.f.mar.value : "";
        accbalancesheet001mb.may = this.f.may.value ? this.f.may.value : "";
        accbalancesheet001mb.nov = this.f.nov.value ? this.f.nov.value : "";
        accbalancesheet001mb.oct = this.f.oct.value ? this.f.oct.value : "";
        accbalancesheet001mb.periodicity = this.f.periodicity.value ? this.f.periodicity.value : "";
        accbalancesheet001mb.sep = this.f.sep.value ? this.f.sep.value : "";
        accbalancesheet001mb.startYear = this.f.startYear.value ? this.f.startYear.value : "";
        if (this.absId) {
            accbalancesheet001mb.absId = this.absId;
            accbalancesheet001mb.insertUser = this.insertUser;
			accbalancesheet001mb.insertDatetime = this.insertDatetime;
            accbalancesheet001mb.updatedUser = this.authManager.getcurrentUser.username;
			accbalancesheet001mb.updatedDatetime = new Date();
            this.balancesheetManager.balanceupdate(accbalancesheet001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let accbalancesheetres = deserialize<Accbalancesheet001mb>(Accbalancesheet001mb, response);
                for (let balanceSheet of this.balanceSheet) {
                    if (balanceSheet.absId == accbalancesheetres.absId) {
                        balanceSheet.account = accbalancesheetres.account;
                        balanceSheet.apr = accbalancesheetres.apr;
                        balanceSheet.aug = accbalancesheetres.aug;
                        balanceSheet.company = accbalancesheetres.company;
                        balanceSheet.dece = accbalancesheetres.dece;
                        balanceSheet.endYear = accbalancesheetres.endYear;
                        balanceSheet.feb = accbalancesheetres.feb;
                        balanceSheet.jan = accbalancesheetres.jan;
                        balanceSheet.jul = accbalancesheetres.jul;
                        balanceSheet.jun = accbalancesheetres.jun;
                        balanceSheet.mar = accbalancesheetres.mar;
                        balanceSheet.may = accbalancesheetres.may;
                        balanceSheet.nov = accbalancesheetres.nov;
                        balanceSheet.oct = accbalancesheetres.oct;
                        balanceSheet.periodicity = accbalancesheetres.periodicity;
                        balanceSheet.sep = accbalancesheetres.sep;
                        balanceSheet.startYear = accbalancesheetres.startYear;
                        balanceSheet.insertUser = this.insertUser;
                        balanceSheet.insertDatetime = this.insertDatetime;
                        balanceSheet.updatedUser = this.authManager.getcurrentUser.username;
                        balanceSheet.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.balanceSheet);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.balanceForm.reset();
                this.absId = null;
                this.submitted = false;
            });
        }
        else {
            accbalancesheet001mb.insertUser = this.authManager.getcurrentUser.username;
			accbalancesheet001mb.insertDatetime = new Date();
            this.balancesheetManager.balancesave(accbalancesheet001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let accbalancesheet001mb = deserialize<Accbalancesheet001mb>(Accbalancesheet001mb, response);
                this.balanceSheet?.push(accbalancesheet001mb);
                const newItems = [JSON.parse(JSON.stringify(accbalancesheet001mb))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.balanceForm.reset();
                this.submitted = false;
            })
        }
    }

    onReset() {
        this.submitted = false;
        this.balanceForm.reset();
    }

    onGeneratePdfReport(){
		this.balancesheetManager.balancesheetPdf().subscribe((response) =>{
            saveAs(response,"BalanceSheetList");

		});
	}

	onGenerateExcelReport(){
		this.balancesheetManager.balancesheetExcel().subscribe((response) => {
			saveAs(response,"BalanceSheetList");
        })
	}


}
