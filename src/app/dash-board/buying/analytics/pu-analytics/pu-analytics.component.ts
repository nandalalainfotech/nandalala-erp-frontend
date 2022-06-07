import { DatePipe } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { PuAnalyticsManager } from 'src/app/shared/services/restcontroller/bizservice/pu-analytics.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Puranalytics001mb } from 'src/app/shared/services/restcontroller/entities/Puranalytics001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
	selector: 'app-pu-analytics',
	templateUrl: './pu-analytics.component.html',
	styleUrls: ['./pu-analytics.component.css']
})
export class PuAnalyticsComponent implements OnInit {

	frameworkComponents: any;
	puansId: number|any;
	insertUser: string = "";
    insertDatetime: Date | any;
	name: string = "putree.type";
	type: string = "type";
	basename: string = "pubase.type";
	basetype: string = "type";
	valname: string = "valqty.choose";
	valtype: string = "choose";
	rangename: string = "range.type";
	rangetype: string = "type";
	treeType: string = "";
	basedOn: string = "";
	valueorqty: string = "";
	company: string = "";
	fromDate: Date|null = null;
	toDate: Date|null = null;
	anRange: string | null = "";
	puAnalytics: Puranalytics001mb[] = [];
	systemproperties?: Systemproperties001mb[] = [];
	bsystemproperties?: Systemproperties001mb[] = [];
	vsystemproperties?: Systemproperties001mb[] = [];
	rsystemproperties?: Systemproperties001mb[] = [];
	public gridOptions: GridOptions | any;
	puAnalysticForm: FormGroup | any;
	submitted = false;

