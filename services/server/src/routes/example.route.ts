import { Router } from "express";
import { asyncHandler } from "@/utils";
import type { IRouter } from "@/blueprints";
import { inject, injectable } from "inversify";

@injectable()
export class ExampleRouter implements IRouter {
  private router: Router;

  constructor(
    // @inject(ExampleController)
    // private exampleController: ExampleController,
  ) {
    this.router = Router();
  }

  createRouters(): void {
    // this.router
    //   .route("/examples")
    //   .post(
    //     asyncHandler(
    //       this.exampleController.createExampleHandler.bind(
    //         this.exampleController
    //       )
    //     )
    //   );
  }

  getRouters(): Router {
    return this.router;
  }
}
