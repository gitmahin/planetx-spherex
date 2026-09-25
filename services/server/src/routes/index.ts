import { Router } from "express";
import type { IRouter } from "@/blueprints";
import { inject, injectable } from "inversify";

@injectable()
export class ApiRouter implements IRouter {
  private router: Router;

  constructor(
    // @inject(ExampleRouter)
    // private exampleRouter: ExampleRouter,
  ) {
    this.router = Router();
    // this.exampleRouter.createRouters();
  }

  createRouters(): void {
    // this.router.use("/v1/example", this.exampleRouter.getRouters());
  }

  getRouters(): Router {
    return this.router;
  }
}
