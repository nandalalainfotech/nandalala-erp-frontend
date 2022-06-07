import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { ItemWisePurchaseManager } from 'src/app/shared/services/restcontroller/bizservice/itemwisepurchase.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Itemwisepurregister001mb } from 'src/app/shared/services/restcontroller/entities/Itemwisepurregister001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-itemwisepurchase',
    templateUrl: './itemwisepurchase.component.html',
    styleUrls: ['./itemwisepurchase.component.css']
})
export class ItemwisepurchaseComponent implements OnInit {

    frameworkComponents: any;
    submitted = false;
    itemWisePurchaseForm: FormGroup | any;
    iwprId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    itemCode: string = "";
    itemGroup: string = "";
    inVoice: string = "";
    postingDate: Date | null = null;
    supName: string = "";
    payAccount: number | any;
    paymentMode: string = "";
    projectname: string = "";
    company: string = "";
    poSeries: string = "";
    purtName: string = "";
    expenseAccount: number | any;
    quantity: number | any;
    rate: string | null | undefined;
    amount: string | null = "";
    totalTax: string | null = "";
    total: string | null = "";
    currency: string = "";
    name = "Supplier.Type";
    type = "Type";
    supname: string = "Supplier.Type";
    suptype: string = "Type";
    payname: string = "payment.mode";
    paytype: string = "mode";
    dummyname = "Dummy.status";
    dummytype = "dummy";
    paysystemproperties?: Systemproperties001mb[] = [];
    supsystemproperties?: Systemproperties001mb[] = [];
    itemsystemproperties: Systemproperties001mb[] = [];
    itemWise: Itemwisepurregister001mb[] = [];
    dummysystemproperties: Systemproperties001mb[] = [];
    public gridOptions: GridOptions | any;

