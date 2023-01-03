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
      Loader.shared.resources.trainer.spritesheet!.animations["player up"];
    super(upTextures, position, cardinality);

    this.upTextures = upTextures;
    this.downTextures =
      Loader.shared.resources.trainer.spritesheet!.animations["player down"];

    this.leftTextures =
      Loader.shared.resources.trainer.spritesheet!.animations["player left"];

    this.personName = name;
    this.isEnemy = isEnemy;
    this.gender = gender;
  }

  setTexturesFromCardinality() {
    switch (this.cardinality) {
      case Cardinality.NORTH:
        this.frames = this.upTextures;
        break;

      case Cardinality.EAST:
        this.frames = this.leftTextures;
        break;

      case Cardinality.WEST:
        this.frames = this.leftTextures;
        break;

      case Cardinality.SOUTH:
        this.frames = this.downTextures;
        break;
    }
    this.getTexture();
  }
}
