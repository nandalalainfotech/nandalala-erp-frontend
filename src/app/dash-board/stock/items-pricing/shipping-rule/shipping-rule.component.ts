import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { LinkRendererComponent } from 'src/app/shared/services/renderercomponent/link-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { ShippingRuleManager } from 'src/app/shared/services/restcontroller/bizservice/shipping-rule.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Shippingrule001mb } from 'src/app/shared/services/restcontroller/entities/Shippingrule001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-shipping-rule',
    templateUrl: './shipping-rule.component.html',
    styleUrls: ['./shipping-rule.component.css']
})

export class ShippingRuleComponent implements OnInit {

    shippingsForm: FormGroup | any;
    submitted = false;

    frameworkComponents: any;
    sruleId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    name: string = "shipping.status";
    type: string = "status";
    sruleName: string = "";
    status: string = "";
    sruleLabel: string | null = "";
    shippingRules: Shippingrule001mb[] = [];
    public gridOptions: GridOptions | any;
    systemproperties?: Systemproperties001mb[] = [];

    constructor(private systemPropertiesService: SystemPropertiesService,
        private shippingRuleManager: ShippingRuleManager,
        private calloutService: CalloutService,
        private formBuilder: FormBuilder,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent
        }
    }

    ngOnInit() {

        this.shippingsForm = this.formBuilder.group({
            sruleName: ['', Validators.required],
            status: ['', Validators.required],
            sruleLabel: ['', Validators.required],
        })

        this.createDataGrid001();
        this.systemPropertiesService.system(this.name, this.type).subscribe(response => {
            this.systemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        });
        this.shippingRuleManager.allshiprule().subscribe((response) => {
            this.shippingRules = deserialize<Shippingrule001mb[]>(Shippingrule001mb, response);
            if (this.shippingRules.length > 0) {
                this.gridOptions?.api?.setRowData(this.shippingRules);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    get f() { return this.shippingsForm.controls; }

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
                headerName: '#ID',
                field: 'sruleId',
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
                headerName: 'Shipping Name',
                field: 'sruleName',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Status',
                field: 'status',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Shipping Label',
                field: 'sruleLabel',
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

        this.sruleId = params.data.sruleId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.shippingsForm.patchValue({

            'sruleName': params.data.sruleName,
            'status': params.data.status,
            'sruleLabel': params.data.sruleLabel,
        })
    }

    onDeleteButtonClick(params: any) {
        this.shippingRuleManager.deleteshiprule(params.data.sruleId).subscribe((response) => {
            for (let i = 0; i < this.shippingRules.length; i++) {
                if (this.shippingRules[i].sruleId == params.data.sruleId) {
                    this.shippingRules?.splice(i, 1);
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
        modalRef.componentInstance.title = "Shipping Rule";
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

    onOrderClick(event: any, shippingsForm: any) {

        this.markFormGroupTouched(this.shippingsForm);
        this.submitted = true;
        if (this.shippingsForm.invalid) {
            return;
        }

        let shippingrule001mb = new Shippingrule001mb();
        shippingrule001mb.sruleName = this.f.sruleName.value ? this.f.sruleName.value : "";
        shippingrule001mb.status = this.f.status.value ? this.f.status.value : "";
        shippingrule001mb.sruleLabel = this.f.sruleLabel.value ? this.f.sruleLabel.value : "";
        if (this.sruleId) {
            shippingrule001mb.sruleId = this.sruleId;
            shippingrule001mb.insertUser = this.insertUser;
            shippingrule001mb.insertDatetime = this.insertDatetime;
            shippingrule001mb.updatedUser = this.authManager.getcurrentUser.username;
            shippingrule001mb.updatedDatetime = new Date();
            this.shippingRuleManager.updateshiprule(shippingrule001mb).subscribe(response => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let shipping = deserialize<Shippingrule001mb>(Shippingrule001mb, response);
                for (let ship of this.shippingRules) {
                    if (ship.sruleId == shipping.sruleId) {
                        ship.sruleLabel = shipping.sruleLabel;
                        ship.status = shipping.status;
                        ship.sruleName = shipping.sruleName;
                        ship.insertUser = this.insertUser;
                        ship.insertDatetime = this.insertDatetime;
                        ship.updatedUser = this.authManager.getcurrentUser.username;
                        ship.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.shippingRules);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.shippingsForm.reset();
                this.sruleId = null;
                this.submitted = false;
            })
        }
        else {
            shippingrule001mb.insertUser = this.authManager.getcurrentUser.username;
            shippingrule001mb.insertDatetime = new Date();
            this.shippingRuleManager.saveshiprule(shippingrule001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let shipping = deserialize<Shippingrule001mb>(Shippingrule001mb, response);
                this.shippingRules.push(shipping);
                const newItems = [JSON.parse(JSON.stringify(shipping))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.shippingsForm.reset();
                this.submitted = false;
            })
        }
    }
    onReset() {
        this.shippingsForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport() {
		this.shippingRuleManager.shippingRulePdf().subscribe((response) => {
			saveAs(response, "ShippingRuleList");

		});
	}

	onGenerateExcelReport() {
		this.shippingRuleManager.shippingRuleExcel().subscribe((response) => {
			saveAs(response, "ShippingRuleList");
		});
	}
}