    constructor(private systemPropertiesService: SystemPropertiesService,
        private itemWisePurchaseManager: ItemWisePurchaseManager, 
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
        this.itemWisePurchaseForm = this.formBuilder.group({
            itemCode: ['', Validators.required],
            itemGroup: ['', Validators.required],
            postingDate: ['', Validators.required],
            inVoice: ['', Validators.required],
            supName: ['', Validators.required],
            payAccount: ['', Validators.required],
            paymentMode: ['', Validators.required],
            currency: ['', Validators.required],
            projectname: ['', Validators.required],
            company: ['', Validators.required],
            poSeries: ['', Validators.required],
            purtName: ['', Validators.required],
            expenseAccount: ['', Validators.required],
            quantity: ['', Validators.required],
            rate: ['', Validators.required],
            amount: ['', Validators.required],
            totalTax: ['', Validators.required],
            total: ['', Validators.required],
        })
        this.createDataGrid001md();
        this.systemPropertiesService.system(this.dummyname, this.dummytype).subscribe(response => {
            this.dummysystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.systemPropertiesService.system(this.name, this.type).subscribe(response => {
            this.itemsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        });
        this.systemPropertiesService.system(this.supname, this.suptype).subscribe(response => {
            this.supsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        });
        this.systemPropertiesService.system(this.payname, this.paytype).subscribe(response => {
            this.paysystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        });
        this.itemWisePurchaseManager.allitemwise().subscribe(response => {
            this.itemWise = deserialize<[Itemwisepurregister001mb]>(Itemwisepurregister001mb, response);
            if (this.itemWise.length > 0) {
                this.gridOptions?.api?.setRowData(this.itemWise);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        });
    }
    get f() { return this.itemWisePurchaseForm.controls; }

    createDataGrid001md(): void {
        this.gridOptions = {
            paginationPageSize: 10,
            rowSelection: 'single',
            onFirstDataRendered: this.onFirstDataRendered.bind(this),
        }
        this.gridOptions.editType = 'fullRow';
        this.gridOptions.enableRangeSelection = true;
        this.gridOptions.animateRows = true;
        this.gridOptions.columnDefs = [
            {
                headerName: '#ID',
                field: 'iwprId',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizabla: true,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilterOnly: true,
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
                headerName: 'Item Group',
                field: 'itemGroup',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'InVoice',
                field: 'inVoice',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Posting Date',
                field: 'postingDate',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: (params: any) => {
                    return params.data.postingDate ? this.datePipe.transform(params.data.postingDate, 'MM/dd/yyyy') : '';
                }
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
                headerName: 'Payable Account',
                field: 'payAccount',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Payement Mode',
                field: 'paymentMode',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Project Name',
                field: 'projectname',
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
                headerName: 'Purchase Order',
                field: 'poSeries',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Purchase Reciept',
                field: 'purtName',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Expense Account',
                field: 'expenseAccount',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Quantity',
                field: 'quantity',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Rate',
                field: 'rate',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Amount',
                field: 'amount',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Total Tax',
                field: 'totalTax',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Total',
                field: 'total',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Currency',
                field: 'currency',
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
                width: 250,
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
                width: 300,
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
                width: 280,
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
        this.iwprId = params.data.iwprId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.itemWisePurchaseForm.patchValue({
            'payAccount': params.data.payAccount,
            'paymentMode': params.data.paymentMode,
            'poSeries': params.data.poSeries,
            'postingDate': this.datePipe.transform(params.data.postingDate, 'MM/dd/yyyy'),
            'projectname': params.data.projectname,
            'purtName': params.data.purtName,
            'quantity': params.data.quantity,
            'rate': params.data.rate,
            'supName': params.data.supName,
            'total': params.data.total,
            'totalTax': params.data.totalTax,
            'amount': params.data.amount,
            'company': params.data.company,
            'currency': params.data.currency,
            'expenseAccount': params.data.expenseAccount,
            'inVoice': params.data.inVoice,
            'itemCode': params.data.itemCode,
            'itemGroup': params.data.itemGroup,
        })
    }
    onDeleteButtonClick(params: any) {
        this.itemWisePurchaseManager.itemwisedelete(params.data.iwprId).subscribe((response) => {
            for (let i = 0; i < this.itemWise.length; i++) {
                if (this.itemWise[i].iwprId == params.data.iwprId) {
                    this.itemWise?.splice(i, 1);
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
        modalRef.componentInstance.title = "Item-Wise Purchase Register";
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
    onOrderClick(event: any, itemWisePurchase: any) {
        this.markFormGroupTouched(this.itemWisePurchaseForm);
        this.submitted = true;

        // stop here if form is invalid
        if (this.itemWisePurchaseForm.invalid) {
            return;
        }
        let itemwisepurregister = new Itemwisepurregister001mb();
        itemwisepurregister.payAccount = this.f.payAccount.value ? this.f.payAccount.value : null;
        itemwisepurregister.paymentMode = this.f.paymentMode.value ? this.f.paymentMode.value : "";
        itemwisepurregister.poSeries = this.f.poSeries.value ? this.f.poSeries.value : "";
        itemwisepurregister.postingDate = new Date(this.f.postingDate.value);
        itemwisepurregister.projectname = this.f.projectname.value ? this.f.projectname.value : "";
        itemwisepurregister.purtName = this.f.purtName.value ? this.f.purtName.value : "";
        itemwisepurregister.quantity = this.f.quantity.value ? this.f.quantity.value : null;
        itemwisepurregister.rate = this.f.rate.value ? this.f.rate.value : "";
        itemwisepurregister.supName = this.f.supName.value ? this.f.supName.value : "";
        itemwisepurregister.total = this.f.total.value ? this.f.total.value : "";
        itemwisepurregister.totalTax = this.f.totalTax.value ? this.f.totalTax.value : "";
        itemwisepurregister.amount = this.f.amount.value ? this.f.amount.value : "";
        itemwisepurregister.company = this.f.company.value ? this.f.company.value : "";
        itemwisepurregister.currency = this.f.currency.value ? this.f.currency.value : "";
        itemwisepurregister.expenseAccount = this.f.expenseAccount.value ? this.f.expenseAccount.value : null;
        itemwisepurregister.inVoice = this.f.inVoice.value ? this.f.inVoice.value : "";
        itemwisepurregister.itemCode = this.f.itemCode.value ? this.f.itemCode.value : "";
        itemwisepurregister.itemGroup = this.f.itemGroup.value ? this.f.itemGroup.value : "";
        if (this.iwprId) {
            itemwisepurregister.iwprId = this.iwprId;
            itemwisepurregister.insertUser = this.insertUser;
			itemwisepurregister.insertDatetime = this.insertDatetime;
            itemwisepurregister.updatedUser = this.authManager.getcurrentUser.username;
			itemwisepurregister.updatedDatetime = new Date();
            this.itemWisePurchaseManager.itemwisesave(itemwisepurregister).subscribe(response => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let itemwisepurregister = deserialize<Itemwisepurregister001mb>(Itemwisepurregister001mb, response);
                for (let itemWises of this.itemWise) {
                    if (itemWises.iwprId == itemwisepurregister.iwprId) {
                        itemWises.payAccount = itemwisepurregister.payAccount;
                        itemWises.paymentMode = itemwisepurregister.paymentMode;
                        itemWises.poSeries = itemwisepurregister.poSeries;
                        itemWises.postingDate = itemwisepurregister.postingDate;
                        itemWises.projectname = itemwisepurregister.projectname;
                        itemWises.purtName = itemwisepurregister.purtName;
                        itemWises.quantity = itemwisepurregister.quantity;
                        itemWises.rate = itemwisepurregister.rate;
                        itemWises.supName = itemwisepurregister.supName;
                        itemWises.total = itemwisepurregister.total;
                        itemWises.totalTax = itemwisepurregister.totalTax;
                        itemWises.amount = itemwisepurregister.amount;
                        itemWises.company = itemwisepurregister.company;
                        itemWises.currency = itemwisepurregister.currency;
                        itemWises.expenseAccount = itemwisepurregister.expenseAccount;
                        itemWises.inVoice = itemwisepurregister.inVoice;
                        itemWises.itemCode = itemwisepurregister.itemCode;
                        itemWises.itemGroup = itemwisepurregister.itemGroup;
                        itemWises.insertUser = this.insertUser;
                        itemWises.insertDatetime = this.insertDatetime;
                        itemWises.updatedUser = this.authManager.getcurrentUser.username;
                        itemWises.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.itemWise);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.itemWisePurchaseForm.reset();
                this.submitted = false;
                this.iwprId = null;
            });
        } else {
            itemwisepurregister.insertUser = this.authManager.getcurrentUser.username;
			itemwisepurregister.insertDatetime = new Date();
            this.itemWisePurchaseManager.itemwisesave(itemwisepurregister).subscribe(response => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let itemwisepurregister = deserialize<Itemwisepurregister001mb>(Itemwisepurregister001mb, response);
                this.itemWise?.push(itemwisepurregister);
                const newItems = [JSON.parse(JSON.stringify(itemwisepurregister))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.gridOptions.api.deselectAll();
                this.itemWisePurchaseForm.reset();
                this.submitted = false;
            });
        }
    }
    onReset() {
        this.itemWisePurchaseForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.itemWisePurchaseManager.itemWisePurchasePdf().subscribe((response) =>{
            saveAs(response,"ItemWisePurchaseRegister");

		});
	}

	onGenerateExcelReport(){
		this.itemWisePurchaseManager.itemWisePurchaseExcel().subscribe((response) => {
			saveAs(response,"ItemWisePurchaseRegister");
        })
	}

}