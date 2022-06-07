import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { EmpDeptmentManager } from 'src/app/shared/services/restcontroller/bizservice/emp-deptment.service';
import { Department001mb } from 'src/app/shared/services/restcontroller/entities/Department001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-department',
    templateUrl: './department.component.html',
    styleUrls: ['./department.component.css']
})

export class DepartmentComponent implements OnInit {
    deptmtForm: FormGroup | any;
    submitted = false;
    deptid: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    frameworkComponents: any;
    deptName: string | null = "";
    deptment: Department001mb[] = [];
    public gridOptions: GridOptions | any;

    constructor(private empDeptmentManager: EmpDeptmentManager, 
        private formBuilder: FormBuilder, 
        private calloutService: CalloutService,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent,
        }
    }

    ngOnInit() {
        this.deptmtForm = this.formBuilder.group({
            deptName: ['', Validators.required]
        });

        this.createDataGrid001();
        this.empDeptmentManager.alldept().subscribe((response) => {
            this.deptment = deserialize<Department001mb[]>(Department001mb, response);
            if (this.deptment.length > 0) {
                this.gridOptions?.api?.setRowData(this.deptment);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    get f() { return this.deptmtForm.controls; }

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
                headerName: '#ID',
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
                width: 50,
                flex: 1,
                suppressSizeToFit: true,
                cellRendererParams: {
                    onClick: this.onDeleteButtonClick.bind(this),
                    label: 'Delete'
                },
            },
            {
                headerName: 'Audit',
                cellRenderer: 'iconRenderer',
                width: 50,
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
        this.deptmtForm.patchValue({
            'deptName': params.data.deptName,
        });
    }

    onDeleteButtonClick(params: any) {
        this.empDeptmentManager.deptdelete(params.data.deptid).subscribe((response) => {
            for (let i = 0; i < this.deptment.length; i++) {
                if (this.deptment[i].deptid == params.data.deptid) {
                    this.deptment?.splice(i, 1);
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

    onOrderClick(event: any, deptmtForm: any) {
        this.markFormGroupTouched(this.deptmtForm);
        this.submitted = true;
        if (this.deptmtForm.invalid) {
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
            this.empDeptmentManager.deptupdate(department001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let dept = deserialize<Department001mb>(Department001mb, response);
                for (let depts of this.deptment) {
                    if (depts.deptid == dept.deptid) {
                        depts.deptName = dept.deptName;
                        depts.insertUser = this.insertUser;
                        depts.insertDatetime = this.insertDatetime;
                        depts.updatedUser = this.authManager.getcurrentUser.username;
                        depts.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.deptment);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.deptmtForm.reset();
                this.deptid = null;
                this.submitted = false;
            })
        }
        else {
            department001mb.insertUser = this.authManager.getcurrentUser.username;
            department001mb.insertDatetime = new Date();
            this.empDeptmentManager.deptsave(department001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let dept = deserialize<Department001mb>(Department001mb, response);
                this.deptment.push(dept);
                const newItems = [JSON.parse(JSON.stringify(dept))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.deptmtForm.reset();
                this.submitted = false;
            })
        }
    }

    onReset() {
        this.submitted = false;
        this.deptmtForm.reset();
    }

    onGeneratePdfReport(){
		this.empDeptmentManager.empDeptmentPdf().subscribe((response) =>{
            saveAs(response,"DepartmentDetails");

		});
	}

	onGenerateExcelReport(){
		this.empDeptmentManager.empDeptmentExcel().subscribe((response) => {
			saveAs(response,"DepartmentDetails");
        })
	}
}
