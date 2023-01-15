import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import * as path from "path";
import {CheckoutComponent} from "./checkout.component";
import {routerModule} from "@angular/core/schematics/migrations/router-link-with-href/util";

const routes: Routes = [
  {path: '', component: CheckoutComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes )
  ],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }
