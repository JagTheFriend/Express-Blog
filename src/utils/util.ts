import { Request, Response } from 'express';
import { Article } from '@interfaces/article.interface';
import { marked } from 'marked';
import slugify from 'slugify';
import sanitizeHtml from 'sanitize-html';

// import createPurify from 'dompurify';

// const purify = createPurify();

/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

/**
 * @method saveArticle
 * @param {String} path
 * @description Saves the article in the database.
 */
export const saveArticle = async (path: string, req: Request & { article?: Article }, res: Response) => {
  const article = req.article;
  article.title = req.body.title;
  article.description = req.body.description;
  article.markdown = marked.parse(req.body.markdown);
  article.createdAt = req.body.createdAt !== undefined ? req.body.createdAt : Date.now();

  article.slug = slugify(article.title, { lower: true, strict: true });
  // article.sanitizedHtml = purify.sanitize(article.markdown);
  article.sanitizedHtml = sanitizeHtml(article.markdown);

  try {
    const newArticle: Article | void = await article.save();
    console.log(newArticle);
    res.redirect(`/articles/${path}`);
  } catch (error) {
    res.render(`articles/${path}`, { article: article });
  }
};
