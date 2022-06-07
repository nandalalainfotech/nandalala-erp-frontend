import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { PricingRuleManager } from 'src/app/shared/services/restcontroller/bizservice/pricing-rule.service';
import { SalesItemManager } from 'src/app/shared/services/restcontroller/bizservice/sales-item.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Itemdt001mb } from 'src/app/shared/services/restcontroller/entities/Itemdt001mb';
import { Pricingrule001mb } from 'src/app/shared/services/restcontroller/entities/Pricingrule001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-pricing-rule',
    templateUrl: './pricing-rule.component.html',
    styleUrls: ['./pricing-rule.component.css']
})
export class PricingRuleComponent implements OnInit {

    frameworkComponents: any;
    ruleForm: FormGroup | any;
    priceruleid: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    itemname: string = "Dummy.status";
    itemtype: string = "dummy";
    itemCode: string = "";
    priceTitle: string = "";
    buying: boolean = false;
    selling: boolean = false;
    minQty: string = "";
    maxQty: string = "";
    validFrom: Date | null = null;
    company: string = "";
    validUpto: Date | null = null;
    prordisc: string = "";
    discprlist: string | null = "";
    forprlist: string | null = "";
    submitted = false;
    prRule: Pricingrule001mb[] = [];
    isystemproperties?: Systemproperties001mb[] = [];
    itemlist: Itemdt001mb[]=[];
    public gridOptions: GridOptions | any;

