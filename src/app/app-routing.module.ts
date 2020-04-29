import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DefaultLayoutComponent } from './Layouts/default-layout/default-layout.component';
import { ModalContentComponent } from './modules/mobile-design/modal-content/modal-content.component';
import { MobileResourcesComponent } from './modules/mobile-design/mobile-resources/mobile-resources.component';
import { MobileFiltersComponent } from './modules/mobile-design/mobile-filters/mobile-filters.component';

const routes: Routes = [
  {
    path: "",
    component: DefaultLayoutComponent
  },
  {
    path: "mobile-modal",
    component: ModalContentComponent
  },
  {
    path: "resources",
    component: MobileResourcesComponent
  },
  {
    path: "mobile-filters",
    component: MobileFiltersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
