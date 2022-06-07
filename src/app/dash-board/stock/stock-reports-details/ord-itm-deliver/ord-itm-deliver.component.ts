import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { OrderItemDeliverManager } from 'src/app/shared/services/restcontroller/bizservice/order-item-deliver.service';
import { ProjecttManager } from 'src/app/shared/services/restcontroller/bizservice/projectt.service';
import { SalesItemManager } from 'src/app/shared/services/restcontroller/bizservice/sales-item.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { WareHouseManager } from 'src/app/shared/services/restcontroller/bizservice/ware-house.service';
import { Itemdt001mb } from 'src/app/shared/services/restcontroller/entities/Itemdt001mb';
import { Orditemsdeliver001mb } from 'src/app/shared/services/restcontroller/entities/Orditemsdeliver001mb';
import { Project001mb } from 'src/app/shared/services/restcontroller/entities/Project001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { Warehouse001mb } from 'src/app/shared/services/restcontroller/entities/Warehouse001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-ord-itm-deliver',
    templateUrl: './ord-itm-deliver.component.html',
    styleUrls: ['./ord-itm-deliver.component.css']
})

export class OrdItmDeliverComponent implements OnInit {

    frameworkComponents: any;
    orditemsId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    grpname: string = "Supplier.Type";
    grptype: string = "Type";
    dummyname = "Dummy.status";
    dummytype = "dummy";
    sorderName: string = "";
    customername: string = "";
    date!: Date | null;
    projectName: string | null = "";
    quantity: string = "";
    deliverQty: string = "";
    qtytoDeliver: string = "";
    rate: string | null = "";
    amount: string | null = "";
    amttoDeliver: string | null = "";
    availableQty: string = "";
    expectedQty: string | null = "";
    projectedQty: string | null = "";
    itemCode: string = "";
    warehouseName: string = "";
    itemGroup: string = "";
    description: string = "";
    ordDelivers: Orditemsdeliver001mb[] = [];
    custmersystemproperties?: Systemproperties001mb[] = [];
    prjtsystemproperties?: Systemproperties001mb[] = [];
    itmsystemproperties?: Systemproperties001mb[] = [];
    wrhousesystemproperties?: Systemproperties001mb[] = [];
    grpsystemproperties?: Systemproperties001mb[] = [];
    public gridOptions: GridOptions | any;
    deliverForm: FormGroup | any;
    submitted = false;
    projectt: Project001mb[] = [];
    stkitems: Itemdt001mb[] = [];
    wrHouses: Warehouse001mb[] = [];
    dummysystemproperties: Systemproperties001mb[] = [];

