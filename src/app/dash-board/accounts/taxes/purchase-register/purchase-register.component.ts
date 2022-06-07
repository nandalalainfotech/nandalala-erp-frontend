import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { PurchaseRegisterManager } from 'src/app/shared/services/restcontroller/bizservice/purchase-register.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Purchaseregister001mb } from 'src/app/shared/services/restcontroller/entities/Purchaseregister001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
	selector: 'app-purchase-register',
	templateUrl: './purchase-register.component.html',
	styleUrls: ['./purchase-register.component.css']
})

export class PurchaseRegisterComponent implements OnInit {

	purchaseForm: FormGroup | any;
	submitted = false;
	regId: number | any;
	insertUser: string = "";
    insertDatetime: Date | any;
	frameworkComponents: any;
	invoice: string = "";
	postingDate: Date | null = null;
	supName: string = "";
	supType: string = "";
	accountType: string = "";
	paymentMode: string = "";
	projectname: string = "";
	billNo: string = "";
	billDate: Date | null = null;
	remarks: string = "";
	poSeries: string = "";
	purecpt: string = "";
	currency: string = "";
	furnituresCount?: string | null;
	softwaresCount?: string | null;
	stkrecBalance?: string | null;
	netTotal?: string | null;
	totalTax?: string | null;
	grandTotal?: string | null;
	roundTotal?: string | null;
	outstandAmt?: number | any;
	supname: string = "PRSupp.Type";
	suptype: string = "Type";
	stname: string = "Supplier.Type";
	sttype: string = "Type";
	accname: string = "account.type";
	acctype: string = "type";
	curname: string = "currency.type";
	curtype: string = "type";
	dummyname = "Dummy.status";
	dummytype = "dummy";
	pmname="payment.mode";
	pmtype="mode";
	dummysystemproperties: Systemproperties001mb[] = [];
	purchaseRegister: Purchaseregister001mb[] = [];
	stsystemproperties?: Systemproperties001mb[] = [];
	supsystemproperties?: Systemproperties001mb[] = [];
	accsystemproperties?: Systemproperties001mb[] = [];
	cursystemproperties?: Systemproperties001mb[] = [];
	pmsystemproperties:Systemproperties001mb[] = [];
	public gridOptions: GridOptions | any;

	constructor(private purchaseRegisterManager: PurchaseRegisterManager,
		private systemPropertiesService: SystemPropertiesService,
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

		this.purchaseForm = this.formBuilder.group({
			invoice: ['', Validators.required],
			postingDate: ['', Validators.required],
			supName: ['', Validators.required],
			supType: ['', Validators.required],
			accountType: ['', Validators.required],
			paymentMode: ['', Validators.required],
			projectname: ['', Validators.required],
			billNo: ['', Validators.required],
			billDate: ['', Validators.required],
			remarks: ['', Validators.required],
			poSeries: ['', Validators.required],
			purecpt: ['', Validators.required],
			currency: ['', Validators.required],
			furnituresCount: ['', Validators.required],
			softwaresCount: ['', Validators.required],
			stkrecBalance: ['', Validators.required],
			netTotal: ['', Validators.required],
			totalTax: ['', Validators.required],
			grandTotal: ['', Validators.required],
			roundTotal: ['', Validators.required],
			outstandAmt: ['', Validators.required],
		});

		this.createDataGrid001();
		this.systemPropertiesService.system(this.dummyname, this.dummytype).subscribe(response => {
			this.dummysystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		})
		this.systemPropertiesService.system(this.curname, this.curtype).subscribe(response => {
			this.cursystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		})
		this.systemPropertiesService.system(this.accname, this.acctype).subscribe(response => {
			this.accsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		})
		this.systemPropertiesService.system(this.pmname, this.pmtype).subscribe(response => {
			this.pmsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		})
		this.systemPropertiesService.system(this.stname, this.sttype).subscribe(response => {
			this.stsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		})
		this.systemPropertiesService.system(this.supname, this.suptype).subscribe(response => {
			this.supsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		})
		this.purchaseRegisterManager.allpurchasereg().subscribe((response) => {
			this.purchaseRegister = deserialize<Purchaseregister001mb[]>(Purchaseregister001mb, response);
			if (this.purchaseRegister.length > 0) {
				this.gridOptions?.api?.setRowData(this.purchaseRegister);
			} else {
				this.gridOptions?.api?.setRowData([]);
			}
		})
	}

