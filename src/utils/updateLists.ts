import { CategoryRepository } from "../database/CategoriesRepository";
import { ProductRepository } from "../database/ProductsRepository ";
import { fetchData } from "../services/fetchData";

export async function updateLists() {
   console.log('Start Updating DB...');
   const {products, categories} = await fetchData();
   if (!products || !categories ) {
      console.log('FETCH ERROR');
      return 500;
   }

   CategoryRepository.insertMany(categories);

   ProductRepository.insertMany(products);
   console.log('DB successfully updated');
   return 200;
}