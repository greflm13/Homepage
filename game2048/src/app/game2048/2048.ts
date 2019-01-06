export interface Game {
  fields: Field[][];
  lose: boolean;
  win: boolean;
  score: number;
  running: boolean;
  time: number;
}

export interface Field {
  number: number;
  color: string;
  merged: boolean;
}

export interface G2048 {
  people: People[];
}

export interface People {
  name: string;
  score: number;
  time: number;
}

export interface Leaderboard {
  g2048: G2048;
}

export interface Name {
  name: string;
  save: boolean;
}

export interface GameSize {
  sizeX: number;
  sizeY: number;
  bombs: number;
}
