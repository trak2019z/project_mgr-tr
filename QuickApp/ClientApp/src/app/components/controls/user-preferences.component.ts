import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { AlertService, DialogType, MessageSeverity } from '../../services/alert.service';
import { ConfigurationService } from '../../services/configuration.service';
import { BootstrapSelectDirective } from '../../directives/bootstrap-select.directive';
import { AccountService } from '../../services/account.service';
import { ThemeManager } from '../../services/theme-manager';
import { Utilities } from '../../services/utilities';
import { Permission } from '../../models/permission.model';


@Component({
    selector: 'user-preferences',
    templateUrl: './user-preferences.component.html',
    styleUrls: ['./user-preferences.component.scss']
})
export class UserPreferencesComponent implements OnInit, OnDestroy {

    themeSelectorToggle = true;

    languageChangedSubscription: any;

    @ViewChild('languageSelector', { static: true })
    languageSelector: BootstrapSelectDirective;

    @ViewChild('homePageSelector', { static: true })
    homePageSelector: BootstrapSelectDirective;

    constructor(
        private alertService: AlertService,
        private accountService: AccountService,
        public themeManager: ThemeManager,
        public configurations: ConfigurationService) {
    }

    ngOnInit() {
   
    }
    ngOnDestroy() {
    }

    reloadFromServer() {
        this.alertService.startLoadingMessage();

        this.accountService.getUserPreferences()
            .subscribe(results => {
                this.alertService.stopLoadingMessage();

                this.configurations.import(results);

                this.alertService.showMessage('Przywrócono domyślne!', '', MessageSeverity.info);

            },
            error => {
                this.alertService.stopLoadingMessage();
                this.alertService.showStickyMessage('Błąd', `Problem z pobieraniem preferencji użytkownika z serwera.\r\nBłędy: "${Utilities.getHttpResponseMessages(error)}"`,
                    MessageSeverity.error, error);
            });
    }

    setAsDefault() {
        this.alertService.showDialog('Chcesz zapisać obecną konfigurację?', DialogType.confirm,
            () => this.setAsDefaultHelper(),
            () => this.alertService.showMessage('Anulowano!', '', MessageSeverity.default));
    }

    setAsDefaultHelper() {
        this.alertService.startLoadingMessage('', 'Zapisywanie');

        this.accountService.updateUserPreferences(this.configurations.export())
            .subscribe(response => {
                this.alertService.stopLoadingMessage();
                this.alertService.showMessage('Nowe preferencja', 'Prefrencje użytkownika zapisane pomyślnie', MessageSeverity.success);

            },
            error => {
                this.alertService.stopLoadingMessage();
                this.alertService.showStickyMessage('Błąd', `Wystąpił błąd podczas usuwania użytkownika.\r\nBłędy: "${Utilities.getHttpResponseMessages(error)}"`,
                    MessageSeverity.error, error);
            });
    }



    resetDefault() {
        this.alertService.showDialog('Chcesz zresetować swoje ustawenia?', DialogType.confirm,
            () => this.resetDefaultHelper(),
            () => this.alertService.showMessage('Anulowano!', '', MessageSeverity.default));
    }

    resetDefaultHelper() {
        this.alertService.startLoadingMessage('', 'Resetowanie ustawień');

        this.accountService.updateUserPreferences(null)
            .subscribe(response => {
                this.alertService.stopLoadingMessage();
                this.configurations.import(null);
                this.alertService.showMessage('Resetowanie ustawień', 'Zresetowanie ustawienia konta', MessageSeverity.success);

            },
            error => {
                this.alertService.stopLoadingMessage();
                this.alertService.showStickyMessage('Błąd', `Wystąpił błąd podczas resetowania ustawień.\r\nBłędy: "${Utilities.getHttpResponseMessages(error)}"`,
                    MessageSeverity.error, error);
            });
    }


  get canAddProject() {
        return this.accountService.userHasPermission(Permission.createProjectPermission); // eg. viewCustomersPermission
    }

}
