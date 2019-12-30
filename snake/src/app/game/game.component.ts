import { Component, ViewChild, ElementRef, OnInit, OnDestroy, NgZone, HostListener } from '@angular/core';
import { HttpService } from '../http.service';
import { Square } from './square';

@Component({
  selector: 'snake-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;
  private requestId: number;
  private gameLoop;
  private squares: Square[] = [];
  private food: Square[] = [];
  private directionArchive: Direction[] = [{ direction: 'right', age: 0 }];
  private direction = 'right';
  private age = 0;
  private gametick = 0;
  private timeKeeper;
  public lost = false;
  public score = 0;
  public time = 0;
  public leaderwidth: string;
  public leaderboard: Leaderboard = { people: [] };
  public player: People = { name: '', score: 0, time: 0 };


  @HostListener('window:keyup', ['$event'])
  async keyup(event: KeyboardEvent) {
    event.preventDefault();
    switch (event.key) {
      case 'ArrowUp':
        if (this.direction !== 'down' && this.direction !== 'up') {
          if (this.directionArchive.length > 0) {
            if (this.gametick !== this.directionArchive[this.directionArchive.length - 1].age) {
              this.direction = 'up';
              this.directionArchive.push({ direction: 'up', age: this.gametick });
            }
          } else {
            this.direction = 'up';
            this.directionArchive.push({ direction: 'up', age: this.gametick });
          }
        }
        break;
      case 'ArrowDown':
        if (this.direction !== 'up' && this.direction !== 'down') {
          if (this.directionArchive.length > 0) {
            if (this.gametick !== this.directionArchive[this.directionArchive.length - 1].age) {
              this.direction = 'down';
              this.directionArchive.push({ direction: 'down', age: this.gametick });
            }
          } else {
            this.direction = 'down';
            this.directionArchive.push({ direction: 'down', age: this.gametick });
          }
        }
        break;
      case 'ArrowLeft':
        if (this.direction !== 'right' && this.direction !== 'left') {
          if (this.directionArchive.length > 0) {
            if (this.gametick !== this.directionArchive[this.directionArchive.length - 1].age) {
              this.direction = 'left';
              this.directionArchive.push({ direction: 'left', age: this.gametick });
            }
          } else {
            this.direction = 'left';
            this.directionArchive.push({ direction: 'left', age: this.gametick });
          }
        }
        break;
      case 'ArrowRight':
        if (this.direction !== 'left' && this.direction !== 'right') {
          if (this.directionArchive.length > 0) {
            if (this.gametick !== this.directionArchive[this.directionArchive.length - 1].age) {
              this.direction = 'right';
              this.directionArchive.push({ direction: 'right', age: this.gametick });
            }
          } else {
            this.direction = 'right';
            this.directionArchive.push({ direction: 'right', age: this.gametick });
          }
        }
        break;
      case 'w':
        if (this.direction !== 'down' && this.direction !== 'up') {
          if (this.directionArchive.length > 0) {
            if (this.gametick !== this.directionArchive[this.directionArchive.length - 1].age) {
              this.direction = 'up';
              this.directionArchive.push({ direction: 'up', age: this.gametick });
            }
          } else {
            this.direction = 'up';
            this.directionArchive.push({ direction: 'up', age: this.gametick });
          }
        }
        break;
      case 's':
        if (this.direction !== 'up' && this.direction !== 'down') {
          if (this.directionArchive.length > 0) {
            if (this.gametick !== this.directionArchive[this.directionArchive.length - 1].age) {
              this.direction = 'down';
              this.directionArchive.push({ direction: 'down', age: this.gametick });
            }
          } else {
            this.direction = 'down';
            this.directionArchive.push({ direction: 'down', age: this.gametick });
          }
        }
        break;
      case 'a':
        if (this.direction !== 'right' && this.direction !== 'left') {
          if (this.directionArchive.length > 0) {
            if (this.gametick !== this.directionArchive[this.directionArchive.length - 1].age) {
              this.direction = 'left';
              this.directionArchive.push({ direction: 'left', age: this.gametick });
            }
          } else {
            this.direction = 'left';
            this.directionArchive.push({ direction: 'left', age: this.gametick });
          }
        }
        break;
      case 'd':
        if (this.direction !== 'left' && this.direction !== 'right') {
          if (this.directionArchive.length > 0) {
            if (this.gametick !== this.directionArchive[this.directionArchive.length - 1].age) {
              this.direction = 'right';
              this.directionArchive.push({ direction: 'right', age: this.gametick });
            }
          } else {
            this.direction = 'right';
            this.directionArchive.push({ direction: 'right', age: this.gametick });
          }
        }
        break;
    }
  }

  constructor(private ngZone: NgZone, private http: HttpService) { }

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.http.get('leaderboard').then(res => {
      this.leaderboard = res;
    });
    setInterval(() => {
      if (window.innerWidth < 1200) {
        this.leaderwidth = window.innerWidth - 40 + 'px';
      } else {
        this.leaderwidth = window.innerWidth - 650 + 'px';
      }
    }, 500);
  }

  tick() {
    if (this.squares[0].x > 59 || this.squares[0].x < 0 || this.squares[0].y > 59 || this.squares[0].y < 0) {
      this.lose();
    }
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.squares.forEach((square: Square) => {
      if (this.squares[0].age !== square.age && this.squares[0].x === square.x && this.squares[0].y === square.y) {
        this.lose();
      }
      if (square.age === 0) {
        square.direction = this.direction;
        if (square.x === this.food[0].x && square.y === this.food[0].y) {
          this.food.pop();
          this.snakeLonger(square.x, square.y);
        }
      } else {
        if (square.direction === 'wait') {
          square.direction = square.createDir;
        }
        this.directionArchive.forEach((direction => {
          if (this.gametick - square.age === direction.age) {
            square.direction = direction.direction;
          }
        }));
      }
      if (square.age === 0 && square.x === this.food[0].x && square.y === this.food[0].y) {
        this.food.pop();
        this.snakeLonger(square.x, square.y);
      }
      square.move();
    });
    this.food.forEach((food: Square) => {
      food.move();
    });
    this.requestId = requestAnimationFrame(() => this.tick);
    this.gametick++;
    this.memoryCleaner();
  }

  memoryCleaner() {
    if (this.directionArchive.length > 0 && this.directionArchive[0].age < (this.gametick - this.squares[this.squares.length - 1].age)) {
      this.directionArchive.shift();
    }
    if (this.directionArchive.length === 0) {
      this.gametick = 0;
    }
  }

  lose() {
    clearInterval(this.gameLoop);
    this.gameLoop = undefined;
    clearInterval(this.timeKeeper);
    this.timeKeeper = undefined;
    this.player.score = this.score;
    this.player.time = this.time;
    this.lost = true;
  }

  submit() {
    if (this.player.name !== '') {
      this.http.post('leaderboard', this.player).then(res => {
        this.leaderboard = res;
        this.player.name = '';
        this.lost = false;
      });
    }
  }

  snakeLonger(x: number, y: number) {
    this.age++;
    this.score++;
    const lastSquare = this.squares[this.squares.length - 1];
    const square = new Square(this.ctx, lastSquare.x, lastSquare.y, this.randomColor(), 'wait', this.age, lastSquare.direction);
    this.squares.push(square);
    this.newFood();
  }

  start() {
    if (!this.gameLoop) {
      this.lost = false;
      this.squares = [];
      this.directionArchive = [];
      this.age = 0;
      this.direction = 'right';
      this.food = [];
      this.gametick = 0;
      this.score = 0;
      this.time = 0;
      this.play();
    }
  }

  play() {
    const square = new Square(this.ctx, 30, 30, 'red', 'right', 0, this.direction);
    this.squares.push(square);
    this.newFood();
    this.ngZone.runOutsideAngular(() => this.tick());
    this.gameLoop = setInterval(() => {
      this.tick();
    }, 150);
    this.timeKeeper = setInterval(() => { this.time++; }, 1000);
  }

  newFood() {
    const food = new Square(this.ctx, this.random(0, 59), this.random(0, 59), '#2CAC07', 'no', 0, this.direction);
    this.food.push(food);
  }

  ngOnDestroy() {
    clearInterval(this.gameLoop);
    cancelAnimationFrame(this.requestId);
  }

  random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  randomColor() {
    return '#' + this.random(0, 250).toString(16).toUpperCase()
      + this.random(0, 250).toString(16).toUpperCase()
      + this.random(0, 250).toString(16).toUpperCase();
  }

  mobile(direction: string) {
    switch (direction) {
      case 'up':
        if (this.direction !== 'down' && this.direction !== 'up') {
          if (this.directionArchive.length > 0) {
            if (this.gametick !== this.directionArchive[this.directionArchive.length - 1].age) {
              this.direction = 'up';
              this.directionArchive.push({ direction: 'up', age: this.gametick });
            }
          } else {
            this.direction = 'up';
            this.directionArchive.push({ direction: 'up', age: this.gametick });
          }
        }
        break;
      case 'down':
        if (this.direction !== 'up' && this.direction !== 'down') {
          if (this.directionArchive.length > 0) {
            if (this.gametick !== this.directionArchive[this.directionArchive.length - 1].age) {
              this.direction = 'down';
              this.directionArchive.push({ direction: 'down', age: this.gametick });
            }
          } else {
            this.direction = 'down';
            this.directionArchive.push({ direction: 'down', age: this.gametick });
          }
        }
        break;
      case 'left':
        if (this.direction !== 'right' && this.direction !== 'left') {
          if (this.directionArchive.length > 0) {
            if (this.gametick !== this.directionArchive[this.directionArchive.length - 1].age) {
              this.direction = 'left';
              this.directionArchive.push({ direction: 'left', age: this.gametick });
            }
          } else {
            this.direction = 'left';
            this.directionArchive.push({ direction: 'left', age: this.gametick });
          }
        }
        break;
      case 'right':
        if (this.direction !== 'left' && this.direction !== 'right') {
          if (this.directionArchive.length > 0) {
            if (this.gametick !== this.directionArchive[this.directionArchive.length - 1].age) {
              this.direction = 'right';
              this.directionArchive.push({ direction: 'right', age: this.gametick });
            }
          } else {
            this.direction = 'right';
            this.directionArchive.push({ direction: 'right', age: this.gametick });
          }
        }
        break;
    }
  }

}

interface Direction {
  direction: string;
  age: number;
}

interface People {
  name: string;
  score: number;
  time: number;
}

interface Leaderboard {
  people: People[];
}

