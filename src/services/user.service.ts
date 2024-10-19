import { SignUpDto } from "@/dto/auth.dto";
import { HttpException } from "@/exceptions/http.exception";
import { PrismaClient, User } from "@prisma/client";
import httpStatus from "http-status";
import prisma from "@/config/prisma";

export class UserService {
  private user = prisma.user;

  public async createUser(signUpDto: SignUpDto): Promise<User> {
    const user = await this.user.create({
      data: signUpDto,
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User> {
    return this.user.findUnique({ where: { email: email } });
  }

  public async findById(userId: string): Promise<User> {
    const user = await this.user.findUnique({ where: { id: userId } });

    if (!user)
      throw new HttpException(httpStatus.NOT_FOUND, "User does not exist");
    return user;
  }

  public stripUserPassword(user: User): Partial<User> {
    const { password, ...stripedUser } = user;

    return stripedUser;
  }
}
