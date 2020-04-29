import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ToastrModule } from "ngx-toastr";

// Firebase Services
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireAuthModule } from "@angular/fire/auth";

// Search Pipes
import { SearchPipe } from "./Services/Search/search.pipe";

// views
import { DesktopDesignComponent } from './modules/desktop-design/desktop-design.component';
import { MobileDesignComponent } from './modules/mobile-design/mobile-design.component';
import { LoaderComponent } from './Shared/loader/loader.component';
import { DefaultLayoutComponent } from './Layouts/default-layout/default-layout.component';
import { HeaderComponent } from './modules/desktop-design/header/header.component';
import { BannerComponent } from './modules/desktop-design/banner/banner.component';
import { OrganizationsComponent } from './modules/desktop-design/organizations/organizations.component';
import { ResourcesComponent } from './modules/desktop-design/resources/resources.component';
import { MobileHeaderComponent } from './modules/mobile-design/mobile-header/mobile-header.component';
import { MobileBannerComponent } from './modules/mobile-design/mobile-banner/mobile-banner.component';
import { MobileOrganizationsComponent } from './modules/mobile-design/mobile-organizations/mobile-organizations.component';
import { MobileResourcesComponent } from './modules/mobile-design/mobile-resources/mobile-resources.component';
import { ModalContentComponent } from './modules/mobile-design/modal-content/modal-content.component';
import { FooterComponent } from './modules/desktop-design/footer/footer.component';
import { MobileFooterComponent } from './modules/mobile-design/mobile-footer/mobile-footer.component';
import { MobileFiltersComponent } from './modules/mobile-design/mobile-filters/mobile-filters.component';

const config = {
  apiKey: "AIzaSyBo8SwbSKXpZ4ezNOZcp-T4gIsxrxsIxMY",
  authDomain: "covidreliefpakistan-30e89.firebaseapp.com",
  databaseURL: "https://covidreliefpakistan-30e89.firebaseio.com",
  projectId: "covidreliefpakistan-30e89",
  storageBucket: "covidreliefpakistan-30e89.appspot.com",
  messagingSenderId: "1037752441676",
  appId: "1:1037752441676:web:a5e8c2990fac8e2e214de9",
  measurementId: "G-BZKLSDKQXM"
};
@NgModule({
  declarations: [
    AppComponent,
    DesktopDesignComponent,
    MobileDesignComponent,
    LoaderComponent,
    SearchPipe,
    DesktopDesignComponent,
    MobileDesignComponent,
    DefaultLayoutComponent,
    HeaderComponent,
    BannerComponent,
    OrganizationsComponent,
    ResourcesComponent,
    MobileHeaderComponent,
    MobileBannerComponent,
    MobileOrganizationsComponent,
    MobileResourcesComponent,
    ModalContentComponent,
    FooterComponent,
    MobileFooterComponent,
    MobileFiltersComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(config, "COVID-Relief-Pakistan"),
    AppRoutingModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
