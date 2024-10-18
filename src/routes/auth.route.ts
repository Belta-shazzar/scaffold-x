import { Routes } from "@/interfaces/routes.interface";
import { Router } from "express";

export class AuthRoute implements Routes {
  path: string = "/auth";
  router: Router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/sign-up`);
    this.router.post(`${this.path}/sign-in`);
  }
}
