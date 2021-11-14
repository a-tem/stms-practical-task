import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";

import * as PatientsActions from '../_state/patients.actions';
import * as PatientsSelectors from '../_state/patients.selectors';
import * as FavoritesSelectors from '../../favorites/_state/favorites.selectors';

import { ROUTE_ANIMATIONS_ELEMENTS } from "../../../core/core.module";
import { Patient } from "@models/patient.model";
import { ISideEffect } from "@models/side-effects.model";
import { Observable, of, Subscription } from "rxjs";
import { tap } from "rxjs/operators";

@Component({
  selector: "st-patients",
  templateUrl: "./patients.component.html",
  styleUrls: ["./patients.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientsComponent implements OnInit, OnDestroy {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  patientsList$: Observable<Patient[]> = of([]);
  sideEffects$: Observable<ISideEffect>;
  favoriteIdsList$: Observable<string[]> = of([]);
  favoriteItemsIds = [];
  subs$ = new Subscription();

  constructor(private globalStore: Store) {}

  ngOnInit() {
    this.patientsList$ = this.globalStore
      .select(PatientsSelectors.selectPatientsList);

    this.sideEffects$ = this.globalStore
      .select(PatientsSelectors.selectSideEffectsStatus);

    const favSubs = this.globalStore
      .select(FavoritesSelectors.selectFavoritesIdsList)
      .subscribe(favoriteIdsList => this.favoriteItemsIds = favoriteIdsList);

    this.subs$.add(favSubs);
  }

  onLoadPatientsClick() {
    this.globalStore.dispatch(PatientsActions.fetchPatients());
  }

  onFavoritesToggle(patient: Patient) {
    this.globalStore.dispatch(PatientsActions.toggleFavorite({ id: patient.code }));
  }

  isAddedToFavorite(patient: Patient): boolean {
    return this.favoriteItemsIds.includes(patient.code);
  }

  ngOnDestroy() {
    this.subs$.unsubscribe();
  }
}
