import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { OrderDetailsManager } from 'src/app/shared/services/restcontroller/bizservice/order-details.service';
import { Order001mb } from 'src/app/shared/services/restcontroller/entities/Order001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-order-details',
    templateUrl: './order-details.component.html',
    styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

    frameworkComponents: any;
    ordDetailsForm: FormGroup | any;
    orderid: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    ordername: string | null = "";
    submitted = false;
    orderDetails: Order001mb[] = [];
    public gridOptions: GridOptions | any;

    constructor(private orderDetailsManager: OrderDetailsManager,
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
        this.ordDetailsForm = this.formBuilder.group({
			ordername: ['', Validators.required]
		})
        this.orderDetailsManager.orderdetall().subscribe(response => {
            this.orderDetails = deserialize<Order001mb[]>(Order001mb, response)
            if (this.orderDetails.length > 0) {
                this.gridOptions?.api?.setRowData(this.orderDetails);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    get f() { return this.ordDetailsForm.controls }

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
                field: 'orderid',
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
                headerName: 'Order Name',
                field: 'ordername',
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
        this.orderid = params.data.orderid;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.ordDetailsForm.patchValue({
			'ordername': params.data.ordername
		});
    }

    onDeleteButtonClick(params: any) {
        this.orderDetailsManager.orderdetdelete(params.data.orderid).subscribe((response) => {
            for (let i = 0; i < this.orderDetails.length; i++) {
                if (this.orderDetails[i].orderid == params.data.orderid) {
                    this.orderDetails?.splice(i, 1);
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
        modalRef.componentInstance.title = "Order Details";
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

    onOrderClick(event: any, ordDetailsForm: any) {
        this.markFormGroupTouched(this.ordDetailsForm);
		this.submitted = true;
		if (this.ordDetailsForm.invalid) {
			return;
		}
        let order001mb = new Order001mb();
        order001mb.ordername = this.f.ordername.value ? this.f.ordername.value : "";
        if (this.orderid) {
            order001mb.orderid = this.orderid;
            order001mb.insertUser = this.insertUser;
            order001mb.insertDatetime = this.insertDatetime;
            order001mb.updatedUser = this.authManager.getcurrentUser.username;
            order001mb.updatedDatetime = new Date();
            this.orderDetailsManager.orderdetupdate(order001mb).subscribe(response => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let ord = deserialize<Order001mb>(Order001mb, response);
                for (let detail of this.orderDetails) {
                    if (detail.orderid == ord.orderid) {
                        detail.ordername = ord.ordername;
                        detail.insertUser = this.insertUser;
                        detail.insertDatetime = this.insertDatetime;
                        detail.updatedUser = this.authManager.getcurrentUser.username;
                        detail.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.orderDetails);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.ordDetailsForm.reset();
                this.submitted = false;
                this.orderid = null;
            })
        }
        else {
            order001mb.insertUser = this.authManager.getcurrentUser.username;
            order001mb.insertDatetime = new Date();
            this.orderDetailsManager.orderdetsave(order001mb).subscribe(response => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let ord = deserialize<Order001mb>(Order001mb, response);
                this.orderDetails?.push(ord);
                const newItems = [JSON.parse(JSON.stringify(ord))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.ordDetailsForm.reset();
                this.submitted = false;
            })
        }
    }

    onReset() {
        this.ordDetailsForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.orderDetailsManager.orderDetailsPdf().subscribe((response) =>{
            saveAs(response,"OrderDetails");

		});
	}

	onGenerateExcelReport(){
		this.orderDetailsManager.orderDetailsExcel().subscribe((response) => {
			saveAs(response,"OrderDetails");
        })
	}


}