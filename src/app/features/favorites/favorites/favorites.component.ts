import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TFavoritesItem } from '@models/favorite.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectFavoriteItemsList } from '../_state/favorites.selectors';
import * as FavoritesActions from '../_state/favorites.actions';


import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';
import { Order } from '@models/order.model';
import { Patient } from '@models/patient.model';

@Component({
  selector: 'st-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  favoriteItemsList$: Observable<TFavoritesItem[]>

  constructor(private store: Store) {}

  ngOnInit() {
    this.favoriteItemsList$ = this.store.select(selectFavoriteItemsList)
  }

  onRemoveItemFromFavoriteClick(item: TFavoritesItem) {
    const key = (item as Order)?.identifier ? 'identifier' : 'code';

    this.store.dispatch(FavoritesActions.toggleFavorite({ id: item[key] }))
  }

  itemIsOrder(item: TFavoritesItem): item is Order {
    return (item as Order).identifier !== undefined;
  }
}
