import { Action, createReducer, on } from "@ngrx/store";
import { IOrdersState, Order } from "@models/order.model";
import * as OrdersActions from './orders.actions';

export const ordersFeatureKey = 'orders';

export const initialState: IOrdersState = {
  ordersList: [],
  loading: false,
  loaded: false,
  errorMessage: null
}

const reducer = createReducer(
  initialState,
  on(
    OrdersActions.fetchOrders, (state) => ({
      ...state,
      loading: true,
      loaded: false,
      errorMessage: null
    })
  ),
  on(
    OrdersActions.setOrders, (state, { list }) => ({
      ...state,
      loading: false,
      loaded: true,
      ordersList: list,
      errorMessage: null
    })
  ),
  on(
    OrdersActions.fetchOrdersFailed, (state, { error }) => ({
      ...state,
      loading: false,
      loaded: true,
      errorMessage: error
    })
  ),
  // immerOn(UsersActions.setUsers, (state, { usersList }) => { state.usersList = usersList }),
  // immerOn(UsersActions.selectUser, (state, { userId }) => { state.selectedUserId = userId }),
  // immerOn(UsersActions.setSelectedUser, (state, { user }) => {
  //   if (!state.usersList.find(u => u.id === user.id)) {
  //     state.usersList.push(user);
  //   }
  //   state.selectedUserId = user.id
  // })
);

export function ordersReducer(state: IOrdersState | undefined, action: Action) {
  return reducer(state, action);
}
