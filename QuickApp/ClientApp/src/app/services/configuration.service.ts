import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { ThemeManager } from './theme-manager';
import { LocalStoreManager } from './local-store-manager.service';
import { DBkeys } from './db-Keys';
import { Utilities } from './utilities';
import { environment } from '../../environments/environment';

interface UserConfiguration {
  homeUrl: string;
  themeId: number;
}

@Injectable()
export class ConfigurationService {

  constructor(
    private localStorage: LocalStoreManager,
    private themeManager: ThemeManager) {

    this.loadLocalChanges();
  }




  set themeId(value: number) {
    value = +value;
    this._themeId = value;
    this.saveToLocalStore(value, DBkeys.THEME_ID);
    this.themeManager.installTheme(this.themeManager.getThemeByID(value));
  }
  get themeId() {
    return this._themeId || ConfigurationService.defaultThemeId;
  }


  set homeUrl(value: string) {
    this._homeUrl = value;
    this.saveToLocalStore(value, DBkeys.HOME_URL);
  }
  get homeUrl() {
    return this._homeUrl || ConfigurationService.defaultHomeUrl;
  }

  public static readonly appVersion: string = '1.0.0';

  // ***Specify default configurations here***
  public static readonly defaultLanguage: string = 'en';
  public static readonly defaultHomeUrl: string = '/';
  public static readonly defaultThemeId: number = 1;
  public static readonly defaultShowDashboardStatistics: boolean = true;
  public static readonly defaultShowDashboardNotifications: boolean = true;
  public static readonly defaultShowDashboardTodo: boolean = false;
  public static readonly defaultShowDashboardBanner: boolean = true;

  public baseUrl =  environment.baseUrl || Utilities.baseUrl();
  public tokenUrl = environment.tokenUrl || environment.baseUrl || Utilities.baseUrl();
  public loginUrl = environment.loginUrl;
  public fallbackBaseUrl = 'https://localhost:5001';
  // ***End of defaults***

  private _language: string = null;
  private _homeUrl: string = null;
  private _themeId: number = null;
  private _showDashboardStatistics: boolean = null;
  private _showDashboardNotifications: boolean = null;
  private _showDashboardTodo: boolean = null;
  private _showDashboardBanner: boolean = null;

  private onConfigurationImported: Subject<boolean> = new Subject<boolean>();
  configurationImported$ = this.onConfigurationImported.asObservable();



  private loadLocalChanges() {


    if (this.localStorage.exists(DBkeys.THEME_ID)) {
      this._themeId = this.localStorage.getDataObject<number>(DBkeys.THEME_ID);
      this.themeManager.installTheme(this.themeManager.getThemeByID(this._themeId));
    } else {
      this.resetTheme();
    }


    if (this.localStorage.exists(DBkeys.HOME_URL)) {
      this._homeUrl = this.localStorage.getDataObject<string>(DBkeys.HOME_URL);
    }

    if (this.localStorage.exists(DBkeys.SHOW_DASHBOARD_STATISTICS)) {
      this._showDashboardStatistics = this.localStorage.getDataObject<boolean>(DBkeys.SHOW_DASHBOARD_STATISTICS);
    }

    if (this.localStorage.exists(DBkeys.SHOW_DASHBOARD_NOTIFICATIONS)) {
      this._showDashboardNotifications = this.localStorage.getDataObject<boolean>(DBkeys.SHOW_DASHBOARD_NOTIFICATIONS);
    }

    if (this.localStorage.exists(DBkeys.SHOW_DASHBOARD_TODO)) {
      this._showDashboardTodo = this.localStorage.getDataObject<boolean>(DBkeys.SHOW_DASHBOARD_TODO);
    }

    if (this.localStorage.exists(DBkeys.SHOW_DASHBOARD_BANNER)) {
      this._showDashboardBanner = this.localStorage.getDataObject<boolean>(DBkeys.SHOW_DASHBOARD_BANNER);
    }
  }


  private saveToLocalStore(data: any, key: string) {
    setTimeout(() => this.localStorage.savePermanentData(data, key));
  }


  public import(jsonValue: string) {

    this.clearLocalChanges();

    if (jsonValue) {
      const importValue: UserConfiguration = Utilities.JsonTryParse(jsonValue);

      if (importValue.themeId != null) {
        this.themeId = +importValue.themeId;
      }

      if (importValue.homeUrl != null) {
        this.homeUrl = importValue.homeUrl;
      }

    }

    this.onConfigurationImported.next();
  }


  public export(changesOnly = true): string {

    const exportValue: UserConfiguration = {
      themeId: changesOnly ? this._themeId : this.themeId,
      homeUrl: changesOnly ? this._homeUrl : this.homeUrl,
    };

    return JSON.stringify(exportValue);
  }


  public clearLocalChanges() {
    this._language = null;
    this._themeId = null;
    this._homeUrl = null;
    this._showDashboardStatistics = null;
    this._showDashboardNotifications = null;
    this._showDashboardTodo = null;
    this._showDashboardBanner = null;

    this.localStorage.deleteData(DBkeys.LANGUAGE);
    this.localStorage.deleteData(DBkeys.THEME_ID);
    this.localStorage.deleteData(DBkeys.HOME_URL);

    this.resetTheme();
  }



  private resetTheme() {
    this.themeManager.installTheme();
    this._themeId = null;
  }
}
