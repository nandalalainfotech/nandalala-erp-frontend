import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { MaterialManager } from 'src/app/shared/services/restcontroller/bizservice/material.service';
import { Itemdt001mb } from 'src/app/shared/services/restcontroller/entities/Itemdt001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-bill-of-material',
    templateUrl: './bill-of-material.component.html',
    styleUrls: ['./bill-of-material.component.css']
})

export class BillOfMaterialComponent implements OnInit {
    frameworkComponents: any;
    bomForm: FormGroup | any;
    itemid: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    itemcode: string | null = "";
    quantity: number | any;
    rate: number | any;
    amount: number | any;
    submitted = false;
    bom: Itemdt001mb[] = [];
    public gridOptions: GridOptions | any;

    constructor(private materialManager: MaterialManager,
        private formBuilder: FormBuilder,
        private calloutService: CalloutService,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent
        }
    }

    ngOnInit() {
        this.createDataGrid001();
        this.bomForm = this.formBuilder.group({
            itemcode: ['', Validators.required],
            quantity: ['', Validators.required],
            rate: ['', Validators.required],
            amount: ['', Validators.required]
        })
        this.materialManager.allmaterial().subscribe(response => {
            this.bom = deserialize<Itemdt001mb[]>(Itemdt001mb, response);
            if (this.bom.length > 0) {
                this.gridOptions?.api?.setRowData(this.bom);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    get f() { return this.bomForm.controls }

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
        this.itemid = params.data.itemid;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.bomForm.patchValue({
            'itemcode': params.data.itemcode,
            'quantity': params.data.quantity,
            'rate': params.data.rate,
            'amount': params.data.amount
        });
    }

    onDeleteButtonClick(params: any) {
        this.materialManager.deletematerial(params.data.itemid).subscribe((response) => {
            for (let i = 0; i < this.bom.length; i++) {
                if (this.bom[i].itemid == params.data.itemid) {
                    this.bom?.splice(i, 1);
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
        modalRef.componentInstance.title = "BOM Search";
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

    onOrderClick(event: any, bomForm: any) {
        this.markFormGroupTouched(this.bomForm);
        this.submitted = true;
        if (this.bomForm.invalid) {
            return;
        }
        let itemdt001mb = new Itemdt001mb();
        itemdt001mb.itemcode = this.f.itemcode.value ? this.f.itemcode.value : "";
        itemdt001mb.quantity = this.f.quantity.value ? this.f.quantity.value : null;
        itemdt001mb.amount = this.f.amount.value ? this.f.amount.value : null;
        itemdt001mb.rate = this.f.rate.value ? this.f.rate.value : null;
        if (this.itemid) {
            itemdt001mb.itemid = this.itemid;
            itemdt001mb.insertUser = this.insertUser;
            itemdt001mb.insertDatetime = this.insertDatetime;
            itemdt001mb.updatedUser = this.authManager.getcurrentUser.username;
            itemdt001mb.updatedDatetime = new Date();
            this.materialManager.updatematerial(itemdt001mb).subscribe(response => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let material = deserialize<Itemdt001mb>(Itemdt001mb, response);
                for (let materials of this.bom) {
                    if (materials.itemid == material.itemid) {
                        materials.itemcode = material.itemcode;
                        materials.quantity = material.quantity;
                        materials.rate = material.rate;
                        materials.amount = material.amount;
                        materials.insertUser = this.insertUser;
                        materials.insertDatetime = this.insertDatetime;
                        materials.updatedUser = this.authManager.getcurrentUser.username;
                        materials.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.bom);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.bomForm.reset();
                this.submitted = false;
                this.itemid = null;
            });
        }
        else {
            itemdt001mb.insertUser = this.authManager.getcurrentUser.username;
            itemdt001mb.insertDatetime = new Date();
            this.materialManager.savematerial(itemdt001mb).subscribe(response => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let material = deserialize<Itemdt001mb>(Itemdt001mb, response);
                this.bom?.push(material);
                const newItems = [JSON.parse(JSON.stringify(material))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.gridOptions.api.deselectAll();
                this.bomForm.reset();
                this.submitted = false;
            })
        }
    }

    onReset() {
        this.bomForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.materialManager.billOfMaterialPdf().subscribe((response) =>{
            saveAs(response,"BOMDetailsList");

		});
	}

	onGenerateExcelReport(){
		this.materialManager.billOfMaterialExcel().subscribe((response) => {
			saveAs(response,"BOMDetailsList");
        })
	}

}