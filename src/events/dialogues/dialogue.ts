import Person from "../../people/person";
import GameEvent from "../gameEvent";
import DialogueJson from "./dialogue.json";

export default class Dialogue extends GameEvent {
  lines: string[] = [];
  leadsToBattle: boolean = false;
  constructor(
    public dialogueId: Number,
    public otherPerson: Person,
    public dialogueBoxId: Number
  ) {
    super();

    const dialogueInfo =
      DialogueJson[dialogueId as unknown as keyof typeof DialogueJson];

    this.loadDialogueInfo(dialogueInfo);
  }

  update(): void {
    console.log("inside dialogue");
  }

  private loadDialogueInfo(dialogueInfo: {
    lines: string[];
    preBattle: boolean;
  }) {
    this.lines = dialogueInfo.lines;
    this.leadsToBattle = dialogueInfo.preBattle
      ? dialogueInfo.preBattle
      : false;
  }
}
