import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { CrmCustGroupManager } from 'src/app/shared/services/restcontroller/bizservice/crm-cust-group.service';
import { Setupcugrp001mb } from 'src/app/shared/services/restcontroller/entities/Setupcugrp001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-crm-cust-group',
    templateUrl: './crm-cust-group.component.html',
    styleUrls: ['./crm-cust-group.component.css']
})
export class CrmCustGroupComponent implements OnInit {
    custForm: FormGroup | any;
    submitted = false;
    frameworkComponents: any;
    cugrpId: number|any;
    insertUser: string = "";
    insertDatetime: Date | any;
    customergroup: string = "";
    salesPerson: string = "";
    custGrps: Setupcugrp001mb[] = [];
    public gridOptions: GridOptions | any;

    constructor(private crmCustGroupManager: CrmCustGroupManager, 
        private formBuilder: FormBuilder, 
        private calloutService: CalloutService,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent,
        }
    }

    ngOnInit() {
        this.custForm = this.formBuilder.group({
            customergroup: ['', Validators.required],
            salesPerson: ['', Validators.required]
        });

        this.createDataGrid001();
        this.crmCustGroupManager.allcusgrp().subscribe((response) => {
            this.custGrps = deserialize<Setupcugrp001mb[]>(Setupcugrp001mb, response);
            if (this.custGrps.length > 0) {
                this.gridOptions?.api?.setRowData(this.custGrps);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    get f() { return this.custForm.controls; }

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
                headerName: '#ID',
                field: 'cugrpId',
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
                headerName: 'Customer Group',
                field: 'customergroup',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Sales Person',
                field: 'salesPerson',
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
                cellStyle: {textAlign: 'center'},
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
                cellStyle: {textAlign: 'center'},
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
        this.cugrpId = params.data.cugrpId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.custForm.patchValue({
            'customergroup': params.data.customergroup,
            'salesPerson': params.data.salesPerson
        });
    }

    onDeleteButtonClick(params: any) {
        this.crmCustGroupManager.cusgrpdelete(params.data.cugrpId).subscribe((response) => {
            for (let i = 0; i < this.custGrps.length; i++) {
                if (this.custGrps[i].cugrpId == params.data.cugrpId) {
                    this.custGrps?.splice(i, 1);
                    break;
                }
            }
            const selectedRows = params.api.getSelectedRows();
            params.api.applyTransaction({ remove: selectedRows });
            this.gridOptions.api.deselectAll();
            this.calloutService.showSuccess("Order Removed Successfully");
        });
    }

    onAuditButtonClick(params: any) {
        const modalRef = this.modalService.open(AuditComponent);
        modalRef.componentInstance.title = "Customer Sales Group";
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

    onOrderClick(event: any, custForm: any) {
        this.markFormGroupTouched(this.custForm);
        this.submitted = true;
        if (this.custForm.invalid) {
            return;
        }
        let setupcugrp = new Setupcugrp001mb();
        setupcugrp.customergroup = this.f.customergroup.value ? this.f.customergroup.value : "";
        setupcugrp.salesPerson = this.f.salesPerson.value ? this.f.salesPerson.value : "";
        if (this.cugrpId) {
            setupcugrp.cugrpId = this.cugrpId;
            setupcugrp.insertUser = this.insertUser;
            setupcugrp.insertDatetime = this.insertDatetime;
            setupcugrp.updatedUser = this.authManager.getcurrentUser.username;
            setupcugrp.updatedDatetime = new Date();
            this.crmCustGroupManager.cusgrpsave(setupcugrp).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let custg = deserialize<Setupcugrp001mb>(Setupcugrp001mb, response);
                for (let customer of this.custGrps) {
                    if (customer.cugrpId == custg.cugrpId) {
                        customer.customergroup = custg.customergroup;
                        customer.salesPerson = custg.salesPerson;
                        customer.insertUser = this.insertUser;
                        customer.insertDatetime = this.insertDatetime;
                        customer.updatedUser = this.authManager.getcurrentUser.username;
                        customer.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.custGrps);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.custForm.reset();
                this.cugrpId = null;
                this.submitted = false;
            });
        } else {
            setupcugrp.insertUser = this.authManager.getcurrentUser.username;
            setupcugrp.insertDatetime = new Date();
            this.crmCustGroupManager.cusgrpsave(setupcugrp).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let custg = deserialize<Setupcugrp001mb>(Setupcugrp001mb, response);
                this.custGrps.push(custg);
                const newItems = [JSON.parse(JSON.stringify(custg))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.gridOptions.api.deselectAll();
                this.custForm.reset();
                this.submitted = false;
            });
        }
    }

    onReset() {
        this.submitted = false;
        this.custForm.reset();
    }

    onGeneratePdfReport(){
		this.crmCustGroupManager.crmCustGroupPdf().subscribe((response) =>{
            saveAs(response,"GroupDetailsList");

		});
	}

	onGenerateExcelReport(){
		this.crmCustGroupManager.crmCustGroupExcel().subscribe((response) => {
			saveAs(response,"GroupDetailsList");
        })
	}
}