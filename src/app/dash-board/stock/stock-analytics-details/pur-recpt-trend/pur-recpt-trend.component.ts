import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { LinkRendererComponent } from 'src/app/shared/services/renderercomponent/link-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { PurRecptTrendManager } from 'src/app/shared/services/restcontroller/bizservice/pur-recpt-trend.service';
import { SalesItemManager } from 'src/app/shared/services/restcontroller/bizservice/sales-item.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Itemdt001mb } from 'src/app/shared/services/restcontroller/entities/Itemdt001mb';
import { Purecpttrend001mb } from 'src/app/shared/services/restcontroller/entities/Purecpttrend001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
	selector: 'app-pur-recpt-trend',
	templateUrl: './pur-recpt-trend.component.html',
	styleUrls: ['./pur-recpt-trend.component.css']
})

export class PurRecptTrendComponent implements OnInit {

	trendForm: FormGroup | any;
	submitted = false;

	frameworkComponents: any;
	putrendId:number|any;
	insertUser: string = "";
    insertDatetime: Date | any;
	itmname: string = "Dummy.status";
	itmtype: string = "dummy";
	periodname: string = "range.type";
	periodtype: string = "type";
	basename: string = "supplier.type";
	basetype: string = "type";
	fiscalname: string = "Year.status";
	fiscaltype: string = "year";
	itemCode: string = "";
	period: string = "";
	basedOn: string = "";
	fiscalYear: number|any;
	company: string = "";
	janQty: string | null = "";
	janAmt: string | null = "";
	febQty: string | null = "";
	febAmt: string | null = "";
	marQty: string | null = "";
	marAmt: string | null = "";
	aprQty: string = "";
	aprAmt: string | null = "";
	mayQty: string | null = "";
	mayAmt: string | null = "";
	junQty: string | null = "";
	junAmt: string | null = "";
	julQty: string | null = "";
	julAmt: string | null = "";
	augQty: string | null = "";
	augAmt: string | null = "";
	sepQty: string | null = "";
	sepAmt: string | null = "";
	octQty: string | null = "";
	octAmt: string | null = "";
	novQty: string | null = "";
	novAmt: string | null = "";
	decQty: string | null = "";
	decAmt: string | null = "";
	totalQty: string | null = "";
	totalAmt: string | null = "";
	augQtyt: string | null = "";
	recptTrends: Purecpttrend001mb[] = [];
	itmsystemproperties?: Systemproperties001mb[] = [];
	periodsystemproperties?: Systemproperties001mb[] = [];
	basesystemproperties?: Systemproperties001mb[] = [];
	fiscalsystemproperties?: Systemproperties001mb[] = [];
	public gridOptions: GridOptions | any;
	stkitems: Itemdt001mb[] = [];

	constructor(private systemPropertiesService: SystemPropertiesService, 
		private salesItemManager: SalesItemManager,
		private purRecptTrendManager: PurRecptTrendManager,
		private calloutService: CalloutService, 
		private formBuilder: FormBuilder,
		private authManager: AuthManager,
		private modalService: NgbModal) {
		this.frameworkComponents = {
			iconRenderer: IconRendererComponent
		}
	}

