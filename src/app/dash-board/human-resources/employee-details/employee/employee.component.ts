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
    selector: 'app-employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.css']
})

export class EmployeeComponent implements OnInit {
    empForm: FormGroup | any;
    submitted = false;
    frameworkComponents: any;
    sNo: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    branch: string | null = "";
    deptName: string | null = "";
    empCompany: string | null = "";
    empDesign: string | null = "";
    empDob!: Date | null;
    empDoj!: Date | null;
    empGender: string | null = "";
    empName: string | null = "";
    empNumber: string | null = "";
    empStatus: string | null = "";
    // deptId: number | null = 0;
    employee: Employee001mb[] = [];
    empname: string = "EmpGender.gender";
    emptype: string = "gender";
    stname: string = "EmpStatus.status";
    sttype: string = "status";
    dummyname: string = "Dummy.status";
    dummytype: string = "dummy";
    empsystemproperties?: Systemproperties001mb[] = [];
    stsystemproperties?: Systemproperties001mb[] = [];
     dummysystemproperties?: Systemproperties001mb[] = [];
    deptment?: Department001mb[] = [];
    public gridOptions: GridOptions | any;

    constructor(private employeeManager: EmployeeManager,
        private empDeptmentManager: EmpDeptmentManager, 
        private datePipe: DatePipe, 
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
        this.empForm = this.formBuilder.group({
            branch: ['', Validators.required],
            deptName: ['', Validators.required],
            empCompany: ['', Validators.required],
            empDesign: ['', Validators.required],
            empDob: ['', Validators.required],
            empDoj: ['', Validators.required],
            empGender: ['', Validators.required],
            empName: ['', Validators.required],
            empNumber: ['', Validators.required],
            empStatus: ['', Validators.required]
        });

        this.createDataGrid001();
        this.systemPropertiesService.system(this.empname, this.emptype).subscribe(response => {
            this.empsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.systemPropertiesService.system(this.stname, this.sttype).subscribe(response => {
            this.stsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
         this.systemPropertiesService.system(this.dummyname, this.dummytype).subscribe(response => {
             this.dummysystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
         })
        this.empDeptmentManager.alldept().subscribe((response: any) => {
            this.deptment = deserialize<Department001mb[]>(Department001mb, response);
        })
        this.employeeManager.allemployee().subscribe((response) => {
            this.employee = deserialize<Employee001mb[]>(Employee001mb, response);
            if (this.employee.length > 0) {
                this.gridOptions?.api?.setRowData(this.employee);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    get f() { return this.empForm.controls; }

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
                headerName: '#SerialNo',
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
                headerName: 'Employee Dob',
                field: 'empDob',
                width: 200,
                flex: 1,
                suppressSizeToFit: true,
                sortable: true,
                filter: true,
                resizable: true,
                valueGetter: (params: any) => {
                    return params.data.empDob ? this.datePipe.transform(params.data.empDob, 'MM/dd/yyyy') : '';
                }
            },
            {
                headerName: 'Employee Doj',
                field: 'empDoj',
                width: 200,
                flex: 1,
                suppressSizeToFit: true,
                sortable: true,
                filter: true,
                resizable: true,
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
                headerName: 'Edit',
                cellRenderer: 'iconRenderer',
                width: 150,
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
                width: 180,
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
        this.sNo = params.data.sNo;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.empForm.patchValue({
            'empNumber': params.data.empNumber,
            'empName': params.data.empName,
            'empDob': this.datePipe.transform(params.data.empDob, 'MM/dd/yyyy'),
            'empDoj': this.datePipe.transform(params.data.empDoj, 'MM/dd/yyyy'),
            'empDesign': params.data.empDesign,
            'empGender': params.data.empGender,
            'empCompany': params.data.empCompany,
            'empStatus': params.data.empStatus,
            'deptName': params.data.deptName,
            'branch': params.data.branch,
        });
    }

    onDeleteButtonClick(params: any) {
        this.employeeManager.employeedelete(params.data.sNo).subscribe((response) => {
            for (let i = 0; i < this.employee.length; i++) {
                if (this.employee[i].sNo == params.data.sNo) {
                    this.employee?.splice(i, 1);
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
        modalRef.componentInstance.title = "Employee";
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

    onOrderClick(event: any, empForm: any) {
        this.markFormGroupTouched(this.empForm);
        this.submitted = true;
        if (this.empForm.invalid) {
            return;
        }

        let employee001mb = new Employee001mb();
        employee001mb.branch = this.f.branch.value ? this.f.branch.value : "";
        // employee001mb.deptId = this.deptId ? this.deptId : 0;
        employee001mb.deptName = this.f.deptName.value ? this.f.deptName.value : "";
        employee001mb.empCompany = this.f.empCompany.value ? this.f.empCompany.value : "";
        employee001mb.empDesign = this.f.empDesign.value ? this.f.empDesign.value : "";
        employee001mb.empDob = new Date(this.f.empDob.value);
        employee001mb.empDoj = new Date(this.f.empDoj.value);
        employee001mb.empGender = this.f.empGender.value ? this.f.empGender.value : "";
        employee001mb.empName = this.f.empName.value ? this.f.empName.value : "";
        employee001mb.empNumber = this.f.empNumber.value ? this.f.empNumber.value : "";
        employee001mb.empStatus = this.f.empStatus.value ? this.f.empStatus.value : "";
        if (this.sNo) {
            employee001mb.sNo = this.sNo;
            employee001mb.insertUser = this.insertUser;
            employee001mb.insertDatetime = this.insertDatetime;
            employee001mb.updatedUser = this.authManager.getcurrentUser.username;
            employee001mb.updatedDatetime = new Date();
            this.employeeManager.employeeupdate(employee001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let employ = deserialize<Employee001mb>(Employee001mb, response);
                for (let emp of this.employee) {
                    if (emp.sNo == employ.sNo) {
                        emp.branch = employ.branch;
                        emp.deptName = employ.deptName;
                        emp.empCompany = employ.empCompany;
                        emp.empDesign = employ.empDesign;
                        emp.empDob = employ.empDob;
                        emp.empDoj = employ.empDoj;
                        emp.empGender = employ.empGender;
                        emp.empName = employ.empName;
                        emp.empNumber = employ.empNumber;
                        emp.empStatus = employ.empStatus;
                        emp.insertUser = this.insertUser;
                        emp.insertDatetime = this.insertDatetime;
                        emp.updatedUser = this.authManager.getcurrentUser.username;
                        emp.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.employee);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.empForm.reset();
                this.sNo = null;
                this.submitted = false;
            })

        }
        else {
            employee001mb.insertUser = this.authManager.getcurrentUser.username;
            employee001mb.insertDatetime = new Date();
            this.employeeManager.employeesave(employee001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let employ = deserialize<Employee001mb>(Employee001mb, response);
                this.employee.push(employ);
                const newItems = [JSON.parse(JSON.stringify(employ))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.empForm.reset();
                this.submitted = false;
            })
        }

    }

    onReset() {
        this.submitted = false;
        this.empForm.reset();
    }

    onGeneratePdfReport(){
		this.employeeManager.employeePdf().subscribe((response) =>{
            saveAs(response,"ListOfEmployees");

		});
	}

	onGenerateExcelReport(){
		this.employeeManager.employeeExcel().subscribe((response) => {
			saveAs(response,"ListOfEmployees");
        })
	}
}
