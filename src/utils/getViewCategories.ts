import fs from 'fs'

export async function getViewCategories() {
   const categories = await new Promise((resolve, reject) => { fs.readFile('./src/store/view_categories.json', (err, data) => {
      if (err) reject(err);
      resolve(data);
   }) })

   return categories;
}