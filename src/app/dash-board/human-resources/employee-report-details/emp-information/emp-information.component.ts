import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { EmpDeptmentManager } from 'src/app/shared/services/restcontroller/bizservice/emp-deptment.service';
import { EmployeeManager } from 'src/app/shared/services/restcontroller/bizservice/employee.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Department001mb } from 'src/app/shared/services/restcontroller/entities/Department001mb';
import { Employee001mb } from 'src/app/shared/services/restcontroller/entities/Employee001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-emp-information',
    templateUrl: './emp-information.component.html',
    styleUrls: ['./emp-information.component.css']
})

export class EmpInformationComponent implements OnInit {

    frameworkComponents: any;
    infosForm: FormGroup | any;
    sNo: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    gendername: string = "EmpGender.gender";
    gendertype: string = "gender";
    statusname: string = "EmpStatus.status";
    statustype: string = "status";
    depname: string = "Dummy.status";
    deptype: string = "dummy";
    empNumber: string | null = "";
    empName: string | null = "";
    empDob!: Date | null;
    empDoj!: Date | null;
    empDesign: string | null = "";
    empGender: string | null = "";
    empCompany: string | null = "";
    empStatus: string | null = "";
    deptName: string | null = "";
    branch: string | null = "";
    empInfo: Employee001mb[] = [];
    submitted = false;
    public gridOptions: GridOptions | any;
    gendersystemproperties?: Systemproperties001mb[] = [];
    statussystemproperties?: Systemproperties001mb[] = [];
    depsystemproperties?: Systemproperties001mb[] = [];
    department?: Department001mb[] = [];

