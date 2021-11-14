import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { OrdersService } from "../services/orders.service";

import * as OrdersActions from './orders.actions';
import * as FavoritesActions from '../../favorites/_state/favorites.actions';

@Injectable()
export class OrdersEffects {
  fetchOrdersList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.fetchOrders),
      switchMap(() => this.ordersService.fetchOrdersList().pipe(
        map(list => OrdersActions.setOrders({ list }))
      )),
      catchError((error) => of(OrdersActions.fetchOrdersFailed({ error: error.message })))
    )
  );

  addToFavorite$ = createEffect(() => 
    this.actions$.pipe(
      ofType(OrdersActions.toggleFavorite),
      map(({ id }) => FavoritesActions.toggleFavorite({ id }))
    )
  )

  constructor(
    private actions$: Actions,
    private ordersService: OrdersService,
  ) {
  }
}
