export interface Product {
   id: string;
   groupId?: string;
   available?: string;

   url: string;

   price: number;
   optPrice?: number;
   dropPrice?: number;

   currencyId: string;
   categoryId: string;

   pictures?: string[];

   vendorCode?: string;
   vendor?: string;

   name: string;
   description: string;
}
