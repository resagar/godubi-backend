export class GetCategoriesQueryDto {
  public parent_id: number;
  public name: string;
  public active: number;
  public priority: number;
  public limit_categories: number;
  public limit_services: number;
  public highlight: number;
  public skip: number;
}
