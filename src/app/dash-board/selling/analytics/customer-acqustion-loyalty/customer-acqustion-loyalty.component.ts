import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { CustomerLoyaltyManager } from 'src/app/shared/services/restcontroller/bizservice/customer-acqustion-loyalty.service';
import { Customeracquisition001mb } from 'src/app/shared/services/restcontroller/entities/Customeracquisition001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-customer-acqustion-loyalty',
    templateUrl: './customer-acqustion-loyalty.component.html',
    styleUrls: ['./customer-acqustion-loyalty.component.css']
})
export class CustomerAcqustionLoyaltyComponent implements OnInit {

    frameworkComponents: any;
    customerForm: FormGroup | any;
    id: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    year: number | undefined;
    month: string = "";
    newcustomers: number | undefined;
    repeatcustomers: number | undefined;
    total: number | undefined;
    newcustomersrevenue: number | undefined;
    repeatcustomersrevenue: number | undefined;
    totalrevenue: number | undefined;
    submitted = false;
    customerLoyal: Customeracquisition001mb[] = [];
    public gridOptions: GridOptions | any;

    constructor(private customerLoyaltyManager: CustomerLoyaltyManager,
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
        this.customerForm = this.formBuilder.group({
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
            this.customerLoyal = deserialize<Customeracquisition001mb[]>(Customeracquisition001mb, response);
            if (this.customerLoyal.length > 0) {
                this.gridOptions?.api?.setRowData(this.customerLoyal);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    get f() { return this.customerForm.controls }

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
                width: 150,
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
                width: 150,
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
                width: 150,
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
        this.customerForm.patchValue({
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
        this.customerLoyaltyManager.deletecustomerloyal(params.data.id).subscribe(response => {
            for (let i = 0; i < this.customerLoyal.length; i++) {
                if (this.customerLoyal[i].id == params.data.id) {
                    this.customerLoyal?.splice(i, 1);
                }
            }
            const selectedRows = params.api.getSelectedRows();
            params.api.applyTransaction({ remove: selectedRows });
            this.calloutService.showSuccess("Order Removed Successfully");
        })
    }

    onAuditButtonClick(params: any) {
        const modalRef = this.modalService.open(AuditComponent);
        modalRef.componentInstance.title = "Customer Acqustion And Loyality";
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

    onOrderClick(event: any, customerForm: any) {
        this.markFormGroupTouched(this.customerForm);
        this.submitted = true;
        if (this.customerForm.invalid) {
            return;
        }
        let customeracquisition001mb = new Customeracquisition001mb();
        customeracquisition001mb.year = this.f.year.value ? this.f.year.value : 0;
        customeracquisition001mb.month = this.f.month.value ? this.f.month.value : "";
        customeracquisition001mb.newcustomers = this.f.newcustomers.value ? this.f.newcustomers.value : 0;
        customeracquisition001mb.repeatcustomers = this.f.repeatcustomers.value ? this.f.repeatcustomers.value : 0;
        customeracquisition001mb.total = this.f.total.value ? this.f.total.value : 0;
        customeracquisition001mb.newcustomersrevenue = this.f.newcustomersrevenue.value ? this.f.newcustomersrevenue.value : 0;
        customeracquisition001mb.repeatcustomersrevenue = this.f.repeatcustomersrevenue.value ? this.f.repeatcustomersrevenue.value : 0;
        customeracquisition001mb.totalrevenue = this.f.totalrevenue.value ? this.f.totalrevenue.value : 0;
        if (this.id) {
            customeracquisition001mb.id = this.id;
            customeracquisition001mb.insertUser = this.insertUser;
            customeracquisition001mb.insertDatetime = this.insertDatetime;
            customeracquisition001mb.updatedUser = this.authManager.getcurrentUser.username;
            customeracquisition001mb.updatedDatetime = new Date();
            this.customerLoyaltyManager.updatecustomerloyal(customeracquisition001mb).subscribe(response => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let customers = deserialize<Customeracquisition001mb>(Customeracquisition001mb, response);
                for (let custLoyal of this.customerLoyal) {
                    if (custLoyal.id == customers.id) {
                        custLoyal.year = customers.year;
                        custLoyal.month = customers.month;
                        custLoyal.newcustomers = customers.newcustomers;
                        custLoyal.repeatcustomers = customers.repeatcustomers;
                        custLoyal.total = customers.total;
                        custLoyal.newcustomersrevenue = customers.newcustomersrevenue;
                        custLoyal.repeatcustomersrevenue = customers.repeatcustomersrevenue;
                        custLoyal.totalrevenue = customers.totalrevenue;
                        custLoyal.insertUser = this.insertUser;
                        custLoyal.insertDatetime = this.insertDatetime;
                        custLoyal.updatedUser = this.authManager.getcurrentUser.username;
                        custLoyal.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.customerLoyal);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.customerForm.reset();
                this.submitted = false;
                this.id = null;
            });
        } else {
            customeracquisition001mb.insertUser = this.authManager.getcurrentUser.username;
            customeracquisition001mb.insertDatetime = new Date();
            this.customerLoyaltyManager.savecustomerloyal(customeracquisition001mb).subscribe(response => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let customers = deserialize<Customeracquisition001mb>(Customeracquisition001mb, response);
                this.customerLoyal.push(customers);
                const newItems = [JSON.parse(JSON.stringify(customers))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.gridOptions.api.deselectAll();
                this.customerForm.reset();
                this.submitted = false;
            })
        }
    }
    onReset() {
        this.customerForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.customerLoyaltyManager.customerLoyaltyPdf().subscribe((response) =>{
            saveAs(response,"CustomerAcquisitionAndLoyaltyList");

		});
	}

	onGenerateExcelReport(){
		this.customerLoyaltyManager.customerLoyaltyExcel().subscribe((response) => {
			saveAs(response,"CustomerAcquisitionAndLoyaltyList");
        })
	}
}