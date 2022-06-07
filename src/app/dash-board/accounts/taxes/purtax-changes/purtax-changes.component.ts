import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { LinkRendererComponent } from 'src/app/shared/services/renderercomponent/link-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { PurTaxChangesManager } from 'src/app/shared/services/restcontroller/bizservice/purtax-changes.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Purtaxcharges001mb } from 'src/app/shared/services/restcontroller/entities/Purtaxcharges001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-purtax-changes',
    templateUrl: './purtax-changes.component.html',
    styleUrls: ['./purtax-changes.component.css']
})

export class PurtaxChangesComponent implements OnInit {

    purTaxForm: FormGroup | any;
    submitted = false;
    putaxId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    frameworkComponents: any;
    status: string = "";
    company: string = "";
    taxchgType: string = "";
    accountHead: string = "";
    rate?: string | null;
    amount?: string | null;
    total?: string | null;
    dummyname = "Dummy.status";
    dummytype = "dummy";
    bnkaccname = "purchase.taxstatus";
    bnkacctype = "taxstatus";
    purTaxChanges: Purtaxcharges001mb[] = [];
    dummysystemproperties: Systemproperties001mb[] = [];
    bnkaccsystemproperties: Systemproperties001mb[] = [];
    public gridOptions: GridOptions | any;

    constructor(private purTaxChangesManager: PurTaxChangesManager,
        private calloutService: CalloutService,
        private systemPropertiesService: SystemPropertiesService, 
        private formBuilder: FormBuilder,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            // linkRenderer: LinkRendererComponent,
            iconRenderer: IconRendererComponent
        }
    }

    ngOnInit() {

        this.purTaxForm = this.formBuilder.group({
            status: ['', Validators.required],
            company: ['', Validators.required],
            taxchgType: ['', Validators.required],
            accountHead: ['', Validators.required],
            rate: ['', Validators.required],
            amount: ['', Validators.required],
            total: ['', Validators.required],
        });

        this.createDataGrid001();
        this.systemPropertiesService.system(this.dummyname, this.dummytype).subscribe(response => {
            this.dummysystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.systemPropertiesService.system(this.bnkaccname, this.bnkacctype).subscribe(response => {
            this.bnkaccsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.purTaxChangesManager.allpurtax().subscribe((response) => {
            this.purTaxChanges = deserialize<Purtaxcharges001mb[]>(Purtaxcharges001mb, response);
            if (this.purTaxChanges.length > 0) {
                this.gridOptions?.api?.setRowData(this.purTaxChanges);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    get f() { return this.purTaxForm.controls; }

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
                headerName: '#S No',
                field: 'putaxId',
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
                headerName: 'Account Mode',
                field: 'status',
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
                headerName: 'Tax Charge Type',
                field: 'taxchgType',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Account Head',
                field: 'accountHead',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Rate',
                field: 'rate',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Amount',
                field: 'amount',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Total',
                field: 'total',
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
                width: 100,
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
                width: 150,
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
                width: 150,
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
        this.putaxId = params.data.putaxId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.purTaxForm.patchValue({
            'putaxId': params.data.putaxId,
            'accountHead': params.data.accountHead,
            'amount': params.data.amount,
            'company': params.data.company,
            'rate': params.data.rate,
            'status': params.data.status,
            'taxchgType': params.data.taxchgType,
            'total': params.data.total,
        })
    }

    onDeleteButtonClick(params: any) {
        this.purTaxChangesManager.purtaxdelete(params.data.putaxId).subscribe((response) => {
            for (let i = 0; i < this.purTaxChanges.length; i++) {
                if (this.purTaxChanges[i].putaxId == params.data.putaxId) {
                    this.purTaxChanges?.splice(i, 1);
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
        modalRef.componentInstance.title = "Purchase Taxes And Charges Template";
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

    onOrderClick(event: any, purTaxForm: any) {

        this.markFormGroupTouched(this.purTaxForm);
        this.submitted = true;
        if (this.purTaxForm.invalid) {
            return;
        }

        let purtaxcharges001mb = new Purtaxcharges001mb();
        purtaxcharges001mb.accountHead = this.f.accountHead.value ? this.f.accountHead.value : "";
        purtaxcharges001mb.amount = this.f.amount.value ? this.f.amount.value : "";
        purtaxcharges001mb.company = this.f.company.value ? this.f.company.value : "";
        purtaxcharges001mb.rate = this.f.rate.value ? this.f.rate.value : "";
        purtaxcharges001mb.status = this.f.status.value ? this.f.status.value : "";
        purtaxcharges001mb.taxchgType = this.f.taxchgType.value ? this.f.taxchgType.value : "";
        purtaxcharges001mb.total = this.f.total.value ? this.f.total.value : "";
        if (this.putaxId) {
            purtaxcharges001mb.putaxId = this.putaxId;
            purtaxcharges001mb.insertUser = this.insertUser;
			purtaxcharges001mb.insertDatetime = this.insertDatetime;
            purtaxcharges001mb.updatedUser = this.authManager.getcurrentUser.username;
			purtaxcharges001mb.updatedDatetime = new Date();
            this.purTaxChangesManager.purtaxupdate(purtaxcharges001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let purtaxs = deserialize<Purtaxcharges001mb>(Purtaxcharges001mb, response);
                for (let purTaxChange of this.purTaxChanges) {
                    if (purTaxChange.putaxId == purtaxs.putaxId) {
                        purTaxChange.accountHead = purtaxs.accountHead;
                        purTaxChange.amount = purtaxs.amount;
                        purTaxChange.company = purtaxs.company;
                        purTaxChange.rate = purtaxs.rate;
                        purTaxChange.status = purtaxs.status;
                        purTaxChange.taxchgType = purtaxs.taxchgType;
                        purTaxChange.total = purtaxs.total;
                        purTaxChange.insertUser = this.insertUser;
                        purTaxChange.insertDatetime = this.insertDatetime;
                        purTaxChange.updatedUser = this.authManager.getcurrentUser.username;
                        purTaxChange.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.purTaxChanges);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.purTaxForm.reset();
                this.putaxId = null;
                this.submitted = false;
            });
        } else {
            purtaxcharges001mb.insertUser = this.authManager.getcurrentUser.username;
			purtaxcharges001mb.insertDatetime = new Date();
            this.purTaxChangesManager.purtaxsave(purtaxcharges001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let purtaxs = deserialize<Purtaxcharges001mb>(Purtaxcharges001mb, response);
                this.purTaxChanges?.push(purtaxs);
                const newItems = [JSON.parse(JSON.stringify(purtaxs))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.gridOptions.api.deselectAll();
                this.purTaxForm.reset();
                this.submitted = false;
            });
        }
    }
    onReset() {
        this.purTaxForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.purTaxChangesManager.purTaxChargesPdf().subscribe((response) =>{
            saveAs(response,"PurchaseTaxAndChargesStatement");

		});
	}

	onGenerateExcelReport(){
		this.purTaxChangesManager.purTaxChargesExcel().subscribe((response) => {
			saveAs(response,"PurchaseTaxAndChargesStatement");
        })
	}

}
