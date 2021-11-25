import { Document } from 'mongoose';

/**
 * @interface Article
 * @description Stores the structure of a article
 */
export interface Article extends Document {
  title: string;
  description: string;
  markdown: string;
  createdAt: Date;
  slug: string;
  sanitizedHtml: string;
}
