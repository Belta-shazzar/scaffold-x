import { UserService } from "@services/user.service";

export class AuthService {
  private userService = new UserService();

  public async signUp() {}
  public async signIn() {}
}
