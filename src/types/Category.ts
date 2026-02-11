export interface ProductCategory {
   id: number,
   name: string
}

export interface ViewCategory {
   id: number,
   name: string,
   slug: string,
   productCategoriesList: number[]
}