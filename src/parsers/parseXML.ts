import { HoroshopYmlCatalog, OcYmlCatalog } from "../types/YmlCatalog";

const parseString = require('xml2js').parseString;

export function parseXML(xml: string): Promise<HoroshopYmlCatalog | OcYmlCatalog> {
  return new Promise((res, rej) => {
    parseString(xml, { explicitArray: false }, (err: any, result: any) => {
      if (err) return rej(err);

      res(result.yml_catalog);
    })
  })
}