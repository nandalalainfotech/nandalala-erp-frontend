import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { LinkRendererComponent } from 'src/app/shared/services/renderercomponent/link-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { buySuppliersManager } from 'src/app/shared/services/restcontroller/bizservice/buyingsupplies.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Supplier001mb } from 'src/app/shared/services/restcontroller/entities/Supplier001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { User001mb } from 'src/app/shared/services/restcontroller/entities/User001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { DataSharedService } from 'src/app/shared/services/services/datashared.service';
import { Utils } from 'src/app/shared/utils/utils';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-supplier',
    templateUrl: './supplier.component.html',
    styleUrls: ['./supplier.component.css'],
})
export class SupplierComponent implements OnInit {
    frameworkComponents: any;
    supId: number | any;
    insertUser: string = '';
    insertDatetime: Date | any;
    supName: string = '';
    addType: string = '';
    supCity: string = '';
    supAddress: string = '';
    supPhone: number | any;
    supCountry: string = '';
    supState: string = '';
    addname: string = 'SuAddress.Type';
    addstatus: string = 'Type';
    suppliers: Supplier001mb[] = [];
    public gridOptions: GridOptions | any;
    addsystemproperties?: Systemproperties001mb[] = [];
    supplierForm: FormGroup | any;
    submitted = false;
    user?: User001mb;
    parentMenuString: string = '';
    childMenuString: string = '';

