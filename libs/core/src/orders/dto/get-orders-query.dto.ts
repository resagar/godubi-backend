export class GetOrdersQueryDto {
  public created: Date | undefined;
  public orderStatus: string | undefined;
  public serviceId: number | undefined;
  public worker: number | undefined;
}
