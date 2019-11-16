import { Component, OnInit, AfterViewInit, TemplateRef, ViewChild, Input } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { AlertService, DialogType, MessageSeverity } from '../../services/alert.service';
import { AccountService } from '../../services/account.service';
import { Utilities } from '../../services/utilities';
import { Role } from '../../models/role.model';
import { Permission } from '../../models/permission.model';
import { RoleEditorComponent } from './role-editor.component';


@Component({
    selector: 'roles-management',
    templateUrl: './roles-management.component.html',
    styleUrls: ['./roles-management.component.scss']
})
export class RolesManagementComponent implements OnInit, AfterViewInit {
    columns: any[] = [];
    rows: Role[] = [];
    rowsCache: Role[] = [];
    allPermissions: Permission[] = [];
    editedRole: Role;
    sourceRole: Role;
    editingRoleName: { name: string };
    loadingIndicator: boolean;


  
    @ViewChild('rolesTemplate', { static: true })
     rolesTemplate: TemplateRef<any>;

    @ViewChild('indexTemplate', { static: true })
    indexTemplate: TemplateRef<any>;

    @ViewChild('actionsTemplate', { static: true })
    actionsTemplate: TemplateRef<any>;

    @ViewChild('editorModal', { static: true })
    editorModal: ModalDirective;

    @ViewChild('roleEditor', { static: true })
    roleEditor: RoleEditorComponent;

    constructor(private alertService: AlertService, private accountService: AccountService) {
    }


    ngOnInit() {


        this.columns = [
            { prop: 'index', name: '#', width: 50, cellTemplate: this.indexTemplate, canAutoResize: false },
            { prop: 'name', name: 'Nazwa', width: 180 },
            { prop: 'description', name: 'Opis', width: 320 },
            { prop: 'roles', name: 'Role', width: 120, cellTemplate: this.rolesTemplate },
            { prop: 'usersCount', name: 'Użytkownicy', width: 50 },
            { name: '', width: 160, cellTemplate: this.actionsTemplate, resizeable: false, canAutoResize: false, sortable: false, draggable: false }
        ];

        this.loadData();
    }





    ngAfterViewInit() {

        this.roleEditor.changesSavedCallback = () => {
            this.addNewRoleToList();
            this.editorModal.hide();
        };

        this.roleEditor.changesCancelledCallback = () => {
            this.editedRole = null;
            this.sourceRole = null;
            this.editorModal.hide();
        };
    }


    addNewRoleToList() {
        if (this.sourceRole) {
            Object.assign(this.sourceRole, this.editedRole);

            let sourceIndex = this.rowsCache.indexOf(this.sourceRole, 0);
            if (sourceIndex > -1) {
                Utilities.moveArrayItem(this.rowsCache, sourceIndex, 0);
            }

            sourceIndex = this.rows.indexOf(this.sourceRole, 0);
            if (sourceIndex > -1) {
                Utilities.moveArrayItem(this.rows, sourceIndex, 0);
            }

            this.editedRole = null;
            this.sourceRole = null;
        } else {
            const role = new Role();
            Object.assign(role, this.editedRole);
            this.editedRole = null;

            let maxIndex = 0;
            for (const r of this.rowsCache) {
                if ((r as any).index > maxIndex) {
                    maxIndex = (r as any).index;
                }
            }

            (role as any).index = maxIndex + 1;

            this.rowsCache.splice(0, 0, role);
            this.rows.splice(0, 0, role);
            this.rows = [...this.rows];
        }
    }




    loadData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.accountService.getRolesAndPermissions()
            .subscribe(results => {
                this.alertService.stopLoadingMessage();
                this.loadingIndicator = false;

                const roles = results[0];
                const permissions = results[1];

                roles.forEach((role, index, roles) => {
                    (role as any).index = index + 1;
                });


                this.rowsCache = [...roles];
                this.rows = roles;

                this.allPermissions = permissions;
            },
            error => {
                this.alertService.stopLoadingMessage();
                this.loadingIndicator = false;

                this.alertService.showStickyMessage('Błąd', `Błąd podczas pobierania danych o rolach z serwera.\r\nBłędy: "${Utilities.getHttpResponseMessages(error)}"`,
                    MessageSeverity.error, error);
            });
    }


    onSearchChanged(value: string) {
        this.rows = this.rowsCache.filter(r => Utilities.searchArray(value, false, r.name, r.description));
    }


    onEditorModalHidden() {
        this.editingRoleName = null;
        this.roleEditor.resetForm(true);
    }


    newRole() {
        this.editingRoleName = null;
        this.sourceRole = null;
        this.editedRole = this.roleEditor.newRole(this.allPermissions);
        this.editorModal.show();
    }


    editRole(row: Role) {
        this.editingRoleName = { name: row.name };
        this.sourceRole = row;
        this.editedRole = this.roleEditor.editRole(row, this.allPermissions);
        this.editorModal.show();
    }

    deleteRole(row: Role) {
        this.alertService.showDialog('Jesteś pewien że chcesz usunąć rolę: \"' + row.name + '\"?', DialogType.confirm, () => this.deleteRoleHelper(row));
    }


    deleteRoleHelper(row: Role) {

        this.alertService.startLoadingMessage('Usuwanie...');
        this.loadingIndicator = true;

        this.accountService.deleteRole(row)
            .subscribe(results => {
                this.alertService.stopLoadingMessage();
                this.loadingIndicator = false;

                this.rowsCache = this.rowsCache.filter(item => item !== row);
                this.rows = this.rows.filter(item => item !== row);
            },
            error => {
                this.alertService.stopLoadingMessage();
                this.loadingIndicator = false;

                this.alertService.showStickyMessage('Błąd', `Wystąpił błąd podczas usuwania roli.\r\nBłędy: "${Utilities.getHttpResponseMessages(error)}"`,
                    MessageSeverity.error, error);
            });
    }


    get canManageRoles() {
        return this.accountService.userHasPermission(Permission.manageRolesPermission);
    }

}
