import { getRandomInt } from "../utils/miscUtils";
import Pokemon from "./pokemon";
import PokemonStats from "./pokemonStats";

export default class PokemonStatCalculator {
  static calculatePokemonStatsFromLvl(
    pokemon: Pokemon,
    lvl: number
  ): PokemonStats {
    const maxHp = PokemonStatCalculator.calculateHpFromBase(
      pokemon.baseStats.maxHp,
      lvl
    );
    const attack = PokemonStatCalculator.calculateNonHpStatFromBase(
      pokemon.baseStats.attack,
      lvl
    );
    const defense = PokemonStatCalculator.calculateNonHpStatFromBase(
      pokemon.baseStats.attack,
      lvl
    );
    const spAttack = PokemonStatCalculator.calculateNonHpStatFromBase(
      pokemon.baseStats.attack,
      lvl
    );
    const spDefense = PokemonStatCalculator.calculateNonHpStatFromBase(
      pokemon.baseStats.attack,
      lvl
    );
    const speed = PokemonStatCalculator.calculateNonHpStatFromBase(
      pokemon.baseStats.attack,
      lvl
    );

    return new PokemonStats(
      maxHp,
      maxHp,
      attack,
      defense,
      spAttack,
      spDefense,
      speed
    );
  }

  private static calculateHpFromBase(baseHp: number, lvl: number) {
    const [iv, ev] = this.generateIvAndEv();
    return Math.floor(((2 * baseHp + iv + ev / 4) * lvl) / 100 + lvl + 10);
  }

  private static calculateNonHpStatFromBase(baseStat: number, lvl: number) {
    const [iv, ev] = this.generateIvAndEv();
    const nature = 1; //TODO: Implement nature modifier
    return Math.floor(
      (((2 * baseStat + iv + ev / 4) * lvl) / 100 + 5) * nature
    );
  }

  private static generateIvAndEv() {
    return [getRandomInt(1, 33), getRandomInt(1, 33)];
  }
}
