import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { EmployeeBirthManager } from 'src/app/shared/services/restcontroller/bizservice/emp-birthday.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Employbirthday001mb } from 'src/app/shared/services/restcontroller/entities/Employbirthday001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-emp-birthday',
    templateUrl: './emp-birthday.component.html',
    styleUrls: ['./emp-birthday.component.css']
})

export class EmpBirthdayComponent implements OnInit {


    frameworkComponents: any;
    birthForm: FormGroup | any;
    empbirthId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    monthname: string = "month.name";
    monthtype: string = "name";
    numbername: string = "Dummy.status";
    numbertype: string = "dummy";
    empname: string = "Dummy.status";
    emptype: string = "dummy";
    depname: string = "Dummy.status";
    deptype: string = "dummy";
    branchname: string = "Dummy.status";
    branchtype: string = "dummy";
    companyname: string = "Dummy.status";
    companytype: string = "dummy";
    designname: string = "Dummy.status";
    designtype: string = "dummy";
    gendername: string = "EmpGender.gender";
    gendertype: string = "gender";
    ebmonth: string | null = "";
    empDob!: Date | null;
    empNumber: string | null = "";
    empName: string | null = "";
    deptName: string | null = "";
    branch: string | null = "";
    empCompany: string | null = "";
    empDesign: string | null = "";
    empGender: string | null = "";
    submitted = false;
    public gridOptions: GridOptions | any;
    empBirthday: Employbirthday001mb[] = [];
    monthsystemproperties?: Systemproperties001mb[] = [];
    numsystemproperties?: Systemproperties001mb[] = [];
    empsystemproperties?: Systemproperties001mb[] = [];
    depsystemproperties?: Systemproperties001mb[] = [];
    branchsystemproperties?: Systemproperties001mb[] = [];
    companysystemproperties?: Systemproperties001mb[] = [];
    designsystemproperties?: Systemproperties001mb[] = [];
    gendersystemproperties?: Systemproperties001mb[] = [];

    constructor(private systemPropertiesService: SystemPropertiesService,
        private employeeBirthManager: EmployeeBirthManager,
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
        this.birthForm = this.formBuilder.group({
            ebmonth: ['', Validators.required],
            empDob: ['', Validators.required],
            empNumber: ['', Validators.required],
            empName: ['', Validators.required],
            deptName: ['', Validators.required],
            branch: ['', Validators.required],
            empCompany: ['', Validators.required],
            empDesign: ['', Validators.required],
            empGender: ['', Validators.required]
        })
        this.systemPropertiesService.system(this.monthname, this.monthtype).subscribe(response => {
            this.monthsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        }),
            this.systemPropertiesService.system(this.numbername, this.numbertype,).subscribe(response => {
                this.numsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
            }),
            this.systemPropertiesService.system(this.empname, this.emptype,).subscribe(response => {
                this.empsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
            }),
            this.systemPropertiesService.system(this.depname, this.deptype,).subscribe(response => {
                this.depsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
            }),
            this.systemPropertiesService.system(this.branchname, this.branchtype,).subscribe(response => {
                this.branchsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
            }),
            this.systemPropertiesService.system(this.companyname, this.companytype,).subscribe(response => {
                this.companysystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
            }),
            this.systemPropertiesService.system(this.designname, this.designtype,).subscribe(response => {
                this.designsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
            }),
            this.systemPropertiesService.system(this.gendername, this.gendertype,).subscribe(response => {
                this.gendersystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
            }),
            this.employeeBirthManager.allempbirthday().subscribe(response => {
                this.empBirthday = deserialize<Employbirthday001mb[]>(Employbirthday001mb, response);
                if (this.empBirthday.length > 0) {
                    this.gridOptions?.api?.setRowData(this.empBirthday);
                } else {
                    this.gridOptions?.api?.setRowData([]);
                }
            })
    }

