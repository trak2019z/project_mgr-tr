import { NgModule } from '@angular/core';
import { Routes, RouterModule, DefaultUrlSerializer, UrlSerializer, UrlTree } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CustomersComponent } from './components/customers/customers.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AboutComponent } from './components/about/about.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { Utilities } from './services/utilities';
import { AddProjectComponent } from "./components/add-project/add-project.component";
import { ProjectDetailsComponent } from "./components/project-details/project-details.component";
import { ProjectResolve } from "./resolvers/project-resolve";


export class LowerCaseUrlSerializer extends DefaultUrlSerializer {
  parse(url: string): UrlTree {
    const possibleSeparators = /[?;#]/;
    const indexOfSeparator = url.search(possibleSeparators);
    let processedUrl: string;

    if (indexOfSeparator > -1) {
      const separator = url.charAt(indexOfSeparator);
      const urlParts = Utilities.splitInTwo(url, separator);
      urlParts.firstPart = urlParts.firstPart.toLowerCase();

      processedUrl = urlParts.firstPart + separator + urlParts.secondPart;
    } else {
      processedUrl = url.toLowerCase();
    }

    return super.parse(processedUrl);
  }
}


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard], data: { title: 'Strona domowa' } },
  { path: 'login', component: LoginComponent, data: { title: 'Login' } },
    { path: 'customers', component: CustomersComponent, canActivate: [AuthGuard], data: { title: 'Customers' } },
    {
        path: 'project/:id', component: ProjectDetailsComponent, canActivate: [AuthGuard], data: { title: 'Szczegóły projektu' }, resolve: {
            project: ProjectResolve
        }   },

    { path: 'projects/add', component: AddProjectComponent, canActivate: [AuthGuard], data: { title: 'Dodaj Projekt' } },
  { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard], data: { title: 'Projekty' } },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard], data: { title: 'Ustawienia' } },
  { path: 'about', component: AboutComponent, data: { title: 'Dodatkowe info' } },
  { path: 'home', redirectTo: '/', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent, data: { title: 'Strona nie znaleziona' } }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthService,
    AuthGuard,
    { provide: UrlSerializer, useClass: LowerCaseUrlSerializer }]
})
export class AppRoutingModule { }
