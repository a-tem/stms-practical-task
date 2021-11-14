import { IFavoritesState, TFavoritesItem } from "@models/favorite.model";
import { IOrdersState } from "@models/order.model";
import { IPatientsState } from "@models/patient.model";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ordersFeatureKey } from "app/features/orders/_state/orders.reducer";
import { patientsFeatureKey } from "app/features/patients/_state/patients.reducer";
import { favoritesFeatureKey } from "./favorites.reducer";

const favoritesFeatureSelector = createFeatureSelector<IFavoritesState>(favoritesFeatureKey);
const getOrdersState = createFeatureSelector<IOrdersState>(ordersFeatureKey);
const getPatientsState = createFeatureSelector<IPatientsState>(patientsFeatureKey);

export const selectFavoritesIdsList = createSelector(favoritesFeatureSelector, (state: IFavoritesState) => state.favoritesIds);

export const selectFavoriteItemsList = createSelector(
  getOrdersState,
  getPatientsState,
  favoritesFeatureSelector,
  ({ ordersList }, { patientsList }, { favoritesIds }) => {
    const orders = ordersList.filter(order => favoritesIds .includes(order.identifier))
    const patients = patientsList.filter(patient => favoritesIds .includes(patient.code));

    return [...orders, ...patients] as TFavoritesItem[];
  }
)
