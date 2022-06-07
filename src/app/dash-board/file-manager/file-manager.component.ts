import { Component, HostBinding,ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { GridOptions } from 'ag-grid-community';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { FileManagertManager } from 'src/app/shared/services/restcontroller/bizservice/file-manager.service';
import { Filemanager001mb } from 'src/app/shared/services/restcontroller/entities/Filemanager001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { DataSharedService } from 'src/app/shared/services/services/datashared.service';
import { Utils } from 'src/app/shared/utils/utils';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { Router } from '@angular/router';
import { User001mb } from 'src/app/shared/services/restcontroller/entities/User001mb';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-file-manager',
    templateUrl: './file-manager.component.html',
    styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit {
    @ViewChild('fileManage') fileManage: NgForm | any;
    public gridOptions: GridOptions | any;
    selectedFile: any;
    category: string = "";
    fileManager?: Filemanager001mb[] = [];
    fileManager001mb?: Filemanager001mb;
    fileManagerForm: FormGroup | any;
    frameworkComponents: any;
    user?: User001mb;
    parentMenuString: string = '';
    childMenuString: string = '';

    @HostBinding('style.--color_l1') colorthemes_1: any;
    @HostBinding('style.--color_l2') colorthemes_2: any;
    @HostBinding('style.--color_l3') colorthemes_3: any;
    @HostBinding('style.--color_l4') colorthemes_4: any;
    constructor(private fileManagertManager: FileManagertManager,
     private calloutService: CalloutService,
    private authManger: AuthManager,
    private router: Router,
    // private loginManager: LoginManager,
        private dataSharedService: DataSharedService,
        private authManager: AuthManager
    ) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent
        }
    }

    ngOnInit() {
        this.user = this.authManger.getcurrentUser;
        // this.colorthemes = this.user.theme;
        this.dataSharedService.currentMenuObject.subscribe((object: any) => {
            this.parentMenuString = object.parentMenuString;
            this.childMenuString = object.childMenuString;
        });
        this.authManager.currentUserSubject.subscribe((object: any) => {
            let rgb = Utils.hexToRgb(object.theme);

            this.colorthemes_1 = Utils.rgbToHex(rgb, -0.3);

            this.colorthemes_2 = Utils.rgbToHex(rgb, 0.1);

            this.colorthemes_3 = Utils.rgbToHex(rgb, 0.5);

            this.colorthemes_4 = Utils.rgbToHex(rgb, 0.8);
        });
        this.createDataGrid001();
        this.fileManagertManager.allFiles().subscribe(response => {
            this.fileManager = response;
            if (this.fileManager) {
                this.gridOptions?.api?.setRowData(this.fileManager);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    createDataGrid001(): void {
        this.gridOptions = {
            paginationPageSize: 10,
            rowSelection: 'single'
        };
        this.gridOptions.editType = 'fullRow';
        this.gridOptions.enableRangeSelection = true;
        this.gridOptions.animateRows = true;

        this.gridOptions.columnDefs = [
            {
                headerName: '#Id',
                field: 'id',
                width: 50,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: 'Category',
                field: 'category',
                width: 50,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },
            {
                headerName: 'File Name',
                field: 'filename',
                width: 50,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true
            },
            {
                headerName: "",
                headerComponentParams: { template: '<span><i class="fa fa-download"></i></span>' },
                cellRenderer: 'iconRenderer',
                flex: 1,
                width: 50,
                suppressSizeToFit: true,
                cellRendererParams: {
                    label: 'File'

                },
            }

        ];
    }


    onFileSelected(event: any) {
        let fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            this.selectedFile = fileList[0];
        }
    }

    onSubmitClick(event: any, fileManage: any) {
        this.fileManagertManager.save(this.selectedFile, this.category).subscribe((response) => {
            this.calloutService.showSuccess("Order Saved Successfully");
            let fileManager001mb = response;
            this.fileManager?.push(fileManager001mb);
            const newItems = [JSON.parse(JSON.stringify(fileManager001mb))];
            this.gridOptions.api.applyTransaction({ add: newItems });
            this.gridOptions.api.deselectAll();
            this.fileManage.reset();
            fileManage.value = "";
        });
    }

    onGeneratePdfReport(){
		this.fileManagertManager.fileManagertPdf().subscribe((response) =>{
            saveAs(response,"FileManagertList");

		});
	}

	onGenerateExcelReport(){
		this.fileManagertManager.fileManagertExcel().subscribe((response) => {
			saveAs(response,"FileManagertList");
        })
	}

}
