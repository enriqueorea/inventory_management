export interface NewItem {
  stockId: string;
  stock_number: string;
  model: string;
  serial: string;
  description: string;
  brand: string;
  budget_number: string;
  price: number;
  remarks: string;
}

export interface NewItemWithImage extends NewItem {
  image: string;
}

export interface NewItemForm extends NewItem {
  image: File;
}
