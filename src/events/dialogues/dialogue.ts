import { Loader } from "pixi.js";
import Keyboard from "pixi.js-keyboard";
import EventStack from "../../utils/eventStack";
import DialogueBox from "../../UI/dialogueBox";
import GameEvent from "../gameEvent";
import DialogueJson from "./dialogue.json";

export default class Dialogue extends GameEvent {
  lines: string[] = [];
  leadsToBattle: boolean = false;
  private dialogueBox: DialogueBox | null = null;
  private enterReleased = false;

  constructor(public dialogueId: number, public gender: string) {
    super();

    const dialogueInfo =
      DialogueJson[dialogueId as unknown as keyof typeof DialogueJson];

    this.lines = dialogueInfo.lines;
    this.leadsToBattle = dialogueInfo.preBattle ?? false;

    this.onEnter = async () => {
      await Dialogue.loadAssets();
      this.dialogueBox = new DialogueBox(this.lines, this.gender);
      this.container.addChild(this.dialogueBox);
    };
  }

  update(): void {
    this.dialogueBox?.update();

    if (!Keyboard.isKeyDown("Enter")) {
      this.enterReleased = true;
    }

    if (this.enterReleased && Keyboard.isKeyDown("Enter")) {
      this.enterReleased = false;
      if (this.dialogueBox!.isLastPage) {
        EventStack.getEventStack().popEvent();
      } else {
        this.dialogueBox!.advance();
      }
    }
  }

  private static assetsLoaded = false;

  private static loadAssets(): Promise<void> {
    if (Dialogue.assetsLoaded) return Promise.resolve();

    return new Promise((resolve) => {
      Loader.shared
        .add("dialog_boxes", "assets/dialog_boxes.png")
        .add("text_cursor", "assets/text_cursor.png")
        .load(() => {
          Dialogue.assetsLoaded = true;
          resolve();
        });
    });
  }
}
