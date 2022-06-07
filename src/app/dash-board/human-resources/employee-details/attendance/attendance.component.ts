import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { EmpAttendanceManager } from 'src/app/shared/services/restcontroller/bizservice/emp-attendance.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Empattendance001mb } from 'src/app/shared/services/restcontroller/entities/Empattendance001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-attendance',
    templateUrl: './attendance.component.html',
    styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
    empAttForm: FormGroup | any;
    submitted = false;
    frameworkComponents: any;
    id: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    clBalance: number | any;
    clTaken: string | null = "";
    compoffBalance: number | any;
    compoffTaken: string | null = "";
    deptName: string | null = "";
    empName: string | null = "";
    empNumber: string | null = "";
    lwtoutpBalance: number | any;
    lwtoutpTaken: string | null = "";
    mtlvBalance: number | any;
    mtlvTaken: string | null = "";
    ptyBalance: number | any;
    ptyTaken: string | null = "";
    pvglvBalance: number | any;
    pvglvTaken: string | null = "";
    sklvBalance: number | any;
    sklvTaken: string | null = "";
    vcBalance: number | any;
    vcTaken: string | null = "";
    noname: string = "Dummy.status";
    notype: string = "dummy";
    naname: string = "Dummy.status";
    natype: string = "dummy";
    deptname: string = "Dummy.status"
    depttype: string = "dummy";
    empAttendance: Empattendance001mb[] = [];
    nosystemproperties?: Systemproperties001mb[] = [];
    namesystemproperties?: Systemproperties001mb[] = [];
    deptsystemproperties?: Systemproperties001mb[] = [];
    public gridOptions: GridOptions | any;

    constructor(private empAttendanceManager: EmpAttendanceManager, 
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
        this.empAttForm = this.formBuilder.group({
            clBalance: ['', Validators.required],
            clTaken: ['', Validators.required],
            compoffBalance: ['', Validators.required],
            compoffTaken: ['', Validators.required],
            deptName: ['', Validators.required],
            empName: ['', Validators.required],
            empNumber: ['', Validators.required],
            lwtoutpBalance: ['', Validators.required],
            lwtoutpTaken: ['', Validators.required],
            mtlvBalance: ['', Validators.required],
            mtlvTaken: ['', Validators.required],
            ptyBalance: ['', Validators.required],
            ptyTaken: ['', Validators.required],
            pvglvBalance: ['', Validators.required],
            pvglvTaken: ['', Validators.required],
            sklvBalance: ['', Validators.required],
            sklvTaken: ['', Validators.required],
            vcBalance: ['', Validators.required],
            vcTaken: ['', Validators.required]
        });

        this.createDataGrid001();
        this.systemPropertiesService.system(this.noname, this.notype).subscribe(response => {
            this.nosystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.systemPropertiesService.system(this.naname, this.natype).subscribe(response => {
            this.namesystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.systemPropertiesService.system(this.deptname, this.depttype).subscribe(response => {
            this.deptsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.empAttendanceManager.allattendance().subscribe((response) => {
            this.empAttendance = deserialize<Empattendance001mb[]>(Empattendance001mb, response);
            if (this.empAttendance.length > 0) {
                this.gridOptions?.api?.setRowData(this.empAttendance);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    get f() { return this.empAttForm.controls; }

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
                field: 'id',
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
                headerName: 'Casual Leave Taken',
                field: 'clTaken',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Casual Leave Balance',
                field: 'clBalance',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Comp off Taken',
                field: 'compoffTaken',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Comp off Balance',
                field: 'compoffBalance',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Leave without pay Taken',
                field: 'lwtoutpTaken',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Leave without pay Balance',
                field: 'lwtoutpBalance',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Maternity Leave Taken',
                field: 'mtlvTaken',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Maternity Leave Balance',
                field: 'mtlvBalance',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Paternity Leave Taken',
                field: 'ptyTaken',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Paternity Leave Balance',
                field: 'ptyBalance',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Privilege Leave Taken',
                field: 'pvglvTaken',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Privilege Leave Balance',
                field: 'pvglvBalance',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Sick Leave Taken',
                field: 'sklvTaken',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Sick Leave Balance',
                field: 'sklvBalance',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Vacation Leave Taken',
                field: 'vcTaken',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Vacation Leave Balance',
                field: 'vcBalance',
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
                width: 280,
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
                width: 300,
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
                width: 280,
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
        this.id = params.data.id;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.empAttForm.patchValue({
            'empNumber': params.data.empNumber,
            'clTaken': params.data.clTaken,
            'empName': params.data.empName,
            'deptName': params.data.deptName,
            'clBalance': params.data.clBalance,
            'compoffTaken': params.data.compoffTaken,
            'lwtoutpTaken': params.data.lwtoutpTaken,
            'lwtoutpBalance': params.data.lwtoutpBalance,
            'mtlvTaken': params.data.mtlvTaken,
            'mtlvBalance': params.data.mtlvBalance,
            'ptyTaken': params.data.ptyTaken,
            'ptyBalance': params.data.ptyBalance,
            'pvglvTaken': params.data.pvglvTaken,
            'pvglvBalance': params.data.pvglvBalance,
            'sklvTaken': params.data.sklvTaken,
            'sklvBalance': params.data.sklvBalance,
            'vcTaken': params.data.vcTaken,
            'vcBalance': params.data.vcBalance,
            'compoffBalance': params.data.compoffBalance
        });
    }

    onDeleteButtonClick(params: any) {
        this.empAttendanceManager.attendancedelete(params.data.id).subscribe((response) => {
            for (let i = 0; i < this.empAttendance.length; i++) {
                if (this.empAttendance[i].id == params.data.id) {
                    this.empAttendance?.splice(i, 1);
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
        modalRef.componentInstance.title = "Attendance";
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

    onOrderClick(event: any, empAttForm: any) {
        this.markFormGroupTouched(this.empAttForm);
        this.submitted = true;
        if (this.empAttForm.invalid) {
            return;
        }

        let empattendance001mb = new Empattendance001mb();
        empattendance001mb.clBalance = this.f.clBalance.value ? this.f.clBalance.value : null;
        empattendance001mb.clTaken = this.f.clTaken.value ? this.f.clTaken.value : "";
        empattendance001mb.compoffBalance = this.f.compoffBalance.value ? this.f.compoffBalance.value : null;
        empattendance001mb.compoffTaken = this.f.compoffTaken.value ? this.f.compoffTaken.value : "";
        empattendance001mb.deptName = this.f.deptName.value ? this.f.deptName.value : "";
        empattendance001mb.empName = this.f.empName.value ? this.f.empName.value : "";
        empattendance001mb.empNumber = this.f.empNumber.value ? this.f.empNumber.value : "";
        empattendance001mb.lwtoutpBalance = this.f.lwtoutpBalance.value ? this.f.lwtoutpBalance.value : null;
        empattendance001mb.lwtoutpTaken = this.f.lwtoutpTaken.value ? this.f.lwtoutpTaken.value : "";
        empattendance001mb.mtlvBalance = this.f.mtlvBalance.value ? this.f.mtlvBalance.value : null;
        empattendance001mb.mtlvTaken = this.f.mtlvTaken.value ? this.f.mtlvTaken.value : "";
        empattendance001mb.ptyBalance = this.f.ptyBalance.value ? this.f.ptyBalance.value : null;
        empattendance001mb.ptyTaken = this.f.ptyTaken.value ? this.f.ptyTaken.value : "";
        empattendance001mb.pvglvBalance = this.f.pvglvBalance.value ? this.f.pvglvBalance.value : null;
        empattendance001mb.pvglvTaken = this.f.pvglvTaken.value ? this.f.pvglvTaken.value : "";
        empattendance001mb.sklvBalance = this.f.sklvBalance.value ? this.f.sklvBalance.value : null;
        empattendance001mb.sklvTaken = this.f.sklvTaken.value ? this.f.sklvTaken.value : "";;
        empattendance001mb.vcBalance = this.f.vcBalance.value ? this.f.vcBalance.value : null;
        empattendance001mb.vcTaken = this.f.vcTaken.value ? this.f.vcTaken.value : "";
        if (this.id) {
            empattendance001mb.id = this.id;
            empattendance001mb.insertUser = this.insertUser;
            empattendance001mb.insertDatetime = this.insertDatetime;
            empattendance001mb.updatedUser = this.authManager.getcurrentUser.username;
            empattendance001mb.updatedDatetime = new Date();
            this.empAttendanceManager.attendanceupdate(empattendance001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let empt = deserialize<Empattendance001mb>(Empattendance001mb, response);
                for (let emp of this.empAttendance) {
                    if (emp.id == empt.id) {
                        emp.lwtoutpBalance = empt.lwtoutpBalance;
                        emp.lwtoutpTaken = empt.lwtoutpTaken;
                        emp.mtlvBalance = empt.mtlvBalance;
                        emp.mtlvTaken = empt.mtlvTaken;
                        emp.ptyBalance = empt.ptyBalance;
                        emp.ptyTaken = empt.ptyTaken;
                        emp.pvglvBalance = empt.pvglvBalance;
                        emp.pvglvTaken = empt.pvglvTaken;
                        emp.sklvBalance = empt.sklvBalance;
                        emp.sklvTaken = empt.sklvTaken;
                        emp.vcBalance = empt.vcBalance;
                        emp.vcTaken = empt.vcTaken;
                        emp.clBalance = empt.clBalance;
                        emp.clTaken = empt.clTaken;
                        emp.compoffBalance = empt.compoffBalance;
                        emp.compoffTaken = empt.compoffTaken;
                        emp.deptName = empt.deptName;
                        emp.empName = empt.empName;
                        emp.empNumber = empt.empNumber;
                        emp.insertUser = this.insertUser;
                        emp.insertDatetime = this.insertDatetime;
                        emp.updatedUser = this.authManager.getcurrentUser.username;
                        emp.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.empAttendance);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.empAttForm.reset();
                this.id = null;
                this.submitted = false;
            })
        }
        else {
            empattendance001mb.insertUser = this.authManager.getcurrentUser.username;
            empattendance001mb.insertDatetime = new Date();
            this.empAttendanceManager.attendancesave(empattendance001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let empt = deserialize<Empattendance001mb>(Empattendance001mb, response);
                this.empAttendance.push(empt);
                const newItems = [JSON.parse(JSON.stringify(empt))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.empAttForm.reset();
                this.submitted = false;
            })
        }
    }

    onReset() {
        this.submitted = false;
        this.empAttForm.reset();
    }
    onGeneratePdfReport(){
		this.empAttendanceManager.empAttendancePdf().subscribe((response) =>{
            saveAs(response,"EmployeeAttendanceList");

		});
	}

	onGenerateExcelReport(){
		this.empAttendanceManager.empAttendanceExcel().subscribe((response) => {
			saveAs(response,"EmployeeAttendanceList");
        })
	}

}
