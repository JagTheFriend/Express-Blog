import { model, Schema, SchemaTypes } from 'mongoose';
import { Article } from '@interfaces/article.interface';

const articleSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  markdown: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  sanitizedHtml: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
});

const articleModel = model<Article>('Article', articleSchema);
export default articleModel;
