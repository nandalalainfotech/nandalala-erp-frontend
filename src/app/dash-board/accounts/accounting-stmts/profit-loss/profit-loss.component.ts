import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { ProfitLossManager } from 'src/app/shared/services/restcontroller/bizservice/profitloss.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Accprofitlossstatement001mb } from 'src/app/shared/services/restcontroller/entities/Accprofitlossstatement001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-profit-loss',
    templateUrl: './profit-loss.component.html',
    styleUrls: ['./profit-loss.component.css']
})

export class ProfitLossComponent implements OnInit {
    profitForm: FormGroup | any;
    submitted = false;
    frameworkComponents: any;
    aplsId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    company: string = "";
    startYear: number | any;
    endYear: number | any;
    periodicity: string = "";
    account: string = "";
    costcenter: string = "";
    projectname: string = "";
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
    startyearname = "StartYear.status";
    startyeartype = "startyear";
    endyearname = "EndYear.status";
    endyeartype = "endyear";
    periodname = "range.type";
    periodtype = "type";
    dummysystemproperties: Systemproperties001mb[] = [];
    periodsystemproperties: Systemproperties001mb[] = [];
    endyearsystemproperties: Systemproperties001mb[] = [];
    startyearsystemproperties: Systemproperties001mb[] = [];
    public gridOptions: GridOptions | any;
    profitLoss: Accprofitlossstatement001mb[] = [];

