import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { SalStructureManager } from 'src/app/shared/services/restcontroller/bizservice/hr-sal-structure.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Salarystructure001mb } from 'src/app/shared/services/restcontroller/entities/Salarystructure001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-salary-structure',
    templateUrl: './salary-structure.component.html',
    styleUrls: ['./salary-structure.component.css']
})

export class SalaryStructureComponent implements OnInit {

    frameworkComponents: any;
    strId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    submitted = false;
    salaryForm: FormGroup | any;
    name: string = "dummy.status";
    type: string = "dummy";
    salaryname: string = "salary.mode";
    salarytype: string = "mode";
    empName: string | null = "";
    isActive: string = "";
    fromDate!: Date | null;
    salaryStructure: Salarystructure001mb[] = [];
    systemproperties?: Systemproperties001mb[] = [];
    salsystemproperties?: Systemproperties001mb[] = [];
    public gridOptions: GridOptions | any;

    constructor(private systemPropertiesService: SystemPropertiesService, 
        private salstructureManager: SalStructureManager, 
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
        this.salaryForm = this.formBuilder.group({
            empName: ['', Validators.required],
            isActive: ['', Validators.required],
            fromDate: ['', Validators.required],
        })
        this.createDataGrid001();
        this.systemPropertiesService.system(this.name, this.type).subscribe(response => {
            this.systemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        });
        this.systemPropertiesService.system(this.salaryname, this.salarytype).subscribe(response => {
            this.salsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        });
        this.salstructureManager.allsalary().subscribe((response) => {
            this.salaryStructure = deserialize<Salarystructure001mb[]>(Salarystructure001mb, response);
            if (this.salaryStructure.length > 0) {
                this.gridOptions?.api?.setRowData(this.salaryStructure);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }
    get f() { return this.salaryForm.controls; }

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
                field: 'strId',
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
                headerName: 'Is Active',
                field: 'isActive',
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
                headerName: 'Edit',
                cellRenderer: 'iconRenderer',
                width: 50,
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
                width: 85,
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
        this.strId = params.data.strId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.salaryForm.patchValue({
            'empName': params.data.empName,
            'isActive': params.data.isActive,
            'fromDate': this.datePipe.transform(params.data.fromDate, 'MM/dd/yyyy'),
        })
    }

    onDeleteButtonClick(params: any) {
        this.salstructureManager.deletesalary(params.data.strId).subscribe((response) => {
            for (let i = 0; i < this.salaryStructure.length; i++) {
                if (this.salaryStructure[i].strId == params.data.strId) {
                    this.salaryStructure?.splice(i, 1);
                    break;
                }
            }
            const selectedRows = params.api.getSelectedRows();
            params.api.applyTransaction({ remove: selectedRows });
            this.gridOptions.api.deselectAll();
            this.calloutService.showSuccess("Order Removed Successfully");

        })
    }

    onAuditButtonClick(params: any) {
        const modalRef = this.modalService.open(AuditComponent);
        modalRef.componentInstance.title = "Salary Structure";
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

    onOrderClick(event: any, salary: any) {
        this.markFormGroupTouched(this.salaryForm);
        this.submitted = true;

        // stop here if form is invalid
        if (this.salaryForm.invalid) {
            return;
        }
        let salarystructure001mb = new Salarystructure001mb();
        salarystructure001mb.empName = this.f.empName.value ? this.f.empName.value : "";
        salarystructure001mb.isActive = this.f.isActive.value ? this.f.isActive.value : "";
        salarystructure001mb.fromDate = new Date(this.f.fromDate.value);
        if (this.strId) {
            salarystructure001mb.strId = this.strId;
            salarystructure001mb.insertUser = this.insertUser;
            salarystructure001mb.insertDatetime = this.insertDatetime;
            salarystructure001mb.updatedUser = this.authManager.getcurrentUser.username;
            salarystructure001mb.updatedDatetime = new Date();
            this.salstructureManager.updatesalary(salarystructure001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let salstructureres = deserialize<Salarystructure001mb>(Salarystructure001mb, response);
                for (let salaryst of this.salaryStructure) {
                    if (salaryst.strId == salstructureres.strId) {
                        salaryst.empName = salstructureres.empName;
                        salaryst.isActive = salstructureres.isActive;
                        salaryst.fromDate = salstructureres.fromDate;
                        salaryst.insertUser = this.insertUser;
                        salaryst.insertDatetime = this.insertDatetime;
                        salaryst.updatedUser = this.authManager.getcurrentUser.username;
                        salaryst.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.salaryStructure);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.salaryForm.reset();
                this.submitted = false;
                this.strId = null;
            })
        }
        else {
            salarystructure001mb.insertUser = this.authManager.getcurrentUser.username;
            salarystructure001mb.insertDatetime = new Date();
            this.salstructureManager.savesalary(salarystructure001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let salarys = deserialize<Salarystructure001mb>(Salarystructure001mb, response);
                this.salaryStructure.push(salarys);
                const newItems = [JSON.parse(JSON.stringify(salarys))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.salaryForm.reset();
                this.submitted = false;
            })
        }
    }
    onReset() {
        this.salaryForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.salstructureManager.salstructurePdf().subscribe((response) =>{
            saveAs(response,"SalaryStructure");

		});
	}

	onGenerateExcelReport(){
		this.salstructureManager.salstructureExcel().subscribe((response) => {
			saveAs(response,"SalaryStructure");
        })
	}
}


