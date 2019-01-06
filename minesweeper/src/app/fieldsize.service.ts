import { Injectable } from '@angular/core';
import { GameSize, Name } from './minesweeper/field';

@Injectable()
export class FieldsizeService {
  private _size: GameSize;
  private _name: Name;

  constructor() {}

  public set Size(size: GameSize) {
    this._size = size;
  }

  public get Size() {
    return this._size;
  }

  public set Name(v: Name) {
    this._name = v;
  }

  public get Name(): Name {
    return this._name;
  }
}
