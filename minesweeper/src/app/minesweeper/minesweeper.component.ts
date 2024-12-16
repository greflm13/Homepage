import { Component, OnInit, OnDestroy, DoCheck, Input } from '@angular/core';
import { Neighbour, Game, Leaderboard, GameSize, Name } from './field';
import { HttpgetService } from '../httpget.service';
import { HttpputService } from '../httpput.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FieldsizeService } from '../fieldsize.service';

@Component({
  selector: 'app-minesweeper-modal',
  templateUrl: './modal.html',
})
export class MinesweeperModalComponent implements DoCheck {
  public size: GameSize = {
    sizeX: undefined,
    sizeY: undefined,
    bombs: undefined,
  };
  public max: number;
  public mode = 'simple';
  public custom = false;

  constructor(
    public activeModal: NgbActiveModal,
    private fieldService: FieldsizeService
  ) {}

  ngDoCheck() {
    if (this.mode === 'simple') {
      this.size = { sizeX: 9, sizeY: 9, bombs: 10 };
    }
    if (this.mode === 'median') {
      this.size = { sizeX: 16, sizeY: 16, bombs: 40 };
    }
    if (this.mode === 'mexican') {
      this.size = { sizeX: 16, sizeY: 30, bombs: 99 };
    }
    if (this.mode === 'custom') {
      this.custom = true;
    } else {
      this.custom = false;
    }
    this.max = this.size.sizeX * this.size.sizeY - 2;
  }

  done() {
    if (
      this.size.sizeY > 3 &&
      this.size.sizeX > 3 &&
      this.size.bombs > 1 &&
      this.size.bombs < this.size.sizeX * this.size.sizeY - 1 &&
      this.size.sizeX <= 100 &&
      this.size.sizeY <= 100
    ) {
      this.fieldService.Size = this.size;
      this.activeModal.close();
    }
  }
}

@Component({
  selector: 'app-minesweeper-modal',
  templateUrl: './save.html',
})
export class SaveComponent {
  @Input() time;
  public name: Name = { name: undefined, save: false };

  constructor(
    public activeModal: NgbActiveModal,
    private fieldService: FieldsizeService
  ) {}

  yes() {
    this.name.save = true;
  }

  save() {
    this.fieldService.Name = this.name;
    this.activeModal.close();
  }

  cancel() {
    this.name.save = false;
    this.fieldService.Name = this.name;
    this.activeModal.close();
  }

  no() {
    this.fieldService.Name = this.name;
    this.activeModal.close();
  }
}

@Component({
  selector: 'app-minesweeper',
  templateUrl: './minesweeper.component.html',
  styleUrls: ['./minesweeper.component.css'],
})
export class MinesweeperComponent implements OnInit, OnDestroy {
  public game: Game = {
    fields: [],
    win: false,
    lose: false,
    running: false,
    bombs: undefined,
    flags: undefined,
    sizeX: undefined,
    sizeY: undefined,
    time: 0,
    alt: false,
    building: false,
  };
  public leaderboard: Leaderboard = {
    minesweeper: { people: [], easy: [], medium: [], hard: [] },
  };
  private timeInt;
  private leaderInt;
  private clickCounter = { left: false, right: false };

  constructor(
    private httpGet: HttpgetService,
    private httpPut: HttpputService,
    private modalService: NgbModal,
    private sizeService: FieldsizeService
  ) {
    this.modalService
      .open(MinesweeperModalComponent, {
        centered: true,
        backdrop: 'static',
        keyboard: false,
      })
      .result.then(() => {
        this.game.sizeX = this.sizeService.Size.sizeX;
        this.game.sizeY = this.sizeService.Size.sizeY;
        this.game.bombs = this.sizeService.Size.bombs;
        this.game.flags = this.game.bombs;
        this.initGame();
      });
  }

