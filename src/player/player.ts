class Player {
  static instance: Player;

  private constructor() {}

  public static getPlayer(): Player {
    if (!Player.instance) {
      Player.instance = new Player();
    }
    return Player.instance;
  }
}
