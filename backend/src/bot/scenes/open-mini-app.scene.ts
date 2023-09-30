import { Scenes } from "telegraf";
import { SceneEnter, Scene } from 'nestjs-telegraf';


@Scene(OpenMiniAppScene.name)
export class OpenMiniAppScene {
  constructor() {}

  static enter(ctx) {
    return ctx.scene.enter(this.name);
  }

  @SceneEnter()
  async enter(ctx: Scenes.SceneContext) {
    await ctx.reply('Hello');
  }
}