    constructor(private profitLossManager: ProfitLossManager,
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
        this.profitForm = this.formBuilder.group({
            company: ['', Validators.required],
            startYear: ['', Validators.required],
            endYear: ['', Validators.required],
            periodicity: ['', Validators.required],
            account: ['', Validators.required],
            costcenter: ['', Validators.required],
            projectname: ['', Validators.required],
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
        this.systemPropertiesService.system(this.dummyname, this.dummytype).subscribe(response => {
            this.dummysystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.systemPropertiesService.system(this.startyearname, this.startyeartype).subscribe(response => {
            this.startyearsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.systemPropertiesService.system(this.endyearname, this.endyeartype).subscribe(response => {
            this.endyearsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.systemPropertiesService.system(this.periodname, this.periodtype).subscribe(response => {
            this.periodsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.profitLossManager.allprofitloss().subscribe((response) => {
            this.profitLoss = deserialize<Accprofitlossstatement001mb[]>(Accprofitlossstatement001mb, response);
            if (this.profitLoss.length > 0) {
                this.gridOptions?.api?.setRowData(this.profitLoss);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    get f() { return this.profitForm.controls; }

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
                field: 'aplsId',
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
                headerName: 'Cost Center',
                field: 'costcenter',
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
        this.aplsId = params.data.aplsId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.profitForm.patchValue({
            'company': params.data.company,
            'startYear': params.data.startYear,
            'endYear': params.data.endYear,
            'periodicity': params.data.periodicity,
            'account': params.data.account,
            'costcenter': params.data.costcenter,
            'projectname': params.data.projectname,
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
        this.profitLossManager.profitlossdelete(params.data.aplsId).subscribe((response) => {
            for (let i = 0; i < this.profitLoss.length; i++) {
                if (this.profitLoss[i].aplsId == params.data.aplsId) {
                    this.profitLoss?.splice(i, 1);
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
        modalRef.componentInstance.title = "Profit And Loss Statement";
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

    onOrderClick(event: any, profitForm: any) {
        this.markFormGroupTouched(this.profitForm);
        this.submitted = true;
        if (this.profitForm.invalid) {
            return;
        }

        let accprofitlossstatement = new Accprofitlossstatement001mb();
        accprofitlossstatement.account = this.f.account.value ? this.f.account.value : "";
        accprofitlossstatement.apr = this.f.apr.value ? this.f.apr.value : "";
        accprofitlossstatement.aug = this.f.aug.value ? this.f.aug.value : "";
        accprofitlossstatement.company = this.f.company.value ? this.f.company.value : "";
        accprofitlossstatement.costcenter = this.f.costcenter.value ? this.f.costcenter.value : "";
        accprofitlossstatement.dece = this.f.dece.value ? this.f.dece.value : "";
        accprofitlossstatement.endYear = this.f.endYear.value ? this.f.endYear.value : "";
        accprofitlossstatement.feb = this.f.feb.value ? this.f.feb.value : "";
        accprofitlossstatement.jan = this.f.jan.value ? this.f.jan.value : "";
        accprofitlossstatement.jul = this.f.jul.value ? this.f.jul.value : "";
        accprofitlossstatement.jun = this.f.jun.value ? this.f.jun.value : "";
        accprofitlossstatement.mar = this.f.mar.value ? this.f.mar.value : "";
        accprofitlossstatement.may = this.f.may.value ? this.f.may.value : "";
        accprofitlossstatement.nov = this.f.nov.value ? this.f.nov.value : "";
        accprofitlossstatement.oct = this.f.oct.value ? this.f.oct.value : "";
        accprofitlossstatement.periodicity = this.f.periodicity.value ? this.f.periodicity.value : "";
        accprofitlossstatement.projectname = this.f.projectname.value ? this.f.projectname.value : "";
        accprofitlossstatement.sep = this.f.sep.value ? this.f.sep.value : "";
        accprofitlossstatement.startYear = this.f.startYear.value ? this.f.startYear.value : "";
        if (this.aplsId) {
            accprofitlossstatement.aplsId = this.aplsId;
            accprofitlossstatement.insertUser = this.insertUser;
            accprofitlossstatement.insertDatetime = this.insertDatetime;
            accprofitlossstatement.updatedUser = this.authManager.getcurrentUser.username;
            accprofitlossstatement.updatedDatetime = new Date();
            this.profitLossManager.profitlossupdate(accprofitlossstatement).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let accprofitlossres = deserialize<Accprofitlossstatement001mb>(Accprofitlossstatement001mb, response);
                for (let profitloss of this.profitLoss) {
                    if (profitloss.aplsId == accprofitlossres.aplsId) {
                        profitloss.account = accprofitlossres.account;
                        profitloss.apr = accprofitlossres.apr;
                        profitloss.aug = accprofitlossres.aug;
                        profitloss.company = accprofitlossres.company;
                        profitloss.dece = accprofitlossres.dece;
                        profitloss.endYear = accprofitlossres.endYear;
                        profitloss.feb = accprofitlossres.feb;
                        profitloss.jan = accprofitlossres.jan;
                        profitloss.jul = accprofitlossres.jul;
                        profitloss.jun = accprofitlossres.jun;
                        profitloss.mar = accprofitlossres.mar;
                        profitloss.may = accprofitlossres.may;
                        profitloss.nov = accprofitlossres.nov;
                        profitloss.oct = accprofitlossres.oct;
                        profitloss.periodicity = accprofitlossres.periodicity;
                        profitloss.sep = accprofitlossres.sep;
                        profitloss.startYear = accprofitlossres.startYear;
                        profitloss.costcenter = accprofitlossres.costcenter;
                        profitloss.projectname = accprofitlossres.projectname;
                        profitloss.insertUser = this.insertUser;
                        profitloss.insertDatetime = this.insertDatetime;
                        profitloss.updatedUser = this.authManager.getcurrentUser.username;
                        profitloss.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.profitLoss);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.profitForm.reset();
                this.aplsId = null;
                this.submitted = false;
            });
        }
        else {
            accprofitlossstatement.insertUser = this.authManager.getcurrentUser.username;
            accprofitlossstatement.insertDatetime = new Date();
            this.profitLossManager.profitlosssave(accprofitlossstatement).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let accprofitlossstatement001 = deserialize<Accprofitlossstatement001mb>(Accprofitlossstatement001mb, response);
                this.profitLoss?.push(accprofitlossstatement001);
                const newItems = [JSON.parse(JSON.stringify(accprofitlossstatement001))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.profitForm.reset();
                this.submitted = false;
            })
        }
    }

    onReset() {
        this.submitted = false;
        this.profitForm.reset();
    }

    onGeneratePdfReport(){
		this.profitLossManager.profitLossPdf().subscribe((response) =>{
            saveAs(response,"ProfitLossStatementList");

		});
	}

	onGenerateExcelReport(){
		this.profitLossManager.profitLossExcel().subscribe((response) => {
			saveAs(response,"ProfitLossStatementList");
        })
	}


}
