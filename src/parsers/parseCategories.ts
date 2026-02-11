import { ProductCategory } from "../types/Category";
import { YmlCatalog } from "../types/YmlCatalog";

// Parser for categories in XML from Tactic
export function parseCategories(yml_catalog: YmlCatalog): ProductCategory[] {
   interface YmlCategory {
      '_': string,
      '$': {
         id: string,
         parentId: string
      }
   }

   const data = yml_catalog.shop.categories.category as YmlCategory[];

   return data.map(item => {
      return { id: +item['$'].id, name: item['_'] }
   })
}