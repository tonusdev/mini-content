import { ConfigService } from "@nestjs/config";
import { Context } from "telegraf";
import { I18nContext } from "nestjs-i18n-telegraf";
import { Injectable } from "@nestjs/common";
import { Start, Update } from "nestjs-telegraf";
import { AppConfig } from "../app.config";

@Update()
@Injectable()
export class BotUpdate {
  constructor(private readonly configService: ConfigService) {}

  @Start()
  async startCommand(ctx: Context & {t: I18nContext['t']}) {
    const message = ctx.t('common.message', {lang: ctx.message?.from.language_code})
    const button = ctx.t('common.button', {lang: ctx.message?.from.language_code})
    await ctx.reply(message, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: button,
              web_app: {
                url: this.configService.get<AppConfig["BOT_MINIAPP_LINK"]>(
                  "BOT_MINIAPP_LINK",
                )!,
              },
            },
          ],
        ],
      },
    });
  }
}
