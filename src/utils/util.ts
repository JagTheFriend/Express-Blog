import express from 'express';
import { Article } from '@interfaces/article.interface';

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
export const saveArticle = (path: string) => {
  return async (req: express.Request & { article: Article }, res: express.Response) => {
    const article = req.article;
    article.title = req.body.title;
    article.description = req.body.description;
    article.markdown = req.body.markdown;
    article.createdAt = req.body.createdAt;
    try {
      const new_article: Article = await article.save();
      res.redirect(`/articles/${new_article.slug}`);
    } catch (error) {
      res.render(`articles/${path}`, { article: article });
    }
  };
};
