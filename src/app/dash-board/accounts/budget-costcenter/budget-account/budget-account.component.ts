import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { BudgetAccountManager } from 'src/app/shared/services/restcontroller/bizservice/budget-account.service';
import { Budgetaccounttype001mb } from 'src/app/shared/services/restcontroller/entities/Budgetaccounttype001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-budget-account',
    templateUrl: './budget-account.component.html',
    styleUrls: ['./budget-account.component.css']
})

export class BudgetAccountComponent implements OnInit {

    frameworkComponents: any;
    submitted = false;
    budAccForm: FormBuilder | any;
    bgaccId: number|any;
    insertUser: string = "";
    insertDatetime: Date | any;
    bgaccountType: string = "";
    budgetAccount: Budgetaccounttype001mb[] = [];
    public gridOptions: GridOptions | any;

    constructor(private budgetAccountManager: BudgetAccountManager,
        private calloutService: CalloutService, 
        private formBuilder: FormBuilder,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent
        }
    }

    ngOnInit() {
        this.budAccForm = this.formBuilder.group({
            bgaccountType: ['', Validators.required]
        })
        this.createDataGrid001();
        this.budgetAccountManager.allbudacc().subscribe((response) => {
            this.budgetAccount = deserialize<Budgetaccounttype001mb[]>(Budgetaccounttype001mb, response);
            if (this.budgetAccount.length > 0) {
                this.gridOptions?.api?.setRowData(this.budgetAccount);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }
    get f() { return this.budAccForm.controls; }
    createDataGrid001(): void {
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
                field: 'bgaccId',
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
                headerName: 'Name',
                field: 'bgaccountType',
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
        this.bgaccId = params.data.bgaccId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.budAccForm.patchValue({
            'bgaccountType': params.data.bgaccountType
        });
    }


    onDeleteButtonClick(params: any) {
        this.budgetAccountManager.budaccdelete(params.data.bgaccId).subscribe((response) => {
            for (let i = 0; i < this.budgetAccount.length; i++) {
                if (this.budgetAccount[i].bgaccId == params.data.bgaccId) {
                    this.budgetAccount?.splice(i, 1);
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
        modalRef.componentInstance.title = "Budget Account Type";
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

    onOrderClick(event: any, budAccForm: any) {
        this.markFormGroupTouched(this.budAccForm);
        this.submitted = true;
        if (this.budAccForm.invalid) {
            return;
        }
        let budgetaccounttype001mb = new Budgetaccounttype001mb();
        budgetaccounttype001mb.bgaccountType = this.f.bgaccountType.value ? this.f.bgaccountType.value : "";
        if (this.bgaccId) {
            budgetaccounttype001mb.bgaccId =this.bgaccId;
            budgetaccounttype001mb.insertUser = this.insertUser;
			budgetaccounttype001mb.insertDatetime = this.insertDatetime;
            budgetaccounttype001mb.updatedUser = this.authManager.getcurrentUser.username;
			budgetaccounttype001mb.updatedDatetime = new Date();
            this.budgetAccountManager.budaccupdate(budgetaccounttype001mb).subscribe(response => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let budget = deserialize<Budgetaccounttype001mb>(Budgetaccounttype001mb, response);
                for (let account of this.budgetAccount) {
                    if (account.bgaccId == budget.bgaccId) {
                        account.bgaccountType = budget.bgaccountType;
                        account.insertUser = this.insertUser;
                        account.insertDatetime = this.insertDatetime;
                        account.updatedUser = this.authManager.getcurrentUser.username;
                        account.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.budgetAccount);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.bgaccId = null;
                budAccForm.reset();
                this.submitted = false;
            })
        }
        else {
            budgetaccounttype001mb.insertUser = this.authManager.getcurrentUser.username;
			budgetaccounttype001mb.insertDatetime = new Date();
            this.budgetAccountManager.budaccsave(budgetaccounttype001mb).subscribe(response => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let budget = deserialize<Budgetaccounttype001mb>(Budgetaccounttype001mb, response);
                this.budgetAccount?.push(budget);
                const newItems = [JSON.parse(JSON.stringify(budget))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.budAccForm.reset();
                this.submitted = false;
            })
        }
    }
    onReset() {
        this.submitted = false;
        this.budAccForm.reset();
    }

    onGeneratePdfReport(){
		this.budgetAccountManager.budgetAccountPdf().subscribe((response) =>{
            saveAs(response,"BudgetAccountTypeList");

		});
	}

	onGenerateExcelReport(){
		this.budgetAccountManager.budgetAccountExcel().subscribe((response) => {
			saveAs(response,"BudgetAccountTypeList");
        })
	}

}