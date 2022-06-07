import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { PrmatReqManager } from 'src/app/shared/services/restcontroller/bizservice/prmat-req.service';
import { SalesItemManager } from 'src/app/shared/services/restcontroller/bizservice/sales-item.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Itemdt001mb } from 'src/app/shared/services/restcontroller/entities/Itemdt001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { Prmatreq001mb } from '../../../../shared/services/restcontroller/entities/Prmatreq001mb';
import { saveAs } from 'file-saver';

@Component({
	selector: 'app-prmat-req',
	templateUrl: './prmat-req.component.html',
	styleUrls: ['./prmat-req.component.css']
})

export class PrmatReqComponent implements OnInit {
	prMatForm: FormGroup | any;
	submitted = false;
	frameworkComponents: any;
	pmrId: number | any;
	insertUser: string = "";
    insertDatetime: Date | any;
	mrType: string = "";
	mrSeries: string = "";
	itemCode: string = "";
	quantity: string = "";
	forWarehouse: string = "";
	requiredDate: Date | null = null;
	prtyname = "PRMatReq.Type";
	prtytype = "Type";
	dummyname = "Dummy.status";
	dummytype = "dummy";
	public gridOptions: GridOptions | any;
	prMatreq: Prmatreq001mb[] = [];
	prtysystemproperties: Systemproperties001mb[] = [];
	dummysystemproperties: Systemproperties001mb[] = [];
	itemlist: Itemdt001mb[]=[];
	constructor(private prmatReqManager: PrmatReqManager, 
		private datePipe: DatePipe, 
		private formBuilder: FormBuilder, 
		private systemPropertiesService: SystemPropertiesService, 
		private calloutService: CalloutService,
		private salesitemmanager:SalesItemManager,
		private authManager: AuthManager,
		private modalService: NgbModal) {
		this.frameworkComponents = {
			iconRenderer: IconRendererComponent,
		}
	}

	ngOnInit() {
		this.prMatForm = this.formBuilder.group({
			mrType: ['', Validators.required],
			mrSeries: ['', Validators.required],
			itemCode: ['', Validators.required],
			quantity: ['', Validators.required],
			forWarehouse: ['', Validators.required],
			requiredDate: ['', Validators.required]
		});
		this.createDataGrid001();
		this.systemPropertiesService.system(this.prtyname, this.prtytype).subscribe(response => {
			this.prtysystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		})
		this.salesitemmanager.allsalesitem().subscribe(response => {
            this.itemlist = deserialize<Itemdt001mb[]>(Itemdt001mb, response);
        })

		this.prmatReqManager.allprmatreq().subscribe((response) => {
			this.prMatreq = deserialize<Prmatreq001mb[]>(Prmatreq001mb, response);
			if (this.prMatreq.length > 0) {
				this.gridOptions?.api?.setRowData(this.prMatreq);
			} else {
				this.gridOptions?.api?.setRowData([]);
			}
		})
	}

