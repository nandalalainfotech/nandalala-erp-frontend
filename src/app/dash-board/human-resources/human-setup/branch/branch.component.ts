import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { BranchManager } from 'src/app/shared/services/restcontroller/bizservice/branch.service';
import { Branch001mb } from 'src/app/shared/services/restcontroller/entities/Branch001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-branch',
    templateUrl: './branch.component.html',
    styleUrls: ['./branch.component.css']
})

export class BranchComponent implements OnInit {

    branchId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    frameworkComponents: any;
    branchName: string = "";
    branch: Branch001mb[] = [];
    public gridOptions: GridOptions | any;
    branchsForm: FormGroup | any;
    submitted = false;

    constructor(private branchManager: BranchManager, 
        private formBuilder: FormBuilder, 
        private calloutService: CalloutService,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent
        }
    }

    ngOnInit() {

        this.branchsForm = this.formBuilder.group({
            branchName: ['', Validators.required]
        });
        this.createDataGrid001();
        this.branchManager.allbranch().subscribe((response) => {
            this.branch = deserialize<Branch001mb[]>(Branch001mb, response);
            if (this.branch.length > 0) {
                this.gridOptions?.api?.setRowData(this.branch);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        });
    }
    get f() { return this.branchsForm.controls; }

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
                field: 'branchId',
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
                headerName: 'Branch',
                field: 'branchName',
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
        this.branchId = params.data.branchId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.branchsForm.patchValue({
            'branchName': params.data.branchName,
        });
    }

    onDeleteButtonClick(params: any) {
        this.branchManager.deletebranch(params.data.branchId).subscribe((response) => {
            for (let i = 0; i < this.branch.length; i++) {
                if (this.branch[i].branchId == params.data.branchId) {
                    this.branch?.splice(i, 1);
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
        modalRef.componentInstance.title = "Branch";
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

    onOrderClick($event: any, branchsForm: any) {
        this.markFormGroupTouched(this.branchsForm);
        this.submitted = true;
        if (this.branchsForm.invalid) {
            return;
        }

        let branch001mb = new Branch001mb();
        branch001mb.branchName = this.f.branchName.value ? this.f.branchName.value : "";
        if (this.branchId) {
            branch001mb.branchId = this.branchId;
            branch001mb.insertUser = this.insertUser;
            branch001mb.insertDatetime = this.insertDatetime;
            branch001mb.updatedUser = this.authManager.getcurrentUser.username;
            branch001mb.updatedDatetime = new Date();
            this.branchManager.updatebranch(branch001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let branchss = deserialize<Branch001mb>(Branch001mb, response);
                for (let branches of this.branch) {
                    if (branches.branchId == branchss.branchId) {
                        branches.branchName = branchss.branchName;
                        branches.insertUser = this.insertUser;
                        branches.insertDatetime = this.insertDatetime;
                        branches.updatedUser = this.authManager.getcurrentUser.username;
                        branches.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.branch);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.branchsForm.reset();
                this.submitted = false;
                this.branchId = null;
            })
        } else {
            branch001mb.insertUser = this.authManager.getcurrentUser.username;
            branch001mb.insertDatetime = new Date();
            this.branchManager.savebranch(branch001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let branchss = deserialize<Branch001mb>(Branch001mb, response);
                this.branch.push(branchss);
                const newItems = [JSON.parse(JSON.stringify(branchss))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.branchsForm.reset();
                this.submitted = false;
            })
        }

    }
    onReset() {
        this.branchsForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport() {
		this.branchManager.branchPdf().subscribe((response) => {
			saveAs(response, "BranchList");

		});
	}

	onGenerateExcelReport() {
		this.branchManager.branchExcel().subscribe((response) => {
			saveAs(response, "BranchList");
		});
	}
}
