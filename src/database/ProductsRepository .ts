import { db } from './db';
import { Product } from '../types/Product';

function serializePictures(pictures?: string[]) {
   return pictures ? JSON.stringify(pictures) : null;
}

function deserializePictures(value: string | null): string[] | undefined {
   return value ? JSON.parse(value) : undefined;
}

export const ProductRepository = {
   // 1️⃣ Отримати кількість продуктів
   count(): number {
      const row = db.prepare(`SELECT COUNT(*) as cnt FROM products`).get() as any;
      return row.cnt;
   },

   // 2️⃣ Отримати один продукт за id
   getById(id: string): Product | undefined {
      const row = db.prepare(`SELECT * FROM products WHERE id = ?`).get(id) as any;
      if (!row) return undefined;

      return {
         ...row,
         pictures: deserializePictures(row.pictures),
      };
   },

   // 3️⃣ Отримати всі продукти за категорією
   getByCategory(categoryId: number): Product[] {
      const rows = db.prepare(`SELECT * FROM products WHERE categoryId = ?`).all(categoryId) as any[];
      return rows.map(row => ({
         ...row,
         pictures: deserializePictures(row.pictures),
      }));
   },

   // 4️⃣ Записати один продукт
   insert(product: Product): void {
      const stmt = db.prepare(`
      INSERT OR REPLACE INTO products (
        id, groupId, available,
        url,
        price, optPrice, dropPrice,
        currencyId, categoryId,
        pictures,
        vendorCode, vendor,
        name, description
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

      stmt.run(
         product.id,
         product.groupId ?? null,
         product.available ?? null,
         product.url,
         product.price,
         product.optPrice ?? null,
         product.dropPrice ?? null,
         product.currencyId,
         Number(product.categoryId),
         serializePictures(product.pictures),
         product.vendorCode ?? null,
         product.vendor ?? null,
         product.name,
         product.description
      );
   },

   // 5️⃣ Масова вставка продуктів
   insertMany(products: Product[]): void {
      const insert = db.prepare(`
      INSERT OR REPLACE INTO products (
        id, groupId, available,
        url,
        price, optPrice, dropPrice,
        currencyId, categoryId,
        pictures,
        vendorCode, vendor,
        name, description
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

      const insertMany = db.transaction((items: Product[]) => {
         for (const p of items) {
            insert.run(
               p.id,
               p.groupId ?? null,
               p.available ?? null,
               p.url,
               p.price,
               p.optPrice ?? null,
               p.dropPrice ?? null,
               p.currencyId,
               Number(p.categoryId),
               serializePictures(p.pictures),
               p.vendorCode ?? null,
               p.vendor ?? null,
               p.name,
               p.description
            );
         }
      });

      insertMany(products);
   }
};
