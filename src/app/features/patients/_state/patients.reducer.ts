import { IPatientsState } from "@models/patient.model";
import { Action, createReducer, on } from "@ngrx/store";
import * as PatientsActions from './patients.actions';

export const patientsFeatureKey = 'patients';

export const initialState: IPatientsState = {
  patientsList: [],
  loading: false,
  loaded: false,
  errorMessage: null
}

const reducer = createReducer(
  initialState,
  on(
    PatientsActions.fetchPatients, (state) => ({
      ...state,
      loading: true,
      loaded: false,
      errorMessage: null
    })
  ),
  on(
    PatientsActions.setPatients, (state, { list }) => ({
      ...state,
      loading: false,
      loaded: true,
      patientsList: list,
      errorMessage: null
    })
  ),
  on(
    PatientsActions.fetchPatientsFailed, (state, { error }) => ({
      ...state,
      loading: false,
      loaded: true,
      errorMessage: error
    })
  )
);

export function patientsReducer(state: IPatientsState | undefined, action: Action) {
  return reducer(state, action);
}
