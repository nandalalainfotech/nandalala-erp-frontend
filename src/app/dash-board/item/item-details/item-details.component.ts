import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { SalesItemManager } from 'src/app/shared/services/restcontroller/bizservice/sales-item.service';
import { Itemdt001mb } from 'src/app/shared/services/restcontroller/entities/Itemdt001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-item-details',
    templateUrl: './item-details.component.html',
    styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {

    frameworkComponents: any;
    itdetForm: FormGroup | any;
    itemid: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    itemcode: string | null = "";
    quantity: number | any;
    rate: string | null = "";
    amount: string | null = "";
    submitted = false;
    itDetails: Itemdt001mb[] = [];
    public gridOptions: GridOptions | any;

    constructor(private salesItemManager: SalesItemManager,
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
        this.itdetForm = this.formBuilder.group({
			itemcode: ['', Validators.required],
			quantity: ['', Validators.required],
			rate: ['', Validators.required],
            amount: ['', Validators.required]
		})
        this.salesItemManager.allsalesitem().subscribe(response => {
            this.itDetails = deserialize<Itemdt001mb[]>(Itemdt001mb, response);
            if (this.itDetails.length > 0) {
                this.gridOptions?.api?.setRowData(this.itDetails);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    get f() { return this.itdetForm.controls }

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
                field: 'itemid',
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
                headerName: 'Item Code',
                field: 'itemcode',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Quantity',
                field: 'quantity',
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
                width: 105,
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
        this.itemid = params.data.itemid;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.itdetForm.patchValue({
			'itemcode': params.data.itemcode,
			'quantity': params.data.quantity,
            'rate': params.data.rate,
			'amount': params.data.amount
		});
    }

    onDeleteButtonClick(params: any) {
        this.salesItemManager.deletesalesitem(params.data.itemid).subscribe((response) => {
            for (let i = 0; i < this.itDetails.length; i++) {
                if (this.itDetails[i].itemid == params.data.itemid) {
                    this.itDetails?.splice(i, 1);
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
        modalRef.componentInstance.title = "Item Details";
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

    onOrderClick(event: any, itdetForm: any) {
        this.markFormGroupTouched(this.itdetForm);
		this.submitted = true;
		if (this.itdetForm.invalid) {
			return;
		}
        let itemdt001mb = new Itemdt001mb();
        itemdt001mb.itemcode = this.f.itemcode.value ? this.f.itemcode.value : "";
        itemdt001mb.quantity = this.f.quantity.value ? this.f.quantity.value : 0;
        itemdt001mb.rate = this.f.rate.value ? this.f.rate.value : "";
        itemdt001mb.amount = this.f.amount.value ? this.f.amount.value : "";
        if (this.itemid) {
            itemdt001mb.itemid = this.itemid;
            itemdt001mb.insertUser = this.insertUser;
            itemdt001mb.insertDatetime = this.insertDatetime;
            itemdt001mb.updatedUser = this.authManager.getcurrentUser.username;
            itemdt001mb.updatedDatetime = new Date();
            this.salesItemManager.updatesalesitem(itemdt001mb).subscribe(response => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let sales = deserialize<Itemdt001mb>(Itemdt001mb, response);
                for (let item of this.itDetails) {
                    if (item.itemid == sales.itemid) {
                        item.itemcode = sales.itemcode;
                        item.quantity = sales.quantity;
                        item.rate = sales.rate;
                        item.amount = sales.amount;
                        item.insertUser = this.insertUser;
                        item.insertDatetime = this.insertDatetime;
                        item.updatedUser = this.authManager.getcurrentUser.username;
                        item.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.itDetails);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.itdetForm.reset();
                this.submitted = false;
                this.itemid = null;
            })
        }
        else {
            itemdt001mb.insertUser = this.authManager.getcurrentUser.username;
            itemdt001mb.insertDatetime = new Date();
            this.salesItemManager.savesalesitem(itemdt001mb).subscribe(response => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let sales = deserialize<Itemdt001mb>(Itemdt001mb, response);
                this.itDetails?.push(sales);
                const newItems = [JSON.parse(JSON.stringify(sales))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.itdetForm.reset();
                this.submitted = false;
            })
        }
    }

    onReset() {
        this.itdetForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.salesItemManager.salesItemPdf().subscribe((response) =>{
            saveAs(response,"ItemDetails");

		});
	}

	onGenerateExcelReport(){
		this.salesItemManager.salesItemExcel().subscribe((response) => {
			saveAs(response,"ItemDetails");
        })
	}

}