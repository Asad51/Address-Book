import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { RegistrationComponent } from './modules/registration/registration.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { ContactsComponent } from './modules/contacts/contacts.component';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
import { FeaturesComponent } from './modules/features/features.component';
import { TermsComponent } from './modules/terms/terms.component';
import { LogoutComponent } from './modules/logout/logout.component';
import { ContactDetailsComponent } from './modules/contacts/contact-details/contact-details.component';
import { AddContactComponent } from './modules/contacts/add-contact/add-contact.component';
import { EditContactComponent } from './modules/contacts/edit-contact/edit-contact.component';

import { AuthGuardService } from './core/authentication';

const routes: Routes = [
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'contacts', children:[
    { path: 'add', component: AddContactComponent },
    { path: ':id', children: [
      { path: 'edit', component: EditContactComponent },
      { path: '', component: ContactDetailsComponent, pathMatch: 'full' }
    ]},
    { path: '', component: ContactsComponent, pathMatch: 'full' }
  ] },
  { path: 'features', component: FeaturesComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
