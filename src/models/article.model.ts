import { model, Schema, Document } from 'mongoose';
import { Article } from '@interfaces/article.interface';
import slugify from 'slugify';
import createDomPurify from 'dompurify';
import { JSDOM } from 'jsdom';
const marked = require('marked');

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const dompurify = createDomPurify(new JSDOM().window);

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
    default: Date.now,
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
});
const articleModel = model<Article>('User', articleSchema);

articleSchema.pre<Article>('validate', function (next: Function) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  if (this.markdown) {
    // removes malicious code
    this.sanitizedHtml = dompurify.sanitize(marked.parse(this.markdown));
  }
  next();
});

export default articleModel;
