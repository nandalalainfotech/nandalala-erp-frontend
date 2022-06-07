import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { BudgetVariancerepManager } from 'src/app/shared/services/restcontroller/bizservice/budget-variancerep.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Budgetvarreport001mb } from 'src/app/shared/services/restcontroller/entities/Budgetvarreport001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
	selector: 'app-budget-variancerep',
	templateUrl: './budget-variancerep.component.html',
	styleUrls: ['./budget-variancerep.component.css']
})

export class BudgetVariancerepComponent implements OnInit {
	submitted = false;
	budgetVarForm: FormGroup | any;
	frameworkComponents: any;
	varId: number | any;
	insertUser: string = "";
    insertDatetime: Date | any;
	fiscalYear: number | any;
	period: string = "";
	company: string = "";
	centerName: string = "";
	bgaccountType: string = "";
	actualjan: string | null = "";
	variancejan: string | null = "";
	targetjan: string | null = "";
	actualfeb: string | null = "";
	variancefeb: string | null = "";
	targetfeb: string | null = "";
	actualmar: string | null = "";
	variancemar: string | null = "";
	targetmar: string | null = "";
	actualapr: string | null = "";
	varianceapr: string | null = "";
	targetapr: string | null = "";
	actualmay: string | null = "";
	variancemay: string | null = "";
	targetmay: string | null = "";
	actualjun: string | null = "";
	variancejun: string | null = "";
	targetjun: string | null = "";
	actualjul: string | null = "";
	variancejul: string | null = "";
	targetjul: string | null = "";
	actualaug: string | null = "";
	varianceaug: string | null = "";
	targetaug: string | null = "";
	actualsep: string | null = "";
	variancesep: string | null = "";
	targetsep: string | null = "";
	actualoct: string | null = "";
	varianceoct: string | null = "";
	targetoct: string | null = "";
	actualnov: string | null = "";
	variancenov: string | null = "";
	targetnov: string | null = "";
	actualdec: string | null = "";
	variancedec: string | null = "";
	targetdec: string | null = "";
	totalTarget: string | null = "";
	totalActual: string | null = "";
	totalVariance: string | null = "";
	dummyname = "Dummy.status";
	dummytype = "dummy";
	periodname = "range.type";
	periodtype = "type";
	fiscalname: string = "year.status";
	fiscaltype: string = "year";
	dummysystemproperties: Systemproperties001mb[] = [];
	periodsystemproperties: Systemproperties001mb[] = [];
	budgetvaiance: Budgetvarreport001mb[] = [];
	public gridOptions: GridOptions | any;
	fiscalsystemproperties: Systemproperties001mb[] = [];

	constructor(private budgetVariancerepManager: BudgetVariancerepManager,
		private systemPropertiesService: SystemPropertiesService,
		private calloutService: CalloutService, 
		private formBuilder: FormBuilder,
		private authManager: AuthManager,
		private modalService: NgbModal) {
		this.frameworkComponents = {
			iconRenderer: IconRendererComponent
		}
	}

