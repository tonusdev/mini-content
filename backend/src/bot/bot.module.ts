import { BotUpdate } from './bot.update';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

@Module({
  imports: [ConfigModule],
  providers: [BotUpdate],
})
export class BotModule {}