    @HostBinding('style.--color_l1') colorthemes_1: any;
    @HostBinding('style.--color_l2') colorthemes_2: any;
    @HostBinding('style.--color_l3') colorthemes_3: any;
    @HostBinding('style.--color_l4') colorthemes_4: any;
    constructor(
        private BuySuppliersManager: buySuppliersManager,
        private formBuilder: FormBuilder,
        private systemPropertiesService: SystemPropertiesService,
        private calloutService: CalloutService,
        private authManager: AuthManager,
        private modalService: NgbModal,
        private authManger: AuthManager,
        private router: Router,
        // private loginManager: LoginManager,
        private dataSharedService: DataSharedService
    ) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent,
        };
    }
    ngOnInit() {
        this.user = this.authManger.getcurrentUser;
        // this.colorthemes = this.user.theme;
        this.dataSharedService.currentMenuObject.subscribe((object: any) => {
            this.parentMenuString = object.parentMenuString;
            this.childMenuString = object.childMenuString;
        });
        this.authManager.currentUserSubject.subscribe((object: any) => {
            let rgb = Utils.hexToRgb(object.theme);

            this.colorthemes_1 = Utils.rgbToHex(rgb, -0.3);

            this.colorthemes_2 = Utils.rgbToHex(rgb, 0.1);

            this.colorthemes_3 = Utils.rgbToHex(rgb, 0.5);

            this.colorthemes_4 = Utils.rgbToHex(rgb, 0.8);
        });

        this.supplierForm = this.formBuilder.group({
            supName: ['', Validators.required],
            addType: ['', Validators.required],
            supCity: ['', Validators.required],
            supAddress: ['', Validators.required],
            supPhone: ['', Validators.required],
            supCountry: ['', Validators.required],
            supState: ['', Validators.required],
        });
        this.createDataGrid001();
        this.systemPropertiesService
            .system(this.addname, this.addstatus)
            .subscribe((response) => {
                this.addsystemproperties = deserialize<Systemproperties001mb[]>(
                    Systemproperties001mb,
                    response
                );
            });
        this.BuySuppliersManager.allbuysupplier().subscribe((response) => {
            this.suppliers = deserialize<Supplier001mb[]>(
                Supplier001mb,
                response
            );
            if (this.suppliers.length > 0) {
                this.gridOptions?.api?.setRowData(this.suppliers);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        });
    }
    get f() {
        return this.supplierForm.controls;
    }
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
                field: 'supId',
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
                headerName: 'Address Type',
                field: 'addType',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'City',
                field: 'supCity',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Address',
                field: 'supAddress',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Phone',
                field: 'supPhone',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Country',
                field: 'supCountry',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'State',
                field: 'supState',
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
                    label: 'Edit',
                },
            },
            {
                headerName: 'Delete',
                cellRenderer: 'iconRenderer',
                width: 200,
                flex: 1,
                suppressSizeToFit: true,
                cellStyle: { textAlign: 'center' },
                cellRendererParams: {
                    onClick: this.onDeleteButtonClick.bind(this),
                    label: 'Delete',
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
                    label: 'Audit',
                },
            },
        ];
    }

    onEditButtonClick(params: any) {
        this.supId = params.data.supId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.supplierForm.patchValue({
            addType: params.data.addType,
            supAddress: params.data.supAddress,
            supCity: params.data.supCity,
            supCountry: params.data.supCountry,
            supName: params.data.supName,
            supPhone: params.data.supPhone,
            supState: params.data.supState,
        });
    }

    onDeleteButtonClick(params: any) {
        this.BuySuppliersManager.buysupplierdelete(params.data.supId).subscribe(
            (response) => {
                for (let i = 0; i < this.suppliers.length; i++) {
                    if (this.suppliers[i].supId == params.data.supId) {
                        this.suppliers?.splice(i, 1);
                        break;
                    }
                }
                const selectedRows = params.api.getSelectedRows();
                params.api.applyTransaction({ remove: selectedRows });
                this.calloutService.showSuccess('Order Removed Successfully');
            }
        );
    }

    onAuditButtonClick(params: any) {
        const modalRef = this.modalService.open(AuditComponent);
        modalRef.componentInstance.title = 'Supplier';
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
    onOrderClick(event: any, supplierForm: any) {
        this.markFormGroupTouched(this.supplierForm);
        this.submitted = true;
        if (this.supplierForm.invalid) {
            return;
        }

        let supplier001mb = new Supplier001mb();
        supplier001mb.addType = this.f.addType.value
            ? this.f.addType.value
            : '';
        supplier001mb.supAddress = this.f.supAddress.value
            ? this.f.supAddress.value
            : '';
        supplier001mb.supCity = this.f.supCity.value
            ? this.f.supCity.value
            : '';
        supplier001mb.supCountry = this.f.supCountry.value
            ? this.f.supCountry.value
            : '';
        supplier001mb.supName = this.f.supName.value
            ? this.f.supName.value
            : '';
        supplier001mb.supPhone = this.f.supPhone.value
            ? this.f.supPhone.value
            : null;
        supplier001mb.supState = this.f.supState.value
            ? this.f.supState.value
            : '';
        if (this.supId) {
            supplier001mb.supId = this.supId;
            supplier001mb.insertUser = this.insertUser;
            supplier001mb.insertDatetime = this.insertDatetime;
            supplier001mb.updatedUser =
                this.authManager.getcurrentUser.username;
            supplier001mb.updatedDatetime = new Date();
            this.BuySuppliersManager.buysupplireupdate(supplier001mb).subscribe(
                (response) => {
                    this.calloutService.showSuccess(
                        'Order Updated Successfully'
                    );
                    let supplier001mb = deserialize<Supplier001mb>(
                        Supplier001mb,
                        response
                    );
                    for (let suplier of this.suppliers) {
                        if (suplier.supId == supplier001mb.supId) {
                            suplier.addType = supplier001mb.addType;
                            suplier.supAddress = supplier001mb.supAddress;
                            suplier.supCity = supplier001mb.supCity;
                            suplier.supCountry = supplier001mb.supCountry;
                            suplier.supName = supplier001mb.supName;
                            suplier.supPhone = supplier001mb.supPhone;
                            suplier.supState = supplier001mb.supState;
                            suplier.insertUser = this.insertUser;
                            suplier.insertDatetime = this.insertDatetime;
                            suplier.updatedUser =
                                this.authManager.getcurrentUser.username;
                            suplier.updatedDatetime = new Date();
                        }
                    }
                    this.gridOptions.api.setRowData(this.suppliers);
                    this.gridOptions.api.refreshView();
                    this.gridOptions.api.deselectAll();
                    this.supplierForm.reset();
                    this.submitted = false;
                    this.supId = null;
                }
            );
        } else {
            supplier001mb.insertUser = this.authManager.getcurrentUser.username;
            supplier001mb.insertDatetime = new Date();
            this.BuySuppliersManager.buysuppliersave(supplier001mb).subscribe(
                (response) => {
                    this.calloutService.showSuccess('Order Saved Successfully');
                    let supplier001mb = deserialize<Supplier001mb>(
                        Supplier001mb,
                        response
                    );
                    this.suppliers?.push(supplier001mb);
                    const newItems = [
                        JSON.parse(JSON.stringify(supplier001mb)),
                    ];
                    this.gridOptions.api.applyTransaction({ add: newItems });
                    this.supplierForm.reset();
                    this.submitted = false;
                }
            );
        }
    }
    onReset() {
        this.supplierForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.BuySuppliersManager.buysuppliersPdf().subscribe((response) =>{
            saveAs(response,"SupplierList");

		});
	}

	onGenerateExcelReport(){
		this.BuySuppliersManager.buysuppliersExcel().subscribe((response) => {
			saveAs(response,"SupplierList");
        })
	}


}
