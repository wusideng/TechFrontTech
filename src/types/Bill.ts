import { Order } from "./Order";
import { Order_Product } from "./Product";

export type Bill = {
  bill_id?: number;
  amount: string | number;
  tech_income: string | number;
  travel_cost: string | number;
  openid: string;
  user_nickname: string;
  ratio?: number;
  order_id: number;
  work_city: string;
  withdrawed: boolean;
  payment_status?: string;
};
export type BillDetail = [Order, Bill, Order_Product[]];