	ngOnInit() {

		this.trendForm = this.formBuilder.group({
			itemCode: ['', Validators.required],
			period: ['', Validators.required],
			basedOn: ['', Validators.required],
			fiscalYear: ['', Validators.required],
			company: ['', Validators.required],
			janQty: ['', Validators.required],
			janAmt: ['', Validators.required],
			febQty: ['', Validators.required],
			febAmt: ['', Validators.required],
			marQty: ['', Validators.required],
			marAmt: ['', Validators.required],
			aprQty: ['', Validators.required],
			aprAmt: ['', Validators.required],
			mayQty: ['', Validators.required],
			mayAmt: ['', Validators.required],
			junQty: ['', Validators.required],
			junAmt: ['', Validators.required],
			julQty: ['', Validators.required],
			julAmt: ['', Validators.required],
			augQty: ['', Validators.required],
			augAmt: ['', Validators.required],
			sepQty: ['', Validators.required],
			sepAmt: ['', Validators.required],
			octQty: ['', Validators.required],
			octAmt: ['', Validators.required],
			novQty: ['', Validators.required],
			novAmt: ['', Validators.required],
			decQty: ['', Validators.required],
			decAmt: ['', Validators.required],
			totalQty: ['', Validators.required],
			totalAmt: ['', Validators.required],
			augQtyt: ['', Validators.required],
		})

		this.createDataGrid001();
		this.systemPropertiesService.system(this.itmname, this.itmtype).subscribe(response => {
			this.itmsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		})
		this.systemPropertiesService.system(this.periodname, this.periodtype).subscribe(response => {
			this.periodsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		})
		this.systemPropertiesService.system(this.basename, this.basetype).subscribe(response => {
			this.basesystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		})
		this.systemPropertiesService.system(this.fiscalname, this.fiscaltype).subscribe(response => {
			this.fiscalsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		})
		this.salesItemManager.allsalesitem().subscribe((response) => {
			this.stkitems = deserialize<Itemdt001mb[]>(Itemdt001mb, response);
		})
		this.purRecptTrendManager.allrecpttrend().subscribe(response => {
			this.recptTrends = deserialize<Purecpttrend001mb[]>(Purecpttrend001mb, response);
			if (this.recptTrends.length > 0) {
				this.gridOptions?.api?.setRowData(this.recptTrends);
			} else {
				this.gridOptions?.api?.setRowData([]);
			}
		});
	}

