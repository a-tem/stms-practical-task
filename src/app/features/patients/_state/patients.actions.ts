import { createAction, props } from "@ngrx/store";
import { Order } from "@models/order.model";

export const fetchPatients = createAction(
  '[Patients] Fetch Patients List'
);

export const fetchPatientsFailed = createAction(
  '[Patients] Fetching Patients List Failed',
  props<{ error: string }>()
);

export const setPatients = createAction(
  '[Patients] Set Patients List',
  props<{ list: Order[] }>()
);

export const toggleFavorite = createAction(
  '[Patients] Toggle Favorite',
  props<{ id: string | number }>()
);
