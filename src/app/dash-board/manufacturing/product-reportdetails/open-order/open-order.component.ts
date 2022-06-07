import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { OpenOrderManager } from 'src/app/shared/services/restcontroller/bizservice/open-order.service';
import { ProdOrderManager } from 'src/app/shared/services/restcontroller/bizservice/prod-order.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Openprodorder001mb } from 'src/app/shared/services/restcontroller/entities/Openprodorder001mb';
import { Prodorder001mb } from 'src/app/shared/services/restcontroller/entities/Prodorder001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-open-order',
    templateUrl: './open-order.component.html',
    styleUrls: ['./open-order.component.css']
})

export class OpenOrderComponent implements OnInit {

    openOrderForm: FormGroup | any;
    submitted = false;
    frameworkComponents: any;
    prodId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    prorderCode: string = "";
    date!: Date | null;
    itemtoManufacture: string = "";
    toProduce: string | null = "";
    produced: string = "";
    empCompany: string = "";
    dummyname = "Dummy.status";
    dummytype = "dummy";
    prodOrders: Prodorder001mb[] = [];
    dummysystemproperties: Systemproperties001mb[] = [];
    openProdOrder: Openprodorder001mb[] = [];
    public gridOptions: GridOptions | any;


    constructor(private openOrderManager: OpenOrderManager,
        private prodOrderManager: ProdOrderManager,
        private systemPropertiesService: SystemPropertiesService,
        private calloutService: CalloutService, 
        private formBuilder: FormBuilder, 
        private datePipe: DatePipe,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            // linkRenderer: LinkRendererComponent,
            iconRenderer: IconRendererComponent
        }
    }

    ngOnInit() {

        this.openOrderForm = this.formBuilder.group({
            prorderCode: ['', Validators.required],
            date: ['', Validators.required],
            itemtoManufacture: ['', Validators.required],
            toProduce: ['', Validators.required],
            produced: ['', Validators.required],
            empCompany: ['', Validators.required],

        });

        this.createDataGrid001();
        this.prodOrderManager.allorders().subscribe(response => {
			this.prodOrders = deserialize<Prodorder001mb[]>(Prodorder001mb, response);
		});
        this.systemPropertiesService.system(this.dummyname, this.dummytype).subscribe(response => {
            this.dummysystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.openOrderManager.allopenprod().subscribe((response => {
            this.openProdOrder = deserialize<Openprodorder001mb[]>(Openprodorder001mb, response);
            if (this.openProdOrder.length > 0) {
                this.gridOptions?.api?.setRowData(this.openProdOrder);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        }))
    }
    get f() { return this.openOrderForm.controls; }

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
                headerName: '#Id',
                field: 'prodId',
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
                headerName: 'Production Order Code',
                field: 'prorderCode',
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
                headerName: 'Item To Manufacture',
                field: 'itemtoManufacture',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {

                headerName: 'To Produced',
                field: 'toProduce',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Produced',
                field: 'produced',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Company',
                field: 'empCompany',
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
        this.prodId = params.data.prodId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.openOrderForm.patchValue({
            'date': this.datePipe.transform(params.data.date, 'MM/dd/yyyy'),
            'empCompany': params.data.empCompany,
            'itemtoManufacture': params.data.itemtoManufacture,
            'produced': params.data.produced,
            'prorderCode': params.data.prorderCode,
            'toProduce': params.data.toProduce,
        })
    }

    onDeleteButtonClick(params: any) {
        this.openOrderManager.openprodelete(params.data.prodId).subscribe(response => {
            for (let i = 0; i < this.openProdOrder.length; i++) {
                if (this.openProdOrder[i].prodId == params.data.prodId) {
                    this.openProdOrder?.splice(i, 1);
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
        modalRef.componentInstance.title = "Open Production Order";
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

    onOrderClick(event: any, openOrderForm: any) {
        this.markFormGroupTouched(this.openOrderForm);
        this.submitted = true;
        if (this.openOrderForm.invalid) {
            return;
        }
        // this.datePipe.transform(this.f.daysinlstord.value, 'MM/dd/yyyy')

        let openprodorder = new Openprodorder001mb();
        openprodorder.date = new Date(this.f.date.value);
        openprodorder.empCompany = this.f.empCompany.value ? this.f.empCompany.value : "";
        openprodorder.itemtoManufacture = this.f.itemtoManufacture.value ? this.f.itemtoManufacture.value : "";
        openprodorder.produced = this.f.produced.value ? this.f.produced.value : "";
        openprodorder.prorderCode = this.f.prorderCode.value ? this.f.prorderCode.value : "";
        openprodorder.toProduce = this.f.toProduce.value ? this.f.toProduce.value : "";

        if (this.prodId) {
            openprodorder.prodId = this.prodId;
            openprodorder.insertUser = this.insertUser;
			openprodorder.insertDatetime = this.insertDatetime;
            openprodorder.updatedUser = this.authManager.getcurrentUser.username;
			openprodorder.updatedDatetime = new Date();
            this.openOrderManager.openproupdate(openprodorder).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let openprodResp = deserialize<Openprodorder001mb>(Openprodorder001mb, response);
                for (let open of this.openProdOrder) {
                    if (open.prodId == openprodResp.prodId) {
                        open.date = openprodResp.date;
                        open.empCompany = openprodResp.empCompany;
                        open.itemtoManufacture = openprodResp.itemtoManufacture;
                        open.produced = openprodResp.produced;
                        open.prorderCode = openprodResp.prorderCode;
                        open.toProduce = openprodResp.toProduce;
                        open.insertUser = this.insertUser;
                        open.insertDatetime = this.insertDatetime;
                        open.updatedUser = this.authManager.getcurrentUser.username;
                        open.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.openProdOrder);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.openOrderForm.reset();
                this.prodId = null;
                this.submitted = false;
            })
        }

        else {
            openprodorder.insertUser = this.authManager.getcurrentUser.username;
			openprodorder.insertDatetime = new Date();
            this.openOrderManager.openprosave(openprodorder).subscribe(response => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let openprod = deserialize<Openprodorder001mb>(Openprodorder001mb, response);
                this.openProdOrder.push(openprod);
                const newItems = [JSON.parse(JSON.stringify(openprod))];
                this.gridOptions.api.applyTransaction({ add: newItems, addIndex: -1 });
                this.openOrderForm.reset();
                this.submitted = false;
            })
        }
    }
    onReset() {
        this.openOrderForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.openOrderManager.openOrderPdf().subscribe((response) =>{
			saveAs(response," OpenProductOrderList");

		});
	}

	onGenerateExcelReport(){
		this.openOrderManager.openOrderExcel().subscribe((response) => {
			saveAs(response," OpenProductOrderList");
        })
	}

}
