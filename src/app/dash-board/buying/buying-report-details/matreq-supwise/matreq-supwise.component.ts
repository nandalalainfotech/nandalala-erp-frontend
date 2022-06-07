import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { LinkRendererComponent } from 'src/app/shared/services/renderercomponent/link-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { MatreqSupwiseManager } from 'src/app/shared/services/restcontroller/bizservice/matreq-supwise.service';
import { SalesItemManager } from 'src/app/shared/services/restcontroller/bizservice/sales-item.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Itemdt001mb } from 'src/app/shared/services/restcontroller/entities/Itemdt001mb';
import { Matreqsunotcreate001mb } from 'src/app/shared/services/restcontroller/entities/Matreqsunotcreate001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-matreq-supwise',
    templateUrl: './matreq-supwise.component.html',
    styleUrls: ['./matreq-supwise.component.css']
})
export class MatreqSupwiseComponent implements OnInit {
   
    mrsId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    frameworkComponents: any;
    submitted = false;
    supWiseForm: FormGroup | any;
    itemname: string = "Dummy.status";
    itemtype: string = "dummy";
    mrSeries: string = "";
    date: Date | null = null;
    itemCode: string = "";
    quantity: number | any;
    description: string | null = "";
    company: string = "";
    public gridOptions: GridOptions | any;
    itsystemproperties?: Systemproperties001mb[] = [];
    matSupwise: Matreqsunotcreate001mb[] = [];
    itemlist: Itemdt001mb[]=[];

    constructor(private salesitemManager:SalesItemManager,
        private systemPropertyServeice: SystemPropertiesService, 
        private matreqSupwiseManager: MatreqSupwiseManager, 
        private calloutService: CalloutService, 
        private formBuilder: FormBuilder, 
        private datePipe: DatePipe,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent
        }
    }
    ngOnInit() {
        this.supWiseForm = this.formBuilder.group({
            itemCode: ['', Validators.required],
            mrSeries: ['', Validators.required],
            date: ['', Validators.required],
            quantity: ['', Validators.required],
            description: ['', Validators.required],
            company: ['', Validators.required],
        })
        this.createDataGrid001();
        this.salesitemManager.allsalesitem().subscribe(response => {
            this.itemlist = deserialize<Itemdt001mb[]>(Itemdt001mb, response);
        })
        this.systemPropertyServeice.system(this.itemname, this.itemtype).subscribe((response) => {
            this.itsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.matreqSupwiseManager.allmatreq().subscribe((response) => {
            this.matSupwise = deserialize<Matreqsunotcreate001mb[]>(Matreqsunotcreate001mb, response)
            if (this.matSupwise.length > 0) {
                this.gridOptions?.api?.setRowData(this.matSupwise);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }
    get f() { return this.supWiseForm.controls; }
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
                field: 'mrsId',
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
                headerName: 'MrSeries',
                field: 'mrSeries',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Date',
                field: 'date',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: (params: any) => {
                    return params.data.date ? this.datePipe.transform(params.data.date, 'MM/dd/yyyy') : '';
                }
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
        this.mrsId = params.data.mrsId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.supWiseForm.patchValue({
            'itemCode': params.data.itemCode,
            'mrSeries': params.data.mrSeries,
            'date': this.datePipe.transform(params.data.date, 'MM/dd/yyyy'),
            'quantity': params.data.quantity,
            'description': params.data.description,
            'company': params.data.company,
        })
    }

    onDeleteButtonClick(params: any) {
        this.matreqSupwiseManager.deletematreqsup(params.data.mrsId).subscribe((response) => {
            for (let i = 0; i < this.matSupwise.length; i++) {
                if (this.matSupwise[i].mrsId == params.data.mrsId) {
                    this.matSupwise?.splice(i, 1);
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
        modalRef.componentInstance.title = "Material Request Supply Wise";
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
    onOrderClick(event: any, supWise: any) {
        this.markFormGroupTouched(this.supWiseForm);
        this.submitted = true;

        // stop here if form is invalid
        if (this.supWiseForm.invalid) {
            return;
        }
        let matreqsunotcreate001mb = new Matreqsunotcreate001mb();
        matreqsunotcreate001mb.mrSeries = this.f.mrSeries.value ? this.f.mrSeries.value : "";
        matreqsunotcreate001mb.date = new Date(this.f.date.value); 
        matreqsunotcreate001mb.itemCode = this.f.itemCode.value ? this.f.itemCode.value : "";
        matreqsunotcreate001mb.quantity = this.f.quantity.value ? this.f.quantity.value : 0;
        matreqsunotcreate001mb.description = this.f.description.value ? this.f.description.value : "";
        matreqsunotcreate001mb.company = this.f.company.value ? this.f.company.value : "";
        if (this.mrsId) {
            matreqsunotcreate001mb.mrsId = this.mrsId;
            matreqsunotcreate001mb.insertUser = this.insertUser;
			matreqsunotcreate001mb.insertDatetime = this.insertDatetime;
            matreqsunotcreate001mb.updatedUser = this.authManager.getcurrentUser.username;
			matreqsunotcreate001mb.updatedDatetime = new Date();
            this.matreqSupwiseManager.updateprmatreqsup(matreqsunotcreate001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let matreqq = deserialize<Matreqsunotcreate001mb>(Matreqsunotcreate001mb, response);
                for (let mat of this.matSupwise) {
                    if (mat.mrsId == matreqq.mrsId) {
                        mat.company = matreqq.company;
                        mat.date = matreqq.date;
                        mat.description = matreqq.description;
                        mat.itemCode = matreqq.itemCode;
                        mat.mrSeries = matreqq.mrSeries;
                        mat.quantity = matreqq.quantity;
                        mat.insertUser = this.insertUser;
                        mat.insertDatetime = this.insertDatetime;
                        mat.updatedUser = this.authManager.getcurrentUser.username;
                        mat.updatedDatetime = new Date();
                    }
                }
                this.gridOptions.api.setRowData(this.matSupwise);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.supWiseForm.reset();
                this.submitted = false;
                this.mrsId = null;
            })
        }
        else {
            matreqsunotcreate001mb.insertUser = this.authManager.getcurrentUser.username;
			matreqsunotcreate001mb.insertDatetime = new Date();
            this.matreqSupwiseManager.saveprmatreqsup(matreqsunotcreate001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let matreqq = deserialize<Matreqsunotcreate001mb>(Matreqsunotcreate001mb, response);
                this.matSupwise?.push(matreqq);
                const newItems = [JSON.parse(JSON.stringify(matreqq))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                this.supWiseForm.reset();
                this.submitted = false;
            })
        }

    }
    onReset() {
        this.supWiseForm.reset();
        this.submitted = false;
    }

    onGeneratePdfReport(){
		this.matreqSupwiseManager.matreqSupwisePdf().subscribe((response) =>{
            saveAs(response,"MaterialRequestList");

		});
	}

	onGenerateExcelReport(){
		this.matreqSupwiseManager.matreqSupwiseExcel().subscribe((response) => {
			saveAs(response,"MaterialRequestList");
        })
	}


}