    get f() { return this.birthForm.controls }

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
                field: 'empbirthId',
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
                headerName: 'Month',
                field: 'ebmonth',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Employee DOB',
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
                headerName: 'Employee Number',
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
                field: 'empNumber',
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
        this.empbirthId = params.data.empbirthId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.birthForm.patchValue({
            'ebmonth': params.data.ebmonth,
            'empDob': this.datePipe.transform(params.data.empDob, 'MM/dd/yyyy'),
            'empNumber': params.data.empNumber,
            'empName': params.data.empName,
            'deptName': params.data.deptName,
            'branch': params.data.branch,
            'empCompany': params.data.empCompany,
            'empDesign': params.data.empDesign,
            'empGender': params.data.empGender
        });
    }

    onDeleteButtonClick(params: any) {
        this.employeeBirthManager.deleteempbirthday(params.data.empbirthId).subscribe(response => {
            for (let i = 0; i < this.empBirthday.length; i++) {
                if (this.empBirthday[i].empbirthId == params.data.empbirthId) {
                    this.empBirthday?.splice(i, 1);
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
        modalRef.componentInstance.title = "Employee Birthday";
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

    onOrderClick(event: any, birthForm: any) {
        this.markFormGroupTouched(this.birthForm);
        this.submitted = true;
        if (this.birthForm.invalid) {
            return;
        }
        let employbirthday001mb = new Employbirthday001mb();
        employbirthday001mb.ebmonth = this.f.ebmonth.value ? this.f.ebmonth.value : "";
        employbirthday001mb.empDob = new Date(this.f.empDob.value);
        employbirthday001mb.empNumber = this.f.empNumber.value ? this.f.empNumber.value : "";
        employbirthday001mb.empName = this.f.empName.value ? this.f.empName.value : "";
        employbirthday001mb.deptName = this.f.deptName.value ? this.f.deptName.value : "";
        employbirthday001mb.branch = this.f.branch.value ? this.f.branch.value : "";
        employbirthday001mb.empCompany = this.f.empCompany.value ? this.f.empCompany.value : "";
        employbirthday001mb.empDesign = this.f.empDesign.value ? this.f.empDesign.value : "";
        employbirthday001mb.empGender = this.f.empGender.value ? this.f.empGender.value : "";
        if (this.empbirthId) {
            employbirthday001mb.empbirthId = this.empbirthId;
            employbirthday001mb.insertUser = this.insertUser;
            employbirthday001mb.insertDatetime = this.insertDatetime;
            employbirthday001mb.updatedUser = this.authManager.getcurrentUser.username;
            employbirthday001mb.updatedDatetime = new Date();
            this.employeeBirthManager.updateempbirthday(employbirthday001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let births = deserialize<Employbirthday001mb>(Employbirthday001mb, response);
                for (let employeebirthday of this.empBirthday) {
                    if (employeebirthday.empbirthId == births.empbirthId) {
                        employeebirthday.ebmonth = births.ebmonth;
                        employeebirthday.empDob = births.empDob;
                        employeebirthday.empNumber = births.empNumber;
                        employeebirthday.empName = births.empName;
                        employeebirthday.deptName = births.deptName;
                        employeebirthday.branch = births.branch;
                        employeebirthday.empCompany = births.empCompany;
                        employeebirthday.empDesign = births.empDesign;
                        employeebirthday.empGender = births.empGender;
                        employeebirthday.insertUser = this.insertUser;
                        employeebirthday.insertDatetime = this.insertDatetime;
                        employeebirthday.updatedUser = this.authManager.getcurrentUser.username;
                        employeebirthday.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.empBirthday);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.birthForm.reset();
                this.submitted = false;
                this.empbirthId = null;
            });
        }
        else {
            employbirthday001mb.insertUser = this.authManager.getcurrentUser.username;
            employbirthday001mb.insertDatetime = new Date();
            this.employeeBirthManager.saveempbirthday(employbirthday001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let births = deserialize<Employbirthday001mb>(Employbirthday001mb, response);
                this.empBirthday?.push(births);
                const newItems = [JSON.parse(JSON.stringify(births))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.gridOptions.api.deselectAll();
                this.birthForm.reset();
                this.submitted = false;
            });
        }
    }

    onReset() {
        this.birthForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.employeeBirthManager.employeeBirthPdf().subscribe((response) =>{
            saveAs(response,"EmployeeBirthList");

		});
	}

	onGenerateExcelReport(){
		this.employeeBirthManager.employeeBirthExcel().subscribe((response) => {
			saveAs(response,"EmployeeBirthList");
        })
	}

}