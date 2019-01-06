export interface Field {
  bomb: boolean;
  flag: boolean;
  click: boolean;
  neighbours: number;
  image: string;
  x: number;
  y: number;
}

export interface Game {
  fields: Field[][];
  win: boolean;
  lose: boolean;
  running: boolean;
  bombs: number;
  flags: number;
  sizeX: number;
  sizeY: number;
  time: number;
  alt: boolean;
  building: boolean;
}

export interface Neighbour {
  x: number;
  y: number;
}

export interface GameSize {
  sizeX: number;
  sizeY: number;
  bombs: number;
}

export interface Name {
  name: string;
  save: boolean;
}

export interface Leaderboard {
  minesweeper: Minesweeper;
}

export interface Minesweeper {
  easy: People[];
  medium: People[];
  hard: People[];
  people: People[];
}

export interface People {
  name: string;
  x: number;
  y: number;
  field_size: string;
  bomb_count: number;
  time: number;
}
