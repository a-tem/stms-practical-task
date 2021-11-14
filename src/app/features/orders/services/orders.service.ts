import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Order, IOrderResponse } from "@models/order.model";
import { ORDERS_URL } from "app/shared/const/api.const";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class OrdersService {
  constructor(private httpService: HttpClient) {

  }
  fetchOrdersList(): Observable<Order[]> {
    return <Observable<Order[]>>this.httpService.get(ORDERS_URL)
      .pipe(
        map((resp: IOrderResponse) => resp.order)
      );
  }
}
