import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {  GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AssetManager } from 'src/app/shared/services/restcontroller/bizservice/asset.service';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Asset001mb } from 'src/app/shared/services/restcontroller/entities/Asset001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
	selector: 'app-asset',
	templateUrl: './asset.component.html',
	styleUrls: ['./asset.component.css']
})

export class AssetComponent implements OnInit {

	id: number|any; 
	insertUser: string = "";
    insertDatetime: Date | any;
	frameworkComponents: any;
	asset: string = "";
	depreciationdate: Date|null = null;
	purchaseamount!: number|any;
	depreciationamount!: number|any;;
	accumulateddepreciationamount!:number|any;
	amountafterdepreciation!: number|any;
	depreciationentry: string = "";
	assetcategory: string = "";
	currentstatus: string = "";
	depreciationmethod: string = "";
	purchasedate: Date|null = null;
	assets: Asset001mb[] = [];
	public gridOptions: GridOptions | any;
	assetForm: FormGroup | any;
	submitted = false;

	constructor(private assetManager: AssetManager,
		private systemPropertiesService: SystemPropertiesService, 
		private formBuilder: FormBuilder,
		private datePipe: DatePipe,
		private calloutService: CalloutService,
		private authManager: AuthManager,
		private modalService: NgbModal) {
		this.frameworkComponents = {
			iconRenderer:IconRendererComponent
		}
	}

