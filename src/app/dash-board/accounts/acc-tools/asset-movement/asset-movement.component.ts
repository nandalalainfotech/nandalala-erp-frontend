import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AssetMovementManager } from 'src/app/shared/services/restcontroller/bizservice/asset-movement.service';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Assetmovement001mb } from 'src/app/shared/services/restcontroller/entities/Assetmovement001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-asset-movement',
    templateUrl: './asset-movement.component.html',
    styleUrls: ['./asset-movement.component.css']
})

export class AssetMovementComponent implements OnInit {

    assetMovForm: FormGroup | any;
    submitted = false;
    id: number|any;
    insertUser: string = "";
    insertDatetime: Date | any;
    frameworkComponents: any;
    asset: string | null = "";
    company: string | null = "";
    targetwarehouse: string | null = "";
    transactiondate: Date | null = null;
    dummyname = "Dummy.status";
    dummytype = "dummy";
    dummysystemproperties: Systemproperties001mb[] = [];
    assetMove: Assetmovement001mb[] = [];
    public gridOptions: GridOptions | any;

    constructor(private assetMovementManager: AssetMovementManager, 
        private formBuilder: FormBuilder,
        private systemPropertiesService: SystemPropertiesService,
        private calloutService: CalloutService, 
        private datePipe: DatePipe,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent,
        }
    }

    ngOnInit() {
        this.assetMovForm = this.formBuilder.group({
            asset: ['', Validators.required],
            company: ['', Validators.required],
            targetwarehouse: ['', Validators.required],
            transactiondate: ['', Validators.required]
        });

        this.createDataGrid001();
        this.systemPropertiesService.system(this.dummyname, this.dummytype).subscribe(response => {
            this.dummysystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.assetMovementManager.allassmove().subscribe((response) => {
            this.assetMove = deserialize<Assetmovement001mb[]>(Assetmovement001mb, response);
            if (this.assetMove.length > 0) {
                this.gridOptions?.api?.setRowData(this.assetMove);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    get f() { return this.assetMovForm.controls; }

    createDataGrid001(): void {
        this.gridOptions = {
            paginationPageSize: 10,
            rowSelection: 'single',
            onFirstDataRenderer: this.onFirstDataRendered.bind(this),
        };
        this.gridOptions.editType = 'fullRow';
        this.gridOptions.enableRangeSelection = true;
        this.gridOptions.animateRows = true;
        this.gridOptions.columnDefs = [
            {
                headerName: '#ID',
                field: 'id',
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
                headerName: 'Transaction Date',
                field: 'transactiondate',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: (params: any) => {
                    return params.data.transactiondate ? this.datePipe.transform(params.data.transactiondate, 'MM/dd/yyyy') : '';
                }
            },
            {
                headerName: 'Asset',
                field: 'asset',
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
                headerName: 'Target Warehouse',
                field: 'targetwarehouse',
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
                }
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
                }
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
        this.id = params.data.id;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.assetMovForm.patchValue({
            'asset': params.data.asset,
            'company': params.data.company,
            'targetwarehouse': params.data.targetwarehouse,
            'transactiondate': this.datePipe.transform(params.data.transactiondate, 'MM/dd/yyyy'),
        });
    }

    onDeleteButtonClick(params: any) {
        this.assetMovementManager.assmovedelete(params.data.id).subscribe((response) => {
            for (let i = 0; i < this.assetMove.length; i++) {
                if (this.assetMove[i].id == params.data.id) {
                    this.assetMove?.splice(i, 1);
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
        modalRef.componentInstance.title = "Asset Movement";
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

    onOrderClick(event: any, assetMovForm: any) {
        this.markFormGroupTouched(this.assetMovForm);
        this.submitted = true;
        if (this.assetMovForm.invalid) {
            return;
        }
        let assetmovement001mb = new Assetmovement001mb();
        assetmovement001mb.asset = this.f.asset.value ? this.f.asset.value : "";
        assetmovement001mb.company = this.f.company.value ? this.f.company.value : "";
        assetmovement001mb.targetwarehouse = this.f.targetwarehouse.value ? this.f.targetwarehouse.value : "";
        assetmovement001mb.transactiondate = new Date(this.f.transactiondate.value);
        if (this.id) {
            assetmovement001mb.id =this.id;
            assetmovement001mb.insertUser = this.insertUser;
			assetmovement001mb.insertDatetime = this.insertDatetime;
            assetmovement001mb.updatedUser = this.authManager.getcurrentUser.username;
			assetmovement001mb.updatedDatetime = new Date();
            this.assetMovementManager.assmoveupdate(assetmovement001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let asset = deserialize<Assetmovement001mb>(Assetmovement001mb, response);
                for (let ass of this.assetMove) {
                    if (ass.id == asset.id) {
                        ass.asset = asset.asset;
                        ass.company = asset.company;
                        ass.targetwarehouse = asset.targetwarehouse;
                        ass.transactiondate = asset.transactiondate;
                        ass.insertUser = this.insertUser;
                        ass.insertDatetime = this.insertDatetime;
                        ass.updatedUser = this.authManager.getcurrentUser.username;
                        ass.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.assetMove);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.assetMovForm.reset();
                this.id = null;
                this.submitted = false;
            })

        }
        else {
            assetmovement001mb.insertUser = this.authManager.getcurrentUser.username;
			assetmovement001mb.insertDatetime = new Date();
            this.assetMovementManager.assmovesave(assetmovement001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let asset = deserialize<Assetmovement001mb>(Assetmovement001mb, response);
                const newItems = [JSON.parse(JSON.stringify(asset))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.gridOptions.api.deselectAll();
                this.assetMovForm.reset();
                this.submitted = false;
            })
        }
    }

    onReset() {
        this.submitted = false;
        this.assetMovForm.reset();
    }

    onGeneratePdfReport(){
		this.assetMovementManager.assetMovementPdf().subscribe((response) =>{
            saveAs(response,"AccountsPayableList");

		});
	}

	onGenerateExcelReport(){
		this.assetMovementManager.assetMovementExcel().subscribe((response) => {
			saveAs(response,"AccountsPayableList");
        })
	}


}
