import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import {
  RegisterService,
  LoginService,
  UserService,
  ContactService
} from "./core/http";
import { AlertService } from "./core/services";
import { AuthGuardService, NoAuthService } from "./core/authentication";

import { FilterPipe } from './shared/pipes/filter.pipe';

import { AppComponent } from "./app.component";
import { HomeComponent } from "./modules/home/home.component";
import { HeaderComponent } from "./common/header/header.component";
import { FooterComponent } from "./common/footer/footer.component";
import { LoginComponent } from "./modules/login/login.component";
import { RegistrationComponent } from "./modules/registration/registration.component";
import { DashboardComponent } from "./modules/dashboard/dashboard.component";
import { ContactsComponent } from "./modules/contacts/contacts.component";
import { PageNotFoundComponent } from "./modules/page-not-found/page-not-found.component";
import { AlertComponent } from "./common/alert/alert.component";
import { AddContactComponent } from "./modules/contacts/add-contact/add-contact.component";
import { EditContactComponent } from "./modules/contacts/edit-contact/edit-contact.component";
import { EditProfileComponent } from './modules/dashboard/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './modules/dashboard/change-password/change-password.component';
import { StarterComponent } from './modules/contacts/starter/starter.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegistrationComponent,
    DashboardComponent,
    ContactsComponent,
    PageNotFoundComponent,
    AlertComponent,
    AddContactComponent,
    EditContactComponent,
    EditProfileComponent,
    ChangePasswordComponent,
    StarterComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AlertService,
    RegisterService,
    LoginService,
    UserService,
    ContactService,
    AuthGuardService,
    NoAuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
