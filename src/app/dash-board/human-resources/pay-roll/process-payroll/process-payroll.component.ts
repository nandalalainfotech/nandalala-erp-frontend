import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { ProcessprManager } from 'src/app/shared/services/restcontroller/bizservice/hr-process-payroll.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Processpr001mb } from 'src/app/shared/services/restcontroller/entities/Processpr001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-process-payroll',
    templateUrl: './process-payroll.component.html',
    styleUrls: ['./process-payroll.component.css']
})

export class ProcessPayrollComponent implements OnInit {
  

    frameworkComponents: any;
    processId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    submitted = false;
    processForm: FormGroup | any;
    name: string = "year.status";
    type: string = "year";
    companyname: string = "processpr.month";
    companytype: string = "month";
    cname: string = "dummy.status";
    ctype: string = "dummy";
    hname: string = "dummy.status";
    htype: string = "dummy";
    year: number | any;
    month: number | any;
    postingDate!: Date | null;
    deptName: string | null = "";
    empCompany: string | null = "";
    processPr: Processpr001mb[] = [];
    systemproperties?: Systemproperties001mb[] = [];
    esystemproperties?: Systemproperties001mb[] = [];
    hsystemproperties?: Systemproperties001mb[] = [];
    osystemproperties?: Systemproperties001mb[] = [];
    public gridOptions: GridOptions | any;

    constructor(private systemPropertiesService: SystemPropertiesService, 
        private processprManager: ProcessprManager, 
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
        this.processForm = this.formBuilder.group({
            year: ['', Validators.required],
            month: ['', Validators.required],
            postingDate: ['', Validators.required],
            deptName: ['', Validators.required],
            empCompany: ['', Validators.required],
        })
        this.systemPropertiesService.system(this.name, this.type).subscribe(response => {
            this.systemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        });
        this.systemPropertiesService.system(this.companyname, this.companytype).subscribe(response => {
            this.esystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        });
        this.systemPropertiesService.system(this.cname, this.ctype).subscribe(response => {
            this.hsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        });
        this.systemPropertiesService.system(this.hname, this.htype).subscribe(response => {
            this.osystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        });
        this.processprManager.allprocess().subscribe((response) => {
            this.processPr = deserialize<Processpr001mb[]>(Processpr001mb, response);
            if (this.processPr.length > 0) {
                this.gridOptions?.api?.setRowData(this.processPr);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }
    get f() { return this.processForm.controls; }
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
                field: 'processId',
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
                headerName: 'Year',
                field: 'year',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Month',
                field: 'month',
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
        this.processId = params.data.processId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.processForm.patchValue({
            'year': params.data.year,
            'month': params.data.month,
            'postingDate': this.datePipe.transform(params.data.postingDate, 'MM/dd/yyyy'),
            'empCompany': params.data.empCompany,
            'deptName': params.data.deptName,
        })
    }

    onDeleteButtonClick(params: any) {
        this.processprManager.deleteprocess(params.data.processId).subscribe((response) => {
            for (let i = 0; i < this.processPr.length; i++) {
                if (this.processPr[i].processId == params.data.processId) {
                    this.processPr?.splice(i, 1);
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
        modalRef.componentInstance.title = "Process PayRoll";
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

    onOrderClick(event: any, process: any) {
        this.markFormGroupTouched(this.processForm);
        this.submitted = true;

        // stop here if form is invalid
        if (this.processForm.invalid) {
            return;
        }
        let processpr001mb = new Processpr001mb();
        processpr001mb.year = this.f.year.value ? this.f.year.value : 2021;
        processpr001mb.month = this.f.month.value ? this.f.month.value : 6;
        processpr001mb.postingDate = new Date(this.f.postingDate.value);
        processpr001mb.deptName = this.f.deptName.value ? this.f.deptName.value : "";
        processpr001mb.empCompany = this.f.empCompany.value ? this.f.empCompany.value : "";
        if (this.processId) {
            processpr001mb.processId = this.processId;
            processpr001mb.insertUser = this.insertUser;
            processpr001mb.insertDatetime = this.insertDatetime;
            processpr001mb.updatedUser = this.authManager.getcurrentUser.username;
            processpr001mb.updatedDatetime = new Date();
            this.processprManager.updateprocess(processpr001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let prpayrollres = deserialize<Processpr001mb>(Processpr001mb, response);
                for (let prpayroll of this.processPr) {
                    if (prpayroll.processId == prpayrollres.processId) {
                        prpayroll.year = prpayrollres.year;
                        prpayroll.month = prpayrollres.month;
                        prpayroll.postingDate = prpayrollres.postingDate;
                        prpayroll.deptName = prpayrollres.deptName;
                        prpayroll.empCompany = prpayrollres.empCompany;
                        prpayroll.insertUser = this.insertUser;
                        prpayroll.insertDatetime = this.insertDatetime;
                        prpayroll.updatedUser = this.authManager.getcurrentUser.username;
                        prpayroll.updatedDatetime = new Date();

                    }
                }
                this.gridOptions.api.setRowData(this.processPr);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.processForm.reset();
                this.submitted = false;
                this.processId = null;
            })
        }
        else {
            processpr001mb.insertUser = this.authManager.getcurrentUser.username;
            processpr001mb.insertDatetime = new Date();
            this.processprManager.saveprocess(processpr001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let processprs = deserialize<Processpr001mb>(Processpr001mb, response);
                this.processPr.push(processprs);
                const newItems = [JSON.parse(JSON.stringify(processprs))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.processForm.reset();
                this.submitted = false;
            })
        }
    }
    onReset() {
        this.processForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.processprManager.processprPdf().subscribe((response) =>{
            saveAs(response,"MakeNewPayRoll");

		});
	}

	onGenerateExcelReport(){
		this.processprManager.processprExcel().subscribe((response) => {
			saveAs(response,"MakeNewPayRoll");
        })
	}
}


