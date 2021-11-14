import { Action, createReducer, on } from "@ngrx/store";
import * as FavoritesActions from './favorites.actions';
import { IFavoritesState } from "@models/favorite.model";

export const favoritesFeatureKey = 'favorites';

export const initialState: IFavoritesState = {
  favoritesIds: []
}

const reducer = createReducer(
  initialState,
  on(
    FavoritesActions.toggleFavorite, (state, { id }) => {
      const favoritesList = state.favoritesIds.includes(id)
        ? state.favoritesIds.filter(favItem => favItem !== id)
        : [...state.favoritesIds, id];

      return {
        ...state,
        favoritesIds: favoritesList
      }
    })
);

export function favoritesReducer(state: IFavoritesState | undefined, action: Action) {
  return reducer(state, action);
}