  alt() {
    this.game.alt = !this.game.alt;
    if (this.game.alt) {
      this.game.fields.forEach((fields) => {
        fields.forEach((field) => {
          if (!field.click && !field.flag) {
            field.image = 'default_alt';
          }
          if (field.flag && !field.click) {
            field.image = 'flag_alt';
          }
          switch (field.neighbours) {
            case 1:
              if (field.click) {
                field.image = '1_bomb_alt';
              }
              break;
            case 2:
              if (field.click) {
                field.image = '2_bomb_alt';
              }
              break;
            case 3:
              if (field.click) {
                field.image = '3_bomb_alt';
              }
              break;
            case 4:
              if (field.click) {
                field.image = '4_bomb_alt';
              }
              break;
            case 5:
              if (field.click) {
                field.image = '5_bomb_alt';
              }
              break;
            case 6:
              if (field.click) {
                field.image = '6_bomb_alt';
              }
              break;
            case 7:
              if (field.click) {
                field.image = '7_bomb_alt';
              }
              break;
            case 8:
              if (field.click) {
                field.image = '8_bomb_alt';
              }
              break;
            default:
              if (field.click) {
                field.image = 'empty_alt';
              }
              break;
          }
        });
      });
    } else {
      this.game.fields.forEach((fields) => {
        fields.forEach((field) => {
          if (!field.click && !field.flag) {
            field.image = 'default';
          }
          if (field.flag && !field.click) {
            field.image = 'flag';
          }
          switch (field.neighbours) {
            case 1:
              if (field.click) {
                field.image = '1_bomb';
              }
              break;
            case 2:
              if (field.click) {
                field.image = '2_bomb';
              }
              break;
            case 3:
              if (field.click) {
                field.image = '3_bomb';
              }
              break;
            case 4:
              if (field.click) {
                field.image = '4_bomb';
              }
              break;
            case 5:
              if (field.click) {
                field.image = '5_bomb';
              }
              break;
            case 6:
              if (field.click) {
                field.image = '6_bomb';
              }
              break;
            case 7:
              if (field.click) {
                field.image = '7_bomb';
              }
              break;
            case 8:
              if (field.click) {
                field.image = '8_bomb';
              }
              break;
            default:
              if (field.click) {
                field.image = 'empty';
              }
              break;
          }
        });
      });
    }
  }

  ngOnInit() {
    this.httpGet.getLeaderboard().then((res) => {
      this.leaderboard = res;
    });
    this.leaderInt = setInterval(() => {
      this.httpGet.getLeaderboard().then((res) => {
        this.leaderboard = res;
      });
    }, 5000);
  }

  ngOnDestroy() {
    clearInterval(this.leaderInt);
  }

  async initGame() {
    this.game.fields = [];
    this.game.win = false;
    this.game.lose = false;
    this.game.running = false;
    this.game.time = 0;
    this.game.building = true;

    for (let i = 0; i < this.game.sizeX; i++) {
      await this.game.fields.push([]);
    }

    if (this.game.alt) {
      for (let i = 0; i < this.game.sizeX; i++) {
        for (let j = this.game.fields[i].length; j < this.game.sizeY; j++) {
          await this.game.fields[i].push({
            bomb: false,
            click: false,
            flag: false,
            image: 'default_alt',
            neighbours: 0,
            x: i,
            y: j,
          });
        }
      }
    } else {
      for (let i = 0; i < this.game.sizeX; i++) {
        for (let j = this.game.fields[i].length; j < this.game.sizeY; j++) {
          await this.game.fields[i].push({
            bomb: false,
            click: false,
            flag: false,
            image: 'default',
            neighbours: 0,
            x: i,
            y: j,
          });
        }
      }
    }
    this.game.building = false;
  }

