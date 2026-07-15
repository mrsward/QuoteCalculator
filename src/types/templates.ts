export interface QuoteTemplate {
  id: string;
  title: string;
  description: string;
  route: string;
}

export const QUOTE_TEMPLATES: QuoteTemplate[] = [
  {
    id: "standard",
    title: "Standard Quote",
    description: "A straightforward quote template for everyday use.",
    route: "/quote",
  },
];
