import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { LandCostManager } from 'src/app/shared/services/restcontroller/bizservice/tool-landcost.service';
import { Landcostvouch001mb } from 'src/app/shared/services/restcontroller/entities/Landcostvouch001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';


@Component({
    selector: 'app-land-cost-voucher',
    templateUrl: './land-cost-voucher.component.html',
    styleUrls: ['./land-cost-voucher.component.css']
})
export class LandCostVoucherComponent implements OnInit {

    frameworkComponents: any;
    submitted = false;
    costsForm: FormGroup | any;
    vouchId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    name: string = "pubase.type";
    type: string = "type";
    tname: string = "prsupp.type";
    ttype: string = "type";
    series: string = "";
    company: string = "";
    recptdocType: string = "";
    recptdoc: string = "";
    supName: string = "";
    grandTotal: number | any;
    landCost: Landcostvouch001mb[] = [];
    systemproperties?: Systemproperties001mb[] = [];
    fsystemproperties?: Systemproperties001mb[] = [];
    public gridOptions: GridOptions | any;

    constructor(private systemPropertiesService: SystemPropertiesService,
        private landCostManager: LandCostManager,
        private calloutService: CalloutService,
        private formBuilder: FormBuilder,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent
        }
    }

    ngOnInit() {
        this.costsForm = this.formBuilder.group({
            supName: ['', Validators.required],
            company: ['', Validators.required],
            recptdocType: ['', Validators.required],
            recptdoc: ['', Validators.required],
            series: ['', Validators.required],
            grandTotal: ['', Validators.required],
        })
        this.createDataGrid001();

        this.systemPropertiesService.system(this.name, this.type).subscribe(response => {
            this.systemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        });
        this.systemPropertiesService.system(this.tname, this.ttype).subscribe(response => {
            this.fsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        });
        this.landCostManager.allland().subscribe((response) => {
            this.landCost = deserialize<Landcostvouch001mb[]>(Landcostvouch001mb, response);
            if (this.landCost.length > 0) {
                this.gridOptions?.api?.setRowData(this.landCost);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    get f() { return this.costsForm.controls; }

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
                headerName: '#Id',
                field: 'vouchId',
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
                headerName: 'Series',
                field: 'series',
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
                headerName: 'Receipt Doc Type',
                field: 'recptdocType',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Receipt Doc',
                field: 'recptdoc',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Supplier',
                field: 'supName',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Grand Total',
                field: 'grandTotal',
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
        ];
    }


    onEditButtonClick(params: any) {
        this.vouchId = params.data.vouchId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.costsForm.patchValue({
            'series': params.data.series,
            'company': params.data.company,
            'recptdocType': params.data.recptdocType,
            'recptdoc': params.data.recptdoc,
            'supName': params.data.supName,
            'grandTotal': params.data.grandTotal,
        })
    }


    onDeleteButtonClick(params: any) {
        this.landCostManager.deleteland(params.data.vouchId).subscribe((response) => {
            for (let i = 0; i < this.landCost.length; i++) {
                if (this.landCost[i].vouchId == params.data.vouchId) {
                    this.landCost?.splice(i, 1);
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
        modalRef.componentInstance.title = "Land Cost Voucher";
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

    onOrderClick(event: any, costs: any) {
        this.markFormGroupTouched(this.costsForm);
        this.submitted = true;

        // stop here if form is invalid
        if (this.costsForm.invalid) {
            return;
        }
        let landcostvouch001mb = new Landcostvouch001mb();
        landcostvouch001mb.series = this.f.series.value ? this.f.series.value : "";
        landcostvouch001mb.company = this.f.company.value ? this.f.company.value : "";
        landcostvouch001mb.recptdocType = this.f.recptdocType.value ? this.f.recptdocType.value : "";
        landcostvouch001mb.recptdoc = this.f.recptdoc.value ? this.f.recptdoc.value : "";
        landcostvouch001mb.supName = this.f.supName.value ? this.f.supName.value : "";
        landcostvouch001mb.grandTotal = this.f.grandTotal.value ? this.f.grandTotal.value : null;
        if (this.vouchId) {
            landcostvouch001mb.vouchId = this.vouchId;
            landcostvouch001mb.insertUser = this.insertUser;
            landcostvouch001mb.insertDatetime = this.insertDatetime;
            landcostvouch001mb.updatedUser = this.authManager.getcurrentUser.username;
            landcostvouch001mb.updatedDatetime = new Date();
            this.landCostManager.updateland(landcostvouch001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let landcostres = deserialize<Landcostvouch001mb>(Landcostvouch001mb, response);
                for (let landcost of this.landCost) {
                    if (landcost.vouchId == landcostres.vouchId) {
                        landcost.series = landcostres.series;
                        landcost.company = landcostres.company;
                        landcost.recptdocType = landcostres.recptdocType;
                        landcost.recptdoc = landcostres.recptdoc;
                        landcost.supName = landcostres.supName;
                        landcost.grandTotal = landcostres.grandTotal;
                        landcost.insertUser = this.insertUser;
                        landcost.insertDatetime = this.insertDatetime;
                        landcost.updatedUser = this.authManager.getcurrentUser.username;
                        landcost.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.landCost);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.costsForm.reset();
                this.submitted = false;
                this.vouchId = null;
            })
        }
        else {
            landcostvouch001mb.insertUser = this.authManager.getcurrentUser.username;
            landcostvouch001mb.insertDatetime = new Date();
            this.landCostManager.saveland(landcostvouch001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let cost = deserialize<Landcostvouch001mb>(Landcostvouch001mb, response);
                this.landCost.push(cost);
                const newItems = [JSON.parse(JSON.stringify(cost))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.costsForm.reset();
                this.submitted = false;
            })
        }
    }


    onReset() {
        this.costsForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport() {
		this.landCostManager.landCostPdf().subscribe((response) => {
			saveAs(response, "VoucherList");

		});
	}

	onGenerateExcelReport() {
		this.landCostManager.landCostExcel().subscribe((response) => {
			saveAs(response, "VoucherList");
		});
	}
}