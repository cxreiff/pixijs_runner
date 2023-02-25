export * from "@pixi/constants";
export * from "@pixi/math";
export * from "@pixi/runner";
export * from "@pixi/settings";
export * from "@pixi/ticker";
export * from "@pixi/display";
export * from "@pixi/core";
export * from "@pixi/loaders";
export * from "@pixi/sprite";
export * from "@pixi/app";
export * from "@pixi/graphics";
export * from "@pixi/sprite-animated";
export * from "@pixi/spritesheet";
export * from "@pixi/text";
export * from "@pixi/interaction";
export * as utils from "@pixi/utils";

export { Filter } from "@pixi/core";

/* eslint-disable no-duplicate-imports */

// Renderer plugin
import { Renderer } from "@pixi/core";
import { BatchRenderer } from "@pixi/core";
Renderer.registerPlugin("batch", BatchRenderer);
import { InteractionManager } from "@pixi/interaction";
Renderer.registerPlugin("interaction", InteractionManager);

// Application plugin
import { Application } from "@pixi/app";
import { AppLoaderPlugin } from "@pixi/loaders";
Application.registerPlugin(AppLoaderPlugin);
import { TickerPlugin } from "@pixi/ticker";
Application.registerPlugin(TickerPlugin);

// Loader plugin
import { Loader } from "@pixi/loaders";
import { SpritesheetLoader } from "@pixi/spritesheet";
Loader.registerPlugin(SpritesheetLoader);

export * from "@pixi/sound";
