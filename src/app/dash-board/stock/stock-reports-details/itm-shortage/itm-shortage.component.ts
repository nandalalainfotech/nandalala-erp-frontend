import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { ItemShortageManager } from 'src/app/shared/services/restcontroller/bizservice/item-shortage.service';
import { SalesItemManager } from 'src/app/shared/services/restcontroller/bizservice/sales-item.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { WareHouseManager } from 'src/app/shared/services/restcontroller/bizservice/ware-house.service';
import { Itemdt001mb } from 'src/app/shared/services/restcontroller/entities/Itemdt001mb';
import { Itemshortagerep001mb } from 'src/app/shared/services/restcontroller/entities/Itemshortagerep001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { Warehouse001mb } from 'src/app/shared/services/restcontroller/entities/Warehouse001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-itm-shortage',
    templateUrl: './itm-shortage.component.html',
    styleUrls: ['./itm-shortage.component.css']
})

export class ItmShortageComponent implements OnInit {

    frameworkComponents: any;
    shrepId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    warehouseName: string = "";
    itemCode: string = "";
    actualQty: string | null = "";
    orderedQty: string | null = "";
    plannedQty: string | null = "";
    reservedQty: string | null = "";
    projectedQty: string | null = "";
    itmShortages: Itemshortagerep001mb[] = [];
    wrhousesystemproperties?: Systemproperties001mb[] = [];
    itmsystemproperties?: Systemproperties001mb[] = [];
    public gridOptions: GridOptions | any;
    shortageForm: FormGroup | any;
    submitted = false;
    stkitems: Itemdt001mb[] = [];
    wrHouses: Warehouse001mb[] = [];

