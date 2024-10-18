import express from "express";
import { Routes } from "@/interfaces/routes.interface";
import config from "@/config";

export class App {
  public app: express.Application;
  public env: string;
  public port: number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = config.app.node_env;
    this.port = config.app.port;

    this.initializeMiddleware();
    this.initializeRoutes(routes);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log("Locked in for now!");
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddleware() {}

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }
}