  async resetGame() {
    clearInterval(this.timeInt);
    this.game.running = false;
    this.game.building = true;
    this.game.win = false;
    this.game.lose = false;
    this.game.time = 0;
    this.game.flags = this.game.bombs;
    this.game.fields = [];

    for (let i = 0; i < this.game.sizeX; i++) {
      this.game.fields.push([]);
    }

    if (this.game.alt) {
      for (let i = 0; i < this.game.sizeX; i++) {
        for (let j = this.game.fields[i].length; j < this.game.sizeY; j++) {
          await this.game.fields[i].push({
            bomb: false,
            click: false,
            flag: false,
            image: 'default_alt',
            neighbours: 0,
            x: i,
            y: j,
          });
        }
      }
    } else {
      for (let i = 0; i < this.game.sizeX; i++) {
        for (let j = this.game.fields[i].length; j < this.game.sizeY; j++) {
          await this.game.fields[i].push({
            bomb: false,
            click: false,
            flag: false,
            image: 'default',
            neighbours: 0,
            x: i,
            y: j,
          });
        }
      }
    }
    this.game.building = false;
  }

  async reloadGame() {
    clearInterval(this.timeInt);
    await this.modalService
      .open(MinesweeperModalComponent, {
        centered: true,
        backdrop: 'static',
        keyboard: false,
      })
      .result.then(() => {
        this.game.sizeX = this.sizeService.Size.sizeX;
        this.game.sizeY = this.sizeService.Size.sizeY;
        this.game.bombs = this.sizeService.Size.bombs;
        this.game.flags = this.game.bombs;
        this.initGame();
      });
  }

  startGame(x: number, y: number) {
    if (!this.game.building) {
      this.timeInt = setInterval(() => {
        this.game.time++;
      }, 100);
      this.game.running = true;

      for (let i = 0; i < this.game.flags; i++) {
        const sx = this.random(0, this.game.sizeX - 1);
        const sy = this.random(0, this.game.sizeY - 1);
        if (!this.game.fields[sx][sy].bomb && !(sx === x && sy === y)) {
          this.game.fields[sx][sy].bomb = true;
        } else {
          i--;
        }
      }
      this.countBombs();
    }
  }

  async check(x: number, y: number) {
    if (!this.game.running && !this.game.win && !this.game.lose) {
      this.startGame(x, y);
    }
    if (!this.game.lose && !this.game.win && !this.game.fields[x][y].flag) {
      if (this.game.fields[x][y].bomb) {
        await this.lose(x, y);
        if (this.game.alt) {
          this.game.fields[x][y].image = 'boom_alt';
        } else {
          this.game.fields[x][y].image = 'boom';
        }
      } else {
        this.setPicture(x, y);
        this.checkAll(x, y);
        this.checkWin();
      }
    }
  }

  async checkWin() {
    let unopened = 0;
    await this.game.fields.forEach((fields) => {
      fields.forEach((field) => {
        if (!field.click) {
          unopened++;
        }
      });
    });
    if (this.game.bombs === unopened) {
      this.game.win = true;
      this.game.running = false;
      clearInterval(this.timeInt);
      const save = this.modalService.open(SaveComponent, {
        centered: true,
        backdrop: 'static',
        keyboard: false,
      });
      save.componentInstance.time = this.game.time / 10;
      save.result.then(() => {
        if (this.sizeService.Name.save) {
          if (
            this.game.sizeX === 9 &&
            this.game.sizeY === 9 &&
            this.game.bombs === 10
          ) {
            this.leaderboard.minesweeper.easy.push({
              name: this.sizeService.Name.name,
              time: this.game.time / 10,
              bomb_count: this.game.bombs,
              x: this.game.sizeY,
              y: this.game.sizeX,
              field_size: this.game.sizeY + 'x' + this.game.sizeX,
            });
          } else if (
            this.game.sizeX === 16 &&
            this.game.sizeY === 16 &&
            this.game.bombs === 40
          ) {
            this.leaderboard.minesweeper.medium.push({
              name: this.sizeService.Name.name,
              time: this.game.time / 10,
              bomb_count: this.game.bombs,
              x: this.game.sizeY,
              y: this.game.sizeX,
              field_size: this.game.sizeY + 'x' + this.game.sizeX,
            });
          } else if (
            this.game.sizeX === 16 &&
            this.game.sizeY === 30 &&
            this.game.bombs === 99
          ) {
            this.leaderboard.minesweeper.hard.push({
              name: this.sizeService.Name.name,
              time: this.game.time / 10,
              bomb_count: this.game.bombs,
              x: this.game.sizeY,
              y: this.game.sizeX,
              field_size: this.game.sizeY + 'x' + this.game.sizeX,
            });
          } else {
            this.leaderboard.minesweeper.people.push({
              name: this.sizeService.Name.name,
              time: this.game.time / 10,
              bomb_count: this.game.bombs,
              x: this.game.sizeY,
              y: this.game.sizeX,
              field_size: this.game.sizeY + 'x' + this.game.sizeX,
            });
          }
          this.sorting();
          this.httpPut.putLeaderboard(this.leaderboard).then((res) => {
            this.leaderboard = res;
          });
        }
      });
    }
  }

