import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { ProdOrderManager } from 'src/app/shared/services/restcontroller/bizservice/prod-order.service';
import { ProgressOrderManager } from 'src/app/shared/services/restcontroller/bizservice/progress-order.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Prodorder001mb } from 'src/app/shared/services/restcontroller/entities/Prodorder001mb';
import { Progprodorder001mb } from 'src/app/shared/services/restcontroller/entities/Progprodorder001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-progress-order',
    templateUrl: './progress-order.component.html',
    styleUrls: ['./progress-order.component.css']
})
export class ProgressOrderComponent implements OnInit {

    progressForm: FormGroup | any;
    submitted = false;

    prodId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    frameworkComponents: any;
    prorderCode: string = "";
    date: Date | null = null;
    itemtoManufacture: string = "";
    toProduce: string | null = "";
    produced: string = "";
    empCompany: string = "";
    dummyname = "Dummy.status";
    dummytype = "dummy";
    prodOrders: Prodorder001mb[] = [];
    dummysystemproperties: Systemproperties001mb[] = [];
    progProdOrder: Progprodorder001mb[] = [];
    public gridOptions: GridOptions | any;

    constructor(private progressOrderManager: ProgressOrderManager,
        private systemPropertiesService: SystemPropertiesService,
        private calloutService: CalloutService, 
        private formBuilder: FormBuilder, 
        private datePipe: DatePipe,
        private prodOrderManager: ProdOrderManager,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            // linkRenderer: LinkRendererComponent,
            iconRenderer: IconRendererComponent
        }
    }

    ngOnInit() {

        this.progressForm = this.formBuilder.group({
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
        this.progressOrderManager.allprogress().subscribe((response => {
            this.progProdOrder = deserialize<Progprodorder001mb[]>(Progprodorder001mb, response);
            if (this.progProdOrder.length > 0) {
                this.gridOptions?.api?.setRowData(this.progProdOrder);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        }))
    }

    get f() { return this.progressForm.controls; }

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
        this.progressForm.patchValue({
            'date': this.datePipe.transform(params.data.date, 'MM/dd/yyyy'),
            'empCompany': params.data.empCompany,
            'itemtoManufacture': params.data.itemtoManufacture,
            'produced': params.data.produced,
            'prorderCode': params.data.prorderCode,
            'toProduce': params.data.toProduce,
        })
    }

    onDeleteButtonClick(params: any) {
        this.progressOrderManager.progdelete(params.data.prodId).subscribe(response => {
            for (let i = 0; i < this.progProdOrder.length; i++) {
                if (this.progProdOrder[i].prodId == params.data.prodId) {
                    this.progProdOrder?.splice(i, 1);
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
        modalRef.componentInstance.title = "Production Order In Progress";
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

    onOrderClick(event: any, progressForm: any) {

        this.markFormGroupTouched(this.progressForm);
        this.submitted = true;
        if (this.progressForm.invalid) {
            return;
        }

        let progprodorder001mb = new Progprodorder001mb();
        progprodorder001mb.date = new Date(this.f.date.value);
        progprodorder001mb.empCompany = this.f.empCompany.value ? this.f.empCompany.value : "";
        progprodorder001mb.itemtoManufacture = this.f.itemtoManufacture.value ? this.f.itemtoManufacture.value : "";
        progprodorder001mb.produced = this.f.produced.value ? this.f.produced.value : "";
        progprodorder001mb.prorderCode = this.f.prorderCode.value ? this.f.prorderCode.value : "";
        progprodorder001mb.toProduce = this.f.toProduce.value ? this.f.toProduce.value : "";

        if (this.prodId) {
            progprodorder001mb.prodId = this.prodId;
            progprodorder001mb.insertUser = this.insertUser;
			progprodorder001mb.insertDatetime = this.insertDatetime;
            progprodorder001mb.updatedUser = this.authManager.getcurrentUser.username;
			progprodorder001mb.updatedDatetime = new Date();
            this.progressOrderManager.progprodupdate(progprodorder001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let openprod = deserialize<Progprodorder001mb>(Progprodorder001mb, response);
                for (let prog of this.progProdOrder) {
                    if (prog.prodId == openprod.prodId) {
                        prog.date = openprod.date;
                        prog.empCompany = openprod.empCompany;
                        prog.itemtoManufacture = openprod.itemtoManufacture;
                        prog.produced = openprod.produced;
                        prog.prorderCode = openprod.prorderCode;
                        prog.toProduce = openprod.toProduce;
                        prog.insertUser = this.insertUser;
                        prog.insertDatetime = this.insertDatetime;
                        prog.updatedUser = this.authManager.getcurrentUser.username;
                        prog.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.progProdOrder);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.progressForm.reset();
                this.prodId = null;
                this.submitted = false;
            })
        }
        else {
            progprodorder001mb.insertUser = this.authManager.getcurrentUser.username;
			progprodorder001mb.insertDatetime = new Date();
            this.progressOrderManager.progprodsave(progprodorder001mb).subscribe(response => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let openprod = deserialize<Progprodorder001mb>(Progprodorder001mb, response);
                this.progProdOrder.push(openprod);
                const newItems = [JSON.parse(JSON.stringify(openprod))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.progressForm.reset();
                this.submitted = false;
            })
        }
    }
    onReset() {
        this.progressForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.progressOrderManager.progressOrderPdf().subscribe((response) =>{
			saveAs(response," progressOrderList");

		});
	}

	onGenerateExcelReport(){
		this.progressOrderManager.progressOrderExcel().subscribe((response) => {
			saveAs(response," progressOrderList");
        })
	}

}
