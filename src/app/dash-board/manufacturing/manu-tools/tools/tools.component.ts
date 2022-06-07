import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { ToolManager } from 'src/app/shared/services/restcontroller/bizservice/manu-tool.service';
import { Itemdt001mb } from 'src/app/shared/services/restcontroller/entities/Itemdt001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
	selector: 'app-tools',
	templateUrl: './tools.component.html',
	styleUrls: ['./tools.component.css']
})

export class ToolsComponent implements OnInit {
	frameworkComponents: any;
	toolForm: FormGroup | any;
	itemid: number | any;
	insertUser: string = "";
    insertDatetime: Date | any;
	itemcode: string | null = "";
	quantity: number | any;
	rate: number | any;
	amount: number | any;
	submitted = false;
	tool: Itemdt001mb[] = [];
	public gridOptions: GridOptions | any;

	constructor(private toolManager: ToolManager,
		private formBuilder: FormBuilder,
		private calloutService: CalloutService,
		private authManager: AuthManager,
		private modalService: NgbModal) { 
			this.frameworkComponents = {
				iconRenderer: IconRendererComponent
			}
		}

	ngOnInit() {
		this.createDataGrid001();
		this.toolForm = this.formBuilder.group({
			itemcode: ['', Validators.required],
			quantity: ['', Validators.required],
			rate: ['', Validators.required],
			amount: ['', Validators.required]
		})
		this.toolManager.alltool().subscribe(response => {
			this.tool = deserialize<Itemdt001mb[]>(Itemdt001mb, response);
			if (this.tool.length > 0) {
				this.gridOptions?.api?.setRowData(this.tool);
			} else {
				this.gridOptions?.api?.setRowData([]);
			}
		})
	}

	get f() { return this.toolForm.controls }

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
				field: 'itemid',
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
				headerName: 'Item Code',
				field: 'itemcode',
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
				headerName: 'Rate',
				field: 'rate',
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
				headerName: 'Edit',
				cellRenderer: 'iconRenderer',
				width: 80,
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
				width: 85,
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
				width: 80,
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
        this.itemid = params.data.itemid;
		this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.toolForm.patchValue({
            'itemcode': params.data.itemcode,
			'quantity': params.data.quantity,
            'rate': params.data.rate,
            'amount': params.data.amount
        });
    }

	onDeleteButtonClick(params: any) {
        this.toolManager.deletetool(params.data.itemid).subscribe((response) => {
            for (let i = 0; i < this.tool.length; i++) {
                if (this.tool[i].itemid == params.data.itemid) {
                    this.tool?.splice(i, 1);
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
        modalRef.componentInstance.title = "Tools";
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

	onOrderClick(event: any, toolForm: any) {
		this.markFormGroupTouched(this.toolForm);
		this.submitted = true;
		if (this.toolForm.invalid) {
			return;
		}
		let itemdt001mb = new Itemdt001mb();
		itemdt001mb.itemcode = this.f.itemcode.value ? this.f.itemcode.value : "";
		itemdt001mb.quantity = this.f.quantity.value ? this.f.quantity.value : null;
		itemdt001mb.amount = this.f.amount.value ? this.f.amount.value : null;
		itemdt001mb.rate = this.f.rate.value ? this.f.rate.value : null;
		if (this.itemid) {
			itemdt001mb.itemid = this.itemid;
			itemdt001mb.insertUser = this.insertUser;
			itemdt001mb.insertDatetime = this.insertDatetime;
			itemdt001mb.updatedUser = this.authManager.getcurrentUser.username;
			itemdt001mb.updatedDatetime = new Date();
			this.toolManager.updatetool(itemdt001mb).subscribe(response => {
				this.calloutService.showSuccess("Order Updated Successfully");
				let tools = deserialize<Itemdt001mb>(Itemdt001mb, response);
				for (let Tools of this.tool) {
					if (Tools.itemid == tools.itemid) {
						Tools.itemcode = tools.itemcode;
						Tools.quantity = tools.quantity;
						Tools.rate = tools.rate;
						Tools.amount = tools.amount;
						Tools.insertUser = this.insertUser;
						Tools.insertDatetime = this.insertDatetime;
						Tools.updatedUser = this.authManager.getcurrentUser.username;
						Tools.updatedDatetime = new Date();
					}
				}
				this.gridOptions.api.setRowData(this.tool);
				this.gridOptions.api.refreshView();
				this.gridOptions.api.deselectAll();
				this.toolForm.reset();
				this.submitted = false;
				this.itemid = null;
			});
		}
		else {
			itemdt001mb.insertUser = this.authManager.getcurrentUser.username;
			itemdt001mb.insertDatetime = new Date();
			this.toolManager.savetool(itemdt001mb).subscribe(response => {
				this.calloutService.showSuccess("Order Saved Successfully");
				let tools = deserialize<Itemdt001mb>(Itemdt001mb, response);
				this.tool?.push(tools);
				const newItems = [JSON.parse(JSON.stringify(tools))];
				this.gridOptions.api.applyTransaction({ add: newItems });
				this.gridOptions.api.deselectAll();
				this.toolForm.reset();
				this.submitted = false;
			})
		}
	}

	onReset() {
		this.toolForm.reset();
		this.submitted = false;
	}

	onGeneratePdfReport(){
		this.toolManager.manuToolsPdf().subscribe((response) =>{
			saveAs(response,'ToolList');

		});
	}

	onGenerateExcelReport(){
		this.toolManager.manuToolsExcel().subscribe((response) => {
			saveAs(response,'ToolList');
        })
	}
}