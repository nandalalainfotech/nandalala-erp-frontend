import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { LinkRendererComponent } from 'src/app/shared/services/renderercomponent/link-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { CompleteOrderManager } from 'src/app/shared/services/restcontroller/bizservice/complete-order.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Compprodorder001mb } from 'src/app/shared/services/restcontroller/entities/Compprodorder001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-complete-order',
    templateUrl: './complete-order.component.html',
    styleUrls: ['./complete-order.component.css']
})
export class CompleteOrderComponent implements OnInit {

    completeForm: FormGroup | any;
    submitted = false;

    prodId: number|any;
    insertUser: string = "";
    insertDatetime: Date | any;
    frameworkComponents: any;
    prorderCode: string = "";
    date: Date|any ;
    itemtoManufacture: string = "";
    toProduce: string | null = "";
    produced: string = "";
    empCompany: string = "";
    dummyname = "Dummy.status";
    dummytype = "dummy";
    dummysystemproperties: Systemproperties001mb[] = [];
    compProdOrder: Compprodorder001mb[] = [];
    public gridOptions: GridOptions | any;

    constructor(private completeOrderManager: CompleteOrderManager,
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

        this.completeForm = this.formBuilder.group({
            prorderCode: ['', Validators.required],
            date: ['', Validators.required],
            itemtoManufacture: ['', Validators.required],
            toProduce: ['', Validators.required],
            produced: ['', Validators.required],
            empCompany: ['', Validators.required]
        });

        this.createDataGrid001();
        this.systemPropertiesService.system(this.dummyname, this.dummytype).subscribe(response => {
            this.dummysystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.completeOrderManager.allcompprod().subscribe((response => {
            this.compProdOrder = deserialize<Compprodorder001mb[]>(Compprodorder001mb, response);
            if (this.compProdOrder.length > 0) {
                this.gridOptions?.api?.setRowData(this.compProdOrder);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        }))
    }

    get f() { return this.completeForm.controls; }

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
                headerName: 'To Produce',
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
				width: 150,
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
        this.completeForm.patchValue({
            'date': this.datePipe.transform(params.data.date, 'MM/dd/yyyy'),
            'empCompany': params.data.empCompany,
            'itemtoManufacture': params.data.itemtoManufacture,
            'produced': params.data.produced,
            'prorderCode': params.data.prorderCode,
            'toProduce': params.data.toProduce,
        })
    }

    onDeleteButtonClick(params: any) {
        this.completeOrderManager.completedelete(params.data.prodId).subscribe(response => {
            for (let i = 0; i < this.compProdOrder.length; i++) {
                if (this.compProdOrder[i].prodId == params.data.prodId) {
                    this.compProdOrder?.splice(i, 1);
                    break;
                }
            }
            const selectedRows = params.api.getSelectedRows();
            params.api.applyTransaction({ remove: selectedRows });
            this.calloutService.showSuccess("Order Removed Successfully");
        }
        )
    }

    onAuditButtonClick(params: any) {
		const modalRef = this.modalService.open(AuditComponent);
        modalRef.componentInstance.title = "Completed Production Order";
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

    onOrderClick(event: any, completeForm: any) {

        this.markFormGroupTouched(this.completeForm);
        this.submitted = true;
        if (this.completeForm.invalid) {
            return;
        }

        let compprodorder001mb = new Compprodorder001mb();
        compprodorder001mb.date = new Date(this.f.date.value);
        compprodorder001mb.empCompany = this.f.empCompany.value ? this.f.empCompany.value : "";
        compprodorder001mb.itemtoManufacture = this.f.itemtoManufacture.value ? this.f.itemtoManufacture.value : "";
        compprodorder001mb.produced = this.f.produced.value ? this.f.produced.value : "";
        compprodorder001mb.prorderCode = this.f.prorderCode.value ? this.f.prorderCode.value : "";
        compprodorder001mb.toProduce = this.f.toProduce.value ? this.f.toProduce.value : "";

        if (this.prodId) {
            compprodorder001mb.prodId = this.prodId;
            compprodorder001mb.insertUser = this.insertUser;
			compprodorder001mb.insertDatetime = this.insertDatetime;
            compprodorder001mb.updatedUser = this.authManager.getcurrentUser.username;
			compprodorder001mb.updatedDatetime = new Date();
            this.completeOrderManager.completeupdate(compprodorder001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let compprod = deserialize<Compprodorder001mb>(Compprodorder001mb, response);
                for (let com of this.compProdOrder) {
                    if (com.prodId == compprod.prodId) {
                        com.date = compprod.date;
                        com.empCompany = compprod.empCompany;
                        com.itemtoManufacture = compprod.itemtoManufacture;
                        com.produced = compprod.produced;
                        com.prorderCode = compprod.prorderCode;
                        com.toProduce = compprod.toProduce;
                        com.insertUser = this.insertUser;
                        com.insertDatetime = this.insertDatetime;
                        com.updatedUser = this.authManager.getcurrentUser.username;
                        com.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.compProdOrder);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.completeForm.reset();
                this.prodId = null;
                this.submitted = false;
            })
        } else {
            compprodorder001mb.insertUser = this.authManager.getcurrentUser.username;
			compprodorder001mb.insertDatetime = new Date();
            this.completeOrderManager.completesave(compprodorder001mb).subscribe(response => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let compprod = deserialize<Compprodorder001mb>(Compprodorder001mb, response);
                this.compProdOrder.push(compprod);
                const newItems = [JSON.parse(JSON.stringify(compprod))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.completeForm.reset();
                this.submitted = false;
            })
        }
    }
    onReset() {
        this.completeForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.completeOrderManager.completeOrderPdf().subscribe((response) =>{
			saveAs(response,'CompleteOrderList');

		});
	}

	onGenerateExcelReport(){
		this.completeOrderManager.completeOrderExcel().subscribe((response) => {
			saveAs(response,'CompleteOrderList');
        })
	}
}