  checkAll(x: number, y: number) {
    if (this.game.fields[x][y].neighbours === 0) {
      const neighbours: Neighbour[] = [];
      if (x > 0) {
        if (!this.game.fields[x - 1][y].click) {
          neighbours.push({ x: x - 1, y: y });
        }
        if (!this.game.fields[x - 1][y].flag) {
          this.setPicture(x - 1, y);
        }
      }
      if (y > 0) {
        if (!this.game.fields[x][y - 1].click) {
          neighbours.push({ x: x, y: y - 1 });
        }
        if (!this.game.fields[x][y - 1].flag) {
          this.setPicture(x, y - 1);
        }
      }
      if (x < this.game.sizeX - 1) {
        if (!this.game.fields[x + 1][y].click) {
          neighbours.push({ x: x + 1, y: y });
        }
        if (!this.game.fields[x + 1][y].flag) {
          this.setPicture(x + 1, y);
        }
      }
      if (y < this.game.sizeY - 1) {
        if (!this.game.fields[x][y + 1].click) {
          neighbours.push({ x: x, y: y + 1 });
        }
        if (!this.game.fields[x][y + 1].flag) {
          this.setPicture(x, y + 1);
        }
      }
      if (x > 0 && y > 0) {
        if (!this.game.fields[x - 1][y - 1].click) {
          neighbours.push({ x: x - 1, y: y - 1 });
        }
        if (!this.game.fields[x - 1][y - 1].flag) {
          this.setPicture(x - 1, y - 1);
        }
      }
      if (x < this.game.sizeX - 1 && y < this.game.sizeY - 1) {
        if (!this.game.fields[x + 1][y + 1].click) {
          neighbours.push({ x: x + 1, y: y + 1 });
        }
        if (!this.game.fields[x + 1][y + 1].flag) {
          this.setPicture(x + 1, y + 1);
        }
      }
      if (x > 0 && y < this.game.sizeY - 1) {
        if (!this.game.fields[x - 1][y + 1].click) {
          neighbours.push({ x: x - 1, y: y + 1 });
        }
        if (!this.game.fields[x - 1][y + 1].flag) {
          this.setPicture(x - 1, y + 1);
        }
      }
      if (x < this.game.sizeX - 1 && y > 0) {
        if (!this.game.fields[x + 1][y - 1].click) {
          neighbours.push({ x: x + 1, y: y - 1 });
        }
        if (!this.game.fields[x + 1][y - 1].flag) {
          this.setPicture(x + 1, y - 1);
        }
      }
      neighbours.forEach((field) => {
        this.checkAll(field.x, field.y);
      });
    }
  }

