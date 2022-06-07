import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { EmploymentTypeManager } from 'src/app/shared/services/restcontroller/bizservice/employment-type.service';
import { Employmenttype001mb } from 'src/app/shared/services/restcontroller/entities/Employmenttype001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-employment-type',
    templateUrl: './employment-type.component.html',
    styleUrls: ['./employment-type.component.css']
})

export class EmploymentTypeComponent implements OnInit {

    etypeId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    frameworkComponents: any;
    employmentType: string | null = "";
    employmentTypes: Employmenttype001mb[] = [];
    public gridOptions: GridOptions | any;
    employsForm: FormGroup | any;
    submitted = false;

    constructor(private employmentTypeManager: EmploymentTypeManager, 
        private formBuilder: FormBuilder, 
        private calloutService: CalloutService,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent
        }
    }
    ngOnInit() {

        this.employsForm = this.formBuilder.group({
            employmentType: ['', Validators.required]
        });
        this.createDataGrid001();
        this.employmentTypeManager.allemptype().subscribe((response) => {
            this.employmentTypes = deserialize<Employmenttype001mb[]>(Employmenttype001mb, response);
            if (this.employmentTypes.length > 0) {
                this.gridOptions?.api?.setRowData(this.employmentTypes);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        });
    }

    get f() { return this.employsForm.controls; }
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
                field: 'etypeId',
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
                headerName: 'Employment Type',
                field: 'employmentType',
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
        this.etypeId = params.data.etypeId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.employsForm.patchValue({
            'employmentType': params.data.employmentType,
        });
    }

    onAuditButtonClick(params: any) {
        const modalRef = this.modalService.open(AuditComponent);
        modalRef.componentInstance.title = "Employment Type";
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

    onDeleteButtonClick(params: any) {
        this.employmentTypeManager.deleteemptype(params.data.etypeId).subscribe((response) => {
            for (let i = 0; i < this.employmentTypes.length; i++) {
                if (this.employmentTypes[i].etypeId == params.data.etypeId) {
                    this.employmentTypes?.splice(i, 1);
                    break;
                }
            }
            const selectedRows = params.api.getSelectedRows();
            params.api.applyTransaction({ remove: selectedRows });
            this.calloutService.showSuccess("Order Removed Successfully");
        })
    }

    onOrderClick(event: any, employsForm: any) {

        this.markFormGroupTouched(this.employsForm);
        this.submitted = true;
        if (this.employsForm.invalid) {
            return;
        }
        let employmenttype001mb = new Employmenttype001mb();
        employmenttype001mb.employmentType = this.f.employmentType.value ? this.f.employmentType.value : "";
        if (this.etypeId) {
            employmenttype001mb.etypeId = this.etypeId;
            employmenttype001mb.insertUser = this.insertUser;
            employmenttype001mb.insertDatetime = this.insertDatetime;
            employmenttype001mb.updatedUser = this.authManager.getcurrentUser.username;
            employmenttype001mb.updatedDatetime = new Date();
            this.employmentTypeManager.updateemptype(employmenttype001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let employ = deserialize<Employmenttype001mb>(Employmenttype001mb, response);
                for (let emp of this.employmentTypes) {
                    if (emp.etypeId == employ.etypeId) {
                        emp.employmentType = employ.employmentType;
                        emp.insertUser = this.insertUser;
                        emp.insertDatetime = this.insertDatetime;
                        emp.updatedUser = this.authManager.getcurrentUser.username;
                        emp.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.employmentTypes);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.employsForm.reset();
                this.submitted = false;
                this.etypeId = null;
            })
        }
        else {
            employmenttype001mb.insertUser = this.authManager.getcurrentUser.username;
            employmenttype001mb.insertDatetime = new Date();
            this.employmentTypeManager.saveemptype(employmenttype001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let employ = deserialize<Employmenttype001mb>(Employmenttype001mb, response);
                this.employmentTypes.push(employ);
                const newItems = [JSON.parse(JSON.stringify(employ))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.employsForm.reset();
                this.submitted = false;
            })
        }

    }
    onReset() {
        this.employsForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport() {
		this.employmentTypeManager.employmentTypePdf().subscribe((response) => {
			saveAs(response, "EmploymentTypeList");

		});
	}

	onGenerateExcelReport() {
		this.employmentTypeManager.employmentTypeExcel().subscribe((response) => {
			saveAs(response, "EmploymentTypeList");
		});
	}
}
