import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { TaxRuleManager } from 'src/app/shared/services/restcontroller/bizservice/tax-rule.service';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { Taxrule001mb } from 'src/app/shared/services/restcontroller/entities/Taxrule001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-tax-rule',
    templateUrl: './tax-rule.component.html',
    styleUrls: ['./tax-rule.component.css']
})
export class TaxRuleComponent implements OnInit {

    taxForm: FormGroup | any;
    submitted = false;
    id: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    frameworkComponents: any;
    billingcity: string | null = "";
    billingcountry: string | null = "";
    billingstate: string | null = "";
    customer: string | null = "";
    fromdate: Date | null = null;
    shippingcity: string | null = "";
    shippingcountry: string | null = "";
    shippingstate: string | null = "";
    taxtemplate: string | null = "";
    taxtype: string | null = "";
    todate: Date | null = null;
    dummyname = "Dummy.status";
    dummytype = "dummy";
    dummysystemproperties: Systemproperties001mb[] = [];
    taxRule: Taxrule001mb[] = [];
    public gridOptions: GridOptions | any;

    constructor(private taxRuleManager: TaxRuleManager,
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

        this.taxForm = this.formBuilder.group({
            billingcity: ['', Validators.required],
            billingcountry: ['', Validators.required],
            billingstate: ['', Validators.required],
            fromdate: ['', Validators.required],
            customer: ['', Validators.required],
            shippingcity: ['', Validators.required],
            shippingcountry: ['', Validators.required],
            shippingstate: ['', Validators.required],
            taxtemplate: ['', Validators.required],
            taxtype: ['', Validators.required],
            todate: ['', Validators.required],
        });

        this.createDataGrid001();
        this.systemPropertiesService.system(this.dummyname, this.dummytype).subscribe(response => {
            this.dummysystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.taxRuleManager.alltaxrule().subscribe((response) => {
            this.taxRule = deserialize<Taxrule001mb[]>(Taxrule001mb, response);
            if (this.taxRule.length > 0) {
                this.gridOptions?.api?.setRowData(this.taxRule);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    get f() { return this.taxForm.controls; }

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
                headerName: '#S No',
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
                headerName: 'Tax Type',
                field: 'taxtype',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Tax Template',
                field: 'taxtemplate',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Customer',
                field: 'customer',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Billing City',
                field: 'billingcity',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Shipping City',
                field: 'shippingcity',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Billing State',
                field: 'billingstate',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Shipping State',
                field: 'shippingstate',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Billing Country',
                field: 'billingcountry',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Shipping Country',
                field: 'shippingcountry',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'From Date',
                field: 'fromdate',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: (params: any) => {
                    return params.data.fromdate ? this.datePipe.transform(params.data.fromdate, 'MM/dd/yyyy') : '';
                }
            },
            {
                headerName: 'To Date',
                field: 'todate',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: (params: any) => {
                    return params.data.todate ? this.datePipe.transform(params.data.todate, 'MM/dd/yyyy') : '';
                }
            },
            {
                headerName: 'Edit',
                cellRenderer: 'iconRenderer',
                width: 155,
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
                width: 205,
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
        this.taxForm.patchValue({
            'billingcity': params.data.billingcity,
            'billingcountry': params.data.billingcountry,
            'billingstate': params.data.billingstate,
            'customer': params.data.customer,
            'fromdate': this.datePipe.transform(params.data.fromdate, 'MM/dd/yyyy'),
            'shippingcity': params.data.shippingcity,
            'shippingcountry': params.data.shippingcountry,
            'taxtemplate': params.data.taxtemplate,
            'taxtype': params.data.taxtype,
            'todate': this.datePipe.transform(params.data.todate, 'MM/dd/yyyy'),
            'shippingstate': params.data.shippingstate,
        })
    }

    onDeleteButtonClick(params: any) {
        this.taxRuleManager.taxruledelete(params.data.id).subscribe((response) => {
            for (let i = 0; i < this.taxRule.length; i++) {
                if (this.taxRule[i].id == params.data.id) {
                    this.taxRule.splice?.(i, 1);
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
        modalRef.componentInstance.title = "Tax Rule";
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

    onOrderClick(event: any, taxForm: any) {
        this.markFormGroupTouched(this.taxForm);
        this.submitted = true;
        if (this.taxForm.invalid) {
            return;
        }
        let taxrule001mb = new Taxrule001mb();

        taxrule001mb.fromdate = new Date(this.f.fromdate.value);
        taxrule001mb.todate = new Date(this.f.todate.value);
        taxrule001mb.billingcity = this.f.billingcity.value ? this.f.billingcity.value : "";
        taxrule001mb.billingcountry = this.f.billingcountry.value ? this.f.billingcountry.value : "";
        taxrule001mb.billingstate = this.f.billingstate.value ? this.f.billingstate.value : "";
        taxrule001mb.customer = this.f.customer.value ? this.f.customer.value : "";
        taxrule001mb.shippingcity = this.f.shippingcity.value ? this.f.shippingcity.value : "";
        taxrule001mb.shippingcountry = this.f.shippingcountry.value ? this.f.shippingcountry.value : "";
        taxrule001mb.shippingstate = this.f.shippingstate.value ? this.f.shippingstate.value : "";
        taxrule001mb.taxtemplate = this.f.taxtemplate.value ? this.f.taxtemplate.value : "";
        taxrule001mb.taxtype = this.f.taxtype.value ? this.f.taxtype.value : "";

        if (this.id) {
            taxrule001mb.id = this.id;
            taxrule001mb.insertUser = this.insertUser;
			taxrule001mb.insertDatetime = this.insertDatetime;
            taxrule001mb.updatedUser = this.authManager.getcurrentUser.username;
			taxrule001mb.updatedDatetime = new Date();
            this.taxRuleManager.taxruleupdate(taxrule001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let taxrule001mb = deserialize<Taxrule001mb>(Taxrule001mb, response);
                for (let taxRules of this.taxRule) {
                    if (taxRules.id == taxrule001mb.id) {
                        taxRules.billingcity = taxrule001mb.billingcity;
                        taxRules.billingcountry = taxrule001mb.billingcountry;
                        taxRules.billingstate = taxrule001mb.billingstate;
                        taxRules.customer = taxrule001mb.customer;
                        taxRules.fromdate = taxrule001mb.fromdate;
                        taxRules.shippingcity = taxrule001mb.shippingcity;
                        taxRules.shippingcountry = taxrule001mb.shippingcountry;
                        taxRules.shippingstate = taxrule001mb.shippingstate;
                        taxRules.taxtemplate = taxrule001mb.taxtemplate;
                        taxRules.taxtype = taxrule001mb.taxtype;
                        taxRules.todate = taxrule001mb.todate;
                        taxRules.insertUser = this.insertUser;
                        taxRules.insertDatetime = this.insertDatetime;
                        taxRules.updatedUser = this.authManager.getcurrentUser.username;
                        taxRules.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.taxRule);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.taxForm.reset();
                this.id = null;
                this.submitted = false;
            });
        } else {
            taxrule001mb.insertUser = this.authManager.getcurrentUser.username;
			taxrule001mb.insertDatetime = new Date();
            this.taxRuleManager.taxrulesave(taxrule001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let taxrule001mb = deserialize<Taxrule001mb>(Taxrule001mb, response);
                this.taxRule?.push(taxrule001mb);
                const newItems = [JSON.parse(JSON.stringify(taxrule001mb))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.taxForm.reset();
                this.submitted = false;
            });
        }
    }
    onReset() {
        this.taxForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.taxRuleManager.taxRulePdf().subscribe((response) =>{
            saveAs(response,"TaxRuleList");

		});
	}

	onGenerateExcelReport(){
		this.taxRuleManager.taxRuleExcel().subscribe((response) => {
			saveAs(response,"TaxRuleList");
        })
	}

}
