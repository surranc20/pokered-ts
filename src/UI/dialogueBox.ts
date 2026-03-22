import { Loader, Sprite, Text, TextStyle, Texture } from "pixi.js";
import Drawable from "./drawable";

// Colors from Python: male=(55,88,193), female=(232,81,78)
const MALE_COLOR = 0x3758c1;
const FEMALE_COLOR = 0xe8514e;

// Python: line surface blitted to screen at (6, 111)
// Text within surface starts at (10, 10), line height 15px
// DialogueBox container is at screen (0, 110)
const TEXT_X = 6 + 10;              // 16
const TEXT_Y_BASE = 8; // local y of first sub-line
const LINE_HEIGHT = 15;
const WRAP_CHARS = 38;
const FONT_SIZE = 15;
const MAX_SUBLINES = 3;

// dialog_boxes.png frame size from Python frameManager: (240, 49)
const BOX_FRAME_W = 240;
const BOX_FRAME_H = 49;

// text_cursor.png frame size: (12, 8)
const CURSOR_FRAME_W = 12;
const CURSOR_FRAME_H = 8;

// Python TextCursor.set_pos adds (+10, +100) to (rendered_width+10, height)
// cursor local y = n_sublines * LINE_HEIGHT
const CURSOR_BOB_FRAMES = 12; // 0.2s at 60fps

export default class DialogueBox extends Drawable {
  private subLineTexts: Text[] = [];
  private cursorSprite: Sprite;
  private pages: string[][];
  private currentPage = 0;
  private frameCount = 0;
  private cursorBaseY = 0;
  private cursorBob = 0;
  private cursorDir = 1;

  constructor(lines: string[], gender: string) {
    super(Texture.EMPTY, [0, 110], false);

    const textColor = gender === "female" ? FEMALE_COLOR : MALE_COLOR;
    this.pages = lines.map((line) => DialogueBox.wrapLine(line));

    // Dialogue box — crop to first frame (240x49) and apply colorkey
    const boxTexture = DialogueBox.applyColorKey(
      Loader.shared.resources["dialog_boxes"],
      BOX_FRAME_W,
      BOX_FRAME_H
    );
    this.addChild(new Sprite(boxTexture));

    // Text cursor — crop to first frame (12x8) and apply colorkey
    const cursorTexture = DialogueBox.applyColorKey(
      Loader.shared.resources["text_cursor"],
      CURSOR_FRAME_W,
      CURSOR_FRAME_H
    );
    this.cursorSprite = new Sprite(cursorTexture);
    this.addChild(this.cursorSprite);

    // One Text object per possible sub-line
    const style = new TextStyle({
      fontFamily: "PokemonFireRed",
      fontSize: FONT_SIZE,
      fill: textColor,
    });
    for (let i = 0; i < MAX_SUBLINES; i++) {
      const t = new Text("", style);
      t.x = TEXT_X;
      t.y = TEXT_Y_BASE + i * LINE_HEIGHT;
      this.addChild(t);
      this.subLineTexts.push(t);
    }

    // Render immediately, then re-render once the TTF is confirmed loaded
    // so cursor width measurement is accurate
    this.renderPage(0);
    (document as any).fonts
      .load(`${FONT_SIZE}px PokemonFireRed`)
      .then(() => this.renderPage(0));
  }

  get isLastPage(): boolean {
    return this.currentPage >= this.pages.length - 1;
  }

  advance(): void {
    this.currentPage++;
    this.renderPage(this.currentPage);
  }

  update(): void {
    this.frameCount++;
    if (this.frameCount % CURSOR_BOB_FRAMES === 0) {
      this.cursorBob += this.cursorDir;
      if (this.cursorBob >= 2) this.cursorDir = -1;
      if (this.cursorBob <= 0) this.cursorDir = 1;
      this.cursorSprite.y = this.cursorBaseY + this.cursorBob;
    }
  }

  private renderPage(pageIndex: number): void {
    const page = this.pages[pageIndex] ?? [];

    for (let i = 0; i < MAX_SUBLINES; i++) {
      this.subLineTexts[i].text = page[i] ?? "";
    }

    // cursor x = rendered_width + 20  (Python formula)
    // cursor local y = n_sublines * LINE_HEIGHT
    const n = Math.max(page.length, 1);
    const lastText = this.subLineTexts[n - 1];
    this.cursorSprite.x = lastText.width + 20;
    this.cursorBaseY = n * LINE_HEIGHT - 2;
    this.cursorBob = 0;
    this.cursorDir = 1;
    this.cursorSprite.y = this.cursorBaseY;
  }

  // Apply pygame-style colorkey: top-left pixel becomes transparent.
  // Also crops the image to the specified frame size.
  private static applyColorKey(
    resource: { data: unknown },
    frameW: number,
    frameH: number
  ): Texture {
    const img = resource.data as HTMLImageElement;
    const canvas = document.createElement("canvas");
    canvas.width = frameW;
    canvas.height = frameH;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, frameW, frameH);
    const data = imageData.data;

    // Top-left pixel is the colorkey
    const keyR = data[0];
    const keyG = data[1];
    const keyB = data[2];

    for (let i = 0; i < data.length; i += 4) {
      if (data[i] === keyR && data[i + 1] === keyG && data[i + 2] === keyB) {
        data[i + 3] = 0;
      }
    }

    ctx.putImageData(imageData, 0, 0);
    return Texture.from(canvas);
  }

  private static wrapLine(line: string): string[] {
    const words = line.split(" ");
    const subLines: string[] = [];
    let current = "";
    for (const word of words) {
      const candidate = current ? `${current} ${word}` : word;
      if (candidate.length > WRAP_CHARS) {
        if (current) subLines.push(current);
        current = word;
      } else {
        current = candidate;
      }
    }
    if (current) subLines.push(current);
    return subLines;
  }
}
