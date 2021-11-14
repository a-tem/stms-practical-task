import { createAction, props } from "@ngrx/store";
import { Order } from "@models/order.model";

export const fetchOrders = createAction(
  '[Orders] Fetch Orders List'
);

export const fetchOrdersFailed = createAction(
  '[Orders] Fetching Orders List Failed',
  props<{ error: string }>()
);

export const setOrders = createAction(
  '[Orders] Set Orders List',
  props<{ list: Order[] }>()
);

export const toggleFavorite = createAction(
  '[Orders] Toggle Favorite',
  props<{ id: string }>()
);
