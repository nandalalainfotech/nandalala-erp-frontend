import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { CrmSalesCustomerManager } from 'src/app/shared/services/restcontroller/bizservice/crm-sales-customer.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Crmspcust001mb } from 'src/app/shared/services/restcontroller/entities/Crmspcust001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

    CustomersForm: FormGroup | any;
    submitted = false;

    frameworkComponents: any;
    custId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    name: string = "crms.status";
    type: string = "status";
    gname: string = "dummy.status";
    gtype: string = "dummy";
    customername: string = "";
    status: string | null = "";
    customergroup: string | null = "";
    crmspCust: Crmspcust001mb[] = [];
    systemproperties?: Systemproperties001mb[] = [];
    vsystemproperties?: Systemproperties001mb[] = [];
    public gridOptions: GridOptions | any;

    constructor(private systemPropertiesService: SystemPropertiesService,
        private crmSalesCustomerManager: CrmSalesCustomerManager,
        private calloutService: CalloutService, 
        private formBuilder: FormBuilder,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent
        }
    }

    ngOnInit() {

        this.CustomersForm = this.formBuilder.group({
            customername: ['', Validators.required],
            status: ['', Validators.required],
            customergroup: ['', Validators.required],
        });


        this.createDataGrid001();
        this.systemPropertiesService.system(this.name, this.type).subscribe(response => {
            this.systemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        });
        this.systemPropertiesService.system(this.gname, this.gtype).subscribe(response => {
            this.vsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        });
        this.crmSalesCustomerManager.allcustomersale().subscribe(response => {
            this.crmspCust = deserialize<Crmspcust001mb[]>(Crmspcust001mb, response);
            if (this.crmspCust.length > 0) {
                this.gridOptions?.api?.setRowData(this.crmspCust);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    get f() { return this.CustomersForm.controls; }

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
                field: 'custId',
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
                headerName: 'Customer Name',
                field: 'customername',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
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

        this.custId = params.data.custId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.CustomersForm.patchValue({

            'customername': params.data.customername,
            'customergroup': params.data.customergroup,
            'status': params.data.status,
        })
    }

    onDeleteButtonClick(params: any) {
        this.crmSalesCustomerManager.deletecustomersale(params.data.custId).subscribe((response) => {
            for (let i = 0; i < this.crmspCust.length; i++) {
                if (this.crmspCust[i].custId == params.data.custId) {
                    this.crmspCust?.splice(i, 1);
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
        modalRef.componentInstance.title = "Customer";
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

    onOrderClick(event: any, CustomersForm: any) {

        this.markFormGroupTouched(this.CustomersForm);
        this.submitted = true;
        if (this.CustomersForm.invalid) {
            return;
        }
        let crmspcust001mb = new Crmspcust001mb();
        crmspcust001mb.customername = this.f.customername.value ? this.f.customername.value : "";
        crmspcust001mb.status = this.f.status.value ? this.f.status.value : "";
        crmspcust001mb.customergroup = this.f.customergroup.value ? this.f.customergroup.value : "";
        if (this.custId) {
            crmspcust001mb.custId = this.custId;
            crmspcust001mb.insertUser = this.insertUser;
            crmspcust001mb.insertDatetime = this.insertDatetime;
            crmspcust001mb.updatedUser = this.authManager.getcurrentUser.username;
            crmspcust001mb.updatedDatetime = new Date();
            this.crmSalesCustomerManager.updatecustomersale(crmspcust001mb).subscribe(response => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let sale = deserialize<Crmspcust001mb>(Crmspcust001mb, response);
                for (let custom of this.crmspCust) {
                    if (custom.custId == sale.custId) {
                        custom.customername = sale.customername;
                        custom.status = sale.status;
                        custom.customergroup = sale.customergroup;
                        custom.insertUser = this.insertUser;
                        custom.insertDatetime = this.insertDatetime;
                        custom.updatedUser = this.authManager.getcurrentUser.username;
                        custom.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.crmspCust);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.CustomersForm.reset();
                this.custId = null;
                this.submitted = false;
            })
        }
        else {
            crmspcust001mb.insertUser = this.authManager.getcurrentUser.username;
            crmspcust001mb.insertDatetime = new Date();
            this.crmSalesCustomerManager.savecustomersale(crmspcust001mb).subscribe(response => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let sale = deserialize<Crmspcust001mb>(Crmspcust001mb, response);
                this.crmspCust?.push(sale);
                const newItems = [JSON.parse(JSON.stringify(sale))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.CustomersForm.reset();
                this.submitted = false;
            })
        }
    }
    onReset() {
        this.CustomersForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.crmSalesCustomerManager.crmSalesCustomerPdf().subscribe((response) =>{
            saveAs(response,"CustomerDetailsList");

		});
	}

	onGenerateExcelReport(){
		this.crmSalesCustomerManager.crmSalesCustomerExcel().subscribe((response) => {
			saveAs(response,"CustomerDetailsList");
        })
	}
}

