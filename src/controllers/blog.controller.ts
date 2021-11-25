import { NextFunction, Request, Response } from 'express';

// temporary
import { Model, Document } from 'mongoose';
declare const Article: Model<Document>;

class BlogController {
  public index = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.render('articles/new');
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

  public saveArticle = async (req: Request & { article?: {} }, res: Response, next: NextFunction) => {
    req.article = await Article.findById(req.params.id);
    next();
  };

  public newArticle = (req: Request, res: Response, next: NextFunction) => this.saveArticle(req, res, next);
  public deleteArticle = async (req: Request, res: Response) => {
    await Article.findByIdAndDelete(req.params.id);
    res.redirect('/');
  };
}

export default BlogController;
