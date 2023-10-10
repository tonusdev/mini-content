import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsString,
  IsOptional,
  validateSync,
} from "class-validator";
import { Transform, plainToInstance } from "class-transformer";
import { Algorithm } from "jsonwebtoken";

export class AppConfig {

  @IsString()
  readonly NODE_ENV: string;

  @IsString()
  readonly APP_ADDRESS: string;

  @IsNumber()
  readonly APP_PORT: number;

  @IsArray()
  @Transform(({ value }) => value.split(","))
  readonly CORS_ALLOWED_HEADERS: string[];

  @IsBoolean()
  readonly CORS_CREDENTIALS: boolean;

  @IsArray()
  @Transform(({ value }) => value.split(","))
  readonly CORS_METHODS: string[];

  @IsString()
  readonly CORS_ORIGIN: string;

  @IsBoolean()
  readonly TELEGRAM_TEST_SERVER: boolean;

  @IsBoolean()
  readonly GRAPHQL_ENABLE_IDE: boolean;

  @IsBoolean()
  readonly GRAPHQL_ENABLE_INTROSPECTION: boolean;

  @IsString()
  readonly MONGODB_URI: string;

  @IsString()
  readonly BOT_TOKEN: string;

  @IsString()
  @IsOptional()
  readonly BOT_WEBHOOK_DOMAIN?: string;

  @IsString()
  @IsOptional()
  readonly BOT_WEBHOOK_PATH?: string;

  @IsString()
  @IsOptional()
  readonly BOT_WEBHOOK_SECRET_TOKEN?: string;

  @IsString()
  readonly DOMAIN: string;

  @IsString()
  readonly JWT_ALGORITHM: Algorithm;

  @IsString()
  readonly JWT_EXPIRES_IN: string;

  @IsString()
  readonly JWT_SECRET: string;

  @IsString()
  readonly BOT_MINIAPP_LINK: string;
}

export function validateAppConfig(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(AppConfig, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
