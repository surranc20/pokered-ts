import { autoDetectRenderer } from "pixi.js";
import { Constants } from "./enums/constants";
import GameTicker from "./utils/gameTicker";
import GameManager from "./utils/gameManager";
import { debouncedResize } from "./utils/miscUtils";

// Setup Pixi
const scale = 1;

const renderer = autoDetectRenderer({
  width: Constants.RESOLUTION_X,
  height: Constants.RESOLUTION_Y,
});

renderer.resize(Constants.RESOLUTION_X * scale, Constants.RESOLUTION_Y * scale);
document.body.appendChild(renderer.view);
window.onresize = debouncedResize;

// Create Game Manager and Game Ticker
const gameManager = new GameManager();
const gameTicker = new GameTicker(
  60,
  () => renderer.render(gameManager.container),
  () => gameManager.update()
);

gameManager.initialLoad(() => gameTicker.startTicking());
