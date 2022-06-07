import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { updatebankManager } from 'src/app/shared/services/restcontroller/bizservice/updatebank.service';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { Updatebank001mb } from 'src/app/shared/services/restcontroller/entities/Updatebank001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
	selector: 'app-update-bank',
	templateUrl: './update-bank.component.html',
	styleUrls: ['./update-bank.component.css']
})

export class UpdateBankComponent implements OnInit {

	frameworkComponents: any;
	id: number | any;
	insertUser: string = "";
    insertDatetime: Date | any;
	bankaccount: string = "";
	fromdate: Date | null = null;
	todate: Date | null = null;
	customername: string = "";
	amount?: string | null;
	chqNumber?: string | null;
	clearanceDate: Date | null = null;
	dummyname = "Dummy.status";
	dummytype = "dummy";
	dummysystemproperties: Systemproperties001mb[] = [];
	upDateForm: FormGroup | any;
	submitted = false;
	public gridOptions: GridOptions | any;
	updateBank: Updatebank001mb[] = [];

	constructor(private UpdatebankManager: updatebankManager, 
		private datePipe: DatePipe, 
		private formBuilder: FormBuilder, 
		private systemPropertiesService: SystemPropertiesService, 
		private calloutService: CalloutService,
		private authManager: AuthManager,
		private modalService: NgbModal) {
		this.frameworkComponents = {
			iconRenderer: IconRendererComponent
		}
	}

	ngOnInit() {

		this.upDateForm = this.formBuilder.group({
			bankaccount: ['', Validators.required],
			fromdate: ['', Validators.required],
			todate: ['', Validators.required],
			customername: ['', Validators.required],
			amount: ['', Validators.required],
			chqNumber: ['', Validators.required],
			clearanceDate: ['', Validators.required]
		});
		this.createDataGrid001();
		this.systemPropertiesService.system(this.dummyname, this.dummytype).subscribe(response => {
			this.dummysystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		})
		this.UpdatebankManager.allupdatebank().subscribe((response) => {
			this.updateBank = deserialize<Updatebank001mb[]>(Updatebank001mb, response);
			if (this.updateBank.length > 0) {
				this.gridOptions?.api?.setRowData(this.updateBank);
			} else {
				this.gridOptions?.api?.setRowData([]);
			}
		})
	}
	get f() { return this.upDateForm.controls; }
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
				headerName: 'S No',
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
				headerName: '>Bank Account',
				field: 'bankaccount',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'From Date',
				field: 'fromdate',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
				valueGetter: (params: any) => {
                    return params.data.fromdate ? this.datePipe.transform(params.data.fromdate, 'MM/dd/yyyy') : '';
                }
			},
			{
				headerName: 'To Date',
				field: 'todate',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
				valueGetter: (params: any) => {
                    return params.data.todate ? this.datePipe.transform(params.data.todate, 'MM/dd/yyyy') : '';
                }
			},
			{
				headerName: 'Against Account',
				field: 'customername',
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
				headerName: 'Cheque Number',
				field: 'chqNumber',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Clearance Date',
				field: 'clearanceDate',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
				valueGetter: (params: any) => {
                    return params.data.clearanceDate ? this.datePipe.transform(params.data.clearanceDate, 'MM/dd/yyyy') : '';
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
		];
	}
	onEditButtonClick(params: any) {
		this.id = params.data.id;
		this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
		this.upDateForm.patchValue({
			'bankaccount': params.data.bankaccount,
			'fromdate': this.datePipe.transform(params.data.fromdate, 'MM/dd/yyyy'),
			'todate': this.datePipe.transform(params.data.todate, 'MM/dd/yyyy'),
			'customername': params.data.customername,
			'chqNumber': params.data.chqNumber,
			'clearanceDate': this.datePipe.transform(params.data.clearanceDate, 'MM/dd/yyyy'),
			'amount': params.data.amount,
		});


	}
	onDeleteButtonClick(params: any) {
		this.UpdatebankManager.updatebankdelete(params.data.id).subscribe((response) => {
			for (let i = 0; i < this.updateBank.length; i++) {
				if (this.updateBank[i].id == params.data.id) {
					this.updateBank?.splice(i, 1);
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
		modalRef.componentInstance.title = "Update Bank Transaction Dates";
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
	onOrderClick(event: any, upDateForm: any) {

		this.markFormGroupTouched(this.upDateForm);
		this.submitted = true;
		if (this.upDateForm.invalid) {
			return;
		}
		let updatebank001mb = new Updatebank001mb();
		updatebank001mb.clearanceDate = new Date(this.f.clearanceDate.value);
		updatebank001mb.fromdate = new Date(this.f.fromdate.value);
		updatebank001mb.todate = new Date(this.f.todate.value);
		updatebank001mb.amount = this.f.amount.value ? this.f.amount.value : "";
		updatebank001mb.bankaccount = this.f.bankaccount.value ? this.f.bankaccount.value : "";
		updatebank001mb.chqNumber = this.f.chqNumber.value ? this.f.chqNumber.value : "";
		updatebank001mb.customername = this.f.customername.value ? this.f.customername.value : "";
		if (this.id) {
			updatebank001mb.id = this.id;
			updatebank001mb.insertUser = this.insertUser;
			updatebank001mb.insertDatetime = this.insertDatetime;
			updatebank001mb.updatedUser = this.authManager.getcurrentUser.username;
			updatebank001mb.updatedDatetime = new Date();
			this.UpdatebankManager.updatebankupdate(updatebank001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Updated Successfully");
				let updatebanksres = deserialize<Updatebank001mb>(Updatebank001mb, response);
				for (let updatebank of this.updateBank) {
					if (updatebank.id == updatebank001mb.id) {
						updatebank.chqNumber = updatebanksres.chqNumber;
						updatebank.amount = updatebanksres.amount;
						updatebank.bankaccount = updatebanksres.bankaccount;
						updatebank.clearanceDate = updatebanksres.clearanceDate;
						updatebank.customername = updatebanksres.customername;
						updatebank.fromdate = updatebanksres.fromdate;
						updatebank.todate = updatebanksres.todate;
						updatebank.insertUser = this.insertUser;
						updatebank.insertDatetime = this.insertDatetime;
						updatebank.updatedUser = this.authManager.getcurrentUser.username;
						updatebank.updatedDatetime = new Date();
					}
				}
				this.gridOptions.api.setRowData(this.updateBank);
				this.gridOptions.api.refreshView();
				this.gridOptions.api.deselectAll();
				this.upDateForm.reset();
				this.submitted = false;
				this.id = null;
			})
		}
		else {
			updatebank001mb.insertUser = this.authManager.getcurrentUser.username;
			updatebank001mb.insertDatetime = new Date();
			this.UpdatebankManager.updatebanksave(updatebank001mb).subscribe((response) => {
				this.calloutService.showSuccess("Order Saved Successfully");
				let update = deserialize<Updatebank001mb>(Updatebank001mb, response);
				this.updateBank?.push(update);
				const newItems = [JSON.parse(JSON.stringify(update))];
				this.gridOptions.api.applyTransaction({ add: newItems });
				this.upDateForm.reset();
				this.submitted = false;
			})
		}
	}
	onReset() {
		this.upDateForm.reset();
		this.submitted = false;
	}

	onGeneratePdfReport(){
		this.UpdatebankManager.updateBankPdf().subscribe((response) =>{
            saveAs(response,"BankReconciliationList");

		});
	}

	onGenerateExcelReport(){
		this.UpdatebankManager.updateBankExcel().subscribe((response) => {
			saveAs(response,"BankReconciliationList");
        })
	}

}
