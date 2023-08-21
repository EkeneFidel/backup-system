import { Router } from "express";

interface RouterInterface {
  routes(): void;
}

abstract class BaseRouter implements RouterInterface {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  abstract routes(): void;
}

export default BaseRouter;
