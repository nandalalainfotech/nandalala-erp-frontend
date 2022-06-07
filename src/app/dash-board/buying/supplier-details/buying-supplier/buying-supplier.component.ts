import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { buySuppliersManager } from 'src/app/shared/services/restcontroller/bizservice/buyingsupplies.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Supplier001mb } from 'src/app/shared/services/restcontroller/entities/Supplier001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-buying-supplier',
    templateUrl: './buying-supplier.component.html',
    styleUrls: ['./buying-supplier.component.css']
})

export class BuyingSupplierComponent implements OnInit {

    frameworkComponents: any;
    supplierForm: FormGroup | any;
    supId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    supName: string = "";
    addType: string = "";
    supCity: string = "";
    supAddress: string = "";
    supPhone: string = "";
    supCountry: string = "";
    supState: string = "";
    addname: string = "SuAddress.Type";
    addstatus: string = "Type";
    submitted = false;
    suppliers: Supplier001mb[] = [];
    addsystemproperties?: Systemproperties001mb[] = [];
    public gridOptions: GridOptions | any;

    constructor(private buysuppliersManager: buySuppliersManager,
        private systemPropertiesService: SystemPropertiesService,
        private calloutService: CalloutService,
        private formBuilder: FormBuilder,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent
        }
    }

    ngOnInit() {
        this.createDataGrid001();
        this.supplierForm = this.formBuilder.group({
            supName: ['', Validators.required],
            addType: ['', Validators.required],
            supCity: ['', Validators.required],
            supAddress: ['', Validators.required],
            supPhone: ['', Validators.required],
            supCountry: ['', Validators.required],
            supState: ['', Validators.required]
        })

        this.systemPropertiesService.system(this.addname, this.addstatus).subscribe(response => {
            this.addsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.buysuppliersManager.allbuysupplier().subscribe((response) => {
            this.suppliers = deserialize<Supplier001mb[]>(Supplier001mb, response);
            if (this.suppliers.length > 0) {
                this.gridOptions?.api?.setRowData(this.suppliers);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    get f() { return this.supplierForm.controls }

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
                width: 120,
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
                width: 150,
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
        this.supId = params.data.supId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.supplierForm.patchValue({
            'supName': params.data.supName,
            'addType': params.data.addType,
            'supCity': params.data.supCity,
            'supAddress': params.data.supAddress,
            'supPhone': params.data.supPhone,
            'supCountry': params.data.supCountry,
            'supState': params.data.supState,
        });
    }

    onDeleteButtonClick(params: any) {
        this.buysuppliersManager.buysupplierdelete(params.data.supId).subscribe((response) => {
            for (let i = 0; i < this.suppliers.length; i++) {
                if (this.suppliers[i].supId == params.data.supId) {
                    this.suppliers?.splice(i, 1);
                    break;
                }
            }
            const selectedRows = params.api.getSelectedRows();
            params.api.applyTransaction({ remove: selectedRows });
            this.calloutService.showSuccess("Order Removed Successfully");
        })
    }
    onFirstDataRendered(params: any) {
        params.api.sizeColumnsToFit();
    }

    onAuditButtonClick(params: any) {
        const modalRef = this.modalService.open(AuditComponent);
        modalRef.componentInstance.title = "Supplier";
        modalRef.componentInstance.details = params.data;
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
        supplier001mb.addType = this.f.addType.value ? this.f.addType.value : "";
        supplier001mb.supAddress = this.f.supAddress.value ? this.f.supAddress.value : "";
        supplier001mb.supCity = this.f.supCity.value ? this.f.supCity.value : "";
        supplier001mb.supCountry = this.f.supCountry.value ? this.f.supCountry.value : "";
        supplier001mb.supName = this.f.supName.value ? this.f.supName.value : "";
        supplier001mb.supPhone = this.f.supPhone.value ? this.f.supPhone.value : "";
        supplier001mb.supState = this.f.supState.value ? this.f.supState.value : "";
        if (this.supId) {
            supplier001mb.supId = this.supId;
            supplier001mb.insertUser = this.insertUser;
            supplier001mb.insertDatetime = this.insertDatetime;
            supplier001mb.updatedUser = this.authManager.getcurrentUser.username;
            supplier001mb.updatedDatetime = new Date();
            this.buysuppliersManager.buysupplireupdate(supplier001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let supplierres = deserialize<Supplier001mb>(Supplier001mb, response);
                for (let buysuplier of this.suppliers) {
                    if (buysuplier.supId == supplierres.supId) {
                        buysuplier.addType = supplierres.addType;
                        buysuplier.supAddress = supplierres.supAddress;
                        buysuplier.supCity = supplierres.supCity;
                        buysuplier.supCountry = supplierres.supName;
                        buysuplier.supPhone = supplierres.supPhone;
                        buysuplier.supState = supplierres.supState;
                        buysuplier.insertUser = this.insertUser;
                        buysuplier.insertDatetime = this.insertDatetime;
                        buysuplier.updatedUser = this.authManager.getcurrentUser.username;
                        buysuplier.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.suppliers);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.supplierForm.reset();
                this.supId = null;
                this.submitted = false;
            })
        }
        else {
            supplier001mb.insertUser = this.authManager.getcurrentUser.username;
            supplier001mb.insertDatetime = new Date();
            this.buysuppliersManager.buysuppliersave(supplier001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let supplier001mb = deserialize<Supplier001mb>(Supplier001mb, response);
                this.suppliers?.push(supplier001mb);
                const newItems = [JSON.parse(JSON.stringify(supplier001mb))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.supplierForm.reset();
                this.submitted = false;
            })
        }
    }

    onReset() {
        this.supplierForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.buysuppliersManager.buysuppliersPdf().subscribe((response) =>{
			saveAs(response,"SupplierList");

		});
	}

	onGenerateExcelReport(){
		this.buysuppliersManager.buysuppliersExcel().subscribe((response) => {
            saveAs(response,"SupplierList");
        })
	}

}