	ngOnInit() {
		this.budgetVarForm = this.formBuilder.group({
			fiscalYear: ['', Validators.required],
			period: ['', Validators.required],
			company: ['', Validators.required],
			centerName: ['', Validators.required],
			bgaccountType: ['', Validators.required],
			actualjan: ['', Validators.required],
			variancejan: ['', Validators.required],
			targetjan: ['', Validators.required],
			actualfeb: ['', Validators.required],
			variancefeb: ['', Validators.required],
			targetfeb: ['', Validators.required],
			actualmar: ['', Validators.required],
			variancemar: ['', Validators.required],
			targetmar: ['', Validators.required],
			actualapr: ['', Validators.required],
			varianceapr: ['', Validators.required],
			targetapr: ['', Validators.required],
			actualmay: ['', Validators.required],
			variancemay: ['', Validators.required],
			targetmay: ['', Validators.required],
			actualjun: ['', Validators.required],
			variancejun: ['', Validators.required],
			targetjun: ['', Validators.required],
			actualjul: ['', Validators.required],
			variancejul: ['', Validators.required],
			targetjul: ['', Validators.required],
			actualaug: ['', Validators.required],
			varianceaug: ['', Validators.required],
			targetaug: ['', Validators.required],
			actualsep: ['', Validators.required],
			variancesep: ['', Validators.required],
			targetsep: ['', Validators.required],
			actualoct: ['', Validators.required],
			varianceoct: ['', Validators.required],
			targetoct: ['', Validators.required],
			actualnov: ['', Validators.required],
			variancenov: ['', Validators.required],
			targetnov: ['', Validators.required],
			actualdec: ['', Validators.required],
			variancedec: ['', Validators.required],
			targetdec: ['', Validators.required],
			totalTarget: ['', Validators.required],
			totalActual: ['', Validators.required],
			totalVariance: ['', Validators.required]
		})

		this.createDataGrid001();
		this.systemPropertiesService.system(this.dummyname, this.dummytype).subscribe(response => {
			this.dummysystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		})
		this.systemPropertiesService.system(this.periodname, this.periodtype).subscribe(response => {
			this.periodsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		})
		this.systemPropertiesService.system(this.fiscalname, this.fiscaltype).subscribe(response => {
			this.fiscalsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		}),
			this.budgetVariancerepManager.allbudvar().subscribe((response) => {
				this.budgetvaiance = deserialize<Budgetvarreport001mb[]>(Budgetvarreport001mb, response);
				if (this.budgetvaiance.length > 0) {
					this.gridOptions?.api?.setRowData(this.budgetvaiance);
				} else {
					this.gridOptions?.api?.setRowData([]);
				}
			});
	}

