import { Request, Response } from 'express';
import Article from '@models/article.model';
import { Article as ArticleSchema } from '@interfaces/article.interface';

class IndexController {
  public index = async (req: Request, res: Response) => {
    const articles: ArticleSchema[] = await Article.find().sort({
      createdAt: 'desc',
    });
    res
      // .set(
      //   'Content-Security-Policy',
      //   "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'",
      // )
      .render('articles/index', { articles: articles });
  };
}

export default IndexController;
