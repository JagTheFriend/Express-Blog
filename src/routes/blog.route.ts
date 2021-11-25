import { Router } from 'express';
import ArticleController from '@controllers/article.controller';
import { Routes } from '@interfaces/routes.interface';
// import authMiddleware from '@middlewares/auth.middleware';
import { saveArticle } from '@utils/util';

class ArticleRoute implements Routes {
  public path = '/articles';
  public router = Router();
  public articleController = new ArticleController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, /* authMiddleware, */ this.articleController.index);
    this.router.get(`${this.path}/new`, /* authMiddleware, */ this.articleController.index);
    this.router.get(`${this.path}/:slug`, /* authMiddleware, */ this.articleController.slug);
    this.router.get(`${this.path}/edit/:id`, /* authMiddleware, */ this.articleController.editArticle);

    this.router.put(`${this.path}/save/:id`, /* authMiddleware, */ this.articleController.saveArticle, saveArticle('edit'));
    this.router.post(`${this.path}/`, /* authMiddleware, */ this.articleController.newArticle, saveArticle('new'));
    this.router.delete(`${this.path}/:id`, /* authMiddleware, */ this.articleController.deleteArticle);
  }
}

export default ArticleRoute;