	get f() { return this.budgetVarForm.controls; }

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
				field: 'varId',
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
				headerName: 'Year',
				field: 'fiscalYear',
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
				headerName: 'Cost Center',
				field: 'centerName',
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
				headerName: 'Budget Account',
				field: 'bgaccountType',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Actual(Jan)',
				field: 'actualjan',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Variance(Jan)',
				field: 'variancejan',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Target(Jan)',
				field: 'targetjan',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Actual(Feb)',
				field: 'actualfeb',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Variance(Feb)',
				field: 'variancefeb',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Target(Feb)',
				field: 'targetfeb',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Actual(Mar)',
				field: 'actualmar',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Variance(Mar)',
				field: 'variancemar',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Target(Mar)',
				field: 'targetmar',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Actual(Apr)',
				field: 'actualapr',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Variance(Apr)',
				field: 'varianceapr',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Target(Apr)',
				field: 'targetapr',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Actual(May)',
				field: 'actualmay',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Variance(May)',
				field: 'variancemay',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Target(May)',
				field: 'targetmay',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Actual(Jun)',
				field: 'actualjun',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Variance(Jun)',
				field: 'variancejun',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Target(Jun)',
				field: 'targetjun',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Actual(Jul)',
				field: 'actualjul',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Variance(Jul)',
				field: 'variancejul',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Target(Jul)',
				field: 'targetjul',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Actual(Aug)',
				field: 'actualaug',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Variance(Aug)',
				field: 'varianceaug',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Target(Aug)',
				field: 'targetaug',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Actual(Sep)',
				field: 'actualsep',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Variance(Sep)',
				field: 'variancesep',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Target(Sep)',
				field: 'targetsep',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Actual(Oct)',
				field: 'actualoct',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Variance(Oct)',
				field: 'varianceoct',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Target(Oct)',
				field: 'targetoct',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Actual(Nov)',
				field: 'actualnov',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Variance(Nov)',
				field: 'variancenov',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Target(Nov)',
				field: 'targetnov',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Actual(Dec)',
				field: 'actualdec',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Variance(Dec)',
				field: 'variancedec',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Target(Dec)',
				field: 'targetdec',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Total Target',
				field: 'totalTarget',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Total Actual',
				field: 'totalActual',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Total Variance',
				field: 'totalVariance',
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
		this.varId = params.data.varId;
		this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
		this.budgetVarForm.patchValue({
			'actualapr': params.data.actualapr,
			'actualaug': params.data.actualaug,
			'actualdec': params.data.actualdec,
			'actualfeb': params.data.actualfeb,
			'actualjan': params.data.actualjan,
			'actualjul': params.data.actualjul,
			'actualjun': params.data.actualjun,
			'actualmar': params.data.actualmar,
			'actualmay': params.data.actualmay,
			'actualnov': params.data.actualnov,
			'actualoct': params.data.actualoct,
			'actualsep': params.data.actualsep,
			'bgaccountType': params.data.bgaccountType,
			'company': params.data.company,
			'fiscalYear': params.data.fiscalYear,
			'period': params.data.period,
			'targetapr': params.data.targetapr,
			'targetaug': params.data.targetaug,
			'targetdec': params.data.targetdec,
			'targetfeb': params.data.targetfeb,
			'targetjan': params.data.targetjan,
			'targetjul': params.data.targetjul,
			'targetjun': params.data.targetjun,
			'targetmar': params.data.targetmar,
			'targetmay': params.data.targetmay,
			'targetnov': params.data.targetnov,
			'targetoct': params.data.targetoct,
			'targetsep': params.data.targetsep,
			'totalActual': params.data.totalActual,
			'totalTarget': params.data.totalTarget,
			'totalVariance': params.data.totalVariance,
			'varianceapr': params.data.varianceapr,
			'varianceaug': params.data.varianceaug,
			'variancedec': params.data.variancedec,
			'variancefeb': params.data.variancefeb,
			'variancejan': params.data.variancejan,
			'variancejul': params.data.variancejul,
			'variancejun': params.data.variancejun,
			'variancemar': params.data.variancemar,
			'variancemay': params.data.variancemay,
			'variancenov': params.data.variancenov,
			'varianceoct': params.data.varianceoct,
			'variancesep': params.data.variancesep,
			'centerName': params.data.centerName,
		});
	}

	onDeleteButtonClick(params: any) {
		this.budgetVariancerepManager.budvardelete(params.data.varId).subscribe((response) => {
			for (let i = 0; i < this.budgetvaiance.length; i++) {
				if (this.budgetvaiance[i].varId == params.data.varId) {
					this.budgetvaiance?.splice(i, 1);
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
        modalRef.componentInstance.title = "Budget Variance Report";
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


	onOrderClick(event: any, budgetVarForm: any) {
		this.markFormGroupTouched(this.budgetVarForm);
		this.submitted = true;
		if (this.budgetVarForm.invalid) {
			return;
		}
		let budgetvarreport001mb = new Budgetvarreport001mb();
		budgetvarreport001mb.actualapr = this.f.actualapr.value ? this.f.actualapr.value : "";
		budgetvarreport001mb.actualaug = this.f.actualaug.value ? this.f.actualaug.value : "";
		budgetvarreport001mb.actualdec = this.f.actualdec.value ? this.f.actualdec.value : "";
		budgetvarreport001mb.actualfeb = this.f.actualfeb.value ? this.f.actualfeb.value : "";
		budgetvarreport001mb.actualjan = this.f.actualjan.value ? this.f.actualjan.value : "";
		budgetvarreport001mb.actualjul = this.f.actualjul.value ? this.f.actualjul.value : "";
		budgetvarreport001mb.actualjun = this.f.actualjun.value ? this.f.actualjun.value : "";
		budgetvarreport001mb.actualmar = this.f.actualmar.value ? this.f.actualmar.value : "";
		budgetvarreport001mb.actualmay = this.f.actualmay.value ? this.f.actualmay.value : "";
		budgetvarreport001mb.actualnov = this.f.actualnov.value ? this.f.actualnov.value : "";
		budgetvarreport001mb.actualoct = this.f.actualoct.value ? this.f.actualoct.value : "";
		budgetvarreport001mb.actualsep = this.f.actualsep.value ? this.f.actualsep.value : "";
		budgetvarreport001mb.bgaccountType = this.f.bgaccountType.value ? this.f.bgaccountType.value : "";
		budgetvarreport001mb.centerName = this.f.centerName.value ? this.f.centerName.value : "";
		budgetvarreport001mb.company = this.f.company.value ? this.f.company.value : "";
		budgetvarreport001mb.fiscalYear = this.f.fiscalYear.value ? this.f.fiscalYear.value : null;
		budgetvarreport001mb.period = this.f.period.value ? this.f.period.value : "";
		budgetvarreport001mb.targetapr = this.f.targetapr.value ? this.f.targetapr.value : "";
		budgetvarreport001mb.targetaug = this.f.targetaug.value ? this.f.targetaug.value : "";
		budgetvarreport001mb.targetdec = this.f.targetdec.value ? this.f.targetdec.value : "";
		budgetvarreport001mb.targetfeb = this.f.targetfeb.value ? this.f.targetfeb.value : "";
		budgetvarreport001mb.targetjan = this.f.targetjan.value ? this.f.targetjan.value : "";
		budgetvarreport001mb.targetjul = this.f.targetjul.value ? this.f.targetjul.value : "";
		budgetvarreport001mb.targetjun = this.f.targetjun.value ? this.f.targetjun.value : "";
		budgetvarreport001mb.targetmar = this.f.targetmar.value ? this.f.targetmar.value : "";
		budgetvarreport001mb.targetmay = this.f.targetmay.value ? this.f.targetmay.value : "";
		budgetvarreport001mb.targetnov = this.f.targetnov.value ? this.f.targetnov.value : "";
		budgetvarreport001mb.targetoct = this.f.targetoct.value ? this.f.targetoct.value : "";
		budgetvarreport001mb.targetsep = this.f.targetsep.value ? this.f.targetsep.value : "";
		budgetvarreport001mb.totalActual = this.f.totalActual.value ? this.f.totalActual.value : "";
		budgetvarreport001mb.totalTarget = this.f.totalTarget.value ? this.f.totalTarget.value : "";
		budgetvarreport001mb.totalVariance = this.f.totalVariance.value ? this.f.totalVariance.value : "";
		budgetvarreport001mb.varianceapr = this.f.varianceapr.value ? this.f.varianceapr.value : "";
		budgetvarreport001mb.varianceaug = this.f.varianceaug.value ? this.f.varianceaug.value : "";
		budgetvarreport001mb.variancedec = this.f.variancedec.value ? this.f.variancedec.value : "";
		budgetvarreport001mb.variancefeb = this.f.variancefeb.value ? this.f.variancefeb.value : "";
		budgetvarreport001mb.variancejan = this.f.variancejan.value ? this.f.variancejan.value : "";
		budgetvarreport001mb.variancejul = this.f.variancejul.value ? this.f.variancejul.value : "";
		budgetvarreport001mb.variancejun = this.f.variancejun.value ? this.f.variancejun.value : "";
		budgetvarreport001mb.variancemar = this.f.variancemar.value ? this.f.variancemar.value : "";
		budgetvarreport001mb.variancemay = this.f.variancemay.value ? this.f.variancemay.value : "";
		budgetvarreport001mb.variancenov = this.f.variancenov.value ? this.f.variancenov.value : "";
		budgetvarreport001mb.varianceoct = this.f.varianceoct.value ? this.f.varianceoct.value : "";
		budgetvarreport001mb.variancesep = this.f.variancesep.value ? this.f.variancesep.value : "";
		if (this.varId) {
			budgetvarreport001mb.varId = this.varId;
			budgetvarreport001mb.insertUser = this.insertUser;
			budgetvarreport001mb.insertDatetime = this.insertDatetime;
			budgetvarreport001mb.updatedUser = this.authManager.getcurrentUser.username;
			budgetvarreport001mb.updatedDatetime = new Date();
			this.budgetVariancerepManager.budvarupdate(budgetvarreport001mb).subscribe(response => {
				this.calloutService.showSuccess("Order Updated Successfully");
				let budgetvar = deserialize<Budgetvarreport001mb>(Budgetvarreport001mb, response);
				for (let budgets of this.budgetvaiance) {
					if (budgets.varId == budgetvar.varId) {
						budgets.actualapr = budgetvar.actualapr;
						budgets.actualaug = budgetvar.actualaug;
						budgets.actualdec = budgetvar.actualdec;
						budgets.actualfeb = budgetvar.actualfeb;
						budgets.actualjan = budgetvar.actualjan;
						budgets.actualjul = budgetvar.actualjul;
						budgets.actualjun = budgetvar.actualjun;
						budgets.actualmar = budgetvar.actualmar;
						budgets.actualmay = budgetvar.actualmay;
						budgets.actualnov = budgetvar.actualnov;
						budgets.actualoct = budgetvar.actualoct;
						budgets.actualsep = budgetvar.actualsep;
						budgets.bgaccountType = budgetvar.bgaccountType;
						budgets.company = budgetvar.company;
						budgets.fiscalYear = budgetvar.fiscalYear;
						budgets.period = budgetvar.period;
						budgets.targetapr = budgetvar.targetapr;
						budgets.targetaug = budgetvar.targetaug;
						budgets.targetdec = budgetvar.targetdec;
						budgets.targetfeb = budgetvar.targetfeb;
						budgets.targetjan = budgetvar.targetjan;
						budgets.targetjul = budgetvar.targetjul;
						budgets.targetjun = budgetvar.targetjun;
						budgets.targetmar = budgetvar.targetmar;
						budgets.targetmay = budgetvar.targetmay;
						budgets.targetnov = budgetvar.targetnov;
						budgets.targetoct = budgetvar.targetoct;
						budgets.targetsep = budgetvar.targetsep;
						budgets.totalActual = budgetvar.totalActual;
						budgets.totalTarget = budgetvar.totalTarget;
						budgets.totalVariance = budgetvar.totalVariance;
						budgets.varianceapr = budgetvar.varianceapr;
						budgets.varianceaug = budgetvar.varianceaug;
						budgets.variancedec = budgetvar.variancedec;
						budgets.variancefeb = budgetvar.variancefeb;
						budgets.variancejan = budgetvar.variancejan;
						budgets.variancejul = budgetvar.variancejul;
						budgets.variancejun = budgetvar.variancejun;
						budgets.variancemar = budgetvar.variancemar;
						budgets.variancemay = budgetvar.variancemay;
						budgets.variancenov = budgetvar.variancenov;
						budgets.varianceoct = budgetvar.varianceoct;
						budgets.variancesep = budgetvar.variancesep;
						budgets.centerName = budgetvar.centerName;
						budgets.insertUser = this.insertUser;
						budgets.insertDatetime = this.insertDatetime;
						budgets.updatedUser = this.authManager.getcurrentUser.username;
						budgets.updatedDatetime = new Date();
					}
				}
				this.gridOptions.api.setRowData(this.budgetvaiance);
				this.gridOptions.api.refreshView();
				this.gridOptions.api.deselectAll();
				budgetVarForm.reset();
				this.varId = null;
				this.submitted = false;
			})
		}
		else {
			budgetvarreport001mb.insertUser = this.authManager.getcurrentUser.username;
			budgetvarreport001mb.insertDatetime = new Date();
			this.budgetVariancerepManager.budvarsave(budgetvarreport001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Saved Successfully");
				let budgetvar = deserialize<Budgetvarreport001mb>(Budgetvarreport001mb, response);
				this.budgetvaiance?.push(budgetvar);
				const newItems = [JSON.parse(JSON.stringify(budgetvar))];
				this.gridOptions.api.applyTransaction({ add: newItems });
				budgetVarForm.reset();
				this.submitted = false;
			})
		}
	}
	onReset() {
		this.submitted = false;
		this.budgetVarForm.reset();
	}

	onGeneratePdfReport(){
		this.budgetVariancerepManager.budgetVariancerepPdf().subscribe((response) =>{
            saveAs(response,"BudgetVarianceReport");

		});
	}

	onGenerateExcelReport(){
		this.budgetVariancerepManager.budgetVariancerepExcel().subscribe((response) => {
			saveAs(response,"BudgetVarianceReport");
        })
	}

}