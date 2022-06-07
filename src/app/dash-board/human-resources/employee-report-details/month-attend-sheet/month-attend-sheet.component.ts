import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { MonthAttendSheetManager } from 'src/app/shared/services/restcontroller/bizservice/month-attend-sheet.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Monthlyattendsheet001mb } from 'src/app/shared/services/restcontroller/entities/Monthlyattendsheet001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-month-attend-sheet',
    templateUrl: './month-attend-sheet.component.html',
    styleUrls: ['./month-attend-sheet.component.css']
})

export class MonthAttendSheetComponent implements OnInit {

    frameworkComponents: any;
    attendForm: FormGroup | any;
    atsId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    yearname: string = "Year.status";
    yeartype: string = "year";
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
    monthname: string = "month.name";
    monthtype: string = "name";
    attYear: number | any;
    empNumber: string = "";
    empName: string = "";
    deptName: string = "";
    branch: string = "";
    empCompany: string = "";
    empDesign: string = "";
    one1: string | null = "";
    two2: string | null = "";
    three3: string | null = "";
    four4: string | null = "";
    five5: string | null = "";
    six6: string | null = "";
    seven7: string | null = "";
    eight8: string | null = "";
    nine9: string | null = "";
    ten10: string | null = "";
    eleven11: string | null = "";
    twelve12: string | null = "";
    thirteen13: string | null = "";
    fourteen14: string | null = "";
    fifteen15: string | null = "";
    sixteen16: string | null = "";
    seventeen17: string | null = "";
    eighteen18: string | null = "";
    nineteen19: string | null = "";
    twenty20: string | null = "";
    twentyone21: string | null = "";
    twentytwo22: string | null = "";
    twentythree23: string | null = "";
    twentyfour24: string | null = "";
    twentyfive25: string | null = "";
    twentysix26: string | null = "";
    twentyseven27: string | null = "";
    twentyeight28: string | null = "";
    twentynine29: string | null = "";
    thirty30: string | null = "";
    totalPresent: string | null = "";
    totalAbsent: string | null = "";
    months: string | null = "";
    submitted = false;
    public gridOptions: GridOptions | any;
    empMonths: Monthlyattendsheet001mb[] = [];
    yearsystemproperties?: Systemproperties001mb[] = [];
    numsystemproperties?: Systemproperties001mb[] = [];
    empsystemproperties?: Systemproperties001mb[] = [];
    depsystemproperties?: Systemproperties001mb[] = [];
    branchsystemproperties?: Systemproperties001mb[] = [];
    companysystemproperties?: Systemproperties001mb[] = [];
    designsystemproperties?: Systemproperties001mb[] = [];
    monthsystemproperties?: Systemproperties001mb[] = [];

    constructor(private systemPropertiesService: SystemPropertiesService,
        private monthAttendSheetManager: MonthAttendSheetManager,
        private calloutService: CalloutService,
        private formBuilder: FormBuilder,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent
        }
    }

    ngOnInit() {
        this.createDataGrid001();
        this.attendForm = this.formBuilder.group({
            attYear: ['', Validators.required],
            empNumber: ['', Validators.required],
            empName: ['', Validators.required],
            deptName: ['', Validators.required],
            branch: ['', Validators.required],
            empCompany: ['', Validators.required],
            empDesign: ['', Validators.required],
            one1: ['', Validators.required],
            two2: ['', Validators.required],
            three3: ['', Validators.required],
            four4: ['', Validators.required],
            five5: ['', Validators.required],
            six6: ['', Validators.required],
            seven7: ['', Validators.required],
            eight8: ['', Validators.required],
            nine9: ['', Validators.required],
            ten10: ['', Validators.required],
            eleven11: ['', Validators.required],
            twelve12: ['', Validators.required],
            thirteen13: ['', Validators.required],
            fourteen14: ['', Validators.required],
            fifteen15: ['', Validators.required],
            sixteen16: ['', Validators.required],
            seventeen17: ['', Validators.required],
            eighteen18: ['', Validators.required],
            nineteen19: ['', Validators.required],
            twenty20: ['', Validators.required],
            twentyone21: ['', Validators.required],
            twentytwo22: ['', Validators.required],
            twentythree23: ['', Validators.required],
            twentyfour24: ['', Validators.required],
            twentyfive25: ['', Validators.required],
            twentysix26: ['', Validators.required],
            twentyseven27: ['', Validators.required],
            twentyeight28: ['', Validators.required],
            twentynine29: ['', Validators.required],
            thirty30: ['', Validators.required],
            totalPresent: ['', Validators.required],
            totalAbsent: ['', Validators.required],
            months: ['', Validators.required],
        })
        this.systemPropertiesService.system(this.yearname, this.yeartype,).subscribe(response => {
            this.yearsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
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
            this.systemPropertiesService.system(this.monthname, this.monthtype,).subscribe(response => {
                this.monthsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
            }),
            this.monthAttendSheetManager.allempmonth().subscribe(response => {
                this.empMonths = deserialize<Monthlyattendsheet001mb[]>(Monthlyattendsheet001mb, response);

                if (this.empMonths.length > 0) {
                    this.gridOptions?.api?.setRowData(this.empMonths);
                } else {
                    this.gridOptions?.api?.setRowData([]);
                }
            })
    }

    get f() { return this.attendForm.controls }

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
                field: 'atsId',
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
                headerName: 'Year',
                field: 'attYear',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
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
                headerName: 'one',
                field: 'one1',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Two',
                field: 'two2',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Three',
                field: 'three3',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Four',
                field: 'four4',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Five',
                field: 'five5',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Six',
                field: 'six6',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Seven',
                field: 'seven7',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Eight',
                field: 'eight8',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Nine',
                field: 'nine9',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Ten',
                field: 'ten10',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Eleven',
                field: 'eleven11',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Twelve',
                field: 'twelve12',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Thirteen',
                field: 'thirteen13',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Fourteen',
                field: 'fourteen14',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Fifteen',
                field: 'fifteen15',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Sixteen',
                field: 'sixteen16',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Seventeen',
                field: 'seventeen17',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Eighteen',
                field: 'eighteen18',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Nineteen',
                field: 'nineteen19',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Twenty',
                field: 'twenty20',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Twenty One',
                field: 'twentyone21',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Twenty Two',
                field: 'twentytwo22',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Twenty Three',
                field: 'twentythree23',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Twenty Four',
                field: 'twentyfour24',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Twenty Five',
                field: 'twentyfive25',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Twenty Six',
                field: 'twentysix26',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Twenty Seven',
                field: 'twentyseven27',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Twenty Eight',
                field: 'twentyeight28',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Twenty Nine',
                field: 'twentynine29',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Thirty',
                field: 'thirty30',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Total Present',
                field: 'totalPresent',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Total Absent',
                field: 'totalAbsent',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Month',
                field: 'months',
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
        this.atsId = params.data.atsId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.attendForm.patchValue({
            'attYear': params.data.attYear,
            'empNumber': params.data.empNumber,
            'empName': params.data.empName,
            'deptName': params.data.deptName,
            'branch': params.data.branch,
            'empCompany': params.data.empCompany,
            'empDesign': params.data.empDesign,
            'one1': params.data.one1,
            'two2': params.data.two2,
            'three3': params.data.three3,
            'four4': params.data.four4,
            'five5': params.data.five5,
            'six6': params.data.six6,
            'seven7': params.data.seven7,
            'eight8': params.data.eight8,
            'nine9': params.data.nine9,
            'ten10': params.data.ten10,
            'eleven11': params.data.eleven11,
            'twelve12': params.data.twelve12,
            'thirteen13': params.data.thirteen13,
            'fourteen14': params.data.fourteen14,
            'fifteen15': params.data.fifteen15,
            'sixteen16': params.data.sixteen16,
            'seventeen17': params.data.seventeen17,
            'eighteen18': params.data.eighteen18,
            'nineteen19': params.data.nineteen19,
            'twenty20': params.data.twenty20,
            'twentyone21': params.data.twentyone21,
            'twentytwo22': params.data.twentytwo22,
            'twentythree23': params.data.twentythree23,
            'twentyfour24': params.data.twentyfour24,
            'twentyfive25': params.data.twentyfive25,
            'twentysix26': params.data.twentysix26,
            'twentyseven27': params.data.twentyseven27,
            'twentyeight28': params.data.twentyeight28,
            'twentynine29': params.data.twentynine29,
            'thirty30': params.data.thirty30,
            'totalPresent': params.data.totalPresent,
            'totalAbsent': params.data.totalAbsent,
            'months': params.data.months
        });
    }

    onDeleteButtonClick(params: any) {
        this.monthAttendSheetManager.deleteempmonth(params.data.atsId).subscribe(response => {
            for (let i = 0; i < this.empMonths.length; i++) {
                if (this.empMonths[i].atsId == params.data.atsId) {
                    this.empMonths?.splice(i, 1);
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
        modalRef.componentInstance.title = "Employee Month Attendance";
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

    onOrderClick(event: any, attendForm: any) {
        this.markFormGroupTouched(this.attendForm);
        this.submitted = true;
        if (this.attendForm.invalid) {
            return;
        }
        let monthlyattendsheet001mb = new Monthlyattendsheet001mb();
        monthlyattendsheet001mb.attYear = this.f.attYear.value ? this.f.attYear.value : 0;
        monthlyattendsheet001mb.empNumber = this.f.empNumber.value ? this.f.empNumber.value : "";
        monthlyattendsheet001mb.empName = this.f.empName.value ? this.f.empName.value : "";
        monthlyattendsheet001mb.deptName = this.f.deptName.value ? this.f.deptName.value : "";
        monthlyattendsheet001mb.branch = this.f.branch.value ? this.f.branch.value : "";
        monthlyattendsheet001mb.empCompany = this.f.empCompany.value ? this.f.empCompany.value : "";
        monthlyattendsheet001mb.empDesign = this.f.empDesign.value ? this.f.empDesign.value : "";
        monthlyattendsheet001mb.one1 = this.f.one1.value ? this.f.one1.value : "";
        monthlyattendsheet001mb.two2 = this.f.two2.value ? this.f.two2.value : "";
        monthlyattendsheet001mb.three3 = this.f.three3.value ? this.f.three3.value : "";
        monthlyattendsheet001mb.four4 = this.f.four4.value ? this.f.four4.value : "";
        monthlyattendsheet001mb.five5 = this.f.five5.value ? this.f.five5.value : "";
        monthlyattendsheet001mb.six6 = this.f.six6.value ? this.f.six6.value : "";
        monthlyattendsheet001mb.seven7 = this.f.seven7.value ? this.f.seven7.value : "";
        monthlyattendsheet001mb.eight8 = this.f.eight8.value ? this.f.eight8.value : "";
        monthlyattendsheet001mb.nine9 = this.f.nine9.value ? this.f.nine9.value : "";
        monthlyattendsheet001mb.ten10 = this.f.ten10.value ? this.f.ten10.value : "";
        monthlyattendsheet001mb.eleven11 = this.f.eleven11.value ? this.f.eleven11.value : "";
        monthlyattendsheet001mb.twelve12 = this.f.twelve12.value ? this.f.twelve12.value : "";
        monthlyattendsheet001mb.thirteen13 = this.f.thirteen13.value ? this.f.thirteen13.value : "";
        monthlyattendsheet001mb.fourteen14 = this.f.fourteen14.value ? this.f.fourteen14.value : "";
        monthlyattendsheet001mb.fifteen15 = this.f.fifteen15.value ? this.f.fifteen15.value : "";
        monthlyattendsheet001mb.sixteen16 = this.f.sixteen16.value ? this.f.sixteen16.value : "";
        monthlyattendsheet001mb.seventeen17 = this.f.seventeen17.value ? this.f.seventeen17.value : "";
        monthlyattendsheet001mb.eighteen18 = this.f.eighteen18.value ? this.f.eighteen18.value : "";
        monthlyattendsheet001mb.nineteen19 = this.f.nineteen19.value ? this.f.nineteen19.value : "";
        monthlyattendsheet001mb.twenty20 = this.f.twenty20.value ? this.f.twenty20.value : "";
        monthlyattendsheet001mb.twentyone21 = this.f.twentyone21.value ? this.f.twentyone21.value : "";
        monthlyattendsheet001mb.twentytwo22 = this.f.twentytwo22.value ? this.f.twentytwo22.value : "";
        monthlyattendsheet001mb.twentythree23 = this.f.twentythree23.value ? this.f.twentythree23.value : "";
        monthlyattendsheet001mb.twentyfour24 = this.f.twentyfour24.value ? this.f.twentyfour24.value : "";
        monthlyattendsheet001mb.twentyfive25 = this.f.twentyfive25.value ? this.f.twentyfive25.value : "";
        monthlyattendsheet001mb.twentysix26 = this.f.twentysix26.value ? this.f.twentysix26.value : "";
        monthlyattendsheet001mb.twentyseven27 = this.f.twentyseven27.value ? this.f.twentyseven27.value : "";
        monthlyattendsheet001mb.twentyeight28 = this.f.twentyeight28.value ? this.f.twentyeight28.value : "";
        monthlyattendsheet001mb.twentynine29 = this.f.twentynine29.value ? this.f.twentynine29.value : "";
        monthlyattendsheet001mb.thirty30 = this.f.thirty30.value ? this.f.thirty30.value : "";
        monthlyattendsheet001mb.totalPresent = this.f.totalPresent.value ? this.f.totalPresent.value : "";
        monthlyattendsheet001mb.totalAbsent = this.f.totalAbsent.value ? this.f.totalAbsent.value : "";
        monthlyattendsheet001mb.months = this.f.months.value ? this.f.months.value : "";
        if (this.atsId) {
            monthlyattendsheet001mb.atsId = this.atsId;
            monthlyattendsheet001mb.insertUser = this.insertUser;
            monthlyattendsheet001mb.insertDatetime = this.insertDatetime;
            monthlyattendsheet001mb.updatedUser = this.authManager.getcurrentUser.username;
            monthlyattendsheet001mb.updatedDatetime = new Date();
            this.monthAttendSheetManager.updateempmonth(monthlyattendsheet001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let attends = deserialize<Monthlyattendsheet001mb>(Monthlyattendsheet001mb, response);
                for (let monthlyattendsheets of this.empMonths) {
                    if (monthlyattendsheets.atsId == attends.atsId) {
                        monthlyattendsheets.attYear = attends.attYear;
                        monthlyattendsheets.empNumber = attends.empNumber;
                        monthlyattendsheets.empName = attends.empName;
                        monthlyattendsheets.deptName = attends.deptName;
                        monthlyattendsheets.branch = attends.branch;
                        monthlyattendsheets.empCompany = attends.empCompany;
                        monthlyattendsheets.empDesign = attends.empDesign;
                        monthlyattendsheets.one1 = attends.one1;
                        monthlyattendsheets.two2 = attends.two2;
                        monthlyattendsheets.three3 = attends.three3;
                        monthlyattendsheets.four4 = attends.four4;
                        monthlyattendsheets.five5 = attends.five5
                        monthlyattendsheets.six6 = attends.six6
                        monthlyattendsheets.seven7 = attends.seven7;
                        monthlyattendsheets.eight8 = attends.eight8;
                        monthlyattendsheets.nine9 = attends.nine9;
                        monthlyattendsheets.ten10 = attends.ten10;
                        monthlyattendsheets.eleven11 = attends.eleven11;
                        monthlyattendsheets.twelve12 = attends.twelve12;
                        monthlyattendsheets.thirteen13 = attends.thirteen13;
                        monthlyattendsheets.fourteen14 = attends.fourteen14;
                        monthlyattendsheets.fifteen15 = attends.fifteen15;
                        monthlyattendsheets.sixteen16 = attends.sixteen16;
                        monthlyattendsheets.seventeen17 = attends.seventeen17;
                        monthlyattendsheets.eighteen18 = attends.eighteen18;
                        monthlyattendsheets.nineteen19 = attends.nineteen19;
                        monthlyattendsheets.twenty20 = attends.twenty20;
                        monthlyattendsheets.twentyone21 = attends.twentyone21
                        monthlyattendsheets.twentytwo22 = attends.twentytwo22
                        monthlyattendsheets.twentythree23 = attends.twentythree23;
                        monthlyattendsheets.twentyfour24 = attends.twentyfour24;
                        monthlyattendsheets.twentyfive25 = attends.twentyfive25;
                        monthlyattendsheets.twentysix26 = attends.twentysix26;
                        monthlyattendsheets.twentyseven27 = attends.twentyseven27;
                        monthlyattendsheets.twentyeight28 = attends.twentyeight28
                        monthlyattendsheets.twentynine29 = attends.twentynine29
                        monthlyattendsheets.thirty30 = attends.thirty30;
                        monthlyattendsheets.totalPresent = attends.totalPresent;
                        monthlyattendsheets.totalAbsent = attends.totalAbsent;
                        monthlyattendsheets.months = attends.months;
                        monthlyattendsheets.insertUser = this.insertUser;
                        monthlyattendsheets.insertDatetime = this.insertDatetime;
                        monthlyattendsheets.updatedUser = this.authManager.getcurrentUser.username;
                        monthlyattendsheets.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.empMonths);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.attendForm.reset();
                this.submitted = false;
                this.atsId = null;
            });
        } else {
            monthlyattendsheet001mb.insertUser = this.authManager.getcurrentUser.username;
            monthlyattendsheet001mb.insertDatetime = new Date();
            this.monthAttendSheetManager.saveempmonth(monthlyattendsheet001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let attends = deserialize<Monthlyattendsheet001mb>(Monthlyattendsheet001mb, response);
                this.empMonths?.push(attends);
                const newItems = [JSON.parse(JSON.stringify(attends))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.gridOptions.api.deselectAll();
                this.attendForm.reset();
                this.submitted = false;
            });
        }
    }

    onReset() {
        this.attendForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.monthAttendSheetManager.monthAttendSheetPdf().subscribe((response) =>{
            saveAs(response,"EmployeeMonthlyAttendance");

		});
	}

	onGenerateExcelReport(){
		this.monthAttendSheetManager.monthAttendSheetExcel().subscribe((response) => {
			saveAs(response,"EmployeeMonthlyAttendance");
        })
	}

}