import { Component, ViewChild, ElementRef, OnInit, OnDestroy, NgZone, HostListener } from '@angular/core';
import { Square } from './square';

@Component({
  selector: 'snake-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D;
  requestId: number;
  gameLoop;
  squares: Square[] = [];
  food: Square[] = [];
  private directionArchive: Direction[] = [{ direction: 'right', age: 0 }];
  private direction = 'right';
  private age = 0;
  private gametick = 0;
  public lost = false;
  public score = 0;

  @HostListener('window:keyup', ['$event'])
  async keyup(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowUp':
        if (this.direction !== 'down' && this.direction !== 'up') {
          this.direction = 'up';
          this.directionArchive.push({ direction: 'up', age: this.gametick });
        }
        break;
      case 'ArrowDown':
        if (this.direction !== 'up' && this.direction !== 'down') {
          this.direction = 'down';
          this.directionArchive.push({ direction: 'down', age: this.gametick });
        }
        break;
      case 'ArrowLeft':
        if (this.direction !== 'right' && this.direction !== 'left') {
          this.direction = 'left';
          this.directionArchive.push({ direction: 'left', age: this.gametick });
        }
        break;
      case 'ArrowRight':
        if (this.direction !== 'left' && this.direction !== 'right') {
          this.direction = 'right';
          this.directionArchive.push({ direction: 'right', age: this.gametick });
        }
        break;
    }
  }

  constructor(private ngZone: NgZone) { }

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx.fillStyle = 'red';
  }

  tick() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.squares.forEach((square: Square) => {
      if (square.age === 0) {
        square.direction = this.direction;
        if (square.x === this.food[0].x && square.y === this.food[0].y) {
          this.food.pop();
          this.snakeLonger(square.x, square.y);
        } else {
          if (square.x > 59 || square.x < 0 || square.y > 59 || square.y < 0) {
            this.lose();
          }
          this.squares.forEach(squary => {
            if (square.age !== squary.age && square.x === squary.x && square.y === squary.y) {
              this.lose();
            }
          })
        }
      } else {
        if (square.direction === 'wait') {
          square.direction = square.createDir;
        }
        this.directionArchive.forEach((direction => {
          if (this.gametick - square.age === direction.age) {
            square.direction = direction.direction;
          }
        }))
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
    this.lost = true;
  }

  snakeLonger(x: number, y: number) {
    this.age++;
    this.score++;
    const lastSquare = this.squares[this.squares.length - 1]
    const square = new Square(this.ctx, lastSquare.x, lastSquare.y, 'red', 'wait', this.age, lastSquare.direction);
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
  }

  newFood() {
    const food = new Square(this.ctx, this.random(0, 59), this.random(0, 59), 'green', 'no', 0, this.direction);
    this.food.push(food);
  }

  ngOnDestroy() {
    clearInterval(this.gameLoop);
    cancelAnimationFrame(this.requestId);
  }

  random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  mobile(direction: string) {
    switch (direction) {
      case 'up':
        if (this.direction !== 'down' && this.direction !== 'up') {
          this.direction = 'up';
          this.directionArchive.push({ direction: 'up', age: this.gametick });
        }
        break;
      case 'down':
        if (this.direction !== 'up' && this.direction !== 'down') {
          this.direction = 'down';
          this.directionArchive.push({ direction: 'down', age: this.gametick });
        }
        break;
      case 'left':
        if (this.direction !== 'right' && this.direction !== 'left') {
          this.direction = 'left';
          this.directionArchive.push({ direction: 'left', age: this.gametick });
        }
        break;
      case 'right':
        if (this.direction !== 'left' && this.direction !== 'right') {
          this.direction = 'right';
          this.directionArchive.push({ direction: 'right', age: this.gametick });
        }
        break;
    }
  }

}

interface Direction {
  direction: string;
  age: number;
}
