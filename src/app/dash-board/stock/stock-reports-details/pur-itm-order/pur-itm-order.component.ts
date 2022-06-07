import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { ProjectQuantityManager } from 'src/app/shared/services/restcontroller/bizservice/projected-quantity.service';
import { ProjecttManager } from 'src/app/shared/services/restcontroller/bizservice/projectt.service';
import { PurchaseItemOrderManager } from 'src/app/shared/services/restcontroller/bizservice/purchase-item-order.service';
import { SalesItemManager } from 'src/app/shared/services/restcontroller/bizservice/sales-item.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { WareHouseManager } from 'src/app/shared/services/restcontroller/bizservice/ware-house.service';
import { Itemdt001mb } from 'src/app/shared/services/restcontroller/entities/Itemdt001mb';
import { Project001mb } from 'src/app/shared/services/restcontroller/entities/Project001mb';
import { Purorditemreceive001mb } from 'src/app/shared/services/restcontroller/entities/Purorditemreceive001mb';
import { Stkrepproject001mb } from 'src/app/shared/services/restcontroller/entities/Stkrepproject001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { Warehouse001mb } from 'src/app/shared/services/restcontroller/entities/Warehouse001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-pur-itm-order',
    templateUrl: './pur-itm-order.component.html',
    styleUrls: ['./pur-itm-order.component.css']
})

export class PurItmOrderComponent implements OnInit {

    frameworkComponents: any;
    poitrecId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    suppname: string = "PRSupp.Type";
    supptype: string = "Type";
    puOrder: string = "";
    date!: Date | null;
    reqbyDate: string = "";
    supName: string = "";
    projectName: string | null = "";
    quantity: number | any;
    receivedQty: string | null = "";
    qtytoReceive: string | null = "";
    warehouseName: string = "";
    itemCode: string = "";
    brandName: string = "";
    company: string = "";
    description: string = "";
    purItems: Purorditemreceive001mb[] = [];
    suppsystemproperties?: Systemproperties001mb[] = [];
    prjtsystemproperties?: Systemproperties001mb[] = [];
    wrhousesystemproperties?: Systemproperties001mb[] = [];
    itmsystemproperties?: Systemproperties001mb[] = [];
    brdsystemproperties?: Systemproperties001mb[] = [];
    public gridOptions: GridOptions | any;
    itemForm: FormGroup | any;
    submitted = false;
    wrHouses: Warehouse001mb[] = [];
    stkitems: Itemdt001mb[] = [];
    stkProjects: Stkrepproject001mb[] = [];
    projectt: Project001mb[] = [];

    constructor(private systemPropertiesService: SystemPropertiesService, 
        private projecttManager: ProjecttManager, 
        private projectQuantityManager: ProjectQuantityManager, 
        private salesItemManager: SalesItemManager, 
        private wareHouseManager: WareHouseManager, 
        private datePipe: DatePipe, 
        private formBuilder: FormBuilder,
        private purchaseItemOrderManager: PurchaseItemOrderManager, 
        private calloutService: CalloutService,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent
        }
    }

    ngOnInit() {

        this.itemForm = this.formBuilder.group({
            puOrder: ['', Validators.required],
            date: ['', Validators.required],
            reqbyDate: ['', Validators.required],
            supName: ['', Validators.required],
            projectName: ['', Validators.required],
            quantity: ['', Validators.required],
            receivedQty: ['', Validators.required],
            qtytoReceive: ['', Validators.required],
            itemCode: ['', Validators.required],
            warehouseName: ['', Validators.required],
            brandName: ['', Validators.required],
            company: ['', Validators.required],
            description: ['', Validators.required]
        });

        this.createDataGrid001mb();
        this.systemPropertiesService.system(this.suppname, this.supptype).subscribe(response => {
            this.suppsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        }),

            this.wareHouseManager.allwrhouse().subscribe(response => {
                this.wrHouses = deserialize<Warehouse001mb[]>(Warehouse001mb, response);
            }),
            this.salesItemManager.allsalesitem().subscribe((response) => {
                this.stkitems = deserialize<Itemdt001mb[]>(Itemdt001mb, response);
            })
        this.projectQuantityManager.allstkproject().subscribe((response) => {
            this.stkProjects = deserialize<Stkrepproject001mb[]>(Stkrepproject001mb, response);
        })
        this.projecttManager.allproject().subscribe((response) => {
            this.projectt = deserialize<Project001mb[]>(Project001mb, response);
        })
        this.purchaseItemOrderManager.allpurchaseitem().subscribe(response => {
            this.purItems = deserialize<Purorditemreceive001mb[]>(Purorditemreceive001mb, response);
            if (this.purItems.length > 0) {
                this.gridOptions?.api?.setRowData(this.purItems);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }
    get f() { return this.itemForm.controls; }
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
                field: 'poitrecId',
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
                headerName: 'Purchase Order',
                field: 'puOrder',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Date',
                field: 'date',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: (params: any) => {
                    return params.data.date ? this.datePipe.transform(params.data.date, 'MM/dd/yyyy') : '';
                }
            },
            {
                headerName: 'Requried By Date',
                field: 'reqbyDate',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Supplier Name',
                field: 'supName',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Project Name',
                field: 'projectName',
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
                headerName: 'Received Quantity',
                field: 'receivedQty',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Quantity To Receive',
                field: 'qtytoReceive',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
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
                headerName: 'Brand',
                field: 'brandName',
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
                width: 250,
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
        ]
    }
    onEditButtonClick(params: any) {
        this.poitrecId = params.data.poitrecId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.itemForm.patchValue({
            'puOrder': params.data.puOrder,
            'reqbyDate': params.data.reqbyDate,
            'date': this.datePipe.transform(params.data.date, 'MM/dd/yyyy'),
            'supName': params.data.supName,
            'projectName': params.data.projectName,
            'quantity': params.data.quantity,
            'receivedQty': params.data.receivedQty,
            'qtytoReceive': params.data.qtytoReceive,
            'brandName': params.data.brandName,
            'company': params.data.company,
            'itemCode': params.data.itemCode,
            'warehouseName': params.data.warehouseName,
            'description': params.data.description,
        });
    }

    onDeleteButtonClick(params: any) {
        this.purchaseItemOrderManager.purchaseitemdelete(params.data.poitrecId).subscribe(response => {
            for (let i = 0; i < this.purItems.length; i++) {
                if (this.purItems[i].poitrecId == params.data.poitrecId) {
                    this.purItems?.splice(i, 1);
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
        modalRef.componentInstance.title = "Purchase Item Order";
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

    onOrderClick(event: any, itemForm: any) {

        this.markFormGroupTouched(this.itemForm);
        this.submitted = true;
        if (this.itemForm.invalid) {
            return;
        }

        let purorditemreceive001mb = new Purorditemreceive001mb();

        purorditemreceive001mb.date = new Date(this.f.date.value);
        purorditemreceive001mb.puOrder = this.f.puOrder.value ? this.f.puOrder.value : "";
        purorditemreceive001mb.reqbyDate = this.f.reqbyDate.value ? this.f.reqbyDate.value : "";
        purorditemreceive001mb.supName = this.f.supName.value ? this.f.supName.value : "";
        purorditemreceive001mb.projectName = this.f.projectName.value ? this.f.projectName.value : "";
        purorditemreceive001mb.quantity = this.f.quantity.value ? this.f.quantity.value : null;
        purorditemreceive001mb.receivedQty = this.f.receivedQty.value ? this.f.receivedQty.value : "";
        purorditemreceive001mb.qtytoReceive = this.f.qtytoReceive.value ? this.f.qtytoReceive.value : "";
        purorditemreceive001mb.warehouseName = this.f.warehouseName.value ? this.f.warehouseName.value : "";
        purorditemreceive001mb.itemCode = this.f.itemCode.value ? this.f.itemCode.value : "";
        purorditemreceive001mb.brandName = this.f.brandName.value ? this.f.brandName.value : "";
        purorditemreceive001mb.company = this.f.company.value ? this.f.company.value : "";
        purorditemreceive001mb.description = this.f.description.value ? this.f.description.value : "";
        if (this.poitrecId) {
            purorditemreceive001mb.poitrecId = this.poitrecId;
            purorditemreceive001mb.insertUser = this.insertUser;
            purorditemreceive001mb.insertDatetime = this.insertDatetime;
            purorditemreceive001mb.updatedUser = this.authManager.getcurrentUser.username;
            purorditemreceive001mb.updatedDatetime = new Date();
            this.purchaseItemOrderManager.purchaseitemsave(purorditemreceive001mb).subscribe(response => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let item = deserialize<Purorditemreceive001mb>(Purorditemreceive001mb, response);
                for (let items of this.purItems) {
                    if (items.poitrecId == item.poitrecId) {
                        items.puOrder = item.puOrder;
                        items.date = item.date;
                        items.reqbyDate = item.reqbyDate;
                        items.supName = item.supName;
                        items.projectName = item.projectName;
                        items.quantity = item.quantity;
                        items.receivedQty = item.receivedQty;
                        items.qtytoReceive = item.qtytoReceive;
                        items.warehouseName = item.warehouseName;
                        items.itemCode = item.itemCode;
                        items.brandName = item.brandName;
                        items.company = item.company;
                        items.description = item.description;
                        items.insertUser = this.insertUser;
                        items.insertDatetime = this.insertDatetime;
                        items.updatedUser = this.authManager.getcurrentUser.username;
                        items.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.purItems);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.poitrecId = null;
                this.itemForm.reset();
                this.submitted = false;
            });
        } else {
            purorditemreceive001mb.insertUser = this.authManager.getcurrentUser.username;
            purorditemreceive001mb.insertDatetime = new Date();
            this.purchaseItemOrderManager.purchaseitemsave(purorditemreceive001mb).subscribe(response => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let item = deserialize<Purorditemreceive001mb>(Purorditemreceive001mb, response);
                this.purItems.push(item);
                const newItems = [JSON.parse(JSON.stringify(item))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.gridOptions.api.deselectAll();
                this.itemForm.reset();
                this.submitted = false;
            });
        }
    }
    onReset() {
        this.itemForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.purchaseItemOrderManager.purchaseItemOrderPdf().subscribe((response) =>{
            saveAs(response,"PurchaseItemOrder");

		});
	}

	onGenerateExcelReport(){
		this.purchaseItemOrderManager.purchaseItemOrderExcel().subscribe((response) => {
			saveAs(response,"PurchaseItemOrder");
        })
	}

}