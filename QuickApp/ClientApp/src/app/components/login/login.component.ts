import { Component, OnInit, OnDestroy, Input, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';

import { AlertService, MessageSeverity, DialogType } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';
import { ConfigurationService } from '../../services/configuration.service';
import { Utilities } from '../../services/utilities';
import { UserLogin } from '../../models/user-login.model';
import { User } from "../../models/user.model";
import { UserEdit } from "../../models/user-edit.model";
import { ModalDirective } from "ngx-bootstrap/modal/modal.directive";
import { UserInfoComponent } from "../controls/user-info.component";
import { Role } from "../../models/role.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {

  userLogin = new UserLogin();
  isLoading = false;
  formResetToggle = true;
  modalClosedCallback: () => void;
  loginStatusSubscription: any;
  columns: any[] = [];
  rows: User[] = [];
  rowsCache: User[] = [];
  editedUser: UserEdit;
  sourceUser: UserEdit;
  editingUserName: { name: string };
  loadingIndicator: boolean;
  @Input()
  isModal = false;
  allRoles: Role[] = [];

  @ViewChild('indexTemplate', { static: true })
  indexTemplate: TemplateRef<any>;

  @ViewChild('userNameTemplate', { static: true })
  userNameTemplate: TemplateRef<any>;

  @ViewChild('rolesTemplate', { static: true })
  rolesTemplate: TemplateRef<any>;

  @ViewChild('actionsTemplate', { static: true })
  actionsTemplate: TemplateRef<any>;

  @ViewChild('editorModal', { static: true })
  editorModal: ModalDirective;

  @ViewChild('userEditor', { static: true })
  userEditor: UserInfoComponent;
  constructor(private alertService: AlertService, private authService: AuthService, private configurations: ConfigurationService) {
  }
  newUser() {
    this.editingUserName = null;
    this.sourceUser = null;
    this.editedUser = this.userEditor.newUser(this.allRoles);
    this.editorModal.show();
  }


  ngOnInit() {
    this.columns = [
      { prop: 'index', name: '#', width: 40, cellTemplate: this.indexTemplate, canAutoResize: false },
      { prop: 'userName', name: 'Login', width: 90, cellTemplate: this.userNameTemplate },
      { prop: 'fullName', name: 'Imię i nazwisko', width: 120 },
      { prop: 'email', name: 'E-mail', width: 140 },
      { prop: 'roles', name: 'Role', width: 120, cellTemplate: this.rolesTemplate },
      { prop: 'phoneNumber', name: 'Numer Telefonu', width: 100 }
    ];

    this.userLogin.rememberMe = this.authService.rememberMe;

    if (this.getShouldRedirect()) {
      this.authService.redirectLoginUser();
    } else {
      this.loginStatusSubscription = this.authService.getLoginStatusEvent().subscribe(isLoggedIn => {
        if (this.getShouldRedirect()) {
          this.authService.redirectLoginUser();
        }
      });
    }
    this.editorModal.hide();
    this.userEditor.isAdminRegister = false;
  }


  ngOnDestroy() {
    if (this.loginStatusSubscription) {
      this.loginStatusSubscription.unsubscribe();
    }
  }


  ngAfterViewInit() {

    this.userEditor.changesSavedCallback = () => {
      this.editorModal.hide();
    };

    this.userEditor.changesCancelledCallback = () => {
      this.editedUser = null;
      this.sourceUser = null;
      this.editorModal.hide();
    };
  }

  getShouldRedirect() {
    return !this.isModal && this.authService.isLoggedIn && !this.authService.isSessionExpired;
  }


  showErrorAlert(caption: string, message: string) {
    this.alertService.showMessage(caption, message, MessageSeverity.error);
  }

  closeModal() {
    if (this.modalClosedCallback) {
      this.modalClosedCallback();
    }
  }

  onEditorModalHidden() {
    this.editingUserName = null;
    this.userEditor.resetForm(true);
  }


  login() {
    this.isLoading = true;
    this.alertService.startLoadingMessage('', 'Logowanie...');

    this.authService.login(this.userLogin.userName, this.userLogin.password, this.userLogin.rememberMe)
      .subscribe(
        user => {
          setTimeout(() => {
            this.alertService.stopLoadingMessage();
            this.isLoading = false;
            this.reset();

            if (!this.isModal) {
              this.alertService.showMessage('Login', `Witaj ${user.userName}!`, MessageSeverity.success);
            } else {
              this.alertService.showMessage('Login', `Sesja dla ${user.userName} przywrócona!`, MessageSeverity.success);
              setTimeout(() => {
                this.alertService.showStickyMessage('Sesja przywrócona', 'Spróbuj przeprowadzić ostatnią operację ponownie', MessageSeverity.default);
              }, 500);

              this.closeModal();
            }
          }, 500);
        },
        error => {

          this.alertService.stopLoadingMessage();

          if (Utilities.checkNoNetwork(error)) {
            this.alertService.showStickyMessage(Utilities.noNetworkMessageCaption, Utilities.noNetworkMessageDetail, MessageSeverity.error, error);
          } else {
            const errorMessage = Utilities.getHttpResponseMessage(error);

            if (errorMessage) {
              this.alertService.showStickyMessage('Problem z logowaniem', this.mapLoginErrorMessage(errorMessage), MessageSeverity.error, error);
            } else {
              this.alertService.showStickyMessage('Problem z logowaniem', 'Wystąpił błąd podczas logowania.\nBłąd: ' + Utilities.getResponseBody(error), MessageSeverity.error, error);
            }
          }

          setTimeout(() => {
            this.isLoading = false;
          }, 500);
        });
  }

  mapLoginErrorMessage(error: string) {

    if (error == 'invalid_username_or_password') {
      return 'Nieprawidłowy login lub hasło';
    }

    if (error == 'invalid_grant') {
      return 'Konto zostało zablokowane';
    }

    return error;
  }



  reset() {
    this.formResetToggle = false;

    setTimeout(() => {
      this.formResetToggle = true;
    });
  }
}
