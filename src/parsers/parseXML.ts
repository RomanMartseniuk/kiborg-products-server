import { HoroshopYmlCatalog, OcYmlCatalog } from "../types/YmlCatalog";

const parseString = require('xml2js').parseString;

export interface DescriptionEntry {
  vendorCode: string;
  description: string;
}

export function extractDescriptions(xml: string): DescriptionEntry[] {
  const descriptions: DescriptionEntry[] = [];

  const offerRegex = /<offer\b([\s\S]*?)<\/offer>/gi;
  let match: RegExpExecArray | null;

  while ((match = offerRegex.exec(xml)) !== null) {
    const offerBody = match[1];

    const vendorCodeMatch = /<vendorCode>([\s\S]*?)<\/vendorCode>/i.exec(offerBody);
    const descriptionMatch = /<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/i.exec(offerBody);

    if (vendorCodeMatch && descriptionMatch) {
      descriptions.push({
        vendorCode: vendorCodeMatch[1].trim(),
        description: descriptionMatch[1].trim(),
      });
    }
  }

  return descriptions;
}


export function parseXML(xml: string): Promise<{ yml_catalog: HoroshopYmlCatalog | OcYmlCatalog, descriptions: DescriptionEntry[] }> {
  const descriptions = extractDescriptions(xml);

  const sanitizedXml = xml
    .replace(
      /&(?!amp;|lt;|gt;|quot;|apos;|#[0-9]+;)/g,
      '&amp;'
    )
    .replace(
      /<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/gi,
      '<description></description>'
    );
  
  return new Promise((res, rej) => {
    parseString(sanitizedXml, { explicitArray: false }, (err: any, result: any) => {
      if (err) return rej(err);

      res({yml_catalog: result.yml_catalog, descriptions});
    })
  })
}