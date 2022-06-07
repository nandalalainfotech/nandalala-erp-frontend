import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { payRollrManager } from 'src/app/shared/services/restcontroller/bizservice/hr-payrolls.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Payroll001mb } from 'src/app/shared/services/restcontroller/entities/Payroll001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-pay-rolls',
    templateUrl: './pay-rolls.component.html',
    styleUrls: ['./pay-rolls.component.css']
})
export class PayRollsComponent implements OnInit {

    frameworkComponents: any;
    prId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    submitted = false;
    PayRollsForm: FormGroup | any;
    name: string = "Recruit.OfferLetter";
    type: string = "OfferLetter";
    emplyname: string = "dummy.status";
    emplytype: string = "dummy";
    fiscalname: string = "year.status";
    fiscaltype: string = "year";
    status: string = "";
    fiscalYear: number | any;
    salarySlip: string = "";
    empName: string | null = "";
    payRoll: Payroll001mb[] = [];
    systemproperties?: Systemproperties001mb[] = [];
    esystemproperties?: Systemproperties001mb[] = [];
    vsystemproperties?: Systemproperties001mb[] = [];
    public gridOptions: GridOptions | any;

    constructor(private systemPropertiesService: SystemPropertiesService, 
        private payrollrManager: payRollrManager, 
        private calloutService: CalloutService, 
        private formBuilder: FormBuilder,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent
        }
    }
    ngOnInit() {
        this.PayRollsForm = this.formBuilder.group({
            status: ['', Validators.required],
            fiscalYear: ['', Validators.required],
            salarySlip: ['', Validators.required],
            empName: ['', Validators.required],
        })
        this.createDataGrid001();
        this.systemPropertiesService.system(this.name, this.type).subscribe(response => {
            this.systemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        });
        this.systemPropertiesService.system(this.fiscalname, this.fiscaltype).subscribe(response => {
            this.esystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        });
        this.systemPropertiesService.system(this.emplyname, this.emplytype).subscribe(response => {
            this.vsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        });
        this.payrollrManager.allpayroll().subscribe((response) => {
            this.payRoll = deserialize<Payroll001mb[]>(Payroll001mb, response);
            if (this.payRoll.length > 0) {
                this.gridOptions?.api?.setRowData(this.payRoll);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }
    get f() { return this.PayRollsForm.controls; }

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
                field: 'prId',
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
                headerName: 'Status',
                field: 'status',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Fiscal Year',
                field: 'fiscalYear',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Employee',
                field: 'empName',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Salary Slip',
                field: 'salarySlip',
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
                width: 100,
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
                width: 100,
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
                width: 100,
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
        this.prId = params.data.prId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.PayRollsForm.patchValue({
            'status': params.data.status,
            'fiscalYear': params.data.fiscalYear,
            'empName': params.data.empName,
            'salarySlip': params.data.salarySlip,
        })
    }

    onDeleteButtonClick(params: any) {
        this.payrollrManager.deletepayroll(params.data.prId).subscribe((response) => {
            for (let i = 0; i < this.payRoll.length; i++) {
                if (this.payRoll[i].prId == params.data.prId) {
                    this.payRoll?.splice(i, 1);
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
        modalRef.componentInstance.title = "Pay Roll";
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

    onOrderClick(event: any, PayRolls: any) {
        this.markFormGroupTouched(this.PayRollsForm);
        this.submitted = true;

        // stop here if form is invalid
        if (this.PayRollsForm.invalid) {
            return;
        }
        let payroll001mb = new Payroll001mb();
        payroll001mb.status = this.f.status.value ? this.f.status.value : "";
        payroll001mb.fiscalYear = this.f.fiscalYear.value ? this.f.fiscalYear.value : 2021;
        payroll001mb.salarySlip = this.f.salarySlip.value ? this.f.salarySlip.value : "";
        payroll001mb.empName = this.f.empName.value ? this.f.empName.value : "";
        if (this.prId) {
            payroll001mb.prId = this.prId;
            payroll001mb.insertUser = this.insertUser;
            payroll001mb.insertDatetime = this.insertDatetime;
            payroll001mb.updatedUser = this.authManager.getcurrentUser.username;
            payroll001mb.updatedDatetime = new Date();
            this.payrollrManager.updatepayroll(payroll001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let payrollres = deserialize<Payroll001mb>(Payroll001mb, response);
                for (let payr of this.payRoll) {
                    if (payr.prId == payrollres.prId) {
                        payr.status = payrollres.status;
                        payr.fiscalYear = payrollres.fiscalYear;
                        payr.empName = payrollres.empName;
                        payr.salarySlip = payrollres.salarySlip;
                        payr.insertUser = this.insertUser;
                        payr.insertDatetime = this.insertDatetime;
                        payr.updatedUser = this.authManager.getcurrentUser.username;
                        payr.updatedDatetime = new Date();

                    }
                }
                this.gridOptions.api.setRowData(this.payRoll);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.PayRollsForm.reset();
                this.submitted = false;
                this.prId = null;
            })
        }
        else {
            payroll001mb.insertUser = this.authManager.getcurrentUser.username;
            payroll001mb.insertDatetime = new Date();
            this.payrollrManager.savepayroll(payroll001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let pay = deserialize<Payroll001mb>(Payroll001mb, response);
                this.payRoll.push(pay);
                const newItems = [JSON.parse(JSON.stringify(pay))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.PayRollsForm.reset();
                this.submitted = false;
            })
        }
    }
    onReset() {
        this.PayRollsForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.payrollrManager.payrollrPdf().subscribe((response) =>{
            saveAs(response,"PayRollList");

		});
	}

	onGenerateExcelReport(){
		this.payrollrManager.payrollrExcel().subscribe((response) => {
			saveAs(response,"PayRollList");
        })
	}
}


