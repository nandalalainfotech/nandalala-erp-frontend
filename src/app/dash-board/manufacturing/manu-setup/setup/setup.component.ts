import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { SetupManager } from 'src/app/shared/services/restcontroller/bizservice/setupservice';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Manufactureset001mb } from 'src/app/shared/services/restcontroller/entities/Manufactureset001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-setup',
    templateUrl: './setup.component.html',
    styleUrls: ['./setup.component.css']
})

export class SetupComponent implements OnInit {
    setUpForm: FormGroup | any;
    submitted = false;
    frameworkComponents: any;
    mansetId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    setup: Form | undefined;
    disableCPandTt: boolean = false;
    allowOt: boolean = false;
    allowProdinholy: boolean = false;
    prodPercent: string = "";
    backflushRm: string = "";
    capacityPlan: string = "";
    timebwOpern: string = "";
    defworkinProgWh: string = "";
    defFingoodsWh: string = "";
    name: string = "Manufacture.list";
    type: string = "List";
    manufactureSet: Manufactureset001mb[] = [];
    systemproperties?: Systemproperties001mb[] = [];
    public gridOptions: GridOptions | any;

    constructor(private setupManager: SetupManager,
        private systemPropertiesService: SystemPropertiesService, 
        private formBuilder: FormBuilder,
        private calloutService: CalloutService,
        private authManager: AuthManager,
        private modalService: NgbModal                                ) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent,
        }
    }

    ngOnInit() {
        this.setUpForm = this.formBuilder.group({
            disableCPandTt: [''],
            allowOt: [''],
            allowProdinholy: [''],
            prodPercent: ['', Validators.required],
            backflushRm: ['', Validators.required],
            capacityPlan: ['', Validators.required],
            timebwOpern: ['', Validators.required],
            defworkinProgWh: ['', Validators.required],
            defFingoodsWh: ['', Validators.required],
        });

        this.createDataGrid001();
        this.systemPropertiesService.system(this.name, this.type).subscribe(response => {
            this.systemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.setupManager.allsetup().subscribe((response => {
            this.manufactureSet = deserialize<Manufactureset001mb[]>(Manufactureset001mb, response);
            if (this.manufactureSet.length > 0) {
                this.gridOptions?.api?.setRowData(this.manufactureSet);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        }))
    }

    get f() { return this.setUpForm.controls; }

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
                field: 'mansetId',
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
                headerName: 'Disable CP and TT',
                field: 'disableCPandTt',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: (param: any) => {
                    return param.data.disableCPandTt == 1 ? true : false;
                }
            },
            {
                headerName: 'Allow Overtime',
                field: 'allowOt',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: (param: any) => {
                    return param.data.allowOt == 1 ? true : false;
                }
            },
            {
                headerName: 'Allow Holiday Production',
                field: 'allowProdinholy',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: (param: any) => {
                    return param.data.allowProdinholy == 1 ? true : false;
                }
            },
            {
                headerName: 'Production Percent',
                field: 'prodPercent',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Back Flush RawMaterial',
                field: 'backflushRm',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Capacity Planned',
                field: 'capacityPlan',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Time b/w Operation',
                field: 'timebwOpern',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Default Progress Work',
                field: 'defworkinProgWh',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Default Finished Work',
                field: 'defFingoodsWh',
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
                width: 160,
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
        this.mansetId = params.data.mansetId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.setUpForm.patchValue({
            'disableCPandTt': params.data.disableCPandTt,
            'allowOt': params.data.allowOt,
            'allowProdinholy': params.data.allowProdinholy,
            'prodPercent': params.data.prodPercent,
            'backflushRm': params.data.backflushRm,
            'capacityPlan': params.data.capacityPlan,
            'timebwOpern': params.data.timebwOpern,
            'defworkinProgWh': params.data.defworkinProgWh,
            'defFingoodsWh': params.data.defFingoodsWh,
        });
    }

    onDeleteButtonClick(params: any) {
        this.setupManager.setupdelete(params.data.mansetId).subscribe((response) => {
            for (let i = 0; i < this.manufactureSet.length; i++) {
                if (this.manufactureSet[i].mansetId == params.data.mansetId) {
                    this.manufactureSet?.splice(i, 1);
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
        modalRef.componentInstance.title = "Manufacture Settings";
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

    onOrderClick(event: any, setUpForm: any) {
        this.markFormGroupTouched(this.setUpForm);
        this.submitted = true;
        if (this.setUpForm.invalid) {
            return;
        }

        let manufactureset1mb = new Manufactureset001mb();
        manufactureset1mb.disableCPandTt = this.f.disableCPandTt.value ? this.f.disableCPandTt.value : false;
        manufactureset1mb.allowOt = this.f.allowOt.value ? this.f.allowOt.value : false;
        manufactureset1mb.allowProdinholy = this.f.allowProdinholy.value ? this.f.allowProdinholy.value : false;
        manufactureset1mb.prodPercent = this.f.prodPercent.value ? this.f.prodPercent.value : "";
        manufactureset1mb.backflushRm = this.f.backflushRm.value ? this.f.backflushRm.value : "";
        manufactureset1mb.capacityPlan = this.f.capacityPlan.value ? this.f.capacityPlan.value : "";
        manufactureset1mb.timebwOpern = this.f.timebwOpern.value ? this.f.timebwOpern.value : "";
        manufactureset1mb.defworkinProgWh = this.f.defworkinProgWh.value ? this.f.defworkinProgWh.value : "";
        manufactureset1mb.defFingoodsWh = this.f.defFingoodsWh.value ? this.f.defFingoodsWh.value : "";
        if (this.mansetId) {
            manufactureset1mb.mansetId = this.mansetId;
            manufactureset1mb.insertUser = this.insertUser;
			manufactureset1mb.insertDatetime = this.insertDatetime;
            manufactureset1mb.updatedUser = this.authManager.getcurrentUser.username;
			manufactureset1mb.updatedDatetime = new Date();
            this.setupManager.setupupdate(manufactureset1mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let manufactureset001mb = deserialize<Manufactureset001mb>(Manufactureset001mb, response);
                for (let manufactureset of this.manufactureSet) {
                    if (manufactureset.mansetId == manufactureset001mb.mansetId) {
                        manufactureset.disableCPandTt = manufactureset001mb.disableCPandTt;
                        manufactureset.allowOt = manufactureset001mb.allowOt;
                        manufactureset.allowProdinholy = manufactureset001mb.allowProdinholy;
                        manufactureset.prodPercent = manufactureset001mb.prodPercent;
                        manufactureset.backflushRm = manufactureset001mb.backflushRm;
                        manufactureset.capacityPlan = manufactureset001mb.capacityPlan;
                        manufactureset.timebwOpern = manufactureset001mb.timebwOpern;
                        manufactureset.defworkinProgWh = manufactureset001mb.defworkinProgWh;
                        manufactureset.defFingoodsWh = manufactureset001mb.defFingoodsWh;
                        manufactureset.insertUser = this.insertUser;
                        manufactureset.insertDatetime = this.insertDatetime;
                        manufactureset.updatedUser = this.authManager.getcurrentUser.username;
                        manufactureset.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.manufactureSet);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.setUpForm.reset();
                this.submitted = false;
                this.mansetId = null;
            });
        }
        else {
            manufactureset1mb.insertUser = this.authManager.getcurrentUser.username;
			manufactureset1mb.insertDatetime = new Date();
            this.setupManager.setupSave(manufactureset1mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let manu = deserialize<Manufactureset001mb>(Manufactureset001mb, response);
                this.manufactureSet?.push(manu);
                const newItems = [JSON.parse(JSON.stringify(manu))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.setUpForm.reset();
                this.submitted = false;
            })
        }
    }

    onReset() {
        this.submitted = false;
        this.setUpForm.reset();
    }

    onGeneratePdfReport(){
		this.setupManager.manuSetupPdf().subscribe((response) =>{
			saveAs(response,'setupList');

		});
	}

	onGenerateExcelReport(){
		this.setupManager.manuSetupExcel().subscribe((response) => {
			saveAs(response,'setupList');
        })
	}

}

