import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { ChequePrintManager } from 'src/app/shared/services/restcontroller/bizservice/chequeprint-template.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Chequetemplate001mb } from 'src/app/shared/services/restcontroller/entities/Chequetemplate001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-chequeprint-template',
    templateUrl: './chequeprint-template.component.html',
    styleUrls: ['./chequeprint-template.component.css']
})

export class ChequeprintTemplateComponent implements OnInit {

    chequPrintForm: FormGroup | any;
    submitted = false;
    cheqId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    frameworkComponents: any;
    prmaccountName: string = "";
    prmisaccPay: boolean = false;
    prmcheqSize: string | null = "";
    prmdistfromTop: string | null = "";
    prmcheqWidth: string | null = "";
    prmdistfromLeft: string | null = "";
    prmcheqHeight: string | null = "";
    prmmesgtoShow: string = "";
    scanCheq: string | null = "";
    dtdistfromTop: string | null = "";
    dtdistfromLeft: string | null = "";
    paydistfromTop: string | null = "";
    paydistfromLeft: string | null = "";
    amtwdistfromTop: string | null = "";
    amtwdistfromLeft: string | null = "";
    amtwWidth: string | null = "";
    amtwlineSpace: string | null = "";
    amtfdistfromTop: string | null = "";
    amtfdistfromLeft: string | null = "";
    accnodistfromTop: string | null = "";
    accnodistfromLeft: string | null = "";
    signposdistfromTop: string | null = "";
    signposdistfromLeft: string | null = "";
    dummyname = "Dummy.status";
    dummytype = "dummy";
    accname = "account.type";
    acctype = "type";
    dummysystemproperties: Systemproperties001mb[] = [];
    accsystemproperties: Systemproperties001mb[] = [];
    chequePrint: Chequetemplate001mb[] = [];
    public gridOptions: GridOptions | any;

