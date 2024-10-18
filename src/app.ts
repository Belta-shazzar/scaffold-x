import express from "express";
import { Routes } from "@/interfaces/routes.interface";
import config from "@/config";
import morgan from "morgan";
import cors from "cors";
import { logger, stream } from "@utils/logger";
import { PrismaClient } from "@prisma/client";

export class App {
  private app: express.Application;
  private env: string;
  private port: number;
  private prisma: PrismaClient;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = config.app.node_env;
    this.port = config.app.port;
    this.prisma = new PrismaClient();

    this.initializeMiddleware();
    this.initializeRoutes(routes);
    this.app.use(
      cors({ origin: config.cors.origin, credentials: config.cors.credentials })
    );
  }

  public listen() {
    this.prisma
      .$connect()
      .then(() => {
        logger.info("🟢 Database connection successful");
        this.app.listen(this.port, () => {
          logger.info(`======= ENV: ${this.env} ========`);
          logger.info(`🚀 App listening on the port ${this.port}`);
        });
      })
      .catch((error) => {
        logger.error("An error occurred: %s", error.message, { error });
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
