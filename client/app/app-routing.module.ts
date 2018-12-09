import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./modules/home/home.component";
import { LoginComponent } from "./modules/login/login.component";
import { RegistrationComponent } from "./modules/registration/registration.component";
import { DashboardComponent } from "./modules/dashboard/dashboard.component";
import { ContactsComponent } from "./modules/contacts/contacts.component";
import { PageNotFoundComponent } from "./modules/page-not-found/page-not-found.component";
import { FeaturesComponent } from "./modules/features/features.component";
import { TermsComponent } from "./modules/terms/terms.component";
import { LogoutComponent } from "./modules/logout/logout.component";
import { AddContactComponent } from "./modules/contacts/add-contact/add-contact.component";
import { EditContactComponent } from "./modules/contacts/edit-contact/edit-contact.component";
import { StarterComponent } from './modules/contacts/starter/starter.component';

import { AuthGuardService, NoAuthService } from "./core/authentication";
import { EditProfileComponent } from "./modules/dashboard/edit-profile/edit-profile.component";
import { ChangePasswordComponent } from "./modules/dashboard/change-password/change-password.component";

const routes: Routes = [
  { path: "register", component: RegistrationComponent },
  { path: "login", component: LoginComponent },
  {
    path: "dashboard",
    children: [
      { path: "edit", component: EditProfileComponent, canActivate: [AuthGuardService] },
      { path: "change-password", component: ChangePasswordComponent, canActivate: [AuthGuardService] },
      { path: '', component: DashboardComponent, pathMatch: 'full', canActivate: [AuthGuardService]}
    ]
  },
  {
    path: "contacts", component: ContactsComponent, canActivate: [AuthGuardService],
    children: [
      { path: '', component: StarterComponent },
      { path: "add", component: AddContactComponent },
      { path: "edit", component: EditContactComponent }
    ]
  },
  { path: "features", component: FeaturesComponent },
  { path: "terms", component: TermsComponent },
  { path: "logout", component: LogoutComponent },
  { path: "", component: HomeComponent, pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
