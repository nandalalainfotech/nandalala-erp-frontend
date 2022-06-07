import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { LeaveApplicationManager } from 'src/app/shared/services/restcontroller/bizservice/leave-application.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Leaveapp001mb } from 'src/app/shared/services/restcontroller/entities/Leaveapp001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-leave-application',
    templateUrl: './leave-application.component.html',
    styleUrls: ['./leave-application.component.css']
})
export class LeaveApplicationComponent implements OnInit {

    frameworkComponents: any;
    leAppForm: FormGroup | any;
    lvappId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    series: string = "";
    leaveType: string = "";
    reason: string = "";
    fromDatedate!: Date | null;
    toDatedate!: Date | null;
    leaveApprover: string = "";
    postingDatedate!: Date | null;
    company: string = "";
    empNumber: string | null = "";
    deptName: string | null = "";
    leaveApp: Leaveapp001mb[] = [];
    stname = "Dummy.status";
    sttype = "dummy";
    empname = "Dummy.status";
    emptype = "dummy";
    submitted = false;
    public gridOptions: GridOptions | any;
    statussystemproperties: Systemproperties001mb[] = [];
    empsystemproperties: Systemproperties001mb[] = [];

    constructor(private leaveApplicationManager: LeaveApplicationManager, 
        private systemPropertiesService: SystemPropertiesService, 
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
        this.leAppForm = this.formBuilder.group({
            series: ['', Validators.required],
            leaveType: ['', Validators.required],
            fromDate: ['', Validators.required],
            toDate: ['', Validators.required],
            postingDate: ['', Validators.required],
            empNumber: ['', Validators.required],
            leaveApprover: ['', Validators.required],
            deptName: ['', Validators.required],
            company: ['', Validators.required],
            reason: ['', Validators.required]
        })
        this.systemPropertiesService.system(this.stname, this.sttype).subscribe(response => {
            this.statussystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.systemPropertiesService.system(this.empname, this.emptype).subscribe(response => {
            this.empsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.leaveApplicationManager.allleaveapp().subscribe((response) => {
            this.leaveApp = deserialize<Leaveapp001mb[]>(Leaveapp001mb, response);
            if (this.leaveApp.length > 0) {
                this.gridOptions?.api?.setRowData(this.leaveApp);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })

    }

    get f() { return this.leAppForm.controls }

    createDataGrid001(): void {
        this.gridOptions = {
            paginationPageSize: 10,
            rowSelection: 'single',
            onFirstDataRendered: this.onFirstDataRendered.bind(this),
        };
        this.gridOptions.editType = 'fullRow';
        this.gridOptions.enableRangeSelection = true;
        this.gridOptions.animateRows = true;
        this.gridOptions.columnDefs = [
            {
                headerName: '#ID',
                field: 'lvappId',
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
                headerName: 'Series',
                field: 'series',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Status',
                field: 'leaveType',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Reason',
                field: 'reason',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
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
                headerName: 'Leave Approver',
                field: 'leaveApprover',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Posting Date',
                field: 'postingDate',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: (params: any) => {
                    return params.data.postingDate ? this.datePipe.transform(params.data.postingDate, 'MM/dd/yyyy') : '';
                }
            },
            {
                headerName: 'Employee',
                field: 'empNumber',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
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
                width: 185,
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
        this.lvappId = params.data.lvappId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.leAppForm.patchValue({
            'series': params.data.series,
            'leaveType': params.data.leaveType,
            'reason': params.data.reason,
            'fromDate': this.datePipe.transform(params.data.fromDate, 'MM/dd/yyyy'),
            'toDate': this.datePipe.transform(params.data.toDate, 'MM/dd/yyyy'),
            'leaveApprover': params.data.leaveApprover,
            'postingDate': this.datePipe.transform(params.data.postingDate, 'MM/dd/yyyy'),
            'deptName': params.data.deptName,
            'company': params.data.company,
            'empNumber': params.data.empNumber
        });
    }

    onDeleteButtonClick(params: any) {
        this.leaveApplicationManager.leaveappdelete(params.data.lvappId).subscribe((response) => {
            for (let i = 0; i < this.leaveApp.length; i++) {
                if (this.leaveApp[i].lvappId == params.data.lvappId) {
                    this.leaveApp?.splice(i, 1);
                    break;
                }
            }
            const selectedRows = params.api.getSelectedRows();
            params.api.applyTransaction({ remove: selectedRows });
            this.calloutService.showSuccess("Order Removed Successfully");
        });
    }

    onAuditButtonClick(params: any) {
        const modalRef = this.modalService.open(AuditComponent);
        modalRef.componentInstance.title = "Leave Application";
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

    onOrderClick(event: any, leAppForm: any) {
        this.markFormGroupTouched(this.leAppForm);
        this.submitted = true;
        if (this.leAppForm.invalid) {
            return;
        }
        let leaveapp001mb = new Leaveapp001mb();
        leaveapp001mb.company = this.f.company.value ? this.f.company.value : "";
        leaveapp001mb.empNumber = this.f.empNumber.value ? this.f.empNumber.value : "";
        leaveapp001mb.fromDate = new Date(this.f.fromDate.value);
        leaveapp001mb.leaveApprover = this.f.leaveApprover.value ? this.f.leaveApprover.value : "";
        leaveapp001mb.leaveType = this.f.leaveType.value ? this.f.leaveType.value : "";
        leaveapp001mb.postingDate = new Date(this.f.postingDate.value);
        leaveapp001mb.deptName = this.f.deptName.value ? this.f.deptName.value : "";
        leaveapp001mb.reason = this.f.reason.value ? this.f.reason.value : "";
        leaveapp001mb.series = this.f.series.value ? this.f.series.value : "";
        leaveapp001mb.toDate = new Date(this.f.toDate.value);
        if (this.lvappId) {
            leaveapp001mb.lvappId = this.lvappId;
            leaveapp001mb.insertUser = this.insertUser;
            leaveapp001mb.insertDatetime = this.insertDatetime;
            leaveapp001mb.updatedUser = this.authManager.getcurrentUser.username;
            leaveapp001mb.updatedDatetime = new Date();
            this.leaveApplicationManager.leaveappsave(leaveapp001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let leave = deserialize<Leaveapp001mb>(Leaveapp001mb, response);
                for (let leaveapp of this.leaveApp) {
                    if (leaveapp.lvappId == leave.lvappId) {
                        leaveapp.company = leave.company;
                        leaveapp.empNumber = leave.empNumber;
                        leaveapp.fromDate = leave.fromDate;
                        leaveapp.leaveApprover = leave.leaveApprover;
                        leaveapp.leaveType = leave.leaveType;
                        leaveapp.postingDate = leave.postingDate;
                        leaveapp.deptName = leave.deptName;
                        leaveapp.reason = leave.reason;
                        leaveapp.series = leave.series;
                        leaveapp.toDate = leave.toDate;
                        leaveapp.insertUser = this.insertUser;
                        leaveapp.insertDatetime = this.insertDatetime;
                        leaveapp.updatedUser = this.authManager.getcurrentUser.username;
                        leaveapp.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.leaveApp);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.leAppForm.reset();
                this.submitted = false;
                this.lvappId = null;
            });
        } 
        else {
            leaveapp001mb.insertUser = this.authManager.getcurrentUser.username;
            leaveapp001mb.insertDatetime = new Date();
            this.leaveApplicationManager.leaveappsave(leaveapp001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let leave = deserialize<Leaveapp001mb>(Leaveapp001mb, response);
                this.leaveApp?.push(leave);
                const newItems = [JSON.parse(JSON.stringify(leave))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.gridOptions.api.deselectAll();
                this.leAppForm.reset();
                this.submitted = false;
            });
        }
    }

    onReset() {
        this.leAppForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.leaveApplicationManager.leaveApplicationPdf().subscribe((response) =>{
            saveAs(response,"MakeLeaveApplications");

		});
	}

	onGenerateExcelReport(){
		this.leaveApplicationManager.leaveApplicationExcel().subscribe((response) => {
			saveAs(response,"MakeLeaveApplications");
        })
	}
}