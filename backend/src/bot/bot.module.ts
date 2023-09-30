import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotUpdate } from './bot.update';
import { OpenMiniAppScene } from './scenes/open-mini-app.scene';

@Module({
  providers: [BotService, BotUpdate, OpenMiniAppScene],
})
export class BotModule {}
