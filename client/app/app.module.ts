import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { from } from 'rxjs';
import { LoginComponent } from './modules/login/login.component';
import { RegistrationComponent } from './modules/registration/registration.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { ContactsComponent } from './modules/contacts/contacts.component';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
import { FeaturesComponent } from './modules/features/features.component';
import { TermsComponent } from './modules/terms/terms.component';

const routes: Routes = [
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'contacts', component: ContactsComponent },
  { path: 'features', component: FeaturesComponent },
  { path: 'terms', component: TermsComponent },
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }
];

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
    TermsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule.forRoot(
      routes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
