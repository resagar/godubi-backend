export class OrderTotals {
  constructor(
    public totalOrders: number,
    public totalOrdersPending: number,
    public totalOrdersDone: number,
    public totalOrdersCancel: number,
    public totalOrdersInProgress: number,
    public totalAmountInOrders: number,
  ) {}
}