	get f() { return this.purchaseForm.controls; }

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
				field: 'regId',
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
				headerName: 'Invoice',
				field: 'invoice',
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
				headerName: 'Supplier',
				field: 'supName',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Supplier Type',
				field: 'supType',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Account Type',
				field: 'accountType',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Payment Mode',
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
				headerName: 'Bill No',
				field: 'billNo',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Bill Date',
				field: 'billDate',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
				valueGetter: (params: any) => {
					return params.data.billDate ? this.datePipe.transform(params.data.billDate, 'MM/dd/yyyy') : '';
				}
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
				headerName: 'Purchase Receipt',
				field: 'purecpt',
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
				headerName: 'Furnitures Count',
				field: 'furnituresCount',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Software Count',
				field: 'softwaresCount',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Stock Balance',
				field: 'stkrecBalance',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Net Total',
				field: 'netTotal',
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
				headerName: 'Grand Total',
				field: 'grandTotal',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Rounded Total',
				field: 'roundTotal',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Outstanding Amount',
				field: 'outstandAmt',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Remarks',
				field: 'remarks',
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
				width: 350,
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
                width: 300,
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
		this.regId = params.data.regId;
		this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
		this.purchaseForm.patchValue({
			'date': params.data.date,
			'accountType': params.data.accountType,
			'billDate': this.datePipe.transform(params.data.billDate, 'MM/dd/yyyy'),
			'billNo': params.data.billNo,
			'currency': params.data.currency,
			'furnituresCount': params.data.furnituresCount,
			'grandTotal': params.data.grandTotal,
			'invoice': params.data.invoice,
			'netTotal': params.data.netTotal,
			'outstandAmt': params.data.outstandAmt,
			'paymentMode': params.data.paymentMode,
			'poSeries': params.data.poSeries,
			'postingDate': this.datePipe.transform(params.data.postingDate, 'MM/dd/yyyy'),
			'projectname': params.data.projectname,
			'purecpt': params.data.purecpt,
			'remarks': params.data.remarks,
			'roundTotal': params.data.roundTotal,
			'softwaresCount': params.data.softwaresCount,
			'stkrecBalance': params.data.stkrecBalance,
			'supName': params.data.supName,
			'supType': params.data.supType,
			'totalTax': params.data.totalTax,
		})
	}

	onDeleteButtonClick(params: any) {
		this.purchaseRegisterManager.purchaseregdelete(params.data.regId).subscribe((response) => {
			for (let i = 0; i < this.purchaseRegister.length; i++) {
				if (this.purchaseRegister[i].regId == params.data.regId) {
					this.purchaseRegister?.splice(i, 1);
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
        modalRef.componentInstance.title = "Purchase Register";
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


	onOrderClick(event: any, purchaseForm: any) {

		this.markFormGroupTouched(this.purchaseForm);
		this.submitted = true;
		if (this.purchaseForm.invalid) {
			return;
		}

		let purchaseregister001mb = new Purchaseregister001mb();
		purchaseregister001mb.postingDate = new Date(this.f.postingDate.value);
		purchaseregister001mb.billDate = new Date(this.f.billDate.value);
		purchaseregister001mb.accountType = this.f.accountType.value ? this.f.accountType.value : "";
		purchaseregister001mb.billNo = this.f.billNo.value ? this.f.billNo.value : "";
		purchaseregister001mb.currency = this.f.currency.value ? this.f.currency.value : "";
		purchaseregister001mb.furnituresCount = this.f.furnituresCount.value ? this.f.furnituresCount.value : "";
		purchaseregister001mb.grandTotal = this.f.grandTotal.value ? this.f.grandTotal.value : "";
		purchaseregister001mb.invoice = this.f.invoice.value ? this.f.invoice.value : "";
		purchaseregister001mb.netTotal = this.f.netTotal.value ? this.f.netTotal.value : "";
		purchaseregister001mb.outstandAmt = this.f.outstandAmt.value ? this.f.outstandAmt.value : 0;
		purchaseregister001mb.paymentMode = this.f.paymentMode.value ? this.f.paymentMode.value : "";
		purchaseregister001mb.poSeries = this.f.poSeries.value ? this.f.poSeries.value : "";
		purchaseregister001mb.projectname = this.f.projectname.value ? this.f.projectname.value : "";
		purchaseregister001mb.purecpt = this.f.purecpt.value ? this.f.purecpt.value : "";
		purchaseregister001mb.remarks = this.f.remarks.value ? this.f.remarks.value : "";
		purchaseregister001mb.roundTotal = this.f.roundTotal.value ? this.f.roundTotal.value : "";
		purchaseregister001mb.softwaresCount = this.f.softwaresCount.value ? this.f.softwaresCount.value : "";
		purchaseregister001mb.stkrecBalance = this.f.stkrecBalance.value ? this.f.stkrecBalance.value : "";
		purchaseregister001mb.supName = this.f.supName.value ? this.f.supName.value : "";
		purchaseregister001mb.supType = this.f.supType.value ? this.f.supType.value : "";
		purchaseregister001mb.totalTax = this.f.totalTax.value ? this.f.totalTax.value : "";

		if (this.regId) {
			purchaseregister001mb.regId = this.regId;
			purchaseregister001mb.insertUser = this.insertUser;
			purchaseregister001mb.insertDatetime = this.insertDatetime;
			purchaseregister001mb.updatedUser = this.authManager.getcurrentUser.username;
			purchaseregister001mb.updatedDatetime = new Date();
			this.purchaseRegisterManager.purchaseregupdate(purchaseregister001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Updated Successfully");
				let purcha = deserialize<Purchaseregister001mb>(Purchaseregister001mb, response);
				for (let purRegister of this.purchaseRegister) {
					if (purRegister.regId == purcha.regId) {
						purRegister.accountType = purcha.accountType;
						purRegister.billDate = purcha.billDate;
						purRegister.billNo = purcha.billNo;
						purRegister.currency = purcha.currency;
						purRegister.furnituresCount = purcha.furnituresCount;
						purRegister.grandTotal = purcha.grandTotal;
						purRegister.invoice = purcha.invoice;
						purRegister.netTotal = purcha.netTotal;
						purRegister.outstandAmt = purcha.outstandAmt;
						purRegister.paymentMode = purcha.paymentMode;
						purRegister.poSeries = purcha.poSeries;
						purRegister.postingDate = purcha.postingDate;
						purRegister.projectname = purcha.projectname;
						purRegister.purecpt = purcha.purecpt;
						purRegister.remarks = purcha.remarks;
						purRegister.roundTotal = purcha.roundTotal;
						purRegister.softwaresCount = purcha.softwaresCount;
						purRegister.stkrecBalance = purcha.stkrecBalance;
						purRegister.supName = purcha.supName;
						purRegister.supType = purcha.supType;
						purRegister.totalTax = purcha.totalTax;
						purRegister.insertUser = this.insertUser;
						purRegister.insertDatetime = this.insertDatetime;
						purRegister.updatedUser = this.authManager.getcurrentUser.username;
						purRegister.updatedDatetime = new Date();
					}
				}
				this.gridOptions.api.setRowData(this.purchaseRegister);
				this.gridOptions.api.refreshView();
				this.gridOptions.api.deselectAll();
				this.purchaseForm.reset();
				this.regId = null;
				this.submitted = false;
			});
		} else {
			purchaseregister001mb.insertUser = this.authManager.getcurrentUser.username;
			purchaseregister001mb.insertDatetime = new Date();
			this.purchaseRegisterManager.purchaseregsave(purchaseregister001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Saved Successfully");
				let purcha = deserialize<Purchaseregister001mb>(Purchaseregister001mb, response);
				this.purchaseRegister?.push(purcha);
				const newItems = [JSON.parse(JSON.stringify(purcha))];
				this.gridOptions.api.applyTransaction({ add: newItems });
				this.gridOptions.api.deselectAll();
				this.purchaseForm.reset();
				this.submitted = false;
			});
		}
	}

	onReset() {
		this.purchaseForm.reset();
		this.submitted = false;
	}

	onGeneratePdfReport(){
		this.purchaseRegisterManager.purchaseRegisterPdf().subscribe((response) =>{
            saveAs(response,"PurchaseRegisterList");

		});
	}

	onGenerateExcelReport(){
		this.purchaseRegisterManager.purchaseRegisterExcel().subscribe((response) => {
			saveAs(response,"PurchaseRegisterList");
        })
	}

}
