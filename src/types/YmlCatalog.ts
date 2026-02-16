export interface HoroshopYmlCatalog {
  shop: {
    categories: {
      category: unknown[]; // нам не важно что внутри
    };
    offers: {
      offer: unknown[]; // нам не важно что внутри
    };
  };
}

export interface OcYmlCatalog {
  // categories?: {
  //   category: unknown[]; // нам не важно что внутри
  // };
  offers: {
    offer: unknown[]; // нам не важно что внутри
  };
}
