import { db } from './db';
import { ProductCategory } from '../types/Category';

export const CategoryRepository = {
   // 1️⃣ Отримати одну категорію за id
   getById(id: number): ProductCategory | undefined {
      const row = db.prepare(`SELECT * FROM categories WHERE id = ?`).get(id) as any;
      return row ? { ...row } : undefined;
   },

   // 2️⃣ Вставити одну категорію
   insert(category: ProductCategory): void {
      const stmt = db.prepare(`
      INSERT OR REPLACE INTO categories (id, name)
      VALUES (?, ?)
    `);

      stmt.run(category.id, category.name);
   },

   // 3️⃣ Вставити багато категорій у транзакції
   insertMany(categories: ProductCategory[]): void {
      const insert = db.prepare(`
      INSERT OR REPLACE INTO categories (id, name)
      VALUES (?, ?)
    `);

      const insertMany = db.transaction((items: ProductCategory[]) => {
         for (const c of items) {
            insert.run(c.id, c.name);
         }
      });

      insertMany(categories);
   },

   // 4️⃣ Кількість категорій
   count(): number {
      const row = db.prepare(`SELECT COUNT(*) as cnt FROM categories`).get() as any;
      return row.cnt;
   }
};
