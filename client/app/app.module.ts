import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import {
  RegisterService,
  LoginService,
  UserService,
  ContactService
} from "./core/http";
import { AlertService } from "./core/services";
import { AuthGuardService } from "./core/authentication";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./modules/home/home.component";
import { HeaderComponent } from "./common/header/header.component";
import { FooterComponent } from "./common/footer/footer.component";
import { LoginComponent } from "./modules/login/login.component";
import { RegistrationComponent } from "./modules/registration/registration.component";
import { DashboardComponent } from "./modules/dashboard/dashboard.component";
import { ContactsComponent } from "./modules/contacts/contacts.component";
import { PageNotFoundComponent } from "./modules/page-not-found/page-not-found.component";
import { FeaturesComponent } from "./modules/features/features.component";
import { TermsComponent } from "./modules/terms/terms.component";
import { AlertComponent } from "./common/alert/alert.component";
import { LogoutComponent } from "./modules/logout/logout.component";
import { ContactDetailsComponent } from "./modules/contacts/contact-details/contact-details.component";
import { AddContactComponent } from "./modules/contacts/add-contact/add-contact.component";
import { EditContactComponent } from "./modules/contacts/edit-contact/edit-contact.component";

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
    FeaturesComponent,
    TermsComponent,
    AlertComponent,
    LogoutComponent,
    ContactDetailsComponent,
    AddContactComponent,
    EditContactComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    AlertService,
    RegisterService,
    LoginService,
    UserService,
    ContactService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
