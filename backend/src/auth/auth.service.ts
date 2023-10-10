import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { JwtService } from "@nestjs/jwt";
import { Model } from "mongoose";
import { AppConfig } from "../app.config";
import { InitData, createWebAppSecret, decodeInitData, verifyTelegramWebAppInitData, } from "./auth.utils";
import { JwtPayload, JwtSubject } from "./strategies/jwt.strategy";
import { User } from "./models/user.model";

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}


  validateMiniAppInitData(raw: string): InitData {
    const token = this.configService.get<AppConfig["BOT_TOKEN"]>("BOT_TOKEN")!;
    const initData = decodeInitData(raw);
    const secretKey = createWebAppSecret(token);

    if (!verifyTelegramWebAppInitData(initData, secretKey)) {
      throw new Error("Invalid init data");
    }

    return initData;
  }

  async createAccessToken(user: JwtPayload["sub"]): Promise<string> {
    const payload: JwtPayload = { sub: user };
    return await this.jwtService.signAsync(payload);
  }

  async getOrCreateUser(user: JwtSubject) {
    return await this.userModel.findOneAndUpdate({_id: user.id}, {
      $set: {
        firstName: user.first_name,
        lastName: user.last_name,
        username: user.username,
        isPremium: user.is_premium,
        languageCode: user.language_code,
        allowsWriteToPm: user.allows_write_to_pm
      }
    }, {
      upsert: true,
    }).lean()
  }
}
