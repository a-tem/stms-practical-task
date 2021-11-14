import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { PatientsService } from "../services/patients.service";

import * as PatientsActions from './patients.actions';
import * as FavoritesActions from '../../favorites/_state/favorites.actions';

@Injectable()
export class PatientsEffects {
  fetchPatientsList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PatientsActions.fetchPatients),
      switchMap(() => this.patientsService.fetchPatientsList().pipe(
        map(list => PatientsActions.setPatients({ list }))
      )),
      catchError((error) => of(PatientsActions.fetchPatientsFailed({ error: error.message })))
    )
  );

  addToFavorite$ = createEffect(() => 
    this.actions$.pipe(
      ofType(PatientsActions.toggleFavorite),
      map(({ id }) => FavoritesActions.toggleFavorite({ id }))
    )
  )

  constructor(
    private actions$: Actions,
    private patientsService: PatientsService,
  ) {
  }
}
