import { NextFunction, Request, Response } from 'express';

class BlogController {
  public index = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send('Blog Route!');
    } catch (error) {
      next(error);
    }
  };
}

export default BlogController;