	get f() { return this.trendForm.controls; }

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
				field: 'putrendId',
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
                headerName: 'Period',
                field: 'period',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Based On',
                field: 'basedOn',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Fiscal Year',
                field: 'fiscalYear',
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
                headerName: 'JanQty',
                field: 'janQty',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'JanAmt',
                field: 'janAmt',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'FebQty',
                field: 'febQty',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'FebAmt',
                field: 'febAmt',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'MarQty',
                field: 'marQty',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'MarAmt',
                field: 'marAmt',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'AprQty',
                field: 'aprQty',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            }, 
            {
                headerName: 'AprAmt',
                field: 'aprAmt',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'MayQty',
                field: 'mayQty',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'MayAmt',
                field: 'mayAmt',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'JunQty',
                field: 'junQty',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'JunAmt',
                field: 'junAmt',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'JulQty',
                field: 'julQty',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'JulAmt',
                field: 'julAmt',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'AugQty',
                field: 'augQty',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'AugAmt',
                field: 'augAmt',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'SepQty',
                field: 'sepQty',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'SepAmt',
                field: 'sepAmt',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'OctQty',
                field: 'octQty',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },

            {
                headerName: 'OctAmt',
                field: 'octAmt',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'NovQty',
                field: 'novQty',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'NovAmt',
                field: 'novAmt',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },

            {
                headerName: 'DecQty',
                field: 'decQty',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'DecAmt',
                field: 'decAmt',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'TotalQty',
                field: 'totalQty',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'TotalAmt',
                field: 'totalAmt',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },

            {
                headerName: 'AugQtyt',
                field: 'augQtyt',
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
                cellRendererParams: {
                    onClick: this.onEditButtonClick.bind(this),
                    label: 'Edit'
                },
            },
            {
                headerName: 'Delete',
                cellRenderer: 'iconRenderer',
                width: 55,
                flex: 1,
                suppressSizeToFit: true,
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

		this.putrendId = params.data.putrendId;
		this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
		this.trendForm.patchValue({
			'itemCode': params.data.itemCode,
			'period': params.data.period,
			'basedOn': params.data.basedOn,
			'fiscalYear': params.data.fiscalYear,
			'company': params.data.company,
			'janAmt': params.data.janAmt,
			'janQty': params.data.janQty,
			'febAmt': params.data.febAmt,
			'febQty': params.data.febQty,
			'marAmt': params.data.marAmt,
			'marQty': params.data.marQty,
			'aprAmt': params.data.aprAmt,
			'aprQty': params.data.aprQty,
			'mayAmt': params.data.mayAmt,
			'mayQty': params.data.mayQty,
			'junAmt': params.data.junAmt,
			'junQty': params.data.junQty,
			'julAmt': params.data.julAmt,
			'julQty': params.data.julQty,
			'augAmt': params.data.augAmt,
			'augQty': params.data.augQty,
			'sepAmt': params.data.sepAmt,
			'sepQty': params.data.sepQty,
			'octAmt': params.data.octAmt,
			'octQty': params.data.octQty,
			'novAmt': params.data.novAmt,
			'novQty': params.data.novQty,
			'decAmt': params.data.decAmt,
			'decQty': params.data.decQty,
			'totalAmt': params.data.totalAmt,
			'totalQty': params.data.totalQty,
			'augQtyt': params.data.augQtyt,
		})
	}

	onDeleteButtonClick(params: any) {
		this.purRecptTrendManager.deleterecpttrend(params.data.putrendId).subscribe((response) => {
			for (let i = 0; i < this.recptTrends.length; i++) {
				if (this.recptTrends[i].putrendId == params.data.putrendId) {
					this.recptTrends?.splice(i, 1);
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
        modalRef.componentInstance.title = "Purchase Reciept Trend";
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

	onOrderClick(event: any, trendForm: any) {

		this.markFormGroupTouched(this.trendForm);
		this.submitted = true;
		if (this.trendForm.invalid) {
			return;
		}

		let purecpttrend001mb = new Purecpttrend001mb();
		purecpttrend001mb.itemCode = this.f.itemCode.value ? this.f.itemCode.value : "";
		purecpttrend001mb.period = this.f.period.value ? this.f.period.value : "";
		purecpttrend001mb.basedOn = this.f.basedOn.value ? this.f.basedOn.value : "";
		purecpttrend001mb.fiscalYear = this.f.fiscalYear.value ? this.f.fiscalYear.value : 0;
		purecpttrend001mb.company = this.f.company.value ? this.f.company.value : "";
		purecpttrend001mb.janQty = this.f.janQty.value ? this.f.janQty.value : "";
		purecpttrend001mb.janAmt = this.f.janAmt.value ? this.f.janAmt.value : "";
		purecpttrend001mb.febQty = this.f.febQty.value ? this.f.febQty.value : "";
		purecpttrend001mb.febAmt = this.f.febAmt.value ? this.f.febAmt.value : "";
		purecpttrend001mb.marQty = this.f.marQty.value ? this.f.marQty.value : "";
		purecpttrend001mb.marAmt = this.f.marAmt.value ? this.f.marAmt.value : "";
		purecpttrend001mb.aprQty = this.f.aprQty.value ? this.f.aprQty.value : "";
		purecpttrend001mb.aprAmt = this.f.aprAmt.value ? this.f.aprAmt.value : "";
		purecpttrend001mb.mayAmt = this.f.mayAmt.value ? this.f.mayAmt.value : "";
		purecpttrend001mb.mayQty = this.f.mayQty.value ? this.f.mayQty.value : "";
		purecpttrend001mb.junQty = this.f.junQty.value ? this.f.junQty.value : "";
		purecpttrend001mb.junAmt = this.f.junAmt.value ? this.f.junAmt.value : "";
		purecpttrend001mb.julQty = this.f.julQty.value ? this.f.julQty.value : "";
		purecpttrend001mb.julAmt = this.f.julAmt.value ? this.f.julAmt.value : "";
		purecpttrend001mb.augQty = this.f.augQty.value ? this.f.augQty.value : "";
		purecpttrend001mb.augAmt = this.f.augAmt.value ? this.f.augAmt.value : "";
		purecpttrend001mb.sepQty = this.f.sepQty.value ? this.f.sepQty.value : "";
		purecpttrend001mb.sepAmt = this.f.sepAmt.value ? this.f.sepAmt.value : "";
		purecpttrend001mb.octAmt = this.f.octAmt.value ? this.f.octAmt.value : "";
		purecpttrend001mb.octQty = this.f.octQty.value ? this.f.octQty.value : "";
		purecpttrend001mb.novAmt = this.f.novAmt.value ? this.f.novAmt.value : "";
		purecpttrend001mb.novQty = this.f.novQty.value ? this.f.novQty.value : "";
		purecpttrend001mb.decQty = this.f.decQty.value ? this.f.decQty.value : "";
		purecpttrend001mb.decAmt = this.f.decAmt.value ? this.f.decAmt.value : "";
		purecpttrend001mb.totalAmt = this.f.totalAmt.value ? this.f.totalAmt.value : "";
		purecpttrend001mb.totalQty = this.f.totalQty.value ? this.f.totalQty.value : "";
		purecpttrend001mb.augQtyt = this.f.augQtyt.value ? this.f.augQtyt.value : "";
		if (this.putrendId) {
			purecpttrend001mb.putrendId = this.putrendId;
			purecpttrend001mb.insertUser = this.insertUser;
            purecpttrend001mb.insertDatetime = this.insertDatetime;
            purecpttrend001mb.updatedUser = this.authManager.getcurrentUser.username;
            purecpttrend001mb.updatedDatetime = new Date();
			this.purRecptTrendManager.updaterecpttrend(purecpttrend001mb).subscribe(response => {
				this.calloutService.showSuccess("Order Updated Successfully");
				let notes = deserialize<Purecpttrend001mb>(Purecpttrend001mb, response);
				for (let recpt of this.recptTrends) {
					if (recpt.putrendId == notes.putrendId) {
						recpt.itemCode = notes.itemCode;
						recpt.period = notes.period;
						recpt.basedOn = notes.basedOn;
						recpt.fiscalYear = notes.fiscalYear;
						recpt.company = notes.company;
						recpt.janAmt = notes.janAmt;
						recpt.janQty = notes.janQty;
						recpt.febAmt = notes.febAmt;
						recpt.febQty = notes.febQty;
						recpt.marAmt = notes.marAmt;
						recpt.marQty = notes.marQty;
						recpt.aprAmt = notes.aprAmt;
						recpt.aprQty = notes.aprQty;
						recpt.mayAmt = notes.mayAmt;
						recpt.mayQty = notes.mayQty;
						recpt.junAmt = notes.junAmt;
						recpt.junQty = notes.junQty;
						recpt.julAmt = notes.julAmt;
						recpt.julQty = notes.julQty;
						recpt.augAmt = notes.augAmt;
						recpt.augQty = notes.augQty;
						recpt.sepAmt = notes.sepAmt;
						recpt.sepQty = notes.sepQty;
						recpt.octAmt = notes.octAmt;
						recpt.octQty = notes.octQty;
						recpt.novAmt = notes.novAmt;
						recpt.novQty = notes.novQty;
						recpt.decAmt = notes.decAmt;
						recpt.decQty = notes.decQty;
						recpt.totalAmt = notes.totalAmt;
						recpt.totalQty = notes.totalQty;
						recpt.augQtyt = notes.augQtyt;
						recpt.insertUser = this.insertUser;
						recpt.insertDatetime = this.insertDatetime;
						recpt.updatedUser = this.authManager.getcurrentUser.username;
						recpt.updatedDatetime = new Date();
					}
				}
				this.gridOptions.api.setRowData(this.recptTrends);
				this.gridOptions.api.refreshView();
				this.gridOptions.api.deselectAll();
				this.trendForm.reset();
				this.putrendId = null;;
				this.submitted = false;
			})
		}
		else {
			purecpttrend001mb.insertUser = this.authManager.getcurrentUser.username;
            purecpttrend001mb.insertDatetime = new Date();
			this.purRecptTrendManager.saverecpttrend(purecpttrend001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Saved Successfully");
				let notes = deserialize<Purecpttrend001mb>(Purecpttrend001mb, response);
				this.recptTrends.push(notes);
				const newItems = [JSON.parse(JSON.stringify(notes))];
				this.gridOptions.api.applyTransaction({ add: newItems });
				this.trendForm.reset();
				this.submitted = false;
			})
		}
	}
	onReset() {
		this.trendForm.reset();
		this.submitted = false;
	}

    onGeneratePdfReport() {
		this.purRecptTrendManager.dpurRecptTrendPdf().subscribe((response) => {
			saveAs(response, "PurchaseReceiptTrendList");

		});
	}

	onGenerateExcelReport() {
		this.purRecptTrendManager.purRecptTrendExcel().subscribe((response) => {
			saveAs(response, "PurchaseReceiptTrendList");
		});
	}
}