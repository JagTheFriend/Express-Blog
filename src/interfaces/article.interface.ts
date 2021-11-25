/**
 * @interface Article
 * @description Stores the structure of a article
 */
export interface Article {
  title: string;
  description: string;
  markdown: string;
  createdAt: Date;
  slug: string;
  sanitizedHtml: string;
  save?: Function;
}
