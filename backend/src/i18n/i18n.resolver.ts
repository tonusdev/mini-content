import { I18nResolver } from 'nestjs-i18n-telegraf';
import { Injectable, ExecutionContext } from '@nestjs/common';
import { TelegrafExecutionContext } from 'nestjs-telegraf';


@Injectable()
export class TelegrafResolver implements I18nResolver {
  resolve(context: ExecutionContext) {
    const contextType = context.getType() as string;

    if (contextType !== 'telegraf') {
      return;
    }

    const telegrafContext = TelegrafExecutionContext.create(context);
    const ctx =
      telegrafContext.getContext();

    return ctx.from?.language_code;
  }
}
