import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { CustomerLoyaltyManager } from 'src/app/shared/services/restcontroller/bizservice/customer-acqustion-loyalty.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Customeracquisition001mb } from 'src/app/shared/services/restcontroller/entities/Customeracquisition001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-customer-ac-lo',
    templateUrl: './customer-ac-lo.component.html',
    styleUrls: ['./customer-ac-lo.component.css']
})
export class CustomerAcLoComponent implements OnInit {

    frameworkComponents: any;
    custacloyForm: FormGroup | any;
    id: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    year: number | any;
    month: string = "";
    newcustomers: number | undefined;
    repeatcustomers: number | undefined;
    total: number | undefined;
    newcustomersrevenue: number | any;
    repeatcustomersrevenue: number | any;
    totalrevenue: number | any;
    submitted = false;
    cusAcLoy: Customeracquisition001mb[] = [];
    public gridOptions: GridOptions | any;

    constructor(private customerLoyaltyManager: CustomerLoyaltyManager,
        private systemPropertiesService: SystemPropertiesService,
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
        this.custacloyForm = this.formBuilder.group({
            year: ['', Validators.required],
            month: ['', Validators.required],
            newcustomers: ['', Validators.required],
            repeatcustomers: ['', Validators.required],
            total: ['', Validators.required],
            newcustomersrevenue: ['', Validators.required],
            repeatcustomersrevenue: ['', Validators.required],
            totalrevenue: ['', Validators.required]
        })
        this.customerLoyaltyManager.allcustomerloyal().subscribe(response => {
            this.cusAcLoy = deserialize<Customeracquisition001mb[]>(Customeracquisition001mb, response);
            if (this.cusAcLoy.length > 0) {
                this.gridOptions?.api?.setRowData(this.cusAcLoy);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    get f() { return this.custacloyForm.controls }

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
                headerName: 'S No',
                field: 'id',
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
                headerName: 'New Customers',
                field: 'newcustomers',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },

            {
                headerName: 'Repeat Customers',
                field: 'repeatcustomers',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },

            {
                headerName: 'Total',
                field: 'total',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'New Customer Revenue',
                field: 'newcustomersrevenue',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Repeat Customer Revenue',
                field: 'repeatcustomersrevenue',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Total Revenue',
                field: 'totalrevenue',
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
                width: 200,
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
                width: 200,
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
                width: 200,
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
        this.id = params.data.id;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.custacloyForm.patchValue({
            'year': params.data.year,
            'month': params.data.month,
            'newcustomers': params.data.newcustomers,
            'repeatcustomers': params.data.repeatcustomers,
            'total': params.data.total,
            'newcustomersrevenue': params.data.newcustomersrevenue,
            'repeatcustomersrevenue': params.data.repeatcustomersrevenue,
            'totalrevenue': params.data.totalrevenue
        });
    }

    onDeleteButtonClick(params: any) {
        this.customerLoyaltyManager.deletecustomerloyal(params.data.id).subscribe((response) => {
            for (let i = 0; i < this.cusAcLoy.length; i++) {
                if (this.cusAcLoy[i].id == params.data.id) {
                    this.cusAcLoy?.splice(i, 1);
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
        modalRef.componentInstance.title = "Customer Acquisitionand Loyality";
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

    onOrderClick(event: any, custacloyForm: any) {
        this.markFormGroupTouched(this.custacloyForm);
        this.submitted = true;
        if (this.custacloyForm.invalid) {
            return;
        }
        let customeracquisition001mb = new Customeracquisition001mb();
        customeracquisition001mb.year = this.f.year.value ? this.f.year.value : null;
        customeracquisition001mb.month = this.f.month.value ? this.f.month.value : "";
        customeracquisition001mb.newcustomers = this.f.newcustomers.value ? this.f.newcustomers.value : null;
        customeracquisition001mb.repeatcustomers = this.f.repeatcustomers.value ? this.f.repeatcustomers.value : null;
        customeracquisition001mb.total = this.f.total.value ? this.f.total.value : null;
        customeracquisition001mb.newcustomersrevenue = this.f.newcustomersrevenue.value ? this.f.newcustomersrevenue.value : null;
        customeracquisition001mb.repeatcustomersrevenue = this.f.repeatcustomersrevenue.value ? this.f.repeatcustomersrevenue.value : null;
        customeracquisition001mb.totalrevenue = this.f.totalrevenue.value ? this.f.totalrevenue.value : null;
        if (this.id) {
            customeracquisition001mb.id = this.id;
            customeracquisition001mb.insertUser = this.insertUser;
            customeracquisition001mb.insertDatetime = this.insertDatetime;
            customeracquisition001mb.updatedUser = this.authManager.getcurrentUser.username;
            customeracquisition001mb.updatedDatetime = new Date();
            this.customerLoyaltyManager.updatecustomerloyal(customeracquisition001mb).subscribe(response => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let customeracquisition001mb = deserialize<Customeracquisition001mb>(Customeracquisition001mb, response);
                for (let customerLoyalty of this.cusAcLoy) {
                    if (customerLoyalty.id == customeracquisition001mb.id) {
                        customerLoyalty.year = customeracquisition001mb.year;
                        customerLoyalty.month = customeracquisition001mb.month;
                        customerLoyalty.newcustomers = customeracquisition001mb.newcustomers;
                        customerLoyalty.repeatcustomers = customeracquisition001mb.repeatcustomers;
                        customerLoyalty.total = customeracquisition001mb.total;
                        customerLoyalty.newcustomersrevenue = customeracquisition001mb.newcustomersrevenue;
                        customerLoyalty.repeatcustomersrevenue = customeracquisition001mb.repeatcustomersrevenue;
                        customerLoyalty.totalrevenue = customeracquisition001mb.totalrevenue;
                        customerLoyalty.insertUser = this.insertUser;
                        customerLoyalty.insertDatetime = this.insertDatetime;
                        customerLoyalty.updatedUser = this.authManager.getcurrentUser.username;
                        customerLoyalty.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.cusAcLoy);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.custacloyForm.reset();
                this.submitted = false;
                this.id = null;
            });
        }
        else {
            customeracquisition001mb.insertUser = this.authManager.getcurrentUser.username;
            customeracquisition001mb.insertDatetime = new Date();
            this.customerLoyaltyManager.savecustomerloyal(customeracquisition001mb).subscribe(response => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let customeracquisition001mb = deserialize<Customeracquisition001mb>(Customeracquisition001mb, response);
                this.cusAcLoy?.push(customeracquisition001mb);
                const newItems = [JSON.parse(JSON.stringify(customeracquisition001mb))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.gridOptions.api.deselectAll();
                this.custacloyForm.reset();
                this.submitted = false;
            })
        }
    }

    onReset() {
        this.custacloyForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.customerLoyaltyManager.customerLoyaltyPdf().subscribe((response) =>{
            saveAs(response,"CustomerAcquisitionAndLoyalty");

		});
	}

	onGenerateExcelReport(){
		this.customerLoyaltyManager.customerLoyaltyExcel().subscribe((response) => {
			saveAs(response,"CustomerAcquisitionAndLoyalty");
        })
	}

}