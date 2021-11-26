import { NextFunction, Request, Response } from 'express';
import Article from '@models/article.model';
import { Article as ArticleSchema } from '@interfaces/article.interface';

import { saveArticle as saveArticleToDb } from '@utils/util';

// temporary
// import { Model, Document } from 'mongoose';
// declare const Article: Model<Document>;

class ArticleController {
  public newArticle = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.render('articles/new', { article: new Article() });
    } catch (error) {
      next(error);
    }
  };

  public slug = async (req: Request, res: Response) => {
    const article = await Article.findOne({ slug: req.params.slug });
    // check whether the article exists
    if (article == null) return res.redirect('/');
    res.render('articles/show', { article: article });
  };

  public editArticle = async (req: Request, res: Response) => {
    const article = await Article.findById(req.params.id);
    res.render('articles/edit', { article: article });
  };

  public saveArticle = async (req: Request & { article?: ArticleSchema }, res: Response) => {
    req.article = await Article.findById(req.params.id);
    await saveArticleToDb('edit', req, res);
  };

  public createNewArticle = async (req: Request & { article?: ArticleSchema }, res: Response) => {
    req.article = new Article();
    await saveArticleToDb('new', req, res);
  };

  public deleteArticle = async (req: Request, res: Response) => {
    await Article.findByIdAndDelete(req.params.id);
    res.redirect('/');
  };
}

export default ArticleController;
