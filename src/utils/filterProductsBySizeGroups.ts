import { Product } from "../types/Product";

export function filterProductsBySizeGroup(products: Product[]): Product[] {
   const grouped = new Map<string, Product[]>();
   const result: Product[] = [];

   for (const product of products) {
      if (!product.groupId) {
         result.push(product);
         continue;
      }

      if (!grouped.has(product.groupId)) {
         grouped.set(product.groupId, []);
      }

      grouped.get(product.groupId)!.push(product);
   }

   for (const groupProducts of grouped.values()) {
      const hasSizeParam = groupProducts.some(p =>
         p.params?.some(param => param.name === "Розмір")
      );

      if (!hasSizeParam) {
         result.push(...groupProducts);
         continue;
      }

      const firstPrice = groupProducts[0].price;
      const allSamePrice = groupProducts.every(
         p => p.price === firstPrice
      );

      if (allSamePrice) {
         result.push(groupProducts[0]);
      } else {
         result.push(...groupProducts);
      }
   }

   return result;
}