    constructor(private chequePrintManager: ChequePrintManager, 
        private formBuilder: FormBuilder,
        private systemPropertiesService: SystemPropertiesService,
        private calloutService: CalloutService,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent,
        }
    }

    ngOnInit() {
        this.chequPrintForm = this.formBuilder.group({
            prmaccountName: ['', Validators.required],
            prmisaccPay: [''],
            prmcheqSize: ['', Validators.required],
            prmdistfromTop: ['', Validators.required],
            prmcheqWidth: ['', Validators.required],
            prmdistfromLeft: ['', Validators.required],
            prmcheqHeight: ['', Validators.required],
            prmmesgtoShow: ['', Validators.required],
            scanCheq: ['', Validators.required],
            dtdistfromTop: ['', Validators.required],
            dtdistfromLeft: ['', Validators.required],
            paydistfromTop: ['', Validators.required],
            paydistfromLeft: ['', Validators.required],
            amtwdistfromTop: ['', Validators.required],
            amtwdistfromLeft: ['', Validators.required],
            amtwWidth: ['', Validators.required],
            amtwlineSpace: ['', Validators.required],
            amtfdistfromTop: ['', Validators.required],
            amtfdistfromLeft: ['', Validators.required],
            accnodistfromTop: ['', Validators.required],
            accnodistfromLeft: ['', Validators.required],
            signposdistfromTop: ['', Validators.required],
            signposdistfromLeft: ['', Validators.required],
        });

        this.createDataGrid001();
        this.systemPropertiesService.system(this.dummyname, this.dummytype).subscribe(response => {
            this.dummysystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.systemPropertiesService.system(this.accname, this.acctype).subscribe(response => {
            this.accsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        })
        this.chequePrintManager.allchequeprint().subscribe((response) => {
            this.chequePrint = deserialize<Chequetemplate001mb[]>(Chequetemplate001mb, response);
            if (this.chequePrint.length > 0) {
                this.gridOptions?.api?.setRowData(this.chequePrint);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    get f() { return this.chequPrintForm.controls; }

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
                field: 'cheqId',
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
                headerName: 'Account',
                field: 'prmaccountName',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Is Account Pay',
                field: 'prmisaccPay',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: (param: any) => {
                    return param.data.prmisaccPay == 1 ? true : false;
                }
            },
            {
                headerName: 'Cheque Size',
                field: 'prmcheqSize',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },

            {
                headerName: 'Dist From Top',
                field: 'prmdistfromTop',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Cheque Width',
                field: 'prmcheqWidth',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Dist From Left',
                field: 'prmdistfromLeft',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Cheque Height',
                field: 'prmcheqHeight',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Message',
                field: 'prmmesgtoShow',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Scanned Cheque',
                field: 'scanCheq',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Dist From Top',
                field: 'dtdistfromTop',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Dist From Left',
                field: 'dtdistfromLeft',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Dist From Top ',
                field: 'paydistfromTop',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Dist From Left',
                field: 'paydistfromLeft',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Dist From Top',
                field: 'amtwdistfromTop',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Dist From Left',
                field: 'amtwdistfromLeft',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Amt Words Width',
                field: 'amtwWidth',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Amt Words Line Space',
                field: 'prmcheqSize',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Dist From Top',
                field: 'amtfdistfromTop',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Dist From Left',
                field: 'amtfdistfromLeft',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Dist From Top',
                field: 'accnodistfromTop',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Dist From Left',
                field: 'accnodistfromLeft',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Dist From Top',
                field: 'signposdistfromTop',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Dist From Left',
                field: 'signposdistfromLeft',
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
        this.cheqId = params.data.cheqId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.chequPrintForm.patchValue({
            'accnodistfromLeft': params.data.accnodistfromLeft,
            'prmisaccPay': params.data.prmisaccPay,
            'prmaccountName': params.data.prmaccountName,
            'prmcheqSize': params.data.prmcheqSize,
            'prmdistfromTop': params.data.prmdistfromTop,
            'prmcheqWidth': params.data.prmcheqWidth,
            'prmdistfromLeft': params.data.prmdistfromLeft,
            'prmcheqHeight': params.data.prmcheqHeight,
            'scanCheq': params.data.scanCheq,
            'dtdistfromTop': params.data.dtdistfromTop,
            'dtdistfromLeft': params.data.dtdistfromLeft,
            'paydistfromTop': params.data.paydistfromTop,
            'paydistfromLeft': params.data.paydistfromLeft,
            'amtwdistfromTop': params.data.amtwdistfromTop,
            'amtwdistfromLeft': params.data.amtwdistfromLeft,
            'amtwWidth': params.data.amtwWidth,
            'amtwlineSpace': params.data.amtwlineSpace,
            'amtfdistfromTop': params.data.amtfdistfromTop,
            'amtfdistfromLeft': params.data.amtfdistfromLeft,
            'signposdistfromTop': params.data.signposdistfromTop,
            'signposdistfromLeft': params.data.signposdistfromLeft,
            'prmmesgtoShow': params.data.prmmesgtoShow,
            'accnodistfromTop': params.data.accnodistfromTop,
        });
    }

    onDeleteButtonClick(params: any) {
        this.chequePrintManager.chequeprintdelete(params.data.cheqId).subscribe((response) => {
            for (let i = 0; i < this.chequePrint.length; i++) {
                if (this.chequePrint[i].cheqId == params.data.cheqId) {
                    this.chequePrint?.splice(i, 1);
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
        modalRef.componentInstance.title = "Cheque Print Template";
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

    onOrderClick(event: any, chequPrintForm: any) {
        this.markFormGroupTouched(this.chequPrintForm);
        this.submitted = true;
        if (this.chequPrintForm.invalid) {
            return;
        }

        let chequetemplate001mb = new Chequetemplate001mb();
        chequetemplate001mb.accnodistfromLeft = this.f.accnodistfromLeft.value ? this.f.accnodistfromLeft.value : "";
        chequetemplate001mb.accnodistfromTop = this.f.accnodistfromTop.value ? this.f.accnodistfromTop.value : "";
        chequetemplate001mb.amtfdistfromLeft = this.f.amtfdistfromLeft.value ? this.f.amtfdistfromLeft.value : "";
        chequetemplate001mb.amtfdistfromTop = this.f.amtfdistfromTop.value ? this.f.amtfdistfromTop.value : "";
        chequetemplate001mb.amtwWidth = this.f.amtwWidth.value ? this.f.amtwWidth.value : "";
        chequetemplate001mb.amtwdistfromLeft = this.f.amtwdistfromLeft.value ? this.f.amtwdistfromLeft.value : "";
        chequetemplate001mb.amtwdistfromTop = this.f.amtwdistfromTop.value ? this.f.amtwdistfromTop.value : "";
        chequetemplate001mb.amtwlineSpace = this.f.amtwlineSpace.value ? this.f.amtwlineSpace.value : "";
        chequetemplate001mb.dtdistfromLeft = this.f.dtdistfromLeft.value ? this.f.dtdistfromLeft.value : "";
        chequetemplate001mb.dtdistfromTop = this.f.dtdistfromTop.value ? this.f.dtdistfromTop.value : "";
        chequetemplate001mb.paydistfromLeft = this.f.paydistfromLeft.value ? this.f.paydistfromLeft.value : "";
        chequetemplate001mb.paydistfromTop = this.f.paydistfromTop.value ? this.f.paydistfromTop.value : "";
        chequetemplate001mb.prmaccountName = this.f.prmaccountName.value ? this.f.prmaccountName.value : "";
        chequetemplate001mb.prmcheqHeight = this.f.prmcheqHeight.value ? this.f.prmcheqHeight.value : "";
        chequetemplate001mb.prmcheqSize = this.f.prmcheqSize.value ? this.f.prmcheqSize.value : "";
        chequetemplate001mb.prmcheqWidth = this.f.prmcheqWidth.value ? this.f.prmcheqWidth.value : "";
        chequetemplate001mb.prmdistfromLeft = this.f.prmdistfromLeft.value ? this.f.prmdistfromLeft.value : "";
        chequetemplate001mb.prmdistfromTop = this.f.prmdistfromTop.value ? this.f.prmdistfromTop.value : "";
        chequetemplate001mb.prmisaccPay = this.f.prmisaccPay.value ? this.f.prmisaccPay.value : false;
        chequetemplate001mb.prmmesgtoShow = this.f.prmmesgtoShow.value ? this.f.prmmesgtoShow.value : "";
        chequetemplate001mb.scanCheq = this.f.scanCheq.value ? this.f.scanCheq.value : "";
        chequetemplate001mb.signposdistfromLeft = this.f.signposdistfromLeft.value ? this.f.signposdistfromLeft.value : "";
        chequetemplate001mb.signposdistfromTop = this.f.signposdistfromTop.value ? this.f.signposdistfromTop.value : "";
        if (this.cheqId) {
            chequetemplate001mb.cheqId = this.cheqId;
            chequetemplate001mb.insertUser = this.insertUser;
			chequetemplate001mb.insertDatetime = this.insertDatetime;
            chequetemplate001mb.updatedUser = this.authManager.getcurrentUser.username;
			chequetemplate001mb.updatedDatetime = new Date();
            this.chequePrintManager.chequeprintupdate(chequetemplate001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                let cheque = deserialize<Chequetemplate001mb>(Chequetemplate001mb, response);
                for (let chePrint of this.chequePrint) {
                    if (chePrint.cheqId == cheque.cheqId) {
                        chePrint.dtdistfromLeft = cheque.dtdistfromLeft;
                        chePrint.dtdistfromTop = cheque.dtdistfromTop;
                        chePrint.paydistfromLeft = cheque.paydistfromLeft;
                        chePrint.paydistfromTop = cheque.paydistfromTop;
                        chePrint.prmaccountName = cheque.prmaccountName;
                        chePrint.prmcheqHeight = cheque.prmcheqHeight;
                        chePrint.prmcheqSize = cheque.prmcheqSize;
                        chePrint.prmcheqWidth = cheque.prmcheqWidth;
                        chePrint.prmdistfromLeft = cheque.prmdistfromLeft;
                        chePrint.prmdistfromTop = cheque.prmdistfromTop;
                        chePrint.prmisaccPay = cheque.prmisaccPay;
                        chePrint.prmmesgtoShow = cheque.prmmesgtoShow;
                        chePrint.scanCheq = cheque.scanCheq;
                        chePrint.signposdistfromLeft = cheque.signposdistfromLeft;
                        chePrint.signposdistfromTop = cheque.signposdistfromTop;
                        chePrint.accnodistfromLeft = cheque.accnodistfromLeft;
                        chePrint.accnodistfromTop = cheque.accnodistfromTop;
                        chePrint.amtfdistfromLeft = cheque.amtfdistfromLeft;
                        chePrint.amtfdistfromTop = cheque.amtfdistfromTop;
                        chePrint.amtwWidth = cheque.amtwWidth;
                        chePrint.amtwdistfromLeft = cheque.amtwdistfromLeft;
                        chePrint.amtwdistfromTop = cheque.amtwdistfromTop;
                        chePrint.amtwlineSpace = cheque.amtwlineSpace;
                        chePrint.insertUser = this.insertUser;
                        chePrint.insertDatetime = this.insertDatetime;
                        chePrint.updatedUser = this.authManager.getcurrentUser.username;
                        chePrint.updatedDatetime = new Date();

                    }
                }
                this.gridOptions.api.setRowData(this.chequePrint);
                this.gridOptions.api.refreshView();
                this.gridOptions.api.deselectAll();
                this.chequPrintForm.reset();
                this.cheqId = null;
                this.submitted = false;
            })
        }
        else {
            chequetemplate001mb.insertUser = this.authManager.getcurrentUser.username;
			chequetemplate001mb.insertDatetime = new Date();
            this.chequePrintManager.chequeprintsave(chequetemplate001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                let cheque = deserialize<Chequetemplate001mb>(Chequetemplate001mb, response);
                this.chequePrint?.push(cheque);
                const newItems = [JSON.parse(JSON.stringify(cheque))];
                this.gridOptions.api.applyTransaction({ add: newItems });
                chequPrintForm.resetForm();
            })
            this.gridOptions.api.refreshView();
            this.gridOptions.api.deselectAll();
            this.chequPrintForm.reset();
            this.cheqId = "";
            this.submitted = false;
        }
    }

    onReset() {
        this.submitted = false;
        this.chequPrintForm.reset();
    }

    onGeneratePdfReport(){
		this.chequePrintManager.chequePrintPdf().subscribe((response) =>{
            saveAs(response,"ChequeTemplateList");

		});
	}

	onGenerateExcelReport(){
		this.chequePrintManager.chequePrintExcel().subscribe((response) => {
			saveAs(response,"ChequeTemplateList");
        })
	}


}