import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { ItemWiseLevelManager } from 'src/app/shared/services/restcontroller/bizservice/item-wise-level.service';
import { SalesItemManager } from 'src/app/shared/services/restcontroller/bizservice/sales-item.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Itemdt001mb } from 'src/app/shared/services/restcontroller/entities/Itemdt001mb';
import { Itemwiselevel001mb } from 'src/app/shared/services/restcontroller/entities/Itemwiselevel001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-itm-wise-level',
    templateUrl: './itm-wise-level.component.html',
    styleUrls: ['./itm-wise-level.component.css']
})

export class ItmWiseLevelComponent implements OnInit {
    frameworkComponents: any;
    iwlId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    itemCode: string = "";
    safetyStk: string = "";
    leadtimeDays: string | null = "";
    consumed: string | null = "";
    delivered: string | null = "";
    totalOutgoing: string | null = "";
    avgdailyOutgoing: string | null = "";
    reorderLevel: string = "";
    description: string = "";
    itmWises: Itemwiselevel001mb[] = [];
    itmsystemproperties: Systemproperties001mb[] = [];
    public gridOptions: GridOptions | any;
    levelForm: FormGroup | any;
    submitted = false;
    stkitems: Itemdt001mb[] = [];

    constructor(private systemProperiesService: SystemPropertiesService, 
        private formBuilder: FormBuilder,
        private itemWiseLevelManager: ItemWiseLevelManager, 
        private salesItemManager: SalesItemManager, 
        private calloutService: CalloutService,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent
        }
    }

    ngOnInit() {

        this.levelForm = this.formBuilder.group({
            itemCode: ['', Validators.required],
            safetyStk: ['', Validators.required],
            leadtimeDays: ['', Validators.required],
            consumed: ['', Validators.required],
            delivered: ['', Validators.required],
            totalOutgoing: ['', Validators.required],
            avgdailyOutgoing: ['', Validators.required],
            reorderLevel: ['', Validators.required],
            description: ['', Validators.required]
        });
        this.createDataGrid001mb();
        this.salesItemManager.allsalesitem().subscribe((response) => {
            this.stkitems = deserialize<Itemdt001mb[]>(Itemdt001mb, response);
        })
        this.itemWiseLevelManager.allitemwise().subscribe(response => {
            this.itmWises = deserialize<Itemwiselevel001mb[]>(Itemwiselevel001mb, response);
            if (this.itmWises.length > 0) {
                this.gridOptions?.api?.setRowData(this.itmWises);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }
    get f() { return this.levelForm.controls; }
    createDataGrid001mb(): void {
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
                field: 'iwlId',
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
                headerName: 'Safety Stock',
                field: 'safetyStk',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Lead Time Days',
                field: 'leadtimeDays',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Consumed',
                field: 'consumed',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Delivered',
                field: 'delivered',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Total OutGoing',
                field: 'totalOutgoing',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Average Daily OutGoing',
                field: 'avgdailyOutgoing',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Reorder Level',
                field: 'reorderLevel',
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
                width: 150,
                flex: 1,
                suppressSizeToFit: true,
                cellStyle: { textAlign: 'center' },
                cellRendererParams: {
                    onClick: this.onAuditButtonClick.bind(this),
                    label: 'Audit'
                },
            },
        ]
    }
    onEditButtonClick(params: any) {
        this.iwlId = params.data.iwlId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.levelForm.patchValue({
            'safetyStk': params.data.safetyStk,
            'itemCode': params.data.itemCode,
            'leadtimeDays': params.data.leadtimeDays,
            'consumed': params.data.consumed,
            'delivered': params.data.delivered,
            'totalOutgoing': params.data.totalOutgoing,
            'avgdailyOutgoing': params.data.avgdailyOutgoing,
            'reorderLevel': params.data.reorderLevel,
            'description': params.data.description,

        });
    }

    onDeleteButtonClick(params: any) {
        this.itemWiseLevelManager.itemwisedelete(params.data.iwlId).subscribe(response => {
            for (let i = 0; i < this.itmWises.length; i++) {
                if (this.itmWises[i].iwlId == params.data.iwlId) {
                    this.itmWises?.splice(i, 1);
                    break;
                }
            }
            const selectedRows = params.api.getSelectedRows();
            params.api.applyTransaction({ remove: selectedRows });
            this.gridOptions.api.deselectAll();
            this.calloutService.showSuccess("Order Removed Successfully");
        })
    }

    onAuditButtonClick(params: any) {
        const modalRef = this.modalService.open(AuditComponent);
        modalRef.componentInstance.title = "Item Wise Level";
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

    onOrderClick(event: any, levelForm: any) {

        this.markFormGroupTouched(this.levelForm);
        this.submitted = true;
        if (this.levelForm.invalid) {
            return;
        }

        let itemwiselevel001mb = new Itemwiselevel001mb();
        itemwiselevel001mb.itemCode = this.f.itemCode.value ? this.f.itemCode.value : "";
        itemwiselevel001mb.safetyStk = this.f.safetyStk.value ? this.f.safetyStk.value : "";
        itemwiselevel001mb.leadtimeDays = this.f.leadtimeDays.value ? this.f.leadtimeDays.value : "";
        itemwiselevel001mb.consumed = this.f.consumed.value ? this.f.consumed.value : "";
        itemwiselevel001mb.delivered = this.f.delivered.value ? this.f.delivered.value : "";
        itemwiselevel001mb.totalOutgoing = this.f.totalOutgoing.value ? this.f.totalOutgoing.value : "";
        itemwiselevel001mb.avgdailyOutgoing = this.f.avgdailyOutgoing.value ? this.f.avgdailyOutgoing.value : "";
        itemwiselevel001mb.reorderLevel = this.f.reorderLevel.value ? this.f.reorderLevel.value : "";
        itemwiselevel001mb.description = this.f.description.value ? this.f.description.value : "";
        if (this.iwlId) {
            itemwiselevel001mb.iwlId = this.iwlId;
            itemwiselevel001mb.insertUser = this.insertUser;
            itemwiselevel001mb.insertDatetime = this.insertDatetime;
            itemwiselevel001mb.updatedUser = this.authManager.getcurrentUser.username;
            itemwiselevel001mb.updatedDatetime = new Date();
            this.itemWiseLevelManager.itemwisesave(itemwiselevel001mb).subscribe(response => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let levels = deserialize<Itemwiselevel001mb>(Itemwiselevel001mb, response);
                for (let items of this.itmWises) {
                    if (items.iwlId == levels.iwlId) {
                        items.itemCode = levels.itemCode;
                        items.safetyStk = levels.safetyStk;
                        items.leadtimeDays = levels.leadtimeDays;
                        items.delivered = levels.delivered;
                        items.totalOutgoing = levels.totalOutgoing;
                        items.avgdailyOutgoing = levels.avgdailyOutgoing;
                        items.reorderLevel = levels.reorderLevel;
                        items.description = levels.description;
                        items.insertUser = this.insertUser;
                        items.insertDatetime = this.insertDatetime;
                        items.updatedUser = this.authManager.getcurrentUser.username;
                        items.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.itmWises);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.levelForm.reset();
                this.submitted = false;
                this.iwlId = null;
            });
        } else {
            itemwiselevel001mb.insertUser = this.authManager.getcurrentUser.username;
            itemwiselevel001mb.insertDatetime = new Date();
            this.itemWiseLevelManager.itemwisesave(itemwiselevel001mb).subscribe(response => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let levels = deserialize<Itemwiselevel001mb>(Itemwiselevel001mb, response);
                this.itmWises.push(levels);
                const newItems = [JSON.parse(JSON.stringify(levels))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.gridOptions.api.deselectAll();
                this.levelForm.reset();
                this.submitted = false;
            });
        }
    }
    onReset() {
        this.levelForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.itemWiseLevelManager.itemWiseLevelPdf().subscribe((response) =>{
            saveAs(response,"ItemWiseLevel");

		});
	}

	onGenerateExcelReport(){
		this.itemWiseLevelManager.itemWiseLevelExcel().subscribe((response) => {
			saveAs(response,"ItemWiseLevel");
        })
	}


}