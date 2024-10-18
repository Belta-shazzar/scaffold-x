import express from "express";
import { Routes } from "@/interfaces/routes.interface";
import config from "@/config";
import morgan from "morgan";
import { logger, stream } from "@utils/logger";

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
      logger.info(`======= ENV: ${this.env} ========`);
      logger.info(`🚀 App listening on the port ${this.port}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddleware() {
    this.app.use(morgan("common", { stream }));
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }
}
