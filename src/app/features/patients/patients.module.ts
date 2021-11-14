import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "../../shared/shared.module";

import { PatientsRoutingModule } from "./patients-routing.module";
import { PatientsComponent } from "./patients/patients.component";
import { PatientsService } from "./services/patients.service";
import { EffectsModule } from "@ngrx/effects";
import { PatientsEffects } from './_state/patients.effects';

@NgModule({
  declarations: [PatientsComponent],
  imports: [
    CommonModule,
    SharedModule,
    PatientsRoutingModule,
    EffectsModule.forFeature([PatientsEffects])
  ],
  providers: [PatientsService]
})
export class PatientsModule {}
