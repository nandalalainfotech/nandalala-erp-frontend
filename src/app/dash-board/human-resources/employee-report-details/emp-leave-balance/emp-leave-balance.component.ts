import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { EmployeeLeaveBalanceManager } from 'src/app/shared/services/restcontroller/bizservice/emp-leave-balance.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Empleavebalance001mb } from 'src/app/shared/services/restcontroller/entities/Empleavebalance001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-emp-leave-balance',
    templateUrl: './emp-leave-balance.component.html',
    styleUrls: ['./emp-leave-balance.component.css']
})

export class EmpLeaveBalanceComponent implements OnInit {


    frameworkComponents: any;
    leaveForm: FormGroup | any;
    elbId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
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
    fromDate: string | null = "";
    toDate: string | null = "";
    empNumber: string | null = "";
    empName: string | null = "";
    deptName: string | null = "";
    branch: string | null = "";
    company: string | null = "";
    clTaken: string | null = "";
    clBalance: number | any;
    compoffTaken: string | null = "";
    compoffBalance: number | any;
    lvwoutpayTaken: string | null = "";
    lvwoutpayBalance: number | any;
    plTaken: string | null = "";
    plBalance: number | any;
    slTaken: string | null = "";
    slBalance: number | any;
    submitted = false;
    public gridOptions: GridOptions | any;
    empLeave: Empleavebalance001mb[] = [];
    numsystemproperties?: Systemproperties001mb[] = [];
    empsystemproperties?: Systemproperties001mb[] = [];
    depsystemproperties?: Systemproperties001mb[] = [];
    branchsystemproperties?: Systemproperties001mb[] = [];
    companysystemproperties?: Systemproperties001mb[] = [];

    constructor(private systemPropertiesService: SystemPropertiesService,
        private employeeLeaveBalanceManager: EmployeeLeaveBalanceManager,
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
        this.leaveForm = this.formBuilder.group({
            fromDate: ['', Validators.required],
            toDate: ['', Validators.required],
            empNumber: ['', Validators.required],
            empName: ['', Validators.required],
            deptName: ['', Validators.required],
            branch: ['', Validators.required],
            company: ['', Validators.required],
            clTaken: ['', Validators.required],
            clBalance: ['', Validators.required],
            compoffTaken: ['', Validators.required],
            compoffBalance: ['', Validators.required],
            lvwoutpayTaken: ['', Validators.required],
            lvwoutpayBalance: ['', Validators.required],
            plTaken: ['', Validators.required],
            plBalance: ['', Validators.required],
            slTaken: ['', Validators.required],
            slBalance: ['', Validators.required]
        })
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
            this.employeeLeaveBalanceManager.allempleave().subscribe(response => {
                this.empLeave = deserialize<Empleavebalance001mb[]>(Empleavebalance001mb, response);

                if (this.empLeave.length > 0) {
                    this.gridOptions?.api?.setRowData(this.empLeave);
                } else {
                    this.gridOptions?.api?.setRowData([]);
                }
            })
    }

