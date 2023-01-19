export default class PokemonExpInfo {
  constructor(
    public lastLevelExpCutoff: number,
    public currentExp: number,
    public nextLevelExpThreshold: number
  ) {}
}
