import { IPatientsState } from "@models/patient.model";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { patientsFeatureKey } from "./patients.reducer";

const patientsFeatureSelector = createFeatureSelector<IPatientsState>(patientsFeatureKey);

export const selectPatientsList = createSelector(patientsFeatureSelector, (state: IPatientsState) => state.patientsList);

export const selectSideEffectsStatus = createSelector(patientsFeatureSelector, (state: IPatientsState) => ({
    loading: state.loading,
    loaded: state.loaded,
    errorMessage: state.errorMessage
  })
);
