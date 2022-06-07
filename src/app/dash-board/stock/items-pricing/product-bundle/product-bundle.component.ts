import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { ProdBundleManager } from 'src/app/shared/services/restcontroller/bizservice/product-bundle.service';
import { SalesItemManager } from 'src/app/shared/services/restcontroller/bizservice/sales-item.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Itemdt001mb } from 'src/app/shared/services/restcontroller/entities/Itemdt001mb';
import { Prodbundle001mb } from 'src/app/shared/services/restcontroller/entities/Prodbundle001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-product-bundle',
    templateUrl: './product-bundle.component.html',
    styleUrls: ['./product-bundle.component.css']
})

export class ProductBundleComponent implements OnInit {

    productsForm: FormGroup | any;
    submitted = false;

    frameworkComponents: any;
    pbundId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    name: string = "dummy.status";
    type: string = "dummy";
    itemCode: string = "";
    childItem: string = "";
    quantity: string = "";
    description: string = "";
    prodBundle: Prodbundle001mb[] = [];
    public gridOptions: GridOptions | any;
    systemproperties?: Systemproperties001mb[] = [];
    stkitems: Itemdt001mb[] = [];

    constructor(private systemPropertiesService: SystemPropertiesService,
        private prodBundleManager: ProdBundleManager, 
        private salesItemManager: SalesItemManager,
        private calloutService: CalloutService, 
        private formBuilder: FormBuilder,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent
        }
    }

    ngOnInit() {

        this.productsForm = this.formBuilder.group({
            itemCode: ['', Validators.required],
            childItem: ['', Validators.required],
            quantity: ['', Validators.required],
            description: ['', Validators.required],

        })

        this.createDataGrid001();
        this.systemPropertiesService.system(this.name, this.type).subscribe(response => {
            this.systemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        });
        this.salesItemManager.allsalesitem().subscribe((response) => {
            this.stkitems = deserialize<Itemdt001mb[]>(Itemdt001mb, response);
        })
        this.prodBundleManager.allprbundle().subscribe((response) => {
            this.prodBundle = deserialize<Prodbundle001mb[]>(Prodbundle001mb, response);
            if (this.prodBundle.length > 0) {
                this.gridOptions?.api?.setRowData(this.prodBundle);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    get f() { return this.productsForm.controls; }

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
                field: 'pbundId',
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
                headerName: 'Item',
                field: 'itemCode',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Child Item',
                field: 'childItem',
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
                headerName: 'Description',
                field: 'description',
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

        this.pbundId = params.data.pbundId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.productsForm.patchValue({
            'itemCode': params.data.itemCode,
            'childItem': params.data.childItem,
            'quantity': params.data.quantity,
            'description': params.data.description,
        })
    }

    onDeleteButtonClick(params: any) {
        this.prodBundleManager.deleteprbundle(params.data.pbundId).subscribe((response) => {
            for (let i = 0; i < this.prodBundle.length; i++) {
                if (this.prodBundle[i].pbundId == params.data.pbundId) {
                    this.prodBundle?.splice(i, 1);
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
        modalRef.componentInstance.title = "Product Bundle";
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

    onOrderClick(event: any, productsForm: any) {

        this.markFormGroupTouched(this.productsForm);
        this.submitted = true;
        if (this.productsForm.invalid) {
            return;
        }

        let prodbundle001mb = new Prodbundle001mb();
        prodbundle001mb.itemCode = this.f.itemCode.value ? this.f.itemCode.value : "";
        prodbundle001mb.childItem = this.f.childItem.value ? this.f.childItem.value : "";
        prodbundle001mb.quantity = this.f.quantity.value ? this.f.quantity.value : "";
        prodbundle001mb.description = this.f.description.value ? this.f.description.value : "";
        if (this.pbundId) {
            prodbundle001mb.pbundId = this.pbundId;
            prodbundle001mb.insertUser = this.insertUser;
            prodbundle001mb.insertDatetime = this.insertDatetime;
            prodbundle001mb.updatedUser = this.authManager.getcurrentUser.username;
            prodbundle001mb.updatedDatetime = new Date();
            this.prodBundleManager.updateprbundle(prodbundle001mb).subscribe(response => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let product = deserialize<Prodbundle001mb>(Prodbundle001mb, response);
                for (let prbundle of this.prodBundle) {
                    if (prbundle.pbundId == product.pbundId) {
                        prbundle.itemCode = product.itemCode;
                        prbundle.childItem = product.childItem;
                        prbundle.quantity = product.quantity;
                        prbundle.description = product.description;
                        prbundle.insertUser = this.insertUser;
                        prbundle.insertDatetime = this.insertDatetime;
                        prbundle.updatedUser = this.authManager.getcurrentUser.username;
                        prbundle.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.prodBundle);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.productsForm.reset();
                this.pbundId = null;
                this.submitted = false;
            })
        }
        else {
            prodbundle001mb.insertUser = this.authManager.getcurrentUser.username;
            prodbundle001mb.insertDatetime = new Date();
            this.prodBundleManager.saveprbundle(prodbundle001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let product = deserialize<Prodbundle001mb>(Prodbundle001mb, response);
                this.prodBundle.push(product);
                const newItems = [JSON.parse(JSON.stringify(product))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.productsForm.reset();
                this.submitted = false;
            })
        }
    }
    onReset() {
        this.productsForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport() {
		this.prodBundleManager.prodBundlePdf().subscribe((response) => {
			saveAs(response, "ProductBundleList");

		});
	}

	onGenerateExcelReport() {
		this.prodBundleManager.prodBundleExcel().subscribe((response) => {
			saveAs(response, "ProductBundleList");
		});
	}
}