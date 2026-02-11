import type { Product } from "../types/Product";

export function parseProducts(xml: string): Product[] {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xml, "text/xml");

  // проверка на ошибку парсинга
  if (xmlDoc.querySelector("parsererror")) {
    throw new Error("XML parse error");
  }

  const offers = Array.from(xmlDoc.querySelectorAll("offer"));

  return offers.map((offer): Product => {
    const text = (selector: string) =>
      offer.querySelector(selector)?.textContent?.trim() || "";

    const pictures = Array.from(offer.querySelectorAll("picture")).map(
      (pic) => pic.textContent?.trim() || "",
    );

    return {
      id: offer.getAttribute("id") || "",
      groupId: offer.getAttribute("group_id") || undefined,
      available: offer.getAttribute("available") || undefined,

      url: text("url"),
      price: Number(text("price")),
      currencyId: text("currencyId"),
      categoryId: text("categoryId"),

      pictures,

      vendorCode: text("vendorCode") || undefined,
      vendor: text("vendor") || undefined,

      name: text("name"),
      description: text("description"),
    };
  });
}
