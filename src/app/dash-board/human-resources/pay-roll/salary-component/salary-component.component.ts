import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { HrSalarycomponentManager } from 'src/app/shared/services/restcontroller/bizservice/hr-salary-comp.service';
import { Salarycomponent001mb } from 'src/app/shared/services/restcontroller/entities/Salarycomponent001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-salary-component',
    templateUrl: './salary-component.component.html',
    styleUrls: ['./salary-component.component.css']
})

export class SalaryComponentComponent implements OnInit {

    frameworkComponents: any;
    submitted = false;
    componentForm: FormGroup | any;
    salcompId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    comName: string | null = "";
    abbr: string | null = "";
    salaryComponent: Salarycomponent001mb[] = [];
    public gridOptions: GridOptions | any;

    constructor(private salcomponentManager: HrSalarycomponentManager, 
        private calloutService: CalloutService, 
        private formBuilder: FormBuilder, 
        datePipe: DatePipe,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent
        }
    }
    ngOnInit() {
        this.componentForm = this.formBuilder.group({
            comName: ['', Validators.required],
            abbr: ['', Validators.required],
        })
        this.createDataGrid001();
        this.salcomponentManager.allcomponent().subscribe((response) => {
            this.salaryComponent = deserialize<Salarycomponent001mb[]>(Salarycomponent001mb, response);
            if (this.salaryComponent.length > 0) {
                this.gridOptions?.api?.setRowData(this.salaryComponent);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }
    get f() { return this.componentForm.controls; }
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
                field: 'salcompId',
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
                headerName: 'Component',
                field: 'comName',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Abbreviations',
                field: 'abbr',
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
                },
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
        this.salcompId = params.data.salcompId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.componentForm.patchValue({
            'comName': params.data.comName,
            'abbr': params.data.abbr,
        })
    }

    onDeleteButtonClick(params: any) {
        this.salcomponentManager.deletecomponent(params.data.salcompId).subscribe((response) => {
            for (let i = 0; i < this.salaryComponent.length; i++) {
                if (this.salaryComponent[i].salcompId == params.data.salcompId) {
                    this.salaryComponent?.splice(i, 1);
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
        modalRef.componentInstance.title = "Salary Component";
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

    onOrderClick(event: any, component: any) {
        this.markFormGroupTouched(this.componentForm);
        this.submitted = true;

        // stop here if form is invalid
        if (this.componentForm.invalid) {
            return;
        }
        let salarycomponent001mb = new Salarycomponent001mb();
        salarycomponent001mb.comName = this.f.comName.value ? this.f.comName.value : "";
        salarycomponent001mb.abbr = this.f.abbr.value ? this.f.abbr.value : "";
        if (this.salcompId) {
            salarycomponent001mb.salcompId = this.salcompId;
            salarycomponent001mb.insertUser = this.insertUser;
            salarycomponent001mb.insertDatetime = this.insertDatetime;
            salarycomponent001mb.updatedUser = this.authManager.getcurrentUser.username;
            salarycomponent001mb.updatedDatetime = new Date();
            this.salcomponentManager.updatecomponent(salarycomponent001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let salcomponentres = deserialize<Salarycomponent001mb>(Salarycomponent001mb, response);
                for (let salarycomp of this.salaryComponent) {
                    if (salarycomp.salcompId == salcomponentres.salcompId) {
                        salarycomp.comName = salcomponentres.comName;
                        salarycomp.abbr = salcomponentres.abbr;
                        salarycomp.insertUser = this.insertUser;
                        salarycomp.insertDatetime = this.insertDatetime;
                        salarycomp.updatedUser = this.authManager.getcurrentUser.username;
                        salarycomp.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.salaryComponent);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.componentForm.reset();
                this.submitted = false;
                this.salcompId = null;
            })
        }
        else {
            salarycomponent001mb.insertUser = this.authManager.getcurrentUser.username;
            salarycomponent001mb.insertDatetime = new Date();
            this.salcomponentManager.savecomponent(salarycomponent001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let salarycomp = deserialize<Salarycomponent001mb>(Salarycomponent001mb, response);
                this.salaryComponent.push(salarycomp);
                const newItems = [JSON.parse(JSON.stringify(salarycomp))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.componentForm.reset();
                this.submitted = false;
            })
        }
    }
    onReset() {
        this.componentForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.salcomponentManager.salcomponentPdf().subscribe((response) =>{
            saveAs(response,"SalaryComponents");

		});
	}

	onGenerateExcelReport(){
		this.salcomponentManager.salcomponentExcel().subscribe((response) => {
			saveAs(response,"SalaryComponents");
        })
	}
}


