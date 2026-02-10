const parseString = require('xml2js').parseString;

import { YmlCatalog } from "../types/YmlCatalog";

export function parseXML(xml: string): Promise<YmlCatalog> {
  return new Promise((res, rej) => {
    parseString(xml, { explicitArray: false }, (err: any, result: any) => {
      if (err) return rej(err);

      res(result.yml_catalog);
    })
  })
}

// ! Products --> result.yml_catalog.shop.offers.offer

// ! Categories --> result.yml_catalog.shop.offers.offer