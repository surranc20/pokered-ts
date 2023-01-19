import { Loader } from "pixi.js";
import Drawable from "../UI/drawable";
import { Natures } from "../enums/natures";
import PokemonStats from "../pokemon/pokemonStats";
import { PokemonType } from "./pokemonType";
import { PokemonStatus } from "./pokemonStatus";
import { PokemonAbility } from "./pokemonAbility";
import PokemonMove from "./pokemonMove";
import PokemonExpInfo from "./pokemonExpInfo";
import PokemonInfoJson from "./pokemon.json";

export default class Pokemon extends Drawable {
  pokemonName: string;
  enemy: boolean;
  gender: string;
  nickName: string;
  moves: PokemonMove[];
  held_item: null;
  ability: PokemonAbility;
  nature: Natures;
  pokemonExpInfo: PokemonExpInfo;
  status: PokemonStatus[];
  pokemonStats: PokemonStats;
  pokemonType: PokemonType[];
  baseStats: PokemonStats;

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

    this.baseStats = this.getPokemonBaseStatsFromJson();
    this.pokemonStats = this.baseStats;

    this.pokemonExpInfo = new PokemonExpInfo(1, 1, 1); //TODO: Implement EXP

    this.pokemonType = this.getPokemonTypesFromJson();
    this.ability = PokemonAbility.AIR_LOCK; //TODO: Implement Ability
    this.nature = Natures.BASHFUL; //TODO: Add Nature
    this.status = [];

    this.moves = move_set;

    this.held_item = null;
  }

  private getPokemonTypesFromJson() {
    const pokemonTypes = [];
    const pokemonInfo =
      PokemonInfoJson[this.pokemonName as keyof typeof PokemonInfoJson];

    for (const pokemonType of pokemonInfo.type) {
      const possibleType = PokemonType[pokemonType as keyof typeof PokemonType];
      pokemonTypes.push(possibleType);
    }
    return pokemonTypes;
  }

  private getPokemonBaseStatsFromJson() {
    const pokemonInfo =
      PokemonInfoJson[this.pokemonName as keyof typeof PokemonInfoJson];

    return new PokemonStats(
      pokemonInfo.base.HP,
      pokemonInfo.base.HP,
      pokemonInfo.base.Attack,
      pokemonInfo.base.Defense,
      pokemonInfo.base["Sp. Attack"],
      pokemonInfo.base["Sp. Defense"],
      pokemonInfo.base.Speed
    );
  }

  isAlive() {
    this.pokemonStats.hp === 0;
  }

  canMove() {
    return true;
  }
}
