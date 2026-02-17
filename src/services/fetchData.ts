import { parseXML } from "../parsers/parseXML";
import { parseProducts } from "../parsers/parseProducts";
import { parseCategories } from "../parsers/parseCategories";
import { parseUrls } from "../parsers/parseUrls";
import { HoroshopYmlCatalog, OcYmlCatalog } from "../types/YmlCatalog";


const productsYmlFile = "https://tactic-shop.in.ua/content/export/9e361824cf437875c1d127d922749d85.xml";

const optYmlFile =
  "https://kiborg.salesdrive.me/export/yml/export.yml?publicKey=kMkMQtPoiHXLUiVC1ywksAJsBS_shaRrMpzxfXI-vBhV-1snCToX0P0GOtryZgAUcZ2Yx1I";

const dropYmlFile =
  "https://kiborg.salesdrive.me/export/yml/export.yml?publicKey=h8cPQVcAs6jlGCoOYEKgyjCxZ2pHk1f5C5NHWssLfTLf__wnp9MuT_WgKW-b3";

const rrpYmlFile =
  "https://kiborg.salesdrive.me/export/yml/export.yml?publicKey=JAvWTZJQXYHA15-Adae5O-JRlHOuDA97l1SBWVXpy_Okn3WEsPjQKZmcbiOGYCfWYNC6_M42GBn5";

const urlsKiborgYmlFile = 'https://kiborg.com.ua/price/romaexport.xml';

const urlsMilitexYmlFile = 'https://militex.in.ua/price/roma_export_militex.xml';

async function getPrices(url: string) {
  const res = await fetch(url);
  const xml = await res.text();

  const data = await parseXML(xml);

  const products = parseProducts(data as HoroshopYmlCatalog);

  const prices = products.map((product) => ({
    vendorCode: product.vendorCode,
    price: product.price,
  }));

  return prices;
}

async function getUrls(url: string) {
  const res = await fetch(url);
  const xml = await res.text();

  const data = await parseXML(xml);
  const urls = parseUrls(data as OcYmlCatalog);

  return urls;
}

async function getMilitexUrls() {
  const res = await fetch(urlsMilitexYmlFile);
  const xml = await res.text();

  const data = await parseXML(xml) as HoroshopYmlCatalog;
  const products = parseProducts(data);

  return products.map(item => ({vendorCode: item.vendorCode, url:item.url}))
}

export async function fetchData() {
  const res = await fetch(productsYmlFile);

  if (!res) return { products: undefined, categories: undefined };
  const xml = await res.text();

  // --- GETTING PRODUCTS ---

  // Getting prices
  const optPrices = await getPrices(optYmlFile);
  const dropPrices = await getPrices(dropYmlFile);
  const rrpPrices = await getPrices(rrpYmlFile);

  //Getting urls
  const kiborgUrls = await getUrls(urlsKiborgYmlFile);

  const militexUrls = await getMilitexUrls();

  // Getting products data
  const data = await parseXML(xml);
  let products = parseProducts(data as HoroshopYmlCatalog);

  // Putting all needed data into products
  products = products.map((product) => {
    const optPriceObj = optPrices.find((p) => p.vendorCode === product.vendorCode);
    const dropPriceObj = dropPrices.find((p) => p.vendorCode === product.vendorCode);
    const rrpPriceObj = rrpPrices.find((p) => p.vendorCode === product.vendorCode);

    const url = kiborgUrls.find((p: any) => p.vendorCode === product.vendorCode);
    const urlMilitex = militexUrls.find((p: any) => p.vendorCode === product.vendorCode);

    return {
      ...product,
      price: rrpPriceObj ? rrpPriceObj.price : product.price,
      optPrice: optPriceObj ? optPriceObj.price : undefined,
      dropPrice: dropPriceObj ? dropPriceObj.price : undefined,

      url: url ? url.url : undefined,
      urlMilitex: urlMilitex ? urlMilitex?.url : undefined
    };
  });

  // Filtering products by including drop price
  const resProducts = products.filter(
    (product) =>
      product.dropPrice !== undefined
    //   && product.available === "true",
  );

  // --- GETTING CATEGORIES ---

  const categories = parseCategories(data as HoroshopYmlCatalog);

  return { products: resProducts, categories: categories };
}
