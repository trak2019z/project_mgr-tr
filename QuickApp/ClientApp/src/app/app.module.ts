

import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material';

import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule
} from '@angular/material';


import { NgxPaginationModule } from 'ngx-pagination'; 

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';
import { ToastaModule } from 'ngx-toasta';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppErrorHandler } from './app-error.handler';
import { AppTitleService } from './services/app-title.service';
import { ConfigurationService } from './services/configuration.service';
import { AlertService } from './services/alert.service';
import { ThemeManager } from './services/theme-manager';
import { LocalStoreManager } from './services/local-store-manager.service';
import { AuthStorage } from './services/auth-storage';

import { AccountService } from './services/account.service';
import { AccountEndpoint } from './services/account-endpoint.service';

import { EqualValidator } from './directives/equal-validator.directive';
import { LastElementDirective } from './directives/last-element.directive';
import { AutofocusDirective } from './directives/autofocus.directive';
import { BootstrapTabDirective } from './directives/bootstrap-tab.directive';
import { BootstrapToggleDirective } from './directives/bootstrap-toggle.directive';
import { BootstrapSelectDirective } from './directives/bootstrap-select.directive';
import { BootstrapDatepickerDirective } from './directives/bootstrap-datepicker.directive';
import { GroupByPipe } from './pipes/group-by.pipe';

import { AppComponent } from './components/app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SettingsComponent } from './components/settings/settings.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SearchBoxComponent } from './components/controls/search-box.component';
import { UserInfoComponent } from './components/controls/user-info.component';
import { UserPreferencesComponent } from './components/controls/user-preferences.component';
import { UsersManagementComponent } from './components/controls/users-management.component';
import { RolesManagementComponent } from './components/controls/roles-management.component';
import { RoleEditorComponent } from './components/controls/role-editor.component';
import { ProjectsService } from './services/projects.service';
import { ProjectsEndpoint } from "./services/projects-endpoint.service";
import { AddProjectComponent } from "./components/add-project/add-project.component";
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ProjectDetailsComponent } from "./components/project-details/project-details.component";
import { ProjectResolve } from "./resolvers/project-resolve";
import { FileService } from "./services/file.service";
import { FileEndpointService } from "./services/file-endpoint.service";
import { RegisterComponent } from './components/register/register.component';
import { RegisterEndpoint } from "./services/register-endpoint.service";
import { RegisterService } from "./services/register.service";

@
NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    NgxDatatableModule,
    OAuthModule.forRoot(),
    ToastaModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    BsDropdownModule.forRoot(),
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    Ng2SearchPipeModule,
    NgxPaginationModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProjectDetailsComponent,
    AddProjectComponent,
    SettingsComponent,
    UsersManagementComponent, UserInfoComponent, UserPreferencesComponent,
    RolesManagementComponent, RoleEditorComponent,
    NotFoundComponent,
    SearchBoxComponent,
    EqualValidator,
    LastElementDirective,
    AutofocusDirective,
    BootstrapTabDirective,
    BootstrapToggleDirective,
    BootstrapSelectDirective,
    BootstrapDatepickerDirective,
    GroupByPipe,
    RegisterComponent,
  ],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandler },
    { provide: OAuthStorage, useClass: AuthStorage },
    AlertService,
    ThemeManager,
    ConfigurationService,
    AppTitleService,
    AccountService,
    AccountEndpoint,
    LocalStoreManager,
    ProjectsService,
    ProjectsEndpoint,
    ProjectResolve,
    FileEndpointService,
    FileService,
    RegisterEndpoint,
    RegisterService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
