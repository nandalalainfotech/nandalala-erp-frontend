import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Companyaccount001mb } from 'src/app/shared/services/restcontroller/entities/Companyaccount001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { ComAccountManager } from 'src/app/shared/services/restcontroller/bizservice/com-account.service';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { saveAs } from 'file-saver';


@Component({
    selector: 'app-com-account',
    templateUrl: './com-account.component.html',
    styleUrls: ['./com-account.component.css']
})

export class ComAccountComponent implements OnInit {

    frameworkComponents: any;
    comapnyAccountForm: FormGroup | any;
    caId: number|any;
    insertUser: string = "";
    insertDatetime: Date | any;
    companyName: string = "";
    country: string = "";
    abbreviation: string = "";
    companyDomain: string = "";
    defholList: string = "";
    defCurrency: string = "";
    accchartType: string = "";
    defbankAccount: string = "";
    defcashAccount: string = "";
    defpayAccount: string = "";
    defincomeAccount: string = "";
    rndoffCenter: string = "";
    domainname: string = "company.domain";
    domaintype: string = "domain";
    curname: string = "currency.type";
    curtype: string = "type";
    chartname: string = "chartacc.type";
    charttype: string = "type";
    accname: string = "account.type";
    acctype: string = "type";
    dummyname = "Dummy.status";
    dummytype = "dummy";
    submitted = false;
    dummysystemproperties: Systemproperties001mb[] = [];
    comAcc: Companyaccount001mb[] = [];
    domainsystemproperties?: Systemproperties001mb[] = [];
    cursystemproperties?: Systemproperties001mb[] = [];
    chartsystemproperties?: Systemproperties001mb[] = [];
    accsystemproperties?: Systemproperties001mb[] = [];
    public gridOptions: GridOptions | any;