	ngOnInit() {
		this.assetForm = this.formBuilder.group({
			asset: ['', Validators.required],
			depreciationdate: ['', Validators.required],
			purchaseamount: ['', Validators.required],
			depreciationamount: ['', Validators.required],
			accumulateddepreciationamount: ['', Validators.required],
			amountafterdepreciation: ['', Validators.required],
			depreciationentry: ['', Validators.required],
			assetcategory: ['', Validators.required],
			currentstatus: ['', Validators.required],
			depreciationmethod: ['', Validators.required],
			purchasedate: ['', Validators.required]
		});

		this.createDataGrid001();
		this.assetManager.allasset().subscribe(response => {
			this.assets = deserialize<Asset001mb[]>(Asset001mb, response)
			if (this.assets.length > 0) {
				this.gridOptions?.api?.setRowData(this.assets);
			} else {
				this.gridOptions?.api?.setRowData([]);
			}
		})
	}
	get f() { return this.assetForm.controls; }

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
				headerName: 'Asset',
				field: 'asset',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Depreciation Date',
				field: 'depreciationdate',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
				valueGetter: (params: any) => {
                    return params.data.depreciationdate ? this.datePipe.transform(params.data.depreciationdate, 'MM/dd/yyyy') : '';
                }
			},
			{
				headerName: 'Purchase Amount',
				field: 'purchaseamount',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},

			{
				headerName: 'Depreciation Amount',
				field: 'depreciationamount',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},

			{
				headerName: 'Accumulated Depreciation Amount',
				field: 'accumulateddepreciationamount',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Amount After Depreciation',
				field: 'amountafterdepreciation',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Depreciation Entry',
				field: 'depreciationentry',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Asset Category',
				field: 'assetcategory',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Current Status',
				field: 'currentstatus',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Depreciation Method',
				field: 'depreciationmethod',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Purchase Date',
				field: 'purchasedate',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
				valueGetter: (params: any) => {
                    return params.data.purchasedate ? this.datePipe.transform(params.data.purchasedate, 'MM/dd/yyyy') : '';
                }
			},
			{
				headerName: 'Edit',
				cellRenderer: 'iconRenderer',
				width: 200,
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
		this.id = params.data.id;
		this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
		this.assetForm.patchValue({
			'asset': params.data.asset,
			'depreciationdate': this.datePipe.transform(params.data.depreciationdate, 'MM/dd/yyyy'),
			'purchaseamount': params.data.purchaseamount,
			'depreciationamount': params.data.depreciationamount,
			'accumulateddepreciationamount': params.data.accumulateddepreciationamount,
			'amountafterdepreciation': params.data.amountafterdepreciation,
			'depreciationentry': params.data.depreciationentry,
			'assetcategory': params.data.assetcategory,
			'currentstatus': params.data.currentstatus,
			'depreciationmethod': params.data.depreciationmethod,
			'purchasedate': this.datePipe.transform(params.data.purchasedate, 'MM/dd/yyyy'),
		});
	}
	onDeleteButtonClick(params: any) {
		this.assetManager.assetdelete(params.data.id).subscribe((response) => {
			for (let i = 0; i < this.assets.length; i++) {
				if (this.assets[i].id == params.data.id) {
					this.assets?.splice(i, 1);
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
        modalRef.componentInstance.title = "Asset";
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
	onOrderClick(event: any, assetForm: any) {
		this.markFormGroupTouched(this.assetForm);
		this.submitted = true;
		if (this.assetForm.invalid) {
			return;
		}
		let asset001mb = new Asset001mb();
		asset001mb.depreciationdate = new Date(this.f.depreciationdate.value);
		asset001mb.purchasedate = new Date(this.f.purchasedate.value);
		asset001mb.accumulateddepreciationamount = this.f.accumulateddepreciationamount.value ? this.f.accumulateddepreciationamount.value : 0;
		asset001mb.amountafterdepreciation = this.f.amountafterdepreciation.value ? this.f.amountafterdepreciation.value : 0;
		asset001mb.asset = this.f.asset.value ? this.f.asset.value : "";
		asset001mb.assetcategory = this.f.assetcategory.value ? this.f.assetcategory.value : "";
		asset001mb.currentstatus = this.f.currentstatus.value ? this.f.currentstatus.value : "";
		asset001mb.depreciationamount = this.f.depreciationamount.value ? this.f.depreciationamount.value : 0;
		asset001mb.depreciationentry = this.f.depreciationentry.value ? this.f.depreciationentry.value : "";
		asset001mb.depreciationmethod = this.f.depreciationmethod.value ? this.f.depreciationmethod.value : "";
		asset001mb.purchaseamount = this.f.purchaseamount.value ? this.f.purchaseamount.value : 0;
		if (this.id) {
			asset001mb.id = this.id;
			asset001mb.insertUser = this.insertUser;
			asset001mb.insertDatetime = this.insertDatetime;
			asset001mb.updatedUser = this.authManager.getcurrentUser.username;
			asset001mb.updatedDatetime = new Date();
			this.assetManager.assetupdate(asset001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Updated Successfully");
				let assetss = deserialize<Asset001mb>(Asset001mb, response);
				for (let asset of this.assets) {
					if (asset.id == assetss.id) {
						asset.accumulateddepreciationamount = assetss.accumulateddepreciationamount;
						asset.amountafterdepreciation = assetss.amountafterdepreciation;
						asset.asset = assetss.asset;
						asset.assetcategory = assetss.assetcategory;
						asset.currentstatus = assetss.currentstatus;
						asset.depreciationamount = assetss.depreciationamount;
						asset.depreciationdate = assetss.depreciationdate;
						asset.depreciationentry = assetss.depreciationentry;
						asset.depreciationmethod = assetss.depreciationmethod;
						asset.purchaseamount = assetss.purchaseamount;
						asset.purchasedate =assetss.purchasedate;
						asset.insertUser = this.insertUser;
						asset.insertDatetime = this.insertDatetime;
						asset.updatedUser = this.authManager.getcurrentUser.username;
						asset.updatedDatetime = new Date();
					}
				}
				this.gridOptions.api.setRowData(this.assets);
				this.gridOptions.api.refreshView();
				this.gridOptions.api.deselectAll();
				this.assetForm.reset();
				this.submitted = false;
				this.id = null;
			});
		} else {
			asset001mb.insertUser = this.authManager.getcurrentUser.username;
			asset001mb.insertDatetime = new Date();
			this.assetManager.assetsave(asset001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Saved Successfully");
				let assetss = deserialize<Asset001mb>(Asset001mb, response);
				this.assets?.push(assetss);
				const newItems = [JSON.parse(JSON.stringify(assetss))];
				this.gridOptions.api.applyTransaction({ add: newItems });
				this.gridOptions.api.deselectAll();
				this.assetForm.reset();
				this.submitted = false;
			});
		}
	}
	onReset() {
		this.assetForm.reset();
		this.submitted = false;
	}

	onGeneratePdfReport(){
		this.assetManager.assetPdf().subscribe((response) =>{
            saveAs(response,"AssetDepreciationLedger");

		});
	}

	onGenerateExcelReport(){
		this.assetManager.assetExcel().subscribe((response) => {
			saveAs(response,"AssetDepreciationLedger");
        })
	}

}