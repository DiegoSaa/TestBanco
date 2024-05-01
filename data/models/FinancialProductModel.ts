export interface ConstructorFinancialProduct {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: Date | string;
  date_revision: Date | string;
}

export class FinancialProduct {
  public id: string;
  public name: string;
  public description: string;
  public logo: string;
  public date_release: Date | string;
  public date_revision: Date | string;

  constructor({
    id,
    name,
    description,
    logo,
    date_release,
    date_revision,
  }: ConstructorFinancialProduct) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.logo = logo;
    this.date_release = date_release;
    this.date_revision = date_revision;
  }

  static fromJson(json: any): FinancialProduct {
    return new FinancialProduct({
      id: json.id,
      name: json.name,
      description: json.description,
      logo: json.logo,
      date_release: new Date(json.date_release),
      date_revision: new Date(json.date_revision),
    });
  }
}