    constructor(private comAccountManager: ComAccountManager,
        private systemPropertiesService: SystemPropertiesService,
        private calloutService: CalloutService,
        private formBuilder: FormBuilder,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent
        }
    }

    ngOnInit() {
        this.createDataGrid001();
        this.comapnyAccountForm = this.formBuilder.group({
            companyName: ['', Validators.required],
            country: ['', Validators.required],
            abbreviation: ['', Validators.required],
            companyDomain: ['', Validators.required],
            defholList: ['', Validators.required],
            defCurrency: ['', Validators.required],
            accchartType: ['', Validators.required],
            defbankAccount: ['', Validators.required],
            defcashAccount: ['', Validators.required],
            defpayAccount: ['', Validators.required],
            defincomeAccount: ['', Validators.required],
            rndoffCenter: ['', Validators.required]
        })
        this.systemPropertiesService.system(this.dummyname, this.dummytype).subscribe(response => {
            this.dummysystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.systemPropertiesService.system(this.domainname, this.domaintype).subscribe(response => {
            this.domainsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.systemPropertiesService.system(this.curname, this.curtype).subscribe(response => {
            this.cursystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.systemPropertiesService.system(this.chartname, this.charttype).subscribe(response => {
            this.chartsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.systemPropertiesService.system(this.accname, this.acctype).subscribe(response => {
            this.accsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.comAccountManager.allcomacc().subscribe(response => {
            this.comAcc = deserialize<Companyaccount001mb[]>(Companyaccount001mb, response);
            if (this.comAcc.length > 0) {
                this.gridOptions?.api?.setRowData(this.comAcc);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        });
    }

    get f() { return this.comapnyAccountForm.controls }


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
                field: 'caId',
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
                field: 'companyName',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Country',
                field: 'country',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Abbreviation',
                field: 'abbreviation',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Domain',
                field: 'companyDomain',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Default Holiday List',
                field: 'defholList',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Default Currency',
                field: 'defCurrency',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Account Chart Type',
                field: 'accchartType',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Default Bank Account',
                field: 'defbankAccount',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Default Cash Account',
                field: 'defcashAccount',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Default Payable Account',
                field: 'defpayAccount',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Default Income Account',
                field: 'defincomeAccount',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Round Off Center',
                field: 'rndoffCenter',
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
        this.caId = params.data.caId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.comapnyAccountForm.patchValue({
            'abbreviation': params.data.abbreviation,
            'accchartType': params.data.accchartType,
            'companyDomain': params.data.companyDomain,
            'companyName': params.data.companyName,
            'country': params.data.country,
            'defCurrency': params.data.defCurrency,
            'defbankAccount': params.data.defbankAccount,
            'defcashAccount': params.data.defcashAccount,
            'defholList': params.data.defholList,
            'defincomeAccount': params.data.defincomeAccount,
            'defpayAccount': params.data.defpayAccount,
            'rndoffCenter': params.data.rndoffCenter,
        });
    }

    onDeleteButtonClick(params: any) {
        this.comAccountManager.comaccdelete(params.data.caId).subscribe(response => {
            for (let i = 0; i < this.comAcc.length; i++) {
                if (this.comAcc[i].caId == params.data.caId) {
                    this.comAcc?.splice(i, 1);
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
        modalRef.componentInstance.title = "Company And Accounts";
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

    onOrderClick(event: any, comapnyAccountForm: any) {
        this.markFormGroupTouched(this.comapnyAccountForm);
        this.submitted = true;
        if (this.comapnyAccountForm.invalid) {
            return;
        }
        let companyaccount = new Companyaccount001mb();
        companyaccount.abbreviation = this.f.abbreviation.value ? this.f.abbreviation.value : "";
        companyaccount.accchartType = this.f.accchartType.value ? this.f.accchartType.value : "";
        companyaccount.companyDomain = this.f.companyDomain.value ? this.f.companyDomain.value : "";
        companyaccount.companyName = this.f.companyName.value ? this.f.companyName.value : "";
        companyaccount.country = this.f.country.value ? this.f.country.value : "";
        companyaccount.defCurrency = this.f.defCurrency.value ? this.f.defCurrency.value : "";
        companyaccount.defbankAccount = this.f.defbankAccount.value ? this.f.defbankAccount.value : "";
        companyaccount.defcashAccount = this.f.defcashAccount.value ? this.f.defcashAccount.value : "";
        companyaccount.defholList = this.f.defholList.value ? this.f.defholList.value : "";
        companyaccount.defincomeAccount = this.f.defincomeAccount.value ? this.f.defincomeAccount.value : "";
        companyaccount.defpayAccount = this.f.defpayAccount.value ? this.f.defpayAccount.value : "";
        companyaccount.rndoffCenter = this.f.rndoffCenter.value ? this.f.rndoffCenter.value : "";

        if (this.caId) {
            companyaccount.caId = this.caId;
            companyaccount.insertUser = this.insertUser;
			companyaccount.insertDatetime = this.insertDatetime;
            companyaccount.updatedUser = this.authManager.getcurrentUser.username;
			companyaccount.updatedDatetime = new Date();
            this.comAccountManager.comaccupdate(companyaccount).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let companyaccount001mb = deserialize<Companyaccount001mb>(Companyaccount001mb, response);
                for (let comapnyAccounts of this.comAcc) {
                    if (comapnyAccounts.caId == companyaccount001mb.caId) {
                        comapnyAccounts.abbreviation = companyaccount001mb.abbreviation;
                        comapnyAccounts.accchartType = companyaccount001mb.accchartType;
                        comapnyAccounts.companyDomain = companyaccount001mb.companyDomain;
                        comapnyAccounts.companyName = companyaccount001mb.companyName;
                        comapnyAccounts.country = companyaccount001mb.country;
                        comapnyAccounts.defCurrency = companyaccount001mb.defCurrency;
                        comapnyAccounts.defbankAccount = companyaccount001mb.defbankAccount;
                        comapnyAccounts.defcashAccount = companyaccount001mb.defcashAccount;
                        comapnyAccounts.defholList = companyaccount001mb.defholList;
                        comapnyAccounts.defincomeAccount = companyaccount001mb.defincomeAccount;
                        comapnyAccounts.defpayAccount = companyaccount001mb.defpayAccount;
                        comapnyAccounts.rndoffCenter = companyaccount001mb.rndoffCenter;
                        comapnyAccounts.insertUser = this.insertUser;
                        comapnyAccounts.insertDatetime = this.insertDatetime;
                        comapnyAccounts.updatedUser = this.authManager.getcurrentUser.username;
                        comapnyAccounts.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.comAcc);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.comapnyAccountForm.reset();
                this.submitted = false;
                this.caId = null;
            });
        }
         else {
            companyaccount.insertUser = this.authManager.getcurrentUser.username;
			companyaccount.insertDatetime = new Date();
            this.comAccountManager.comaccsave(companyaccount).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let companyaccount001mb = deserialize<Companyaccount001mb>(Companyaccount001mb, response);
                this.comAcc?.push(companyaccount001mb);
                const newItems = [JSON.parse(JSON.stringify(companyaccount001mb))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.gridOptions.api.deselectAll();
                this.comapnyAccountForm.reset();
                this.submitted = false;
            });
        }
    }


    onReset() {
        this.comapnyAccountForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.comAccountManager.comAccountPdf().subscribe((response) =>{
            saveAs(response,"CompanyAccountsList");

		});
	}

    onGenerateExcelReport(){
		this.comAccountManager.comAccountExcel().subscribe((response) => {
			saveAs(response,"CompanyAccountsList");
        })
	}

}