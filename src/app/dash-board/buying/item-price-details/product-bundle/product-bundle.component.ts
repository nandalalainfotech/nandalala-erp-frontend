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

    frameworkComponents: any;
    bundleForm: FormGroup | any;
    pbundId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    itemname: string = "Dummy.status";
    itemtype: string = "dummy";
    itemCode: string = "";
    childItem: string = "";
    quantity: string = "";
    description: string = "";
    submitted = false;
    prBundle: Prodbundle001mb[] = [];
    isystemproperties?: Systemproperties001mb[] = [];
    itemlist: Itemdt001mb[]=[];
    public gridOptions: GridOptions | any;

    constructor(private systemPropertiesService: SystemPropertiesService,
        private prodBundleManager: ProdBundleManager,
        private calloutService: CalloutService,
        private formBuilder: FormBuilder, 
        private salesitemManager:SalesItemManager,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent
        }
    }


    ngOnInit() {
        this.createDataGrid001();
        this.bundleForm = this.formBuilder.group({
            itemCode: ['', Validators.required],
            childItem: ['', Validators.required],
            quantity: ['', Validators.required],
            description: ['', Validators.required]
        })
        this.systemPropertiesService.system(this.itemname, this.itemtype,).subscribe(response => {
            this.isystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        });
        this.salesitemManager.allsalesitem().subscribe(response => {
            this.itemlist = deserialize<Itemdt001mb[]>(Itemdt001mb, response);
        });
        this.prodBundleManager.allprbundle().subscribe(response => {
            this.prBundle = deserialize<Prodbundle001mb[]>(Prodbundle001mb, response);
            if (this.prBundle.length > 0) {
                this.gridOptions?.api?.setRowData(this.prBundle);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    get f() { return this.bundleForm.controls }

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
        this.bundleForm.patchValue({
            'itemCode': params.data.itemCode,
            'childItem': params.data.childItem,
            'quantity': params.data.quantity,
            'description': params.data.description
        });
    }

    onDeleteButtonClick(params: any) {
        this.prodBundleManager.deleteprbundle(params.data.pbundId).subscribe((response) => {
            for (let i = 0; i < this.prBundle.length; i++) {
                if (this.prBundle[i].pbundId == params.data.pbundId) {
                    this.prBundle?.splice(i, 1);
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

    onOrderClick(event: any, bundleForm: any) {
        this.markFormGroupTouched(this.bundleForm);
        this.submitted = true;
        if (this.bundleForm.invalid) {
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
                let bundles = deserialize<Prodbundle001mb>(Prodbundle001mb, response);
                for (let prodBundle of this.prBundle) {
                    if (prodBundle.pbundId == bundles.pbundId) {
                        prodBundle.itemCode = bundles.itemCode;
                        prodBundle.childItem = bundles.childItem;
                        prodBundle.quantity = bundles.quantity;
                        prodBundle.description = bundles.description;
                        prodBundle.insertUser = this.insertUser;
                        prodBundle.insertDatetime = this.insertDatetime;
                        prodBundle.updatedUser = this.authManager.getcurrentUser.username;
                        prodBundle.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.prBundle);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.bundleForm.reset();
                this.submitted = false;
                this.pbundId = null;
            });
        } else {
            prodbundle001mb.insertUser = this.authManager.getcurrentUser.username;
			prodbundle001mb.insertDatetime = new Date();
            this.prodBundleManager.saveprbundle(prodbundle001mb).subscribe(response => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let bundles = deserialize<Prodbundle001mb>(Prodbundle001mb, response);
                this.prBundle?.push(bundles);
                const newItems = [JSON.parse(JSON.stringify(bundles))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.gridOptions.api.deselectAll();
                this.bundleForm.reset();
                this.submitted = false;
            });
        }
    }
    onReset() {
        this.bundleForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.prodBundleManager.prodBundlePdf().subscribe((response) =>{
            saveAs(response,"ProductBundleList");

		});
	}

	onGenerateExcelReport(){
		this.prodBundleManager.prodBundleExcel().subscribe((response) => {
			saveAs(response,"ProductBundleList");
        })
	}

}