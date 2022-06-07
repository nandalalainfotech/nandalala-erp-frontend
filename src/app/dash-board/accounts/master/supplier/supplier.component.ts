import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { LinkRendererComponent } from 'src/app/shared/services/renderercomponent/link-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { SupplierManager } from 'src/app/shared/services/restcontroller/bizservice/supplier.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Supplier001mb } from 'src/app/shared/services/restcontroller/entities/Supplier001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-supplier',
    templateUrl: './supplier.component.html',
    styleUrls: ['./supplier.component.css']
})

export class SupplierComponent implements OnInit {

    supId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    frameworkComponents: any;
    supName: string = "";
    addType: string = "";
    supCity: string = "";
    supAddress: string = "";
    supPhone: number | any;
    supCountry: string = "";
    supState: string = "";
    addname: string = "SuAddress.Type";
    addstatus: string = "Type";
    suppliers: Supplier001mb[] = [];
    supplierForm: FormGroup | any;
    submitted = false;
    addsystemproperties?: Systemproperties001mb[] = [];
    public gridOptions: GridOptions | any;

    constructor(private supplierManager: SupplierManager,
        private formBuilder: FormBuilder,
        private systemPropertiesService: SystemPropertiesService,
        private calloutService: CalloutService,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent
        }
    }

    ngOnInit() {

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
        this.systemPropertiesService.system(this.addname, this.addstatus).subscribe(response => {
            this.addsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.supplierManager.allsupplier().subscribe((response) => {
            this.suppliers = deserialize<Supplier001mb[]>(Supplier001mb, response);
            if (this.suppliers.length > 0) {
                this.gridOptions?.api?.setRowData(this.suppliers);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    get f() { return this.supplierForm.controls; }

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
                headerName: '#ID',
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
                    label: 'Edit'
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
        this.supplierManager.supplierdelete(params.data.supId).subscribe((response) => {
            for (let i = 0; i < this.suppliers.length; i++) {
                if (this.suppliers[i].supId == params.data.supId) {
                    this.suppliers?.splice(i, 1);
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
        modalRef.componentInstance.title = "Supplier";
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
        supplier001mb.addType = this.f.addType.value ? this.f.addType.value : "";
        supplier001mb.supAddress = this.f.supAddress.value ? this.f.supAddress.value : "";
        supplier001mb.supCity = this.f.supCity.value ? this.f.supCity.value : "";
        supplier001mb.supCountry = this.f.supCountry.value ? this.f.supCountry.value : "";
        supplier001mb.supName = this.f.supName.value ? this.f.supName.value : "";
        supplier001mb.supPhone = this.f.supPhone.value ? this.f.supPhone.value : null;
        supplier001mb.supState = this.f.supState.value ? this.f.supState.value : "";
        if (this.supId) {
            supplier001mb.supId = this.supId;
            supplier001mb.insertUser = this.insertUser;
            supplier001mb.insertDatetime = this.insertDatetime;
            supplier001mb.updatedUser = this.authManager.getcurrentUser.username;
            supplier001mb.updatedDatetime = new Date();
            this.supplierManager.supplierupdate(supplier001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let supplier001mb = deserialize<Supplier001mb>(Supplier001mb, response);
                for (let supplier1 of this.suppliers) {
                    if (supplier1.supId == supplier001mb.supId) {
                        supplier1.addType = supplier001mb.addType;
                        supplier1.supAddress = supplier001mb.supAddress;
                        supplier1.supCity = supplier001mb.supCity;
                        supplier1.supCountry = supplier001mb.supCountry;
                        supplier1.supName = supplier001mb.supName;
                        supplier1.supPhone = supplier001mb.supPhone;
                        supplier1.supState = supplier001mb.supState;
                        supplier1.insertUser = this.insertUser;
                        supplier1.insertDatetime = this.insertDatetime;
                        supplier1.updatedUser = this.authManager.getcurrentUser.username;
                        supplier1.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.suppliers);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.supplierForm.reset();
                this.submitted = false;
                this.supId = null;
            });
        } else {
            supplier001mb.insertUser = this.authManager.getcurrentUser.username;
            supplier001mb.insertDatetime = new Date();
            this.supplierManager.suppliersave(supplier001mb).subscribe((response) => {
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

    onGeneratePdfReport() {
        this.supplierManager.supplierPdf().subscribe((response) => {
            saveAs(response, "SupplierList");

        });
    }

    onGenerateExcelReport() {
        this.supplierManager.supplierExcel().subscribe((response) => {
            saveAs(response, "SupplierList");
        })
    }

}