    get f() { return this.leaveForm.controls }


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
                headerName: '#Id',
                field: 'elbId',
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
                headerName: 'From Date',
                field: 'fromDate',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: (params: any) => {
                    return params.data.fromDate ? this.datePipe.transform(params.data.fromDate, 'MM/dd/yyyy') : '';
                }
            },
            {
                headerName: 'To Date',
                field: 'toDate',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: (params: any) => {
                    return params.data.toDate ? this.datePipe.transform(params.data.toDate, 'MM/dd/yyyy') : '';
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
                field: 'lvwoutpayTaken',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Leave without pay Balance',
                field: 'lvwoutpayBalance',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Paternity Leave Taken',
                field: 'plTaken',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Paternity Leave Balance',
                field: 'plBalance',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Sick Leave Taken',
                field: 'slTaken',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Sick Leave Balance',
                field: 'slBalance',
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
                }
            },
            {
                headerName: 'Delete',
                cellRenderer: 'iconRenderer',
                width: 185,
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
                width: 180,
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
        this.elbId = params.data.elbId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.leaveForm.patchValue({
            'fromDate':  this.datePipe.transform(params.data.fromDate, 'MM/dd/yyyy'),
            'toDate': this.datePipe.transform(params.data.toDate, 'MM/dd/yyyy'),
            'empNumber': params.data.empNumber,
            'empName': params.data.empName,
            'deptName': params.data.deptName,
            'branch': params.data.branch,
            'company': params.data.company,
            'clTaken': params.data.clTaken,
            'clBalance': params.data.clBalance,
            'compoffTaken': params.data.compoffTaken,
            'compoffBalance': params.data.compoffBalance,
            'lvwoutpayTaken': params.data.lvwoutpayTaken,
            'lvwoutpayBalance': params.data.lvwoutpayBalance,
            'plTaken': params.data.plTaken,
            'plBalance': params.data.plBalance,
            'slTaken': params.data.slTaken,
            'slBalance': params.data.slBalance
        });
    }

    onDeleteButtonClick(params: any) {
        this.employeeLeaveBalanceManager.deleteempleave(params.data.elbId).subscribe(response => {
            for (let i = 0; i < this.empLeave.length; i++) {
                if (this.empLeave[i].elbId == params.data.elbId) {
                    this.empLeave?.splice(i, 1);
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
        modalRef.componentInstance.title = "Employee Leave Balance";
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

    onOrderClick(event: any, leaveForm: any) {
        this.markFormGroupTouched(this.leaveForm);
        this.submitted = true;
        if (this.leaveForm.invalid) {
            return;
        }
        let empleavebalance001mb = new Empleavebalance001mb();
        empleavebalance001mb.fromDate = new Date(this.f.fromDate.value);
        empleavebalance001mb.toDate = new Date(this.f.toDate.value);
        empleavebalance001mb.empNumber = this.f.empNumber.value ? this.f.empNumber.value : "";
        empleavebalance001mb.empName = this.f.empName.value ? this.f.empName.value : "";
        empleavebalance001mb.deptName = this.f.deptName.value ? this.f.deptName.value : "";
        empleavebalance001mb.branch = this.f.branch.value ? this.f.branch.value : "";
        empleavebalance001mb.company = this.f.company.value ? this.f.company.value : "";
        empleavebalance001mb.clTaken = this.f.clTaken.value ? this.f.clTaken.value : "";
        empleavebalance001mb.clBalance = this.f.clBalance.value ? this.f.clBalance.value : null;
        empleavebalance001mb.compoffTaken = this.f.compoffTaken.value ? this.f.compoffTaken.value : "";
        empleavebalance001mb.compoffBalance = this.f.compoffBalance.value ? this.f.compoffBalance.value : null;
        empleavebalance001mb.lvwoutpayTaken = this.f.lvwoutpayTaken.value ? this.f.lvwoutpayTaken.value : "";
        empleavebalance001mb.lvwoutpayBalance = this.f.lvwoutpayBalance.value ? this.f.lvwoutpayBalance.value : null;
        empleavebalance001mb.plTaken = this.f.plTaken.value ? this.f.plTaken.value : "";
        empleavebalance001mb.plBalance = this.f.plBalance.value ? this.f.plBalance.value : null;
        empleavebalance001mb.slTaken = this.f.slTaken.value ? this.f.slTaken.value : "";
        empleavebalance001mb.slBalance = this.f.slBalance.value ? this.f.slBalance.value : null;
        if (this.elbId) {
            empleavebalance001mb.elbId = this.elbId;
            empleavebalance001mb.insertUser = this.insertUser;
            empleavebalance001mb.insertDatetime = this.insertDatetime;
            empleavebalance001mb.updatedUser = this.authManager.getcurrentUser.username;
            empleavebalance001mb.updatedDatetime = new Date();
            this.employeeLeaveBalanceManager.updateempleave(empleavebalance001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let leaves = deserialize<Empleavebalance001mb>(Empleavebalance001mb, response);
                for (let employeeleavebalances of this.empLeave) {
                    if (employeeleavebalances.elbId == leaves.elbId) {
                        employeeleavebalances.fromDate = leaves.fromDate;
                        employeeleavebalances.toDate = leaves.toDate;
                        employeeleavebalances.empNumber = leaves.empNumber;
                        employeeleavebalances.empName = leaves.empName;
                        employeeleavebalances.deptName = leaves.deptName;
                        employeeleavebalances.branch = leaves.branch;
                        employeeleavebalances.company = leaves.company;
                        employeeleavebalances.clTaken = leaves.clTaken;
                        employeeleavebalances.clBalance = leaves.clBalance;
                        employeeleavebalances.compoffTaken = leaves.compoffTaken;
                        employeeleavebalances.lvwoutpayTaken = leaves.lvwoutpayTaken;
                        employeeleavebalances.lvwoutpayBalance = leaves.lvwoutpayBalance
                        employeeleavebalances.plTaken = leaves.plTaken
                        employeeleavebalances.plBalance = leaves.plBalance;
                        employeeleavebalances.slTaken = leaves.slTaken;
                        employeeleavebalances.slBalance = leaves.slBalance;
                        employeeleavebalances.insertUser = this.insertUser;
                        employeeleavebalances.insertDatetime = this.insertDatetime;
                        employeeleavebalances.updatedUser = this.authManager.getcurrentUser.username;
                        employeeleavebalances.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.empLeave);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.leaveForm.reset();
                this.submitted = false;
                this.elbId = null;
            });
        }
        else {
            empleavebalance001mb.insertUser = this.authManager.getcurrentUser.username;
            empleavebalance001mb.insertDatetime = new Date();
            this.employeeLeaveBalanceManager.saveempleave(empleavebalance001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let leaves = deserialize<Empleavebalance001mb>(Empleavebalance001mb, response);
                this.empLeave?.push(leaves);
                const newItems = [JSON.parse(JSON.stringify(leaves))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.gridOptions.api.deselectAll();
                this.leaveForm.reset();
                this.submitted = false;
            });
        }
    }

    onReset() {
        this.leaveForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.employeeLeaveBalanceManager.employeeLeaveBalancePdf().subscribe((response) =>{
            saveAs(response,"EmployeeLeaveBalanceList");

		});
	}

	onGenerateExcelReport(){
		this.employeeLeaveBalanceManager.employeeLeaveBalanceExcel().subscribe((response) => {
			saveAs(response,"EmployeeLeaveBalanceList");
        })
	}

}