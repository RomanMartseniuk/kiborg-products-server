const PRODUCTS_URL =
  "https://www.tactic-shop.in.ua/content/export/a4d4669fff1f9405b11b6b4d5b333d0a.xml";

const ORT_PRICES_URL = '';

const DROP_PRICES_URL = '';

export async function fetchProducts() {
   const products = await fetch(PRODUCTS_URL);
   return products;
}

function parseXML(xmlString: string) {}