import { Router } from 'express';
import BlogController from '@controllers/blog.controller';
import { Routes } from '@interfaces/routes.interface';

class BlogRoute implements Routes {
  public path = '/blog';
  public router = Router();
  public blogController = new BlogController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.blogController.index);
  }
}

export default BlogRoute;
