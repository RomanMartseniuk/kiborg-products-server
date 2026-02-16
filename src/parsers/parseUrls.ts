import { OcYmlCatalog } from "../types/YmlCatalog";

export function parseUrls(yml_catalog: OcYmlCatalog) {
   interface YmlOffer {
      "$": {
         url: string,
      },
      model: string
   }

   if (!yml_catalog?.offers?.offer) {
      console.error("Invalid YML structure:", yml_catalog);
      return [];
   }

   const data = yml_catalog.offers.offer as YmlOffer[];

   return data.map((offer) => ({
      url: offer['$']?.url,
      vendorCode: offer?.model
   }));
}