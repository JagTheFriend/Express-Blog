import { Router } from 'express';
import ArticleController from '@controllers/article.controller';
import { Routes } from '@interfaces/routes.interface';
import { ArticleDto } from '@dtos/article.dto';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';

class ArticleRoute implements Routes {
  public path = '/articles';
  public router = Router();
  public articleController = new ArticleController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/login`, this.articleController.login);
    this.router.get(`${this.path}/signup`, this.articleController.signup);
    this.router.get(`${this.path}/logout`, authMiddleware, this.articleController.logout);

    this.router.get(`${this.path}`, authMiddleware, this.articleController.newArticle);

    this.router.get(`${this.path}/:slug`, this.articleController.slug);
    this.router.delete(`${this.path}/:id`, authMiddleware, this.articleController.deleteArticle);
    this.router.get(`${this.path}/edit/:id`, authMiddleware, this.articleController.editArticle);

    this.router.put(`${this.path}/save/:id`, authMiddleware, validationMiddleware(ArticleDto, 'body'), this.articleController.saveArticle);
    this.router.post(`${this.path}/`, authMiddleware, validationMiddleware(ArticleDto, 'body'), this.articleController.createNewArticle);
  }
}

export default ArticleRoute;
