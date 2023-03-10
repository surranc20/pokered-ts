import { Loader, Texture } from "pixi.js";
import Mobile from "../UI/mobile";
import { Cardinality } from "../enums/cardinality";

export default class Person extends Mobile {
  personName: string;
  isEnemy: boolean;
  gender: string;
  upTextures: Texture[];
  downTextures: Texture[];
  leftTextures: Texture[];

  constructor(
    name: string,
    position: [number, number],
    cardinality: Cardinality,
    isEnemy = true,
    gender = "male"
  ) {
    const upTextures =
      Loader.shared.resources[name].spritesheet!.animations[`${name} up`];

    if (upTextures?.length == 0) {
      console.error(`Unable to load textures for ${name}`);
    }
    super(upTextures, position, cardinality);

    this.upTextures = upTextures;
    this.downTextures =
      Loader.shared.resources[name].spritesheet!.animations[`${name} down`];

    this.leftTextures =
      Loader.shared.resources[name].spritesheet!.animations[`${name} left`];

    this.personName = name;
    this.isEnemy = isEnemy;
    this.gender = gender;

    this.animating = false;
    this.setTexturesFromCardinality();
  }

  setTexturesFromCardinality() {
    switch (this.cardinality) {
      case Cardinality.NORTH:
        this.frames = this.upTextures;
        break;

      case Cardinality.EAST:
        this.frames = this.leftTextures;
        this.flipRight();
        break;

      case Cardinality.WEST:
        this.frames = this.leftTextures;
        this.flipLeft();
        break;

      case Cardinality.SOUTH:
        this.frames = this.downTextures;
        break;
    }
    this.getTexture();
  }

  updateZIndex(tileRowNum: number) {
    this.zIndex = tileRowNum;
  }
}
