
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { RoleManager } from 'src/app/shared/services/restcontroller/bizservice/role.service';
import { UserManager } from 'src/app/shared/services/restcontroller/bizservice/user.service';
import { Role001mb } from 'src/app/shared/services/restcontroller/entities/Role001mb';
import { User001mb } from 'src/app/shared/services/restcontroller/entities/User001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';


@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit {
    frameworkComponents: any;
    id: number | any;
    rlid: number | any;
    rolename: string = "";
    status: string = "";
    insertUser: string = "";
    insertDatetime: Date | any;
    roles: Role001mb[] = [];
    user001mbs: User001mb[] = [];
    public gridOptions: GridOptions | any;
    userRoleForm: FormGroup | any;
    submitted = false;


    constructor(private formBuilder: FormBuilder,
        private roleManager: RoleManager,
        private userManager: UserManager,
        private calloutService: CalloutService,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent
        }
    }

    ngOnInit() {
        this.userRoleForm = this.formBuilder.group({
            rlid: ['', Validators.required],
            rolename: ['', Validators.required],
            status: ['', Validators.required]
        });

        this.createDataGrid001();

        this.loadData();
        this.userManager.alluser().subscribe((response) => {
            this.user001mbs = deserialize<User001mb[]>(User001mb, response);

        })
    }

    loadData() {
        this.roleManager.allrole().subscribe((response) => {
            this.roles = deserialize<Role001mb[]>(Role001mb, response);
            if (this.roles.length > 0) {
                this.gridOptions?.api?.setRowData(this.roles);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        });
    }

    get f() { return this.userRoleForm.controls; }

    createDataGrid001(): void {
        this.gridOptions = {
            paginationPageSize: 10,
            rowSelection: 'single',
            onFirstDataRendered: this.onFirstDataRendered.bind(this)
        };
        this.gridOptions.editType = 'fullRow';
        this.gridOptions.enableRangeSelection = true;
        this.gridOptions.animateRows = true;
        this.gridOptions.columnDefs = [
            {
                headerName: '#Id',
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
                headerName: 'User Name',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: this.setUserName.bind(this)
            },
            {
                headerName: 'Role Name ',
                field: 'rolename',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Status ',
                field: 'status',
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
                }
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

    setUserName(params: any): string {
        return params.data.rl ? params.data.rl.username : null;
    }

    onEditButtonClick(params: any) {
        this.id = params.data.id;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.userRoleForm.patchValue({
            'rlid': params.data.rlid,
            'rolename': params.data.rolename,
            'status': params.data.status,
        });
    }

    onDeleteButtonClick(params: any) {
        this.roleManager.deleterole(params.data.id).subscribe((response) => {
            for (let i = 0; i < this.roles.length; i++) {
                if (this.roles[i].id == params.data.id) {
                    this.roles?.splice(i, 1);
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
        modalRef.componentInstance.title = "User Roll";
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

    onUserRoleFormClick(event: any, userRoleForm: any) {
        this.markFormGroupTouched(this.userRoleForm);
        this.submitted = true;
        if (this.userRoleForm.invalid) {
            return;
        }
        let role001mb = new Role001mb();
        role001mb.rlid = this.f.rlid.value ? this.f.rlid.value : "";
        role001mb.rolename = this.f.rolename.value ? this.f.rolename.value : "";
        role001mb.status = this.f.status.value ? this.f.status.value : "";
        if (this.id) {
            role001mb.id = this.id;
            role001mb.insertUser = this.insertUser;
            role001mb.insertDatetime = this.insertDatetime;
            role001mb.updatedUser = this.authManager.getcurrentUser.username;
            role001mb.updatedDatetime = new Date();
            this.roleManager.updaterole(role001mb).subscribe(response => {
                this.calloutService.showSuccess("Order Updated Successfully");
                this.loadData();
                this.userRoleForm.reset();
                this.submitted = false;
            })
        }
        else {
            role001mb.insertUser = this.authManager.getcurrentUser.username;
            role001mb.insertDatetime = new Date();
            this.roleManager.saverole(role001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                this.loadData();
                this.userRoleForm.reset();
                this.submitted = false;
            });
        }
    }

    onReset() {
        this.userRoleForm.reset();
        this.submitted = false;

    }
}


