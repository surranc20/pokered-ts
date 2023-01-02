import { Loader } from "pixi.js";
import Drawable from "../UI/drawable";
import { Natures } from "../enums/natures";
import PokemonStats from "../pokemon/pokemonStats";

export default class Pokemon extends Drawable {
  pokemonName: string;
  enemy: boolean;
  gender: string;
  nickName: string;
  moves: any[];
  held_item: null;
  ability: null;
  nature: Natures;
  exp: number;
  nxt_lvl: number;
  status: never[];
  stats: PokemonStats;
  summaryImage: null;
  type: null;

  constructor(
    pokemonName: string,
    enemy = false,
    gender = "male",
    move_set = []
  ) {
    const pokemonSpriteName = enemy ? pokemonName : `${pokemonName}_back`;
    const texture =
      Loader.shared.resources.pokemonSpritesheet.textures![pokemonSpriteName];

    if (!texture) {
      throw Error(`Unable to load texture for ${pokemonName}`);
    }
    super(texture, [36, 48]);

    this.pokemonName = pokemonName;
    this.nickName = this.pokemonName.toUpperCase();
    this.gender = gender;
    this.enemy = enemy;

    this.type = null; // TODO: Implement type system
    this.stats = new PokemonStats(); // TODO: Implement stats
    this.status = [];
    this.ability = null; // TODO: Add Logo
    this.nature = Natures.BASHFUL; // TODO: Add Nature
    this.moves = move_set;
    this.held_item = null;

    this.exp = 100;
    this.nxt_lvl = 2000; // TODO: Implement exp and nxt_lvl

    this.summaryImage = null; //TODO: Implement summary image
  }

  isAlive() {
    this.stats.hp === 0;
  }

  canMove() {
    return true;
  }
}
