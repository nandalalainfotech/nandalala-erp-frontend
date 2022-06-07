import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { Prodbundle001mb } from 'src/app/shared/services/restcontroller/entities/Prodbundle001mb';
import { User001mb } from 'src/app/shared/services/restcontroller/entities/User001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { DataSharedService } from 'src/app/shared/services/services/datashared.service';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
    selector: 'app-issue',
    templateUrl: './issue.component.html',
    styleUrls: ['./issue.component.css'],
})
export class IssueComponent implements OnInit {
    public gridOptions: GridOptions | any;
    user?: User001mb;
    parentMenuString: string = '';
    childMenuString: string = '';

    @HostBinding('style.--color_l1') colorthemes_1: any;
    @HostBinding('style.--color_l2') colorthemes_2: any;
    @HostBinding('style.--color_l3') colorthemes_3: any;
    @HostBinding('style.--color_l4') colorthemes_4: any;
    constructor(
        private calloutService: CalloutService,
        private authManager: AuthManager,
        private authManger: AuthManager,
        private router: Router,
        // private loginManager: LoginManager,
        private dataSharedService: DataSharedService
    ) {}
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
        setTimeout(() => {
            this.gridOptions?.api?.setRowData([]);
        }, 100);
    }
    createDataGrid001(): void {
        this.gridOptions = {
            paginationPageSize: 10,
            rowSelection: 'single',
        };
        this.gridOptions.editType = 'fullRow';
        this.gridOptions.enableRangeSelection = true;
        // this.gridOptions.domLayout = 'autoHeight';
        this.gridOptions.animateRows = true;

        this.gridOptions.columnDefs = [
            {
                headerName: '#ID',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true,
            },
            {
                headerName: 'Customer',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
            },
            {
                headerName: 'Subject',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
            },
            {
                headerName: 'Status',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
            },
            {
                headerName: 'Raised By (Email)',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
            },
        ];
        // this.defaultColDef= {
        // 	suppressKeyboardEvent: (params) => {
        // 		if (!params.editing) {
        // 			let isBackspaceKey = params.event.keyCode === 8;
        // 			let isDeleteKey = params.event.keyCode === 46;

        // 			if (isBackspaceKey) {
        // 				// Delete all selected rows...
        // 				return true
        // 			}

        // 			if(isDeleteKey){
        // 				// Delete all selected cell ranges...
        // 				return true
        // 			}
        // 		}
        // 		return false;
        // 	}
        // };
    }
    public defaultColDef: any;

    onSelectionChange() {}
}
