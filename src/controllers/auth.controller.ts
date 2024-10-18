import { AuthService } from "@/services/auth.service";
import { Request, Response, NextFunction } from "express";

export class AuthController {
  private authService = new AuthService();

  public signup = async (req: Request, res: Response, next: NextFunction) => {};
  public signin = async (req: Request, res: Response, next: NextFunction) => {}
}
