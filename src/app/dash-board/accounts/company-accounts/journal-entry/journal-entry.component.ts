import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { JournalEntryManager } from 'src/app/shared/services/restcontroller/bizservice/journal-entry.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Jounalentry001mb } from 'src/app/shared/services/restcontroller/entities/Jounalentry001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
	selector: 'app-journal-entry',
	templateUrl: './journal-entry.component.html',
	styleUrls: ['./journal-entry.component.css']
})

export class JournalEntryComponent implements OnInit {

	frameworkComponents: any;
	jouEntryForm: FormGroup | any;
	jeId?: number | any;
	insertUser: string = "";
    insertDatetime: Date | any;
	title: string = "";
	status: string = "";
	referenceNumber: string = "";
	jeSeries: string = "";
	postingDate: Date | null = null;
	referenceDate: Date | null = null;
	accountName: string = "";
	partyName: string = "";
	credit: number | any;
	debit: number | any;
	docStatus: string = "";
	stname: string = "journal.satus";
	sttype: string = "satus";
	accname: string = "accounttype.name";
	acctype: string = "name";
	dummyname = "Dummy.status";
	dummytype = "dummy";
	dsname="ProdOrder.status";
	dstype="status";
	submitted = false;
	dummysystemproperties: Systemproperties001mb[] = [];
	dssystemproperties: Systemproperties001mb[] = [];
	journal: Jounalentry001mb[] = [];
	stsystemproperties: Systemproperties001mb[] = [];
	accsystemproperties: Systemproperties001mb[] = [];
	public gridOptions: GridOptions | any;


	constructor(private journalEntryManager: JournalEntryManager,
		private systemPropertiesService: SystemPropertiesService,
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
		this.createDataGrid001();
		this.jouEntryForm = this.formBuilder.group({
			title: ['', Validators.required],
			status: ['', Validators.required],
			referenceNumber: ['', Validators.required],
			jeSeries: ['', Validators.required],
			postingDate: ['', Validators.required],
			referenceDate: ['', Validators.required],
			accountName: ['', Validators.required],
			partyName: ['', Validators.required],
			debit: ['', Validators.required],
			credit: ['', Validators.required],
			docStatus: ['', Validators.required]
		})
		this.systemPropertiesService.system(this.dummyname, this.dummytype).subscribe(response => {
			this.dummysystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		})
		this.systemPropertiesService.system(this.dsname, this.dstype).subscribe(response => {
			this.dssystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		})
		this.systemPropertiesService.system(this.stname, this.sttype).subscribe(response => {
			this.stsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		})
		this.systemPropertiesService.system(this.accname, this.acctype).subscribe(response => {
			this.accsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
		})
		this.journalEntryManager.alljournal().subscribe(response => {

			this.journal = deserialize<[Jounalentry001mb]>(Jounalentry001mb, response);
			if (this.journal.length > 0) {
				this.gridOptions?.api?.setRowData(this.journal);
			} else {
				this.gridOptions?.api?.setRowData([]);
			}
		});
	}

	get f() { return this.jouEntryForm.controls }