    constructor(private systemPropertiesService: SystemPropertiesService,
        private pricingRuleManager: PricingRuleManager,
        private calloutService: CalloutService,
        private formBuilder: FormBuilder,
        private datePipe: DatePipe, 
        private salesitemManager:SalesItemManager,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent
        }
    }


    ngOnInit() {
        this.createDataGrid001();
        this.ruleForm = this.formBuilder.group({
            itemCode: ['', Validators.required],
            priceTitle: ['', Validators.required],
            buying: [''],
            selling: [''],
            minQty: ['', Validators.required],
            maxQty: ['', Validators.required],
            validFrom: ['', Validators.required],
            company: ['', Validators.required],
            validUpto: ['', Validators.required],
            prordisc: ['', Validators.required],
            discprlist: ['', Validators.required],
            forprlist: ['', Validators.required]
        })
        this.systemPropertiesService.system(this.itemname, this.itemtype,).subscribe(response => {
            this.isystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        });
        this.salesitemManager.allsalesitem().subscribe(response => {
            this.itemlist = deserialize<Itemdt001mb[]>(Itemdt001mb, response);
        });
        this.pricingRuleManager.allprrule().subscribe(response => {
            this.prRule = deserialize<Pricingrule001mb[]>(Pricingrule001mb, response);
            if (this.prRule.length > 0) {
                this.gridOptions?.api?.setRowData(this.prRule);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    get f() { return this.ruleForm.controls }

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
                field: 'priceruleid',
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
                headerName: 'Item',
                field: 'itemCode',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Price Title',
                field: 'priceTitle',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Buying',
                field: 'buying',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: (param: any) => {
                    return param.data.buying == 1 ? true : false;
                }
            },
            {
                headerName: 'Selling',
                field: 'selling',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: (param: any) => {
                    return param.data.selling == 1 ? true : false;
                }
            },
            {
                headerName: 'Min-Qty',
                field: 'minQty',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Max-Qty',
                field: 'maxQty',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'ValidFrom',
                field: 'validFrom',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: (params: any) => {
                    return params.data.validFrom ? this.datePipe.transform(params.data.validFrom, 'MM/dd/yyyy') : '';
                }
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
                headerName: 'ValidUpto',
                field: 'validUpto',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: (params: any) => {
                    return params.data.validUpto ? this.datePipe.transform(params.data.validUpto, 'MM/dd/yyyy') : '';
                }
            },
            {
                headerName: 'Pricing or Discount',
                field: 'prordisc',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Discount List',
                field: 'discprlist',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Pricing List',
                field: 'forprlist',
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
                width: 200,
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
        this.priceruleid = params.data.priceruleid;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.ruleForm.patchValue({
            'itemCode': params.data.itemCode,
            'priceTitle': params.data.priceTitle,
            'buying': params.data.buying,
            'selling': params.data.selling,
            'minQty': params.data.minQty,
            'maxQty': params.data.maxQty,
            'validFrom': this.datePipe.transform(params.data.validFrom, 'MM/dd/yyyy'),
            'company': params.data.company,
            'validUpto': this.datePipe.transform(params.data.validUpto, 'MM/dd/yyyy'),
            'prordisc': params.data.prordisc,
            'discprlist': params.data.discprlist,
            'forprlist': params.data.forprlist
        });
    }

    onDeleteButtonClick(params: any) {
        this.pricingRuleManager.deleteprrule(params.data.priceruleid).subscribe((response) => {
            for (let i = 0; i < this.prRule.length; i++) {
                if (this.prRule[i].priceruleid == params.data.priceruleid) {
                    this.prRule?.splice(i, 1);
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
        modalRef.componentInstance.title = "Pricing Rule";
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

    onOrderClick(event: any, ruleForm: any) {
        this.markFormGroupTouched(this.ruleForm);
        this.submitted = true;
        if (this.ruleForm.invalid) {
            return;
        }
        let pricingrule001mb = new Pricingrule001mb();
        pricingrule001mb.itemCode = this.f.itemCode.value ? this.f.itemCode.value : "";
        pricingrule001mb.priceTitle = this.f.priceTitle.value ? this.f.priceTitle.value : "";
        pricingrule001mb.buying = this.f.buying.value ? this.f.buying.value : false;
        pricingrule001mb.selling = this.f.selling.value ? this.f.selling.value : false;
        pricingrule001mb.minQty = this.f.minQty.value ? this.f.minQty.value : "";
        pricingrule001mb.maxQty = this.f.maxQty.value ? this.f.maxQty.value : "";
        pricingrule001mb.validFrom = new Date(this.f.validFrom.value);
        pricingrule001mb.company = this.f.company.value ? this.f.company.value : "";
        pricingrule001mb.validUpto = new Date(this.f.validUpto.value);
        pricingrule001mb.prordisc = this.f.prordisc.value ? this.f.prordisc.value : "";
        pricingrule001mb.discprlist = this.f.discprlist.value ? this.f.discprlist.value : "";
        pricingrule001mb.forprlist = this.f.forprlist.value ? this.f.forprlist.value : "";
        if (this.priceruleid) {
            pricingrule001mb.priceruleid = this.priceruleid;
            pricingrule001mb.insertUser = this.insertUser;
			pricingrule001mb.insertDatetime = this.insertDatetime;
            pricingrule001mb.updatedUser = this.authManager.getcurrentUser.username;
			pricingrule001mb.updatedDatetime = new Date();
            this.pricingRuleManager.updateprrule(pricingrule001mb).subscribe(response => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let rules = deserialize<Pricingrule001mb>(Pricingrule001mb, response);
                for (let priceRule of this.prRule) {
                    if (priceRule.priceruleid == rules.priceruleid) {
                        priceRule.itemCode = rules.itemCode;
                        priceRule.priceTitle = rules.priceTitle;
                        priceRule.buying = rules.buying;
                        priceRule.selling = rules.selling;
                        priceRule.minQty = rules.minQty;
                        priceRule.maxQty = rules.maxQty;
                        priceRule.validFrom = rules.validFrom;
                        priceRule.company = rules.company;
                        priceRule.validUpto = rules.validUpto;
                        priceRule.prordisc = rules.prordisc;
                        priceRule.discprlist = rules.discprlist;
                        priceRule.forprlist = rules.forprlist;
                        priceRule.insertUser = this.insertUser;
                        priceRule.insertDatetime = this.insertDatetime;
                        priceRule.updatedUser = this.authManager.getcurrentUser.username;
                        priceRule.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.prRule);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.ruleForm.reset();
                this.submitted = false;
                this.priceruleid = null;
            });
        } else {
            pricingrule001mb.insertUser = this.authManager.getcurrentUser.username;
			pricingrule001mb.insertDatetime = new Date();
            this.pricingRuleManager.saveprrule(pricingrule001mb).subscribe(response => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let rules = deserialize<Pricingrule001mb>(Pricingrule001mb, response);
                this.prRule?.push(rules);
                const newItems = [JSON.parse(JSON.stringify(rules))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.gridOptions.api.deselectAll();
                this.ruleForm.reset();
                this.submitted = false;
            });
        }
    }
    onReset() {
        this.ruleForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.pricingRuleManager.pricingRulePdf().subscribe((response) =>{
            saveAs(response,"PricingRuleList");

		});
	}

	onGenerateExcelReport(){
		this.pricingRuleManager.pricingRuleExcel().subscribe((response) => {
			saveAs(response,"PricingRuleList");
        })
	}

}