import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./modules/home/home.component";
import { LoginComponent } from "./modules/login/login.component";
import { RegistrationComponent } from "./modules/registration/registration.component";
import { DashboardComponent } from "./modules/dashboard/dashboard.component";
import { ContactsComponent } from "./modules/contacts/contacts.component";
import { PageNotFoundComponent } from "./modules/page-not-found/page-not-found.component";
import { AddContactComponent } from "./modules/contacts/add-contact/add-contact.component";
import { EditContactComponent } from "./modules/contacts/edit-contact/edit-contact.component";
import { StarterComponent } from "./modules/contacts/starter/starter.component";
import { EditProfileComponent } from "./modules/dashboard/edit-profile/edit-profile.component";
import { ChangePasswordComponent } from "./modules/dashboard/change-password/change-password.component";

import { AuthGuardService, NoAuthService } from "./core/authentication";

const routes: Routes = [
  {
    path: "register",
    component: RegistrationComponent,
    canActivate: [NoAuthService]
  },
  { path: "login", component: LoginComponent, canActivate: [NoAuthService] },
  {
    path: "dashboard",
    canActivate: [AuthGuardService],
    canActivateChild: [AuthGuardService],
    children: [
      { path: "edit", component: EditProfileComponent },
      { path: "change-password", component: ChangePasswordComponent },
      { path: "", component: DashboardComponent }
    ]
  },
  {
    path: "contacts",
    component: ContactsComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: "", component: StarterComponent },
      { path: "add", component: AddContactComponent },
      { path: ":id", component: EditContactComponent }
    ]
  },
  { path: "", component: HomeComponent, pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
