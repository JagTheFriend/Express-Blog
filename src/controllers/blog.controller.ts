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
}

export default BlogController;