    constructor(private systemPropertiesService: SystemPropertiesService, 
        private empDeptmentManager: EmpDeptmentManager,
        private employeeManager: EmployeeManager,
        private calloutService: CalloutService,
        private formBuilder: FormBuilder,
        private datePipe: DatePipe,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent
        }
    }

    ngOnInit() {
        this.createDataGrid001();
        this.infosForm = this.formBuilder.group({
            empNumber: ['', Validators.required],
            empName: ['', Validators.required],
            empDob: ['', Validators.required],
            empDoj: ['', Validators.required],
            empDesign: ['', Validators.required],
            empGender: ['', Validators.required],
            empCompany: ['', Validators.required],
            empStatus: ['', Validators.required],
            deptName: ['', Validators.required],
            branch: ['', Validators.required]
        })
        this.systemPropertiesService.system(this.gendername, this.gendertype,).subscribe(response => {
            this.gendersystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        }),
            this.systemPropertiesService.system(this.statusname, this.statustype,).subscribe(response => {
                this.statussystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
            }),
            this.systemPropertiesService.system(this.depname, this.deptype,).subscribe(response => {
                this.depsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
            }),
            this.empDeptmentManager.alldept().subscribe((response: any) => {
                this.department = deserialize<Department001mb[]>(Department001mb, response);
            })
        this.employeeManager.allemployee().subscribe(response => {
            this.empInfo = deserialize<Employee001mb[]>(Employee001mb, response);
            if (this.empInfo.length > 0) {
                this.gridOptions?.api?.setRowData(this.empInfo);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    get f() { return this.infosForm.controls }


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
                headerName: 'SerialNo',
                field: 'sNo',
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
                headerName: 'Employee Code',
                field: 'empNumber',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Employee Name',
                field: 'empName',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Employee Dob',
                field: 'empDob',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: (params: any) => {
                    return params.data.empDob ? this.datePipe.transform(params.data.empDob, 'MM/dd/yyyy') : '';
                }
            },
            {
                headerName: 'Employee Doj',
                field: 'empDoj',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: (params: any) => {
                    return params.data.empDoj ? this.datePipe.transform(params.data.empDoj, 'MM/dd/yyyy') : '';
                }
            },
            {
                headerName: 'Designation',
                field: 'empDesign',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Gender',
                field: 'empGender',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Company',
                field: 'empCompany',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Status',
                field: 'empStatus',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Department',
                field: 'deptName',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Branch',
                field: 'branch',
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
        this.sNo = params.data.sNo;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.infosForm.patchValue({
            'empNumber': params.data.empNumber,
            'empName': params.data.empName,
            'empDob': this.datePipe.transform(params.data.empDob, 'MM/dd/yyyy'),
            'empDoj': this.datePipe.transform(params.data.empDoj, 'MM/dd/yyyy'),
            'empDesign': params.data.empDesign,
            'empGender': params.data.empGender,
            'empCompany': params.data.empCompany,
            'empStatus': params.data.empStatus,
            'deptName': params.data.deptName,
            'branch': params.data.branch
        });
    }

    onDeleteButtonClick(params: any) {
        this.employeeManager.employeedelete(params.data.sNo).subscribe(response => {
            for (let i = 0; i < this.empInfo.length; i++) {
                if (this.empInfo[i].sNo == params.data.sNo) {
                    this.empInfo?.splice(i, 1);
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
        modalRef.componentInstance.title = "Employee Information";
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

    onOrderClick(event: any, infosForm: any) {
        this.markFormGroupTouched(this.infosForm);
        this.submitted = true;
        if (this.infosForm.invalid) {
            return;
        }
        let employee001mb = new Employee001mb();
        employee001mb.empNumber = this.f.empNumber.value ? this.f.empNumber.value : "";
        employee001mb.empName = this.f.empName.value ? this.f.empName.value : "";
        employee001mb.empDob = new Date(this.f.empDob.value);
        employee001mb.empDoj = new Date(this.f.empDoj.value);
        employee001mb.empDesign = this.f.empDesign.value ? this.f.empDesign.value : "";
        employee001mb.empGender = this.f.empGender.value ? this.f.empGender.value : "";
        employee001mb.empCompany = this.f.empCompany.value ? this.f.empCompany.value : "";
        employee001mb.empStatus = this.f.empStatus.value ? this.f.empStatus.value : "";
        employee001mb.deptName = this.f.deptName.value ? this.f.deptName.value : "";
        employee001mb.branch = this.f.branch.value ? this.f.branch.value : "";

        if (this.sNo) {
            employee001mb.sNo = this.sNo;
            employee001mb.insertUser = this.insertUser;
            employee001mb.insertDatetime = this.insertDatetime;
            employee001mb.updatedUser = this.authManager.getcurrentUser.username;
            employee001mb.updatedDatetime = new Date();
            this.employeeManager.employeeupdate(employee001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let inform = deserialize<Employee001mb>(Employee001mb, response);
                for (let employeeinformation of this.empInfo) {
                    if (employeeinformation.sNo == inform.sNo) {
                        employeeinformation.empNumber = inform.empNumber;
                        employeeinformation.empName = inform.empName;
                        employeeinformation.empDob = inform.empDob;
                        employeeinformation.empDoj = inform.empDoj;
                        employeeinformation.empDesign = inform.empDesign;
                        employeeinformation.empGender = inform.empGender;
                        employeeinformation.empCompany = inform.empCompany;
                        employeeinformation.empStatus = inform.empStatus;
                        employeeinformation.deptName = inform.deptName;
                        employeeinformation.branch = inform.branch;
                        employeeinformation.insertUser = this.insertUser;
                        employeeinformation.insertDatetime = this.insertDatetime;
                        employeeinformation.updatedUser = this.authManager.getcurrentUser.username;
                        employeeinformation.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.empInfo);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.infosForm.reset();
                this.submitted = false;
                this.sNo = null;
            });
        }
        else {
            employee001mb.insertUser = this.authManager.getcurrentUser.username;
            employee001mb.insertDatetime = new Date();
            this.employeeManager.employeesave(employee001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let inform = deserialize<Employee001mb>(Employee001mb, response);
                this.empInfo?.push(inform);
                const newItems = [JSON.parse(JSON.stringify(inform))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.gridOptions.api.deselectAll();
                this.infosForm.reset();
                this.submitted = false;
            });
        }
    }
    onReset() {
        this.infosForm.reset();
        this.submitted = false;
    }


    onGeneratePdfReport() {
		this.employeeManager.employeePdf().subscribe((response) => {
			saveAs(response, "ListOfEmployees");

		});
	}

	onGenerateExcelReport() {
		this.employeeManager.employeeExcel().subscribe((response) => {
			saveAs(response, "ListOfEmployees");
		});
	}

}