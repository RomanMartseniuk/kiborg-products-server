import fs from 'fs'
import { ViewCategory } from '../types/Category';

export async function getViewCategories(): Promise<ViewCategory[]> {
   return new Promise((resolve, reject) => {
      fs.readFile('./src/store/view_categories.json', 'utf-8', (err, data) => {
         if (err) return reject(err);
         resolve(JSON.parse(data));
      });
   });
}