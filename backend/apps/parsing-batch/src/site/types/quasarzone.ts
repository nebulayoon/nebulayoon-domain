export enum ProductStatus {
  Etc = 999,
  End = 0,
  InProgress = 1,
  Popular = 2,
}

export enum MonetaryUnit {
  ETC = 999,
  KRW = 0,
  USD = 1,
}

export enum Category {}

export interface IProductData {
  stateNumber: number;
  title: string;
  category: string;
  monetaryUnit: number;
  price: number;
  date: string;
  writer: string;
  views: number;
  link: string;
}
