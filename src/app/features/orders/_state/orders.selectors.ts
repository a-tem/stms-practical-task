import { IOrdersState } from "@models/order.model";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ordersFeatureKey } from "./orders.reducer";

const ordersFeatureSelector = createFeatureSelector<IOrdersState>(ordersFeatureKey);

export const selectOrdersList = createSelector(ordersFeatureSelector, (state: IOrdersState) => state.ordersList);

export const selectSideEffectsStatus = createSelector(ordersFeatureSelector, (state: IOrdersState) => ({
    loading: state.loading,
    loaded: state.loaded,
    errorMessage: state.errorMessage
  })
);