  setPicture(x: number, y: number) {
    this.game.fields[x][y].click = true;
    if (this.game.alt) {
      switch (this.game.fields[x][y].neighbours) {
        case 1:
          this.game.fields[x][y].image = '1_bomb_alt';
          break;
        case 2:
          this.game.fields[x][y].image = '2_bomb_alt';
          break;
        case 3:
          this.game.fields[x][y].image = '3_bomb_alt';
          break;
        case 4:
          this.game.fields[x][y].image = '4_bomb_alt';
          break;
        case 5:
          this.game.fields[x][y].image = '5_bomb_alt';
          break;
        case 6:
          this.game.fields[x][y].image = '6_bomb_alt';
          break;
        case 7:
          this.game.fields[x][y].image = '7_bomb_alt';
          break;
        case 8:
          this.game.fields[x][y].image = '8_bomb_alt';
          break;
        default:
          this.game.fields[x][y].image = 'empty_alt';
          break;
      }
    } else {
      switch (this.game.fields[x][y].neighbours) {
        case 1:
          this.game.fields[x][y].image = '1_bomb';
          break;
        case 2:
          this.game.fields[x][y].image = '2_bomb';
          break;
        case 3:
          this.game.fields[x][y].image = '3_bomb';
          break;
        case 4:
          this.game.fields[x][y].image = '4_bomb';
          break;
        case 5:
          this.game.fields[x][y].image = '5_bomb';
          break;
        case 6:
          this.game.fields[x][y].image = '6_bomb';
          break;
        case 7:
          this.game.fields[x][y].image = '7_bomb';
          break;
        case 8:
          this.game.fields[x][y].image = '8_bomb';
          break;
        default:
          this.game.fields[x][y].image = 'empty';
          break;
      }
    }
  }

  onRightClick(event, x: number, y: number) {
    if (
      !this.game.lose &&
      !this.game.win &&
      this.game.running &&
      !this.game.fields[x][y].click
    ) {
      this.game.fields[x][y].flag = !this.game.fields[x][y].flag;
      if (this.game.alt) {
        if (this.game.fields[x][y].flag) {
          this.game.fields[x][y].image = 'flag_alt';
          this.game.flags--;
        } else {
          this.game.fields[x][y].image = 'default_alt';
          this.game.flags++;
        }
      } else {
        if (this.game.fields[x][y].flag) {
          this.game.fields[x][y].image = 'flag';
          this.game.flags--;
        } else {
          this.game.fields[x][y].image = 'default';
          this.game.flags++;
        }
      }
    }
    return false;
  }

  async onClick(event, x: number, y: number) {
    if (event.button === 0) {
      this.clickCounter.left = true;
      setTimeout(() => {
        this.clickCounter.left = false;
      }, 100);
    }
    if (event.button === 2) {
      this.clickCounter.right = true;
      setTimeout(() => {
        this.clickCounter.right = false;
      }, 100);
    }
    if (
      this.clickCounter.left &&
      this.clickCounter.right &&
      !this.game.lose &&
      !this.game.win
    ) {
      if (
        this.game.fields[x][y].click &&
        this.game.fields[x][y].neighbours > 0
      ) {
        const neighbours = [];
        if (x > 0) {
          if (!this.game.fields[x - 1][y].click) {
            neighbours.push(this.game.fields[x - 1][y]);
          }
        }
        if (y > 0) {
          if (!this.game.fields[x][y - 1].click) {
            neighbours.push(this.game.fields[x][y - 1]);
          }
        }
        if (x < this.game.sizeX - 1) {
          if (!this.game.fields[x + 1][y].click) {
            neighbours.push(this.game.fields[x + 1][y]);
          }
        }
        if (y < this.game.sizeY - 1) {
          if (!this.game.fields[x][y + 1].click) {
            neighbours.push(this.game.fields[x][y + 1]);
          }
        }
        if (x > 0 && y > 0) {
          if (!this.game.fields[x - 1][y - 1].click) {
            neighbours.push(this.game.fields[x - 1][y - 1]);
          }
        }
        if (x < this.game.sizeX - 1 && y < this.game.sizeY - 1) {
          if (!this.game.fields[x + 1][y + 1].click) {
            neighbours.push(this.game.fields[x + 1][y + 1]);
          }
        }
        if (x > 0 && y < this.game.sizeY - 1) {
          if (!this.game.fields[x - 1][y + 1].click) {
            neighbours.push(this.game.fields[x - 1][y + 1]);
          }
        }
        if (x < this.game.sizeX - 1 && y > 0) {
          if (!this.game.fields[x + 1][y - 1].click) {
            neighbours.push(this.game.fields[x + 1][y - 1]);
          }
        }
        await neighbours.forEach((field) => {
          if (field.bomb && !field.flag) {
            this.lose(x, y);
          }
        });
        await neighbours.forEach((field) => {
          if (
            !field.bomb &&
            !field.flag &&
            !this.game.lose &&
            field.neighbours === 0
          ) {
            this.checkAll(field.x, field.y);
          }
          if (!field.bomb && !field.flag && !this.game.lose) {
            this.setPicture(field.x, field.y);
          }
        });
      }
      this.checkWin();
    }
  }

