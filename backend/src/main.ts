import { ConfigService } from "@nestjs/config";
import { getBotToken } from "nestjs-telegraf";
import { Logger } from "nestjs-pino";
import { NestFactory } from "@nestjs/core";
import { Telegraf } from "telegraf";
import cookieParser from 'cookie-parser';
import { AppConfig } from "./app.config";
import { AppInterceptor } from "./app.interceptor";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const configService = app.get(ConfigService);

  const address = configService.get<AppConfig["APP_ADDRESS"]>("APP_ADDRESS")!;
  const port = configService.get<AppConfig["APP_PORT"]>("APP_PORT")!;

  app.useLogger(app.get(Logger));
  app.use(cookieParser());

  const allowedHeaders = configService.get<AppConfig["CORS_ALLOWED_HEADERS"]>(
    "CORS_ALLOWED_HEADERS",
  );
  const credentials =
    configService.get<AppConfig["CORS_CREDENTIALS"]>("CORS_CREDENTIALS");
  const methods = configService.get<AppConfig["CORS_METHODS"]>("CORS_METHODS");
  const origin = configService.get<AppConfig["CORS_ORIGIN"]>("CORS_ORIGIN");
  app.enableCors({
    allowedHeaders,
    credentials,
    methods,
    origin,
  });

  app.useGlobalInterceptors(new AppInterceptor());

  const webhookPath =
    configService.get<AppConfig["BOT_WEBHOOK_PATH"]>("BOT_WEBHOOK_PATH");
  if (webhookPath) {
    const bot: Telegraf = app.get(getBotToken());
    app.use(bot.webhookCallback(webhookPath));
  }

  await app.listen(port, address);
}
bootstrap();
