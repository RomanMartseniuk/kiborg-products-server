import { Product } from "../types/Product";
import { YmlCatalog } from "../types/YmlCatalog";

// Parser for products in XML from Tactic / Sales
export function parseProducts(yml_catalog: YmlCatalog): Product[] {
   interface YmlOffer {
      '$': {
         id: string,
         available: string
      },

      vendorCode: string,
      vendor: string,

      name: string,
      description: string,

      categoryId: string,
      currencyId: string,

      url: string,

      price: string;

      picture: string[],


      [key: string]: unknown;
   }

   const data = yml_catalog.shop.offers.offer as YmlOffer[];

   return data.map(item => {
      return {
         id: item['$'].id,
         available: item['$'].available,

         url: item.url,

         price: +item.price,

         currencyId: item.currencyId,
         categoryId: item.categoryId,

         pictures: item.picture,

         vendorCode: item.vendorCode,
         vendor: item.vendor,

         name: item.name,
         description: item.description,
      }
   })
}