import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { EmployeeSalesRegisterManager } from 'src/app/shared/services/restcontroller/bizservice/emp-sales-register.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Empsalaryregister001mb } from 'src/app/shared/services/restcontroller/entities/Empsalaryregister001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-emp-sales-register',
    templateUrl: './emp-sales-register.component.html',
    styleUrls: ['./emp-sales-register.component.css']
})

export class EmpSalesRegisterComponent implements OnInit {

    frameworkComponents: any;
    saleForm: FormGroup | any;
    esregId: number | any;
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
    designname: string = "Dummy.status";
    designtype: string = "dummy";
    monthname: string = "month.name";
    monthtype: string = "name";
    yearname: string = "Year.status";
    yeartype: string = "year";
    salslipCode: string | null = "";
    empNumber: string | null = "";
    empName: string | null = "";
    deptName: string | null = "";
    branch: string | null = "";
    empCompany: string | null = "";
    empDesign: string | null = "";
    salarymonth: string | null = "";
    salYear: string | null = "";
    lvwoutPay: number | any;
    paymentDays: string | null = "";
    incomeTax: number | any;
    basic: string | null = "";
    arrearAmt: number | any;
    lvencashAmt: number | any;
    grossPay: number | any;
    totalDeduct: string | null = "";
    netPay: number | any;
    submitted = false;
    public gridOptions: GridOptions | any;
    empSales: Empsalaryregister001mb[] = [];
    numsystemproperties?: Systemproperties001mb[] = [];
    empsystemproperties?: Systemproperties001mb[] = [];
    depsystemproperties?: Systemproperties001mb[] = [];
    branchsystemproperties?: Systemproperties001mb[] = [];
    companysystemproperties?: Systemproperties001mb[] = [];
    designsystemproperties?: Systemproperties001mb[] = [];
    monthsystemproperties?: Systemproperties001mb[] = [];
    yearsystemproperties?: Systemproperties001mb[] = [];


