import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { DepartmentManager } from 'src/app/shared/services/restcontroller/bizservice/department.service';
import { Department001mb } from 'src/app/shared/services/restcontroller/entities/Department001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';
@Component({
    selector: 'app-department',
    templateUrl: './department.component.html',
    styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

    deptid: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    frameworkComponents: any;
    deptName: string | null = "";
    department: Department001mb[] = [];
    public gridOptions: GridOptions | any;
    departsForm: FormGroup | any;
    submitted = false;

    constructor(private departmentManager: DepartmentManager,
        private formBuilder: FormBuilder,
        private calloutService: CalloutService,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent
        }
    }

    ngOnInit() {

        this.departsForm = this.formBuilder.group({
            deptName: ['', Validators.required]
        });
        this.createDataGrid001();
        this.departmentManager.alldepart().subscribe((response) => {
            this.department = deserialize<Department001mb[]>(Department001mb, response);
            if (this.department.length > 0) {
                this.gridOptions?.api?.setRowData(this.department);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        });
    }

    get f() { return this.departsForm.controls; }

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
                field: 'deptid',
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
                headerName: 'Department Name',
                field: 'deptName',
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
        this.deptid = params.data.deptid;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.departsForm.patchValue({
            'deptName': params.data.deptName,
        });
    }

    onDeleteButtonClick(params: any) {
        this.departmentManager.deletedepart(params.data.deptid).subscribe((response) => {
            for (let i = 0; i < this.department.length; i++) {
                if (this.department[i].deptid == params.data.deptid) {
                    this.department?.splice(i, 1);
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
        modalRef.componentInstance.title = "Department";
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

    onOrderClick(event: any, departsForm: any) {
        this.markFormGroupTouched(this.departsForm);
        this.submitted = true;
        if (this.departsForm.invalid) {
            return;
        }
        let department001mb = new Department001mb();
        department001mb.deptName = this.f.deptName.value ? this.f.deptName.value : "";
        if (this.deptid) {
            department001mb.deptid = this.deptid;
            department001mb.insertUser = this.insertUser;
            department001mb.insertDatetime = this.insertDatetime;
            department001mb.updatedUser = this.authManager.getcurrentUser.username;
            department001mb.updatedDatetime = new Date();
            this.departmentManager.updatedepart(department001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let departss = deserialize<Department001mb>(Department001mb, response);
                for (let dept of this.department) {
                    if (dept.deptid == departss.deptid) {
                        dept.deptName = departss.deptName;
                        dept.insertUser = this.insertUser;
                        dept.insertDatetime = this.insertDatetime;
                        dept.updatedUser = this.authManager.getcurrentUser.username;
                        dept.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.department);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.departsForm.reset();
                this.submitted = false;
                this.deptid = null;
            })
        }
        else {
            department001mb.insertUser = this.authManager.getcurrentUser.username;
            department001mb.insertDatetime = new Date();
            this.departmentManager.savedepart(department001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let departss = deserialize<Department001mb>(Department001mb, response);
                this.department.push(departss);
                const newItems = [JSON.parse(JSON.stringify(departss))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.departsForm.reset();
                this.submitted = false;
            })
        }

    }
    onReset() {
        this.departsForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport() {
		this.departmentManager.departmentPdf().subscribe((response) => {
			saveAs(response, "DepartmentDetailsList");

		});
	}

	onGenerateExcelReport() {
		this.departmentManager.departmentExcel().subscribe((response) => {
			saveAs(response, "DepartmentDetailsList");
		});
	}
}

