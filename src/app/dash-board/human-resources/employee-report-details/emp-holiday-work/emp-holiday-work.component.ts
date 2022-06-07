import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { EmployeeHolidayWorkManager } from 'src/app/shared/services/restcontroller/bizservice/emp-holiday-work.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Empworkonholiday001mb } from 'src/app/shared/services/restcontroller/entities/Empworkonholiday001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-emp-holiday-work',
    templateUrl: './emp-holiday-work.component.html',
    styleUrls: ['./emp-holiday-work.component.css']
})

export class EmpHolidayWorkComponent implements OnInit {


    frameworkComponents: any;
    workForm: FormGroup | any;
    empwhId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    numbername: string = "Dummy.status";
    numbertype: string = "dummy";
    empname: string = "Dummy.status";
    emptype: string = "dummy";
    listname: string = "emp.holiday";
    listtype: string = "holiday";
    statusname: string = "attend.status";
    statustype: string = "status";
    dayname: string = "Holiday.Week";
    daytype: string = "Week"
    fromDate!: Date | null;
    toDate!: Date | null;
    empNumber: string | null = "";
    empName: string | null = "";
    holidayList: string | null = "";
    empStatus: string | null = "";
    whDate!: Date | null;
    holiday: string | null = "";
    submitted = false;
    public gridOptions: GridOptions | any;
    empHoliday: Empworkonholiday001mb[] = [];
    numsystemproperties?: Systemproperties001mb[] = [];
    empsystemproperties?: Systemproperties001mb[] = [];
    listsystemproperties?: Systemproperties001mb[] = [];
    statussystemproperties?: Systemproperties001mb[] = [];
    daysystemproperties?: Systemproperties001mb[] = [];

    constructor(private systemPropertiesService: SystemPropertiesService,
        private employeeHolidayWorkManager: EmployeeHolidayWorkManager,
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
        this.workForm = this.formBuilder.group({
            fromDate: ['', Validators.required],
            toDate: ['', Validators.required],
            empNumber: ['', Validators.required],
            empName: ['', Validators.required],
            holidayList: ['', Validators.required],
            empStatus: ['', Validators.required],
            whDate: ['', Validators.required],
            holiday: ['', Validators.required]
        })
        this.systemPropertiesService.system(this.numbername, this.numbertype,).subscribe(response => {
            this.numsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        }),
            this.systemPropertiesService.system(this.empname, this.emptype,).subscribe(response => {
                this.empsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
            }),
            this.systemPropertiesService.system(this.statusname, this.statustype,).subscribe(response => {
                this.statussystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
            }),
            this.systemPropertiesService.system(this.listname, this.listtype,).subscribe(response => {
                this.listsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
            }),
            this.systemPropertiesService.system(this.dayname, this.daytype,).subscribe(response => {
                this.daysystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
            }),
            this.employeeHolidayWorkManager.allempholiday().subscribe(response => {
                this.empHoliday = deserialize<Empworkonholiday001mb[]>(Empworkonholiday001mb, response);
                if (this.empHoliday.length > 0) {
                    this.gridOptions?.api?.setRowData(this.empHoliday);
                } else {
                    this.gridOptions?.api?.setRowData([]);
                }
            })
    }