	createDataGrid001(): void {
		this.gridOptions = {
			paginationPageSize: 10,
			rowSelection: 'single',
			onFirstDataRenderer: this.onFirstDataRendered.bind(this),
		};
		this.gridOptions.editType = 'fullRow';
		this.gridOptions.enableRangeSelection = true;
		this.gridOptions.animateRows = true;
		this.gridOptions.columnDefs = [
			{
				headerName: '#ID',
				field: 'jeId',
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
				headerName: 'Title',
				field: 'title',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Status',
				field: 'status',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Reference Number',
				field: 'referenceNumber',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Series',
				field: 'jeSeries',
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
				headerName: 'Reference Date',
				field: 'referenceDate',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
				valueGetter: (params: any) => {
                    return params.data.referenceDate ? this.datePipe.transform(params.data.referenceDate, 'MM/dd/yyyy') : '';
                }
			},
			{
				headerName: 'Account',
				field: 'accountName',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Party Name',
				field: 'partyName',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Credit',
				field: 'credit',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Debit',
				field: 'debit',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Doc Status',
				field: 'docStatus',
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
				cellStyle: { textAlign: 'center' },
				cellRendererParams: {
					onClick: this.onEditButtonClick.bind(this),
					label: 'Edit'
				}
			},
			{
				headerName: 'Delete',
				cellRenderer: 'iconRenderer',
				width: 55,
				flex: 1,
				suppressSizeToFit: true,
				cellStyle: { textAlign: 'center' },
				cellRendererParams: {
					onClick: this.onDeleteButtonClick.bind(this),
					label: 'Delete'
				}
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
		this.jeId = params.data.jeId;
		this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
		this.jouEntryForm.patchValue({
			'accountName': params.data.accountName,
			'credit': params.data.credit,
			'debit': params.data.debit,
			'docStatus': params.data.docStatus,
			'jeSeries': params.data.jeSeries,
			'partyName': params.data.partyName,
			'postingDate': this.datePipe.transform(params.data.postingDate, 'MM/dd/yyyy'),
			'referenceDate': this.datePipe.transform(params.data.referenceDate, 'MM/dd/yyyy'),
			'referenceNumber': params.data.referenceNumber,
			'status': params.data.status,
			'title': params.data.title
		});
	}

	onDeleteButtonClick(params: any) {
		this.journalEntryManager.journaldelete(params.data.jeId).subscribe(response => {
			for (let i = 0; i < this.journal.length; i++) {
				if (this.journal[i].jeId == params.data.jeId) {
					this.journal?.splice(i, 1);
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
		modalRef.componentInstance.title = "Journal Entry";
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

	onOrderClick(event: any, jouEntryForm: any) {
		this.markFormGroupTouched(this.jouEntryForm);
		this.submitted = true;
		if (this.jouEntryForm.invalid) {
			return;
		}
		let jounalentry = new Jounalentry001mb();
		jounalentry.accountName = this.f.accountName.value ? this.f.accountName.value : "";
		jounalentry.credit = this.f.credit.value ? this.f.credit.value : null;
		jounalentry.debit = this.f.debit.value ? this.f.debit.value : null;
		jounalentry.docStatus = this.f.docStatus.value ? this.f.docStatus.value : "";
		jounalentry.jeSeries = this.f.jeSeries.value ? this.f.jeSeries.value : "";
		jounalentry.partyName = this.f.partyName.value ? this.f.partyName.value : "";
		jounalentry.postingDate = new Date(this.f.postingDate.value);
		jounalentry.referenceDate = new Date(this.f.referenceDate.value);
		jounalentry.referenceNumber = this.f.referenceNumber.value ? this.f.referenceNumber.value : "";
		jounalentry.status = this.f.status.value ? this.f.status.value : "";
		jounalentry.title = this.f.title.value ? this.f.title.value : "";

		if (this.jeId) {
			jounalentry.jeId = this.jeId;
			jounalentry.insertUser = this.insertUser;
			jounalentry.insertDatetime = this.insertDatetime;
			jounalentry.updatedUser = this.authManager.getcurrentUser.username;
			jounalentry.updatedDatetime = new Date();
			this.journalEntryManager.journalupdate(jounalentry).subscribe((response) => {
				this.calloutService.showSuccess("Order Updated Successfully");
				let jounalentry001mb = deserialize<Jounalentry001mb>(Jounalentry001mb, response);
				for (let journalEntries of this.journal) {
					if (journalEntries.jeId == jounalentry001mb.jeId) {
						journalEntries.accountName = jounalentry001mb.accountName;
						journalEntries.credit = jounalentry001mb.credit;
						journalEntries.debit = jounalentry001mb.debit;
						journalEntries.docStatus = jounalentry001mb.docStatus;
						journalEntries.jeSeries = jounalentry001mb.jeSeries;
						journalEntries.partyName = jounalentry001mb.partyName;
						journalEntries.postingDate = jounalentry001mb.postingDate;
						journalEntries.referenceDate = jounalentry001mb.referenceDate;
						journalEntries.referenceNumber = jounalentry001mb.referenceNumber;
						journalEntries.status = jounalentry001mb.status;
						journalEntries.title = jounalentry001mb.title;
						journalEntries.insertUser = this.insertUser;
						journalEntries.insertDatetime = this.insertDatetime;
						journalEntries.updatedUser = this.authManager.getcurrentUser.username;
						journalEntries.updatedDatetime = new Date();
					}
				}
				this.gridOptions.api.setRowData(this.journal);
				this.gridOptions.api.refreshView();
				this.gridOptions.api.deselectAll();
				this.jouEntryForm.reset();
				this.submitted = false;
				this.jeId = null;
			});
		} else {
			jounalentry.insertUser = this.authManager.getcurrentUser.username;
			jounalentry.insertDatetime = new Date();
			this.journalEntryManager.journalsave(jounalentry).subscribe((response) => {
				this.calloutService.showSuccess("Order Saved Successfully");
				let jounalentry001mb = deserialize<Jounalentry001mb>(Jounalentry001mb, response);
				this.journal?.push(jounalentry001mb);
				const newItems = [JSON.parse(JSON.stringify(jounalentry001mb))];
				this.gridOptions.api.applyTransaction({ add: newItems });
				this.gridOptions.api.deselectAll();
				this.jouEntryForm.reset();
				this.submitted = false;
			});
		}
	}

	onReset() {
		this.jouEntryForm.reset();
		this.submitted = false;
	}

	onGeneratePdfReport(){
		this.journalEntryManager.journalEntryPdf().subscribe((response) =>{
            saveAs(response,"JournalEntryList");

		});
	}

	onGenerateExcelReport(){
		this.journalEntryManager.journalEntryExcel().subscribe((response) => {
			saveAs(response,"JournalEntryList");
        })
	}


}