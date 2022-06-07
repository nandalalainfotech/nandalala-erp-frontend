import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { LinkRendererComponent } from 'src/app/shared/services/renderercomponent/link-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { SalesTaxManager } from 'src/app/shared/services/restcontroller/bizservice/sales-taxes.service';
import { Salestaxesandtemplates001mb } from 'src/app/shared/services/restcontroller/entities/Salestaxesandtemplates001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-sales-taxes',
    templateUrl: './sales-taxes.component.html',
    styleUrls: ['./sales-taxes.component.css']
})

export class SalesTaxesComponent implements OnInit {

    salesForm: FormGroup | any;
    submitted = false;

    id: number|any;
    insertUser: string = "";
    insertDatetime: Date | any;
    frameworkComponents: any;
    title: string = "";
    company: string = "";
    type: string = "";
    accounthead: string = "";
    rate?: number|any;
    amount?: number|any;
    total?:number|any;
    salesTax: Salestaxesandtemplates001mb[] = [];
    public gridOptions: GridOptions | any;

    constructor(private salesTaxManager: SalesTaxManager,
        private calloutService: CalloutService, 
        private formBuilder: FormBuilder,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            // linkRenderer: LinkRendererComponent,
            iconRenderer: IconRendererComponent
        }

    }

    ngOnInit() {

        this.salesForm = this.formBuilder.group({
            title: ['', Validators.required],
            company: ['', Validators.required],
            type: ['', Validators.required],
            accounthead: ['', Validators.required],
            rate: ['', Validators.required],
            amount: ['', Validators.required],
            total: ['', Validators.required],

        });

        this.createDataGrid001();
        this.salesTaxManager.allsalestax().subscribe((response) => {
            this.salesTax = deserialize<Salestaxesandtemplates001mb[]>(Salestaxesandtemplates001mb, response);
            if (this.salesTax.length > 0) {
                this.gridOptions?.api?.setRowData(this.salesTax);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    get f() { return this.salesForm.controls; }

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
                headerName: '#S No',
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
                headerName: 'Title',
                field: 'title',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Company',
                field: 'company',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Type',
                field: 'type',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Account Head',
                field: 'accounthead',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Rate',
                field: 'rate',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Amount',
                field: 'amount',
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
                width: 155,
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
        this.id = params.data.id;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.salesForm.patchValue({
            'id': params.data.id,
            'accounthead': params.data.accounthead,
            'amount': params.data.amount,
            'company': params.data.company,
            'rate': params.data.rate,
            'title': params.data.title,
            'total': params.data.total,
            'type': params.data.type,

        })
    }

    onDeleteButtonClick(params: any) {
        this.salesTaxManager.salestaxdelete(params.data.id).subscribe((response) => {
            for (let i = 0; i < this.salesTax.length; i++) {
                if (this.salesTax[i].id == params.data.id) {
                    this.salesTax?.splice(i, 1);
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
        modalRef.componentInstance.title = "Sales Register";
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

    onOrderClick(event: any, salesForm: any) {

        this.markFormGroupTouched(this.salesForm);
        this.submitted = true;
        if (this.salesForm.invalid) {
            return;
        }

        let salestaxesandtemplates001mb = new Salestaxesandtemplates001mb();
        salestaxesandtemplates001mb.accounthead = this.f.accounthead.value ? this.f.accounthead.value : "";
        salestaxesandtemplates001mb.amount = this.f.amount.value ? this.f.amount.value : 0;
        salestaxesandtemplates001mb.company = this.f.company.value ? this.f.company.value : "";
        salestaxesandtemplates001mb.rate = this.f.rate.value ? this.f.rate.value : 0;
        salestaxesandtemplates001mb.title = this.f.title.value ? this.f.title.value : "";
        salestaxesandtemplates001mb.total = this.f.total.value ? this.f.total.value : 0;
        salestaxesandtemplates001mb.type = this.f.type.value ? this.f.type.value : "";
        if (this.id) {
            salestaxesandtemplates001mb.id = this.id;
            salestaxesandtemplates001mb.insertUser = this.insertUser;
			salestaxesandtemplates001mb.insertDatetime = this.insertDatetime;
            salestaxesandtemplates001mb.updatedUser = this.authManager.getcurrentUser.username;
			salestaxesandtemplates001mb.updatedDatetime = new Date();
            this.salesTaxManager.salestaxupdate(salestaxesandtemplates001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let sale = deserialize<Salestaxesandtemplates001mb>(Salestaxesandtemplates001mb, response);
                for (let salesTaxes of this.salesTax) {
                    if (salesTaxes.id == sale.id) {
                        salesTaxes.accounthead = sale.accounthead;
                        salesTaxes.amount = sale.amount;
                        salesTaxes.company = sale.company;
                        salesTaxes.rate = sale.rate;
                        salesTaxes.title = sale.title;
                        salesTaxes.total = sale.total;
                        salesTaxes.type = sale.type;
                        salesTaxes.insertUser = this.insertUser;
                        salesTaxes.insertDatetime = this.insertDatetime;
                        salesTaxes.updatedUser = this.authManager.getcurrentUser.username;
                        salesTaxes.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.salesTax);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.salesForm.reset();
                this.id = null;
                this.submitted = false;
            });
        } else {
            salestaxesandtemplates001mb.insertUser = this.authManager.getcurrentUser.username;
			salestaxesandtemplates001mb.insertDatetime = new Date();
            this.salesTaxManager.salestaxsave(salestaxesandtemplates001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let sale = deserialize<Salestaxesandtemplates001mb>(Salestaxesandtemplates001mb, response);
                this.salesTax?.push(sale);
                const newItems = [JSON.parse(JSON.stringify(sale))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.salesForm.reset();
                this.submitted = false;
            });
        }
    }

    onReset() {
        this.salesForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.salesTaxManager.salesTaxPdf().subscribe((response) =>{
            saveAs(response,"SalesTaxesAndCharges");

		});
	}

	onGenerateExcelReport(){
		this.salesTaxManager.salesTaxExcel().subscribe((response) => {
			saveAs(response,"SalesTaxesAndCharges");
        })
	}

}
