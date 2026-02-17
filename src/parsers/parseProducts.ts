import { Product } from "../types/Product";
import { HoroshopYmlCatalog } from "../types/YmlCatalog";

// Parser for products in XML from Tactic / Sales
export function parseProducts(yml_catalog: HoroshopYmlCatalog): Product[] {
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

      picture?: string | string[];


      [key: string]: unknown;
   }

   const data = yml_catalog.shop.offers.offer as YmlOffer[];

   return data.map(item => {
      const pictures = Array.isArray(item.picture)
         ? item.picture
         : item.picture
            ? [item.picture]
            : undefined;

      return {
         id: item['$'].id,
         available: item['$'].available,

         url: item.url,

         price: +item.price,

         currencyId: item.currencyId,
         categoryId: item.categoryId,

         pictures,

         vendorCode: item.vendorCode,
         vendor: item.vendor,

         name: item.name,
         description: item.description,
      }
   })
}