import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";

import * as OrdersActions from '../_state/orders.actions';
import * as OrdersSelectors from '../_state/orders.selectors';
import * as FavoritesSelectors from '../../favorites/_state/favorites.selectors';

import { ROUTE_ANIMATIONS_ELEMENTS } from "../../../core/core.module";
import { Order } from "@models/order.model";
import { Observable, of, Subscription } from "rxjs";
import { ISideEffect } from "@models/side-effects.model";

@Component({
  selector: "st-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersComponent implements OnInit, OnDestroy {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  ordersList$: Observable<Order[]> = of([]);
  sideEffects$: Observable<ISideEffect>;
  favoriteIdsList$: Observable<string[]> = of([]);
  favoriteItemsIds = [];
  subs$ = new Subscription();

  constructor(
    private globalStore: Store
  ) {}

  ngOnInit() {
  
    this.ordersList$ = this.globalStore
      .select(OrdersSelectors.selectOrdersList);

    this.sideEffects$ = this.globalStore
      .select(OrdersSelectors.selectSideEffectsStatus);

    const favSubs = this.globalStore
      .select(FavoritesSelectors.selectFavoritesIdsList)
      .subscribe(favoriteIdsList => this.favoriteItemsIds = favoriteIdsList);

    this.subs$.add(favSubs);
  }

  onLoadOrdersClick() {
    this.globalStore.dispatch(OrdersActions.fetchOrders());
  }

  onFavoritesToggle(order) {
    this.globalStore.dispatch(OrdersActions.toggleFavorite({ id: order.identifier }));
  }

  isAddedToFavorite(order: Order): boolean {
    return this.favoriteItemsIds.includes(order.identifier);
  }

  ngOnDestroy() {
    this.subs$.unsubscribe();
  }

}