  async lose(x: number, y: number) {
    this.game.lose = true;
    this.game.running = false;
    clearInterval(this.timeInt);
    await this.game.fields.forEach((fields) => {
      fields.forEach((field) => {
        if (!this.game.alt) {
          if (field.bomb && !field.flag) {
            field.image = 'bomb';
          }
          if (field.flag && !field.bomb) {
            field.image = 'flag_wrong';
          }
        } else {
          if (field.bomb && !field.flag) {
            field.image = 'bomb_alt';
          }
          if (field.flag && !field.bomb) {
            field.image = 'flag_wrong_alt';
          }
        }
      });
    });
  }

  countBombs() {
    for (let i = 0; i < this.game.fields.length; i++) {
      for (let j = 0; j < this.game.fields[i].length; j++) {
        let bombs = 0;
        if (i > 0) {
          if (this.game.fields[i - 1][j].bomb) {
            bombs++;
          }
        }
        if (j > 0) {
          if (this.game.fields[i][j - 1].bomb) {
            bombs++;
          }
        }
        if (i < this.game.sizeX - 1) {
          if (this.game.fields[i + 1][j].bomb) {
            bombs++;
          }
        }
        if (j < this.game.sizeY - 1) {
          if (this.game.fields[i][j + 1].bomb) {
            bombs++;
          }
        }
        if (i > 0 && j > 0) {
          if (this.game.fields[i - 1][j - 1].bomb) {
            bombs++;
          }
        }
        if (i < this.game.sizeX - 1 && j < this.game.sizeY - 1) {
          if (this.game.fields[i + 1][j + 1].bomb) {
            bombs++;
          }
        }
        if (i > 0 && j < this.game.sizeY - 1) {
          if (this.game.fields[i - 1][j + 1].bomb) {
            bombs++;
          }
        }
        if (i < this.game.sizeX - 1 && j > 0) {
          if (this.game.fields[i + 1][j - 1].bomb) {
            bombs++;
          }
        }
        this.game.fields[i][j].neighbours = bombs;
      }
    }
  }

  random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  sorting() {
    this.leaderboard.minesweeper.easy.sort((leftSide, rightSide): number => {
      if (leftSide.time < rightSide.time) {
        return -1;
      }
      if (leftSide.time > rightSide.time) {
        return 1;
      }
      return 0;
    });
    this.leaderboard.minesweeper.medium.sort((leftSide, rightSide): number => {
      if (leftSide.time < rightSide.time) {
        return -1;
      }
      if (leftSide.time > rightSide.time) {
        return 1;
      }
      return 0;
    });
    this.leaderboard.minesweeper.hard.sort((leftSide, rightSide): number => {
      if (leftSide.time < rightSide.time) {
        return -1;
      }
      if (leftSide.time > rightSide.time) {
        return 1;
      }
      return 0;
    });
    this.leaderboard.minesweeper.people.sort((leftSide, rightSide): number => {
      if (leftSide.bomb_count > rightSide.bomb_count) {
        return -1;
      }
      if (leftSide.bomb_count < rightSide.bomb_count) {
        return 1;
      } else {
        if (leftSide.x < rightSide.x) {
          return -1;
        }
        if (leftSide.x > rightSide.x) {
          return 1;
        } else {
          if (leftSide.y < rightSide.y) {
            return -1;
          }
          if (leftSide.y > rightSide.y) {
            return 1;
          } else {
            if (leftSide.time < rightSide.time) {
              return -1;
            }
            if (leftSide.time > rightSide.time) {
              return 1;
            }
            return 0;
          }
        }
      }
    });
  }
}
