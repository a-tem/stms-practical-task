import { createAction, props } from "@ngrx/store";

export const toggleFavorite = createAction(
  '[Favorites] Toggle Favorites',
  props<{ id: string | number }>()
);
