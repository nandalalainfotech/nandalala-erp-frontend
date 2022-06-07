import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
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
    shipForm: FormGroup | any;
    frameworkComponents: any;
    submitted = false;
    sruleId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    statusname: string = "Itembom.status";
    statustype: string = "status";
    sruleName: string = "";
    status: string = "";
    sruleLabel: string | null = "";
    shipRule: Shippingrule001mb[] = [];
    statussystemproperties?: Systemproperties001mb[] = [];
    public gridOptions: GridOptions | any;

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
        this.shipForm = this.formBuilder.group({
            sruleName: ["", Validators.required],
            status: ["", Validators.required],
            sruleLabel: ["", Validators.required]
        })
        this.createDataGrid001();
        this.systemPropertiesService.system(this.statusname, this.statustype,).subscribe(response => {
            this.statussystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        });
        this.shippingRuleManager.allshiprule().subscribe(response => {
            this.shipRule = deserialize<Shippingrule001mb[]>(Shippingrule001mb, response);
            if (this.shipRule.length > 0) {
                this.gridOptions?.api?.setRowData(this.shipRule);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }
    get f() { return this.shipForm.controls }
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
                width: 50,
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
                width: 85,
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
        this.sruleId = params.data.sruleId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.shipForm.patchValue({
            'sruleName': params.data.sruleName,
            'status': params.data.status,
            'sruleLabel': params.data.sruleLabel
        })

    }

    onDeleteButtonClick(params: any) {
        this.shippingRuleManager.deleteshiprule(params.data.sruleId).subscribe((response) => {
            for (let i = 0; i < this.shipRule.length; i++) {
                if (this.shipRule[i].sruleId == params.data.sruleId) {
                    this.shipRule?.splice(i, 1);
                    break;
                }
            }
            const selectedRows = params.api.getSelectedRows();
            params.api.applyTransaction({ remove: selectedRows });
            this.gridOptions.api.deselectAll();
            this.calloutService.showSuccess("Order Removed Successfully");
        });
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
    onOrderClick(event: any, shipForm: any) {
        this.markFormGroupTouched(this.shipForm);
        this.submitted = true;
        if (this.shipForm.invalid) {
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
                let Ships = deserialize<Shippingrule001mb>(Shippingrule001mb, response);
                for (let shippingRule of this.shipRule) {
                    if (shippingRule.sruleId == Ships.sruleId) {
                        shippingRule.sruleName = Ships.sruleName;
                        shippingRule.status = Ships.status;
                        shippingRule.sruleLabel = Ships.sruleLabel;
                        shippingRule.insertUser = this.insertUser;
                        shippingRule.insertDatetime = this.insertDatetime;
                        shippingRule.updatedUser = this.authManager.getcurrentUser.username;
                        shippingRule.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.shipRule);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.shipForm.reset();
                this.sruleId = null;
                this.submitted = false;
            });
        } else {
            shippingrule001mb.insertUser = this.authManager.getcurrentUser.username;
            shippingrule001mb.insertDatetime = new Date();
            this.shippingRuleManager.saveshiprule(shippingrule001mb).subscribe(response => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let Ships = deserialize<Shippingrule001mb>(Shippingrule001mb, response);
                this.shipRule?.push(Ships);
                const newItems = [JSON.parse(JSON.stringify(Ships))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.gridOptions.api.deselectAll();
                this.shipForm.reset();
                this.submitted = false;
            })
        }
    }
    onReset() {
        this.submitted = false;
        this.shipForm.reset();
    }

    onGeneratePdfReport(){
		this.shippingRuleManager.shippingRulePdf().subscribe((response) =>{
            saveAs(response,"ShippingRuleList");

		});
	}

	onGenerateExcelReport(){
		this.shippingRuleManager.shippingRuleExcel().subscribe((response) => {
			saveAs(response,"ShippingRuleList");
        })
	}
}