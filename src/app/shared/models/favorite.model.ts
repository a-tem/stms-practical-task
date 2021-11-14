import { Order } from "./order.model";
import { Patient } from "./patient.model";

export interface IFavoritesState {
  favoritesIds: Array<string | number>
}

export type TFavoritesItem = Order | Patient;