	constructor(private systemPropertiesService: SystemPropertiesService,
		private datePipe: DatePipe, 
		private formBuilder: FormBuilder,
		private puAnalyticsManager: PuAnalyticsManager,
		private calloutService: CalloutService,
		private authManager: AuthManager,
		private modalService: NgbModal) {
		this.frameworkComponents = {
			iconRenderer:IconRendererComponent
		}
	}
	ngOnInit() {

		this.puAnalysticForm = this.formBuilder.group({
			treeType: ['', Validators.required],
			basedOn: ['', Validators.required],
			valueorqty: ['', Validators.required],
			company: ['', Validators.required],
			fromDate: ['', Validators.required],
			toDate: ['', Validators.required],
			anRange: ['', Validators.required]
		});

		this.createDataGrid001();
		this.systemPropertiesService.system(this.name, this.type).subscribe(response => {
			this.systemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		});
		this.systemPropertiesService.system(this.basename, this.basetype).subscribe(response => {
			this.bsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		});
		this.systemPropertiesService.system(this.valname, this.valtype).subscribe(response => {
			this.vsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		});
		this.systemPropertiesService.system(this.rangename, this.rangetype).subscribe(response => {
			this.rsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		});

		this.puAnalyticsManager.allpuanalytics().subscribe((response) => {
			this.puAnalytics = deserialize<Puranalytics001mb[]>(Puranalytics001mb, response);
			if (this.puAnalytics.length > 0) {
				this.gridOptions?.api?.setRowData(this.puAnalytics);
			} else {
				this.gridOptions?.api?.setRowData([]);
			}
		})
	}
	get f() { return this.puAnalysticForm.controls; }
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
				headerName: '#Id',
				field: 'puansId',
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
				headerName: 'Tree Type',
				field: 'treeType',
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
				headerName: 'Value or Qty',
				field: 'valueorqty',
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
				headerName: 'From Date',
				field: 'fromDate',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
				valueGetter: (params: any) => {
                    return params.data.fromDate ? this.datePipe.transform(params.data.fromDate, 'MM/dd/yyyy') : '';
                }
			},
			{
				headerName: 'To Date',
				field: 'toDate',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
				valueGetter: (params: any) => {
                    return params.data.toDate ? this.datePipe.transform(params.data.toDate, 'MM/dd/yyyy') : '';
                }
			},
			{
				headerName: 'Range',
				field: 'anRange',
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
		this.puansId = params.data.puansId;
		this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
		this.puAnalysticForm.patchValue({
			'treeType': params.data.treeType,
			'basedOn': params.data.basedOn,
			'valueorqty': params.data.valueorqty,
			'company': params.data.company,
			'fromDate': this.datePipe.transform(params.data.fromDate, 'MM/dd/yyyy'),
			'toDate': this.datePipe.transform(params.data.toDate, 'MM/dd/yyyy'),
			'anRange': params.data.anRange,
		});
	}
	onDeleteButtonClick(params: any) {
		this.puAnalyticsManager.deletepuanalystic(params.data.puansId).subscribe((response) => {
			for (let i = 0; i < this.puAnalytics.length; i++) {
				if (this.puAnalytics[i].puansId == params.data.puansId) {
					this.puAnalytics?.splice(i, 1);
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
        modalRef.componentInstance.title = "PU Analytics";
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
	onOrderClick(event: any, puAnalysticForm: any) {

		this.markFormGroupTouched(this.puAnalysticForm);
		this.submitted = true;
		if (this.puAnalysticForm.invalid) {
			return;
		}
		let puranalytics001mb = new Puranalytics001mb();

		puranalytics001mb.fromDate = new Date(this.f.fromDate.value);
		puranalytics001mb.toDate =new Date(this.f.toDate.value);
		puranalytics001mb.treeType = this.f.treeType.value ? this.f.treeType.value : "";
		puranalytics001mb.basedOn = this.f.basedOn.value ? this.f.basedOn.value : "";
		puranalytics001mb.valueorqty = this.f.valueorqty.value ? this.f.valueorqty.value : "";
		puranalytics001mb.company = this.f.company.value ? this.f.company.value : "";
		puranalytics001mb.anRange = this.f.anRange.value ? this.f.anRange.value : "";
		if (this.puansId) {
			puranalytics001mb.puansId = this.puansId;
			puranalytics001mb.insertUser = this.insertUser;
			puranalytics001mb.insertDatetime = this.insertDatetime;
			puranalytics001mb.updatedUser = this.authManager.getcurrentUser.username;
			puranalytics001mb.updatedDatetime = new Date();
			this.puAnalyticsManager.savepuanalysticupdate(puranalytics001mb).subscribe(response => {
				this.calloutService.showSuccess("Order Update Successfully");
				let puanalys = deserialize<Puranalytics001mb>(Puranalytics001mb, response);
				for (let analytic of this.puAnalytics) {
					if (analytic.puansId == puanalys.puansId) {
						analytic.treeType = puanalys.treeType;
						analytic.basedOn = puanalys.basedOn;
						analytic.valueorqty = puanalys.valueorqty;
						analytic.company = puanalys.company;
						analytic.fromDate = puanalys.fromDate;
						analytic.toDate = puanalys.toDate;
						analytic.anRange = puanalys.anRange;
						analytic.insertUser = this.insertUser;
						analytic.insertDatetime = this.insertDatetime;
						analytic.updatedUser = this.authManager.getcurrentUser.username;
						analytic.updatedDatetime = new Date();
					}
				}
				this.gridOptions.api.setRowData(this.puAnalytics);
				this.gridOptions.api.refreshView();
				this.gridOptions.api.deselectAll();
				this.puAnalysticForm.reset();
				this.submitted = false;
				this.puansId = null;
			})
		}
		else {
			puranalytics001mb.insertUser = this.authManager.getcurrentUser.username;
			puranalytics001mb.insertDatetime = new Date();
			this.puAnalyticsManager.savepuanalysticsave(puranalytics001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Saved Successfully");
				let puanalys = deserialize<Puranalytics001mb>(Puranalytics001mb, response);
				this.puAnalytics.push(puanalys);
				const newItems = [JSON.parse(JSON.stringify(puanalys))];
				this.gridOptions.api.applyTransaction({ add: newItems });
				this.puAnalysticForm.reset();
				this.submitted = false;
			})
		}
	}
	onReset() {
		this.puAnalysticForm.reset();
		this.submitted = false;
	}

	onGeneratePdfReport(){
		this.puAnalyticsManager.puAnalyticsPdf().subscribe((response) =>{
            saveAs(response,"AnalyticsList");

		});
	}

	onGenerateExcelReport(){
		this.puAnalyticsManager.puAnalyticsExcel().subscribe((response) => {
			saveAs(response,"AnalyticsList");
        })
	}

}