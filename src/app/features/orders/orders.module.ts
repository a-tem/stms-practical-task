import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "../../shared/shared.module";

import { OrdersComponent } from "./orders/orders.component";
import { OrdersRoutingModule } from "./orders-routing.module";
import { OrdersService } from "./services/orders.service";
import { EffectsModule } from "@ngrx/effects";

import { OrdersEffects } from './_state/orders.effects';

@NgModule({
  declarations: [OrdersComponent],
  imports: [
    CommonModule,
    SharedModule,
    OrdersRoutingModule,
    EffectsModule.forFeature([OrdersEffects])],
  providers: [OrdersService]
})
export class OrdersModule {}