    constructor(private systemPropertiesService: SystemPropertiesService,
        private employeeSalesRegisterManager: EmployeeSalesRegisterManager,
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
        this.saleForm = this.formBuilder.group({
            salslipCode: ['', Validators.required],
            empNumber: ['', Validators.required],
            empName: ['', Validators.required],
            deptName: ['', Validators.required],
            branch: ['', Validators.required],
            empCompany: ['', Validators.required],
            empDesign: ['', Validators.required],
            salarymonth: ['', Validators.required],
            salYear: ['', Validators.required],
            lvwoutPay: ['', Validators.required],
            paymentDays: ['', Validators.required],
            incomeTax: ['', Validators.required],
            basic: ['', Validators.required],
            arrearAmt: ['', Validators.required],
            lvencashAmt: ['', Validators.required],
            grossPay: ['', Validators.required],
            totalDeduct: ['', Validators.required],
            netPay: ['', Validators.required]
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
            this.systemPropertiesService.system(this.designname, this.designtype,).subscribe(response => {
                this.designsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
            }),
            this.systemPropertiesService.system(this.monthname, this.monthtype,).subscribe(response => {
                this.monthsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
            }),
            this.systemPropertiesService.system(this.yearname, this.yeartype,).subscribe(response => {
                this.yearsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
            }),
            this.employeeSalesRegisterManager.allempsales().subscribe(response => {
                this.empSales = deserialize<Empsalaryregister001mb[]>(Empsalaryregister001mb, response);
                if (this.empSales.length > 0) {
                    this.gridOptions?.api?.setRowData(this.empSales);
                } else {
                    this.gridOptions?.api?.setRowData([]);
                }
            })
    }

    get f() { return this.saleForm.controls }

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
                field: 'esregId',
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
                headerName: 'Salary Slip',
                field: 'salslipCode',
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
                field: 'empCompany',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Company',
                field: 'empDesign',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Salary Month',
                field: 'salarymonth',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Salary Year',
                field: 'salYear',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Leave without pay',
                field: 'lvwoutPay',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Payment Days',
                field: 'paymentDays',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Income Tax',
                field: 'incomeTax',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Basic',
                field: 'basic',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Arrear Amount',
                field: 'arrearAmt',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Leave Encashment Amount',
                field: 'lvencashAmt',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Gross Pay',
                field: 'grossPay',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Total Deduction',
                field: 'totalDeduct',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Net Pay',
                field: 'netPay',
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
                width: 155,
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
                width: 155,
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
        this.esregId = params.data.esregId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.saleForm.patchValue({
            'salslipCode': params.data.salslipCode,
            'empNumber': params.data.empNumber,
            'empName': params.data.empName,
            'deptName': params.data.deptName,
            'branch': params.data.branch,
            'empCompany': params.data.empCompany,
            'empDesign': params.data.empDesign,
            'salarymonth': params.data.salarymonth,
            'salYear': params.data.salYear,
            'lvwoutPay': params.data.lvwoutPay,
            'paymentDays': params.data.paymentDays,
            'incomeTax': params.data.incomeTax,
            'basic': params.data.basic,
            'arrearAmt': params.data.arrearAmt,
            'lvencashAmt': params.data.lvencashAmt,
            'grossPay': params.data.grossPay,
            'totalDeduct': params.data.totalDeduct,
            'netPay': params.data.netPay
        });
    }

    onDeleteButtonClick(params: any) {
        this.employeeSalesRegisterManager.deleteempsales(params.data.esregId).subscribe(response => {
            for (let i = 0; i < this.empSales.length; i++) {
                if (this.empSales[i].esregId == params.data.esregId) {
                    this.empSales?.splice(i, 1);
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
        modalRef.componentInstance.title = "Employee Sales Register";
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


    onOrderClick(event: any, saleForm: any) {
        this.markFormGroupTouched(this.saleForm);
        this.submitted = true;
        if (this.saleForm.invalid) {
            return;
        }
        let empsalaryregister001mb = new Empsalaryregister001mb();
        empsalaryregister001mb.salslipCode = this.f.salslipCode.value ? this.f.salslipCode.value : "";
        empsalaryregister001mb.empNumber = this.f.empNumber.value ? this.f.empNumber.value : "";
        empsalaryregister001mb.empName = this.f.empName.value ? this.f.empName.value : "";
        empsalaryregister001mb.deptName = this.f.deptName.value ? this.f.deptName.value : "";
        empsalaryregister001mb.branch = this.f.branch.value ? this.f.branch.value : "";
        empsalaryregister001mb.empCompany = this.f.empCompany.value ? this.f.empCompany.value : "";
        empsalaryregister001mb.empDesign = this.f.empDesign.value ? this.f.empDesign.value : "";
        empsalaryregister001mb.salarymonth = this.f.salarymonth.value ? this.f.salarymonth.value : "";
        empsalaryregister001mb.salYear = this.f.salYear.value ? this.f.salYear.value : "";
        empsalaryregister001mb.lvwoutPay = this.f.lvwoutPay.value ? this.f.lvwoutPay.value : null;
        empsalaryregister001mb.paymentDays = this.f.paymentDays.value ? this.f.paymentDays.value : "";
        empsalaryregister001mb.incomeTax = this.f.incomeTax.value ? this.f.incomeTax.value : null;
        empsalaryregister001mb.basic = this.f.basic.value ? this.f.basic.value : "";
        empsalaryregister001mb.arrearAmt = this.f.arrearAmt.value ? this.f.arrearAmt.value : null;
        empsalaryregister001mb.lvencashAmt = this.f.lvencashAmt.value ? this.f.lvencashAmt.value : null;
        empsalaryregister001mb.grossPay = this.f.grossPay.value ? this.f.grossPay.value : null;
        empsalaryregister001mb.totalDeduct = this.f.totalDeduct.value ? this.f.totalDeduct.value : "";
        empsalaryregister001mb.netPay = this.f.netPay.value ? this.f.netPay.value : null;
        if (this.esregId) {
            empsalaryregister001mb.esregId = this.esregId;
            empsalaryregister001mb.insertUser = this.insertUser;
            empsalaryregister001mb.insertDatetime = this.insertDatetime;
            empsalaryregister001mb.updatedUser = this.authManager.getcurrentUser.username;
            empsalaryregister001mb.updatedDatetime = new Date();
            this.employeeSalesRegisterManager.updateempsales(empsalaryregister001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let sales = deserialize<Empsalaryregister001mb>(Empsalaryregister001mb, response);
                for (let employeesalesregister of this.empSales) {
                    if (employeesalesregister.esregId == sales.esregId) {
                        employeesalesregister.salslipCode = sales.salslipCode;
                        employeesalesregister.empNumber = sales.empNumber;
                        employeesalesregister.empName = sales.empName;
                        employeesalesregister.deptName = sales.deptName;
                        employeesalesregister.deptName = sales.deptName;
                        employeesalesregister.branch = sales.branch;
                        employeesalesregister.empCompany = sales.empCompany;
                        employeesalesregister.empDesign = sales.empDesign;
                        employeesalesregister.salarymonth = sales.salarymonth;
                        employeesalesregister.salYear = sales.salYear;
                        employeesalesregister.lvwoutPay = sales.lvwoutPay;
                        employeesalesregister.paymentDays = sales.paymentDays
                        employeesalesregister.incomeTax = sales.incomeTax
                        employeesalesregister.basic = sales.basic;
                        employeesalesregister.arrearAmt = sales.arrearAmt;
                        employeesalesregister.lvencashAmt = sales.lvencashAmt;
                        employeesalesregister.grossPay = sales.grossPay;
                        employeesalesregister.totalDeduct = sales.totalDeduct;
                        employeesalesregister.netPay = sales.netPay;
                        employeesalesregister.insertUser = this.insertUser;
                        employeesalesregister.insertDatetime = this.insertDatetime;
                        employeesalesregister.updatedUser = this.authManager.getcurrentUser.username;
                        employeesalesregister.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.empSales);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.saleForm.reset();
                this.submitted = false;
                this.esregId = null;
            });
        }
        else {
            empsalaryregister001mb.insertUser = this.authManager.getcurrentUser.username;
            empsalaryregister001mb.insertDatetime = new Date();
            this.employeeSalesRegisterManager.saveempsales(empsalaryregister001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let sales = deserialize<Empsalaryregister001mb>(Empsalaryregister001mb, response);
                this.empSales?.push(sales);
                const newItems = [JSON.parse(JSON.stringify(sales))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.gridOptions.api.deselectAll();
                this.saleForm.reset();
                this.submitted = false;
            });
        }
    }

    onReset() {
        this.saleForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport() {
		this.employeeSalesRegisterManager.employeeSalesRegisterPdf().subscribe((response) => {
			saveAs(response, "EmployeeSalaryRegisterList");

		});
	}

	onGenerateExcelReport() {
		this.employeeSalesRegisterManager.employeeSalesRegisterExcel().subscribe((response) => {
			saveAs(response, "EmployeeSalaryRegisterList");
		});
	}
}