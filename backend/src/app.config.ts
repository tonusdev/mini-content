import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsString,
  IsOptional,
  validateSync,
} from "class-validator";
import { Transform, plainToInstance } from "class-transformer";

export const defaultConfig = () => ({
  APP_PORT: "3001",
  APP_ADDRESS: "127.0.0.1",

  CORS_ALLOWED_HEADERS: "Content-Type,Authorization",
  CORS_CREDENTIALS: "true",
  CORS_METHODS: "GET,POST,OPTIONS",
  CORS_ORIGIN: "http://127.0.0.1:3001,http://localhost:3001",

  GRAPHQL_ENABLE_IDE: 'true',
  GRAPHQL_ENABLE_INTROSPECTION: 'true',
});

export class AppConfig {
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
  @IsArray()
  @Transform(({ value }) => value.split(","))
  readonly CORS_ORIGIN: string[];

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
