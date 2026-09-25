import type { Router } from "express";

export interface IRouter {
  createRouters(): void;
  getRouters(): Router;
}
