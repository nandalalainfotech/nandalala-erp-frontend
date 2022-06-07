import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { LinkRendererComponent } from 'src/app/shared/services/renderercomponent/link-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { IssueItemManager } from 'src/app/shared/services/restcontroller/bizservice/issue-item.service';
import { SalesItemManager } from 'src/app/shared/services/restcontroller/bizservice/sales-item.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Issueditem001mb } from 'src/app/shared/services/restcontroller/entities/Issueditem001mb';
import { Itemdt001mb } from 'src/app/shared/services/restcontroller/entities/Itemdt001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-issue-item',
    templateUrl: './issue-item.component.html',
    styleUrls: ['./issue-item.component.css']
})

export class IssueItemComponent implements OnInit {

    issueItemsForm: FormGroup | any;
    submitted = false;

    issueId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    frameworkComponents: any;
    porderCode: string = "";
    issueDate: Date | null = null;
    itemcode: string = "";
    description: string = "";
    quantity: number | any;
    uom: string = "";
    amount: string = "";
    serialNo: string = "";
    sourceWh: string = "";
    targetWh: string = "";
    stockEntry: string = "";
    company: string = "";
    dummyname = "Dummy.status";
    dummytype = "dummy";
    dummysystemproperties: Systemproperties001mb[] = [];
    itemlist: Itemdt001mb[] = [];
    issuedItem: Issueditem001mb[] = [];
    public gridOptions: GridOptions | any;

    constructor(private issueItemManager: IssueItemManager,
        private systemPropertiesService: SystemPropertiesService,
        private calloutService: CalloutService,
        private formBuilder: FormBuilder,
        private datePipe: DatePipe,
        private salesitemManager: SalesItemManager,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            // linkRenderer: LinkRendererComponent,
            iconRenderer: IconRendererComponent
        }
    }

    ngOnInit() {

        this.issueItemsForm = this.formBuilder.group({
            porderCode: ['', Validators.required],
            issueDate: ['', Validators.required],
            itemcode: ['', Validators.required],
            description: ['', Validators.required],
            quantity: ['', Validators.required],
            uom: ['', Validators.required],
            amount: ['', Validators.required],
            serialNo: ['', Validators.required],
            sourceWh: ['', Validators.required],
            targetWh: ['', Validators.required],
            stockEntry: ['', Validators.required],
            company: ['', Validators.required]

        });

        this.createDataGrid001();
        this.salesitemManager.allsalesitem().subscribe(response => {
            this.itemlist = deserialize<Itemdt001mb[]>(Itemdt001mb, response);
        })
        this.systemPropertiesService.system(this.dummyname, this.dummytype).subscribe(response => {
            this.dummysystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.issueItemManager.allissueditem().subscribe((response => {
            this.issuedItem = deserialize<Issueditem001mb[]>(Issueditem001mb, response);
            if (this.issuedItem.length > 0) {
                this.gridOptions?.api?.setRowData(this.issuedItem);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        }))


    }

    get f() { return this.issueItemsForm.controls; }

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
                field: 'issueId',
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
                headerName: 'PROrder Code',
                field: 'porderCode',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Issue Date',
                field: 'issueDate',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: (params: any) => {
                    return params.data.issueDate ? this.datePipe.transform(params.data.issueDate, 'MM/dd/yyyy') : '';
                }
            },
            {
                headerName: 'Item Code',
                field: 'itemcode',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Description',
                field: 'description',
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
                headerName: 'UOM',
                field: 'uom',
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
                headerName: 'SerialNo',
                field: 'serialNo',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Source WareHouse',
                field: 'sourceWh',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Target WareHouse',
                field: 'targetWh',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Stock Entry',
                field: 'stockEntry',
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
                width: 185,
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

        this.issueId = params.data.issueId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.issueItemsForm.patchValue({
            'company': params.data.company,
            'description': params.data.description,
            'issueDate': this.datePipe.transform(params.data.issueDate, 'MM/dd/yyyy'),
            'itemcode': params.data.itemcode,
            'porderCode': params.data.porderCode,
            'quantity': params.data.quantity,
            'serialNo': params.data.serialNo,
            'sourceWh': params.data.sourceWh,
            'stockEntry': params.data.stockEntry,
            'targetWh': params.data.targetWh,
            'amount': params.data.amount,
            'uom': params.data.uom,
        })
    }

    onDeleteButtonClick(params: any) {
        this.issueItemManager.issitemdelete(params.data.issueId).subscribe((response) => {
            for (let i = 0; i < this.issuedItem.length; i++) {
                if (this.issuedItem[i].issueId == params.data.issueId) {
                    this.issuedItem?.splice(i, 1);
                    break;
                }
            }
            const selectedRows = params.api.getSelectedRows();
            params.api.applyTransaction({ remove: selectedRows });
            this.calloutService.showSuccess("Order Removed Successfully");
        }
        )
    }

    onAuditButtonClick(params: any) {
        const modalRef = this.modalService.open(AuditComponent);
        modalRef.componentInstance.title = "Issued Item";
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

    onOrderClick(event: any, issueItemsForm: any) {

        this.markFormGroupTouched(this.issueItemsForm);
        this.submitted = true;
        if (this.issueItemsForm.invalid) {
            return;
        }

        let issueditem = new Issueditem001mb();
        issueditem.issueDate = new Date(this.f.issueDate.value);
        issueditem.company = this.f.company.value ? this.f.company.value : "";
        issueditem.description = this.f.description.value ? this.f.description.value : "";
        issueditem.itemcode = this.f.itemcode.value ? this.f.itemcode.value : "";
        issueditem.porderCode = this.f.porderCode.value ? this.f.porderCode.value : "";
        issueditem.quantity = this.f.quantity.value ? this.f.quantity.value : null;
        issueditem.serialNo = this.f.serialNo.value ? this.f.serialNo.value : "";
        issueditem.sourceWh = this.f.sourceWh.value ? this.f.sourceWh.value : "";
        issueditem.stockEntry = this.f.stockEntry.value ? this.f.stockEntry.value : "";
        issueditem.targetWh = this.f.targetWh.value ? this.f.targetWh.value : "";
        issueditem.amount = this.f.amount.value ? this.f.amount.value : "";
        issueditem.uom = this.f.uom.value ? this.f.uom.value : "";

        if (this.issueId) {
            issueditem.issueId = this.issueId;
            issueditem.insertUser = this.insertUser;
            issueditem.insertDatetime = this.insertDatetime;
            issueditem.updatedUser = this.authManager.getcurrentUser.username;
            issueditem.updatedDatetime = new Date();
            this.issueItemManager.issitemupdate(issueditem).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let issueitem001 = deserialize<Issueditem001mb>(Issueditem001mb, response);
                for (let issue of this.issuedItem) {
                    if (issue.issueId == issueitem001.issueId) {
                        issue.amount = issueitem001.amount;
                        issue.company = issueitem001.company;
                        issue.description = issueitem001.description;
                        issue.issueDate = issueitem001.issueDate;
                        issue.itemcode = issueitem001.itemcode;
                        issue.porderCode = issueitem001.porderCode;
                        issue.quantity = issueitem001.quantity;
                        issue.serialNo = issueitem001.serialNo;
                        issue.sourceWh = issueitem001.sourceWh;
                        issue.stockEntry = issueitem001.stockEntry;
                        issue.targetWh = issueitem001.targetWh;
                        issue.uom = issueitem001.uom;
                        issue.insertUser = this.insertUser;
                        issue.insertDatetime = this.insertDatetime;
                        issue.updatedUser = this.authManager.getcurrentUser.username;
                        issue.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.issuedItem);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.issueItemsForm.reset();
                this.issueId = null;
                this.submitted = false;
            })

        } else {
            issueditem.insertUser = this.authManager.getcurrentUser.username;
            issueditem.insertDatetime = new Date();
            this.issueItemManager.issitemsave(issueditem).subscribe(response => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let issueitem001 = deserialize<Issueditem001mb>(Issueditem001mb, response);
                this.issuedItem?.push(issueitem001);
                const newItems = [JSON.parse(JSON.stringify(issueitem001))];
                this.gridOptions.api.applyTransaction({ add: newItems, addIndex: -1 });
                this.issueItemsForm.reset();
                this.submitted = false;
            }
            )
        }
    }
    onReset() {
        this.issueItemsForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.issueItemManager.issueItemPdf().subscribe((response) =>{
            saveAs(response,"IssuedItemsList");

		});
	}

	onGenerateExcelReport(){
		this.issueItemManager.issueItemExcel().subscribe((response) => {
			saveAs(response," IssuedItemsList");
        })
	}

}