    constructor(private systemPropertiesService: SystemPropertiesService, 
        private wareHouseManager: WareHouseManager, 
        private salesItemManager: SalesItemManager, 
        private projecttManager: ProjecttManager, 
        private datePipe: DatePipe, 
        private formBuilder: FormBuilder,
        private orderItemDeliverManager: OrderItemDeliverManager, 
        private calloutService: CalloutService,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent
        }
    }

    ngOnInit() {

        this.deliverForm = this.formBuilder.group({
            sorderName: ['', Validators.required],
            customername: ['', Validators.required],
            date: ['', Validators.required],
            projectName: ['', Validators.required],
            quantity: ['', Validators.required],
            deliverQty: ['', Validators.required],
            qtytoDeliver: ['', Validators.required],
            rate: ['', Validators.required],
            amount: ['', Validators.required],
            amttoDeliver: ['', Validators.required],
            availableQty: ['', Validators.required],
            expectedQty: ['', Validators.required],
            projectedQty: ['', Validators.required],
            itemCode: ['', Validators.required],
            warehouseName: ['', Validators.required],
            itemGroup: ['', Validators.required],
            description: ['', Validators.required]

        });
        this.createDataGrid001mb();
        this.systemPropertiesService.system(this.grpname, this.grptype).subscribe(response => {
            this.grpsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        }),
            this.projecttManager.allproject().subscribe((response) => {
                this.projectt = deserialize<Project001mb[]>(Project001mb, response);
            })
        this.wareHouseManager.allwrhouse().subscribe(response => {
            this.wrHouses = deserialize<Warehouse001mb[]>(Warehouse001mb, response);
        })
        this.salesItemManager.allsalesitem().subscribe((response) => {
            this.stkitems = deserialize<Itemdt001mb[]>(Itemdt001mb, response);
        })
        this.systemPropertiesService.system(this.dummyname, this.dummytype).subscribe(response => {
            this.custmersystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.orderItemDeliverManager.allorddeliver().subscribe(response => {
            this.ordDelivers = deserialize<Orditemsdeliver001mb[]>(Orditemsdeliver001mb, response);
            if (this.ordDelivers.length > 0) {
                this.gridOptions?.api?.setRowData(this.ordDelivers);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }
    get f() { return this.deliverForm.controls; }
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
                field: 'orditemsId',
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
                headerName: 'Sales Order',
                field: 'sorderName',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Customer',
                field: 'customername',
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
                headerName: 'Deliver Quantity',
                field: 'deliverQty',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Quantity To Deliver',
                field: 'qtytoDeliver',
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
                headerName: 'Amount To Deliver',
                field: 'amttoDeliver',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Available Quantity',
                field: 'availableQty',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Expected Qty',
                field: 'expectedQty',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Projected Qty',
                field: 'projectedQty',
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
                headerName: 'Item Group',
                field: 'itemGroup',
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
                width: 300,
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
                width: 250,
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
        this.orditemsId = params.data.orditemsId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.deliverForm.patchValue({
            'sorderName': params.data.sorderName,
            'customername': params.data.customername,
            'date': this.datePipe.transform(params.data.date, 'MM/dd/yyyy'),
            'projectName': params.data.projectName,
            'quantity': params.data.quantity,
            'deliverQty': params.data.deliverQty,
            'qtytoDeliver': params.data.qtytoDeliver,
            'rate': params.data.rate,
            'amount': params.data.amount,
            'amttoDeliver': params.data.amttoDeliver,
            'availableQty': params.data.availableQty,
            'expectedQty': params.data.expectedQty,
            'projectedQty': params.data.projectedQty,
            'itemCode': params.data.itemCode,
            'warehouseName': params.data.warehouseName,
            'itemGroup': params.data.itemGroup,
            'description': params.data.description,
        });
    }
    
    onDeleteButtonClick(params: any) {
        this.orderItemDeliverManager.orddeliverdelete(params.data.orditemsId).subscribe(response => {
            for (let i = 0; i < this.ordDelivers.length; i++) {
                if (this.ordDelivers[i].orditemsId == params.data.orditemsId) {
                    this.ordDelivers?.splice(i, 1);
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
        modalRef.componentInstance.title = "Order Item Delivered";
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

    onOrderClick(event: any, deliverForm: any) {

        this.markFormGroupTouched(this.deliverForm);
        this.submitted = true;
        if (this.deliverForm.invalid) {
            return;
        }

        let orditemsdeliver001mb = new Orditemsdeliver001mb();

        orditemsdeliver001mb.date = new Date(this.f.date.value);
        orditemsdeliver001mb.sorderName = this.f.sorderName.value ? this.f.sorderName.value : "";
        orditemsdeliver001mb.customername = this.f.customername.value ? this.f.customername.value : "";
        orditemsdeliver001mb.projectName = this.f.projectName.value ? this.f.projectName.value : "";
        orditemsdeliver001mb.quantity = this.f.quantity.value ? this.f.quantity.value : null;
        orditemsdeliver001mb.deliverQty = this.f.deliverQty.value ? this.f.deliverQty.value : null;
        orditemsdeliver001mb.qtytoDeliver = this.f.qtytoDeliver.value ? this.f.qtytoDeliver.value : null;
        orditemsdeliver001mb.rate = this.f.rate.value ? this.f.rate.value : "";
        orditemsdeliver001mb.amount = this.f.amount.value ? this.f.amount.value : "";
        orditemsdeliver001mb.amttoDeliver = this.f.amttoDeliver.value ? this.f.amttoDeliver.value : "";
        orditemsdeliver001mb.availableQty = this.f.availableQty.value ? this.f.availableQty.value : "";
        orditemsdeliver001mb.expectedQty = this.f.expectedQty.value ? this.f.expectedQty.value : "";
        orditemsdeliver001mb.projectedQty = this.f.projectedQty.value ? this.f.projectedQty.value : "";
        orditemsdeliver001mb.itemCode = this.f.itemCode.value ? this.f.itemCode.value : "";
        orditemsdeliver001mb.warehouseName = this.f.warehouseName.value ? this.f.warehouseName.value : "";
        orditemsdeliver001mb.itemGroup = this.f.itemGroup.value ? this.f.itemGroup.value : "";
        orditemsdeliver001mb.description = this.f.description.value ? this.f.description.value : "";
        if (this.orditemsId) {
            orditemsdeliver001mb.orditemsId = this.orditemsId;
            orditemsdeliver001mb.insertUser = this.insertUser;
            orditemsdeliver001mb.insertDatetime = this.insertDatetime;
            orditemsdeliver001mb.updatedUser = this.authManager.getcurrentUser.username;
            orditemsdeliver001mb.updatedDatetime = new Date();
            this.orderItemDeliverManager.orddeliversave(orditemsdeliver001mb).subscribe(response => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let delivers = deserialize<Orditemsdeliver001mb>(Orditemsdeliver001mb, response);
                for (let items of this.ordDelivers) {
                    if (items.orditemsId == delivers.orditemsId) {
                        items.itemCode = delivers.itemCode;
                        items.sorderName = delivers.sorderName;
                        items.customername = delivers.customername;
                        items.date = delivers.date;
                        items.projectName = delivers.projectName;
                        items.quantity = delivers.quantity;
                        items.deliverQty = delivers.deliverQty;
                        items.qtytoDeliver = delivers.qtytoDeliver
                        items.rate = delivers.rate;
                        items.amount = delivers.amount;
                        items.amttoDeliver = delivers.amttoDeliver;
                        items.availableQty = delivers.availableQty;
                        items.expectedQty = delivers.expectedQty;
                        items.projectedQty = delivers.projectedQty;
                        items.warehouseName = delivers.warehouseName;
                        items.itemGroup = delivers.itemGroup;
                        items.description = delivers.description;
                        items.insertUser = this.insertUser;
                        items.insertDatetime = this.insertDatetime;
                        items.updatedUser = this.authManager.getcurrentUser.username;
                        items.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.ordDelivers);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.deliverForm.reset();
                this.submitted = false;
                this.orditemsId = null;
            });
        } else {
            orditemsdeliver001mb.insertUser = this.authManager.getcurrentUser.username;
            orditemsdeliver001mb.insertDatetime = new Date();
            this.orderItemDeliverManager.orddeliversave(orditemsdeliver001mb).subscribe(response => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let delivers = deserialize<Orditemsdeliver001mb>(Orditemsdeliver001mb, response);
                this.ordDelivers.push(delivers);
                const newItems = [JSON.parse(JSON.stringify(delivers))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.gridOptions.api.deselectAll();
                this.deliverForm.reset();
                this.submitted = false;
            });
        }
    }
    onReset() {
        this.deliverForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.orderItemDeliverManager.orderItemDeliverPdf().subscribe((response) =>{
            saveAs(response,"OrderItemDeliver");

		});
	}

	onGenerateExcelReport(){
		this.orderItemDeliverManager.orderItemDeliverExcel().subscribe((response) => {
			saveAs(response,"OrderItemDeliver");
        })
	}

}