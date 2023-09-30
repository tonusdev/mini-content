import { Context } from "telegraf";
import { Injectable } from "@nestjs/common";
import { Start, Update } from "nestjs-telegraf";
import { OpenMiniAppScene } from "./scenes/open-mini-app.scene";

@Update()
@Injectable()
export class BotUpdate {
  constructor() {}

  @Start()
  async startCommand(ctx: Context) {
    await OpenMiniAppScene.enter(ctx);
  }
}