    constructor(private systemPropertiesService: SystemPropertiesService,
         private datePipe: DatePipe, 
         private formBuilder: FormBuilder,
        private itemShortageManager: ItemShortageManager, 
        private salesItemManager: SalesItemManager, 
        private wareHouseManager: WareHouseManager, 
        private calloutService: CalloutService,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent
        }
    }

    ngOnInit() {

        this.shortageForm = this.formBuilder.group({
            itemCode: ['', Validators.required],
            warehouseName: ['', Validators.required],
            actualQty: ['', Validators.required],
            orderedQty: ['', Validators.required],
            plannedQty: ['', Validators.required],
            reservedQty: ['', Validators.required],
            projectedQty: ['', Validators.required],
        });
        this.createDataGrid001mb();
        this.wareHouseManager.allwrhouse().subscribe(response => {
            this.wrHouses = deserialize<Warehouse001mb[]>(Warehouse001mb, response);
        }),
            this.salesItemManager.allsalesitem().subscribe((response) => {
                this.stkitems = deserialize<Itemdt001mb[]>(Itemdt001mb, response);
            })
        this.itemShortageManager.allitemshortage().subscribe(response => {
            this.itmShortages = deserialize<Itemshortagerep001mb[]>(Itemshortagerep001mb, response);
            if (this.itmShortages.length > 0) {
                this.gridOptions?.api?.setRowData(this.itmShortages);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }
    get f() { return this.shortageForm.controls; }
    createDataGrid001mb(): void {
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
                field: 'shrepId',
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
                headerName: 'WareHouse',
                field: 'warehouseName',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
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
                headerName: 'Actual Quantity',
                field: 'actualQty',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Ordered Quantity',
                field: 'orderedQty',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Planned Quantity',
                field: 'plannedQty',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Reserved Quantity',
                field: 'reservedQty',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Projected Quantity',
                field: 'projectedQty',
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
        ]
    }
    onEditButtonClick(params: any) {
        this.shrepId = params.data.shrepId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.shortageForm.patchValue({
            'warehouseName': params.data.warehouseName,
            'itemCode': params.data.itemCode,
            'actualQty': params.data.actualQty,
            'orderedQty': params.data.orderedQty,
            'plannedQty': params.data.plannedQty,
            'reservedQty': params.data.reservedQty,
            'projectedQty': params.data.projectedQty,
        });
    }
    onDeleteButtonClick(params: any) {
        this.itemShortageManager.itemshortagedelete(params.data.shrepId).subscribe(response => {
            for (let i = 0; i < this.itmShortages.length; i++) {
                if (this.itmShortages[i].shrepId == params.data.shrepId) {
                    this.itmShortages?.splice(i, 1);
                    break;
                }
            }
            const selectedRows = params.api.getSelectedRows();
            params.api.applyTransaction({ remove: selectedRows });
            this.gridOptions.api.deselectAll();
            this.calloutService.showSuccess("Order Removed Successfully");
        })
    }

    onAuditButtonClick(params: any) {
        const modalRef = this.modalService.open(AuditComponent);
        modalRef.componentInstance.title = "Item Shortage";
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
    onOrderClick(event: any, shortageForm: any) {

        this.markFormGroupTouched(this.shortageForm);
        this.submitted = true;
        if (this.shortageForm.invalid) {
            return;
        }

        let itemshortagerep001mb = new Itemshortagerep001mb();
        itemshortagerep001mb.warehouseName = this.f.warehouseName.value ? this.f.warehouseName.value : "";
        itemshortagerep001mb.itemCode = this.f.itemCode.value ? this.f.itemCode.value : "";
        itemshortagerep001mb.actualQty = this.f.actualQty.value ? this.f.actualQty.value : "";
        itemshortagerep001mb.orderedQty = this.f.orderedQty.value ? this.f.orderedQty.value : "";
        itemshortagerep001mb.plannedQty = this.f.plannedQty.value ? this.f.plannedQty.value : "";
        itemshortagerep001mb.reservedQty = this.f.reservedQty.value ? this.f.reservedQty.value : "";
        itemshortagerep001mb.projectedQty = this.f.projectedQty.value ? this.f.projectedQty.value : "";
        if (this.shrepId) {
            itemshortagerep001mb.shrepId = this.shrepId;
            itemshortagerep001mb.insertUser = this.insertUser;
            itemshortagerep001mb.insertDatetime = this.insertDatetime;
            itemshortagerep001mb.updatedUser = this.authManager.getcurrentUser.username;
            itemshortagerep001mb.updatedDatetime = new Date();
            this.itemShortageManager.itemshortagesave(itemshortagerep001mb).subscribe(response => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let shortages = deserialize<Itemshortagerep001mb>(Itemshortagerep001mb, response);
                for (let items of this.itmShortages) {
                    if (items.shrepId == shortages.shrepId) {
                        items.itemCode = shortages.itemCode;
                        items.warehouseName = shortages.warehouseName;
                        items.actualQty = shortages.actualQty;
                        items.orderedQty = shortages.orderedQty;
                        items.plannedQty = shortages.plannedQty;
                        items.reservedQty = shortages.reservedQty;
                        items.projectedQty = shortages.projectedQty;
                        items.insertUser = this.insertUser;
                        items.insertDatetime = this.insertDatetime;
                        items.updatedUser = this.authManager.getcurrentUser.username;
                        items.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.itmShortages);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.shortageForm.reset();
                this.submitted = false;
                this.shrepId = null;
            });
        } else {
            itemshortagerep001mb.insertUser = this.authManager.getcurrentUser.username;
            itemshortagerep001mb.insertDatetime = new Date();
            this.itemShortageManager.itemshortagesave(itemshortagerep001mb).subscribe(response => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let shortages = deserialize<Itemshortagerep001mb>(Itemshortagerep001mb, response);
                this.itmShortages.push(shortages);
                const newItems = [JSON.parse(JSON.stringify(shortages))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.gridOptions.api.deselectAll();
                this.shortageForm.reset();
                this.submitted = false;
            });
        }
    }
    onReset() {
        this.shortageForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.itemShortageManager.itemShortagePdf().subscribe((response) =>{
            saveAs(response,"ItemShortageList");

		});
	}

	onGenerateExcelReport(){
		this.itemShortageManager.itemShortageExcel().subscribe((response) => {
			saveAs(response,"ItemShortageList");
        })
	}


}