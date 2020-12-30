export interface ModesState {
  playerMode: PlayerMode;
  botMode: BotMode;
  winner: string;
  botWeaponLoading: boolean;
}

export interface PlayerMode {
  playerWeapon: string;
  botWeapon: string;
}

export interface BotMode {
  bot1: string;
  bot2: string;
}

export type weaponOptions = {
  [key: string]: any;
};