    get f() { return this.workForm.controls }


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
                field: 'empwhId',
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
                headerName: 'Holiday List',
                field: 'holidayList',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Attendance',
                field: 'empStatus',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Holiday Date',
                field: 'whDate',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: (params: any) => {
                    return params.data.whDate ? this.datePipe.transform(params.data.whDate, 'MM/dd/yyyy') : '';
                }
            },
            {
                headerName: 'Holiday',
                field: 'holiday',
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
        this.empwhId = params.data.empwhId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.workForm.patchValue({
            'fromDate': this.datePipe.transform(params.data.fromDate, 'MM/dd/yyyy'),
            'toDate': this.datePipe.transform(params.data.toDate, 'MM/dd/yyyy'),
            'empNumber': params.data.empNumber,
            'empName': params.data.empName,
            'holidayList': params.data.holidayList,
            'empStatus': params.data.empStatus,
            'whDate': this.datePipe.transform(params.data.whDate, 'MM/dd/yyyy'),
            'holiday': params.data.holiday
        });
    }

    onDeleteButtonClick(params: any) {
        this.employeeHolidayWorkManager.deleteempholiday(params.data.empwhId).subscribe(response => {
            for (let i = 0; i < this.empHoliday.length; i++) {
                if (this.empHoliday[i].empwhId == params.data.empwhId) {
                    this.empHoliday?.splice(i, 1);
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
        modalRef.componentInstance.title = "Employee Working On Holiday";
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

    onOrderClick(event: any, workForm: any) {
        this.markFormGroupTouched(this.workForm);
        this.submitted = true;
        if (this.workForm.invalid) {
            return;
        }
        let empworkonholiday001mb = new Empworkonholiday001mb();

        empworkonholiday001mb.fromDate = new Date(this.f.fromDate.value);
        empworkonholiday001mb.toDate = new Date(this.f.toDate.value);
        empworkonholiday001mb.empNumber = this.f.empNumber.value ? this.f.empNumber.value : "";
        empworkonholiday001mb.empName = this.f.empName.value ? this.f.empName.value : "";
        empworkonholiday001mb.holidayList = this.f.holidayList.value ? this.f.holidayList.value : "";
        empworkonholiday001mb.empStatus = this.f.empStatus.value ? this.f.empStatus.value : "";
        empworkonholiday001mb.whDate = new Date(this.f.whDate.value);
        empworkonholiday001mb.holiday = this.f.holiday.value ? this.f.holiday.value : "";
        if (this.empwhId) {
            empworkonholiday001mb.empwhId = this.empwhId;
            empworkonholiday001mb.insertUser = this.insertUser;
            empworkonholiday001mb.insertDatetime = this.insertDatetime;
            empworkonholiday001mb.updatedUser = this.authManager.getcurrentUser.username;
            empworkonholiday001mb.updatedDatetime = new Date();
            this.employeeHolidayWorkManager.updateempholiday(empworkonholiday001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let works = deserialize<Empworkonholiday001mb>(Empworkonholiday001mb, response);
                for (let employeeholiday of this.empHoliday) {
                    if (employeeholiday.empwhId == works.empwhId) {
                        employeeholiday.fromDate = works.fromDate;
                        employeeholiday.toDate = works.toDate;
                        employeeholiday.empNumber = works.empNumber;
                        employeeholiday.empName = works.empName;
                        employeeholiday.holidayList = works.holidayList;
                        employeeholiday.empStatus = works.empStatus;
                        employeeholiday.whDate = works.whDate;
                        employeeholiday.holiday = works.holiday;
                        employeeholiday.insertUser = this.insertUser;
                        employeeholiday.insertDatetime = this.insertDatetime;
                        employeeholiday.updatedUser = this.authManager.getcurrentUser.username;
                        employeeholiday.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.empHoliday);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.workForm.reset();
                this.submitted = false;
                this.empwhId = null;
            });
        }
        else {
            empworkonholiday001mb.insertUser = this.authManager.getcurrentUser.username;
            empworkonholiday001mb.insertDatetime = new Date();
            this.employeeHolidayWorkManager.saveempholiday(empworkonholiday001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let works = deserialize<Empworkonholiday001mb>(Empworkonholiday001mb, response);
                this.empHoliday?.push(works);
                const newItems = [JSON.parse(JSON.stringify(works))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.gridOptions.api.deselectAll();
                this.workForm.reset();
                this.submitted = false;
            });
        }
    }

    onReset() {
        this.workForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.employeeHolidayWorkManager.employeeHolidayPdf().subscribe((response) =>{
            saveAs(response,"EmployeeHolidayList");

		});
	}

	onGenerateExcelReport(){
		this.employeeHolidayWorkManager.employeeHolidayExcel().subscribe((response) => {
			saveAs(response,"EmployeeHolidayList");
        })
	}
}