	get f() { return this.prMatForm.controls; }

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
				field: 'pmrId',
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
				headerName: 'Type',
				field: 'mrType',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Series',
				field: 'mrSeries',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
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
				headerName: 'For Warehouse',
				field: 'forWarehouse',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Required Date',
				field: 'requiredDate',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
				valueGetter: (params: any) => {
					return params.data.requiredDate ? this.datePipe.transform(params.data.requiredDate, 'MM/dd/yyyy') : '';
				}
			},
			{
				headerName: 'Edit',
				cellRenderer: 'iconRenderer',
				width: 100,
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
				width: 105,
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
                width: 105,
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
		this.pmrId = params.data.pmrId;
		this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
		this.prMatForm.patchValue({
			'mrType': params.data.mrType,
			'mrSeries': params.data.mrSeries,
			'itemCode': params.data.itemCode,
			'quantity': params.data.quantity,
			'forWarehouse': params.data.forWarehouse,
			'requiredDate': this.datePipe.transform(params.data.requiredDate, 'MM/dd/yyyy')
		});
	}

	onDeleteButtonClick(params: any) {
		this.prmatReqManager.prmatreqdelete(params.data.pmrId).subscribe((response) => {
			for (let i = 0; i < this.prMatreq.length; i++) {
				if (this.prMatreq[i].pmrId == params.data.pmrId) {
					this.prMatreq?.splice(i, 1);
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
        modalRef.componentInstance.title = "Purchase Material Request";
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

	onOrderClick(event: any, prMatForm: any) {
		this.markFormGroupTouched(this.prMatForm);
		this.submitted = true;
		if (this.prMatForm.invalid) {
			return;
		}
		let prmatreq001mb = new Prmatreq001mb();
		prmatreq001mb.forWarehouse = this.f.forWarehouse.value ? this.f.forWarehouse.value : "";
		prmatreq001mb.itemCode = this.f.itemCode.value ? this.f.itemCode.value : "";
		prmatreq001mb.mrSeries = this.f.mrSeries.value ? this.f.mrSeries.value : "";
		prmatreq001mb.mrType = this.f.mrType.value ? this.f.mrType.value : "";
		prmatreq001mb.quantity = this.f.quantity.value ? this.f.quantity.value : "";
		prmatreq001mb.requiredDate = new Date(this.f.requiredDate.value);
		if (this.pmrId) {
			prmatreq001mb.pmrId = this.pmrId;
			prmatreq001mb.insertUser = this.insertUser;
			prmatreq001mb.insertDatetime = this.insertDatetime;
			prmatreq001mb.updatedUser = this.authManager.getcurrentUser.username;
			prmatreq001mb.updatedDatetime = new Date();
			this.prmatReqManager.prmatrequpdate(prmatreq001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Updated  Successfully");
				let prmats = deserialize<Prmatreq001mb>(Prmatreq001mb, response);
				for (let purchase of this.prMatreq) {
					if (purchase.pmrId == prmats.pmrId) {
						purchase.forWarehouse = prmats.forWarehouse;
						purchase.itemCode = prmats.itemCode;
						purchase.mrSeries = prmats.mrSeries;
						purchase.mrType = prmats.mrType;
						purchase.quantity = prmats.quantity;
						purchase.requiredDate = prmats.requiredDate;
						purchase.insertUser = this.insertUser;
						purchase.insertDatetime = this.insertDatetime;
						purchase.updatedUser = this.authManager.getcurrentUser.username;
						purchase.updatedDatetime = new Date();
					}
				}
				this.gridOptions.api.setRowData(this.prMatreq);
				this.gridOptions.api.refreshView();
				this.gridOptions.api.deselectAll();
				this.prMatForm.reset();
				this.pmrId = null;
				this.submitted = false;
			});
		} else {
			prmatreq001mb.insertUser = this.authManager.getcurrentUser.username;
			prmatreq001mb.insertDatetime = new Date();
			this.prmatReqManager.prmatreqsave(prmatreq001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Saved Successfully");
				let prmats = deserialize<Prmatreq001mb>(Prmatreq001mb, response);
				this.prMatreq?.push(prmats);
				const newItems = [JSON.parse(JSON.stringify(prmats))];
				this.gridOptions.api.applyTransaction({ add: newItems });
				this.gridOptions.api.deselectAll();
				this.prMatForm.reset();
				this.submitted = false;
			});
		}
	}

	onReset() {
		this.submitted = false;
		this.prMatForm.reset();
	}

	onGeneratePdfReport(){
		this.prmatReqManager.prmatReqPdf().subscribe((response) =>{
			saveAs(response," MaterialRequestDetails");

		});
	}

	onGenerateExcelReport(){
		this.prmatReqManager.prmatReqExcel().subscribe((response) => {
			saveAs(response," MaterialRequestDetails");
        })
	}

}
