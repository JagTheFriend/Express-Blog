import { Router } from 'express';
import BlogController from '@controllers/blog.controller';
import { Routes } from '@interfaces/routes.interface';
// import authMiddleware from '@middlewares/auth.middleware';
import { saveArticle } from '@utils/util';

class BlogRoute implements Routes {
  public path = '/blog';
  public router = Router();
  public blogController = new BlogController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, /* authMiddleware, */ this.blogController.index);
    this.router.get(`${this.path}/new`, /* authMiddleware, */ this.blogController.index);
    this.router.get(`${this.path}/:slug`, /* authMiddleware, */ this.blogController.slug);
    this.router.get(`${this.path}/edit/:id`, /* authMiddleware, */ this.blogController.editArticle);

    this.router.put(`${this.path}/save/:id`, /* authMiddleware, */ this.blogController.saveArticle, saveArticle('edit'));
    this.router.post(`${this.path}/`, /* authMiddleware, */ this.blogController.newArticle, saveArticle('new'));
    this.router.delete(`${this.path}/:id`, /* authMiddleware, */ this.blogController.deleteArticle);
  }
}

export default BlogRoute;
