import { Component, OnInit, ViewChild, ElementRef, OnDestroy, NgZone } from '@angular/core';

@Component({
  selector: 'grafs-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;
  private requestId: number;
  private gameLoop: any;
  private log = false;
  public cheight: number;
  public cwidth: number;
  public graph: Graph = { points: [] };
  public graph2: Graph = { points: [] };

  constructor(private ngZone: NgZone) { }

  ngOnInit(): void {
    for (let i = 0; i <= 24; i++) {
      this.graph2.points.push({
        x: i, y: (Math.pow(Math.E, (0.3 * i))), stringx: i.toString()
      });
    }
    this.data();
    this.cheight = window.innerHeight;
    this.cwidth = window.innerWidth;
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ngZone.runOutsideAngular(() => this.tick());
    this.gameLoop = setInterval(() => {
      this.tick();
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.gameLoop);
    cancelAnimationFrame(this.requestId);
  }


  tick() {
    // x: width
    // y: height
    this.cheight = window.innerHeight;
    this.cwidth = window.innerWidth;
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.drawCoordinateSystem('Date', 'Confirmed Cases');
    this.drawGraph(this.graph, 2, 'red');
    this.drawGraph(this.graph2, 2, 'blue');

    // this.drawSquare(10, 100, 100, 'blue');
    // this.drawText('Blau', 110, 100, 'black');
    // this.drawLine(3, 100, 100, 200, 200, 'blue');
    // this.drawCircle(5, 200, 200, 'green');

    this.requestId = requestAnimationFrame(() => this.tick);
  }

  drawSquare(size: number, x: number, y: number, color: string) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x - size / 2, y - size / 2, size, size);
  }

  drawLine(width: number, startx: number, starty: number, endx: number, endy: number, color: string) {
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = width;
    this.ctx.beginPath();
    this.ctx.moveTo(startx, starty);
    this.ctx.lineTo(endx, endy);
    this.ctx.stroke();
  }

  drawCircle(radius: number, x: number, y: number, color: string) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
    this.ctx.fill();
  }

  drawText(text: string, x: number, y: number, color: string) {
    this.ctx.fillStyle = color;
    this.ctx.fillText(text, x, y);
  }

  drawGraph(graph: Graph, width: number, color: string) {
    const scaleyy = [];
    graph.points.forEach(point => {
      scaleyy.push(point.y);
    });
    scaleyy.sort((leftSide, rightSide): number => {

      if (leftSide > rightSide) {
        return -1;
      }
      if (leftSide < rightSide) {
        return 1;
      }
      return 0;
    });
    const scalexx = [];
    graph.points.forEach(point => {
      scalexx.push(point.x);
    });
    scalexx.sort((leftSide, rightSide): number => {

      if (leftSide > rightSide) {
        return -1;
      }
      if (leftSide < rightSide) {
        return 1;
      }
      return 0;
    });
    // cut off all but the first two digits then +1 then fill to original length with 0s
    let scaley = 1;
    if (Math.round(scaleyy[0]).toString().length >= 2) {
      // tslint:disable-next-line: max-line-length radix
      scaley = parseInt((parseInt(Math.round(scaleyy[0]).toString().substr(0, 2)) + 1).toString() + '0'.repeat(Math.round(scaleyy[0]).toString().length - 2));
    } else if (scaleyy[0] < 1) {
      // tslint:disable-next-line: max-line-length radix
      scaley = parseFloat('0.' + (parseInt(scaleyy[0].toString().substr(2, 2)) + 1).toString() + '0'.repeat(scaleyy[0].toString().length - 2));
    }
    if (this.log) {
      // tslint:disable-next-line: radix
      scaley = parseInt('1' + '0'.repeat(Math.round(scaleyy[0]).toString().length));
    }
    const scalex = Math.round(scalexx[0]);
    const originx = 100;
    const originy = this.cheight - 100;
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = width;
    this.ctx.beginPath();
    if (this.log) {
      // tslint:disable-next-line: max-line-length
      this.ctx.moveTo(originx + (this.cwidth - 230) / scalex * graph.points[0].x, originy - (this.cheight - 230) / Math.log(scaley) * Math.log(graph.points[0].y));
      // tslint:disable-next-line: max-line-length
      this.drawSquare(5, originx + (this.cwidth - 230) / scalex * graph.points[0].x, originy - (this.cheight - 230) / Math.log(scaley) * Math.log(graph.points[0].y), 'blue');
      graph.points.forEach(point => {
        if (point.x !== 0) {
          // tslint:disable-next-line: max-line-length
          this.ctx.lineTo(originx + (this.cwidth - 230) / scalex * point.x, originy - (this.cheight - 230) / Math.log(scaley) * Math.log(point.y));
          // tslint:disable-next-line: max-line-length
          this.drawSquare(5, originx + (this.cwidth - 230) / scalex * point.x, originy - (this.cheight - 230) / Math.log(scaley) * Math.log(point.y), 'blue');
        }
      });
    } else {// tslint:disable-next-line: max-line-length
      this.ctx.moveTo(originx + (this.cwidth - 230) / scalex * graph.points[0].x, originy - (this.cheight - 230) / scaley * graph.points[0].y);
      // tslint:disable-next-line: max-line-length
      this.drawSquare(5, originx + (this.cwidth - 230) / scalex * graph.points[0].x, originy - (this.cheight - 230) / scaley * graph.points[0].y, 'blue');
      graph.points.forEach(point => {
        if (point.x !== 0) {
          this.drawSquare(5, originx + (this.cwidth - 230) / scalex * point.x, originy - (this.cheight - 230) / scaley * point.y, 'blue');
          this.ctx.lineTo(originx + (this.cwidth - 230) / scalex * point.x, originy - (this.cheight - 230) / scaley * point.y);
        }
      });
    }
    this.ctx.stroke();
    this.drawScale(scaley, graph.points.length, graph);
  }

  drawScale(yAxis: number, steps: number, graph: Graph) {
    this.ctx.fillStyle = 'black';
    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth = 1;
    if (this.log) {
      const stepy = yAxis / Math.pow(10, yAxis.toString().length - 1);
      for (let i = 0; i < yAxis.toString().length; i++) {
        this.ctx.beginPath();
        this.ctx.moveTo(95, (this.cheight - 100) - (this.cheight - 230) / (yAxis.toString().length - 1) * i);
        this.ctx.lineTo(105, (this.cheight - 100) - (this.cheight - 230) / (yAxis.toString().length - 1) * i);
        this.ctx.stroke();
        this.ctx.save();
        this.ctx.translate(90, (this.cheight - 100) - (this.cheight - 230) / (yAxis.toString().length - 1) * i);
        this.ctx.rotate(0.5235988);
        this.ctx.textAlign = 'right';
        this.ctx.fillText(Math.floor(Math.pow(10, i) * stepy).toString(), 0, 0);
        this.ctx.restore();
      }

    } else {

      const stepy = yAxis / 10;
      for (let i = 0; i <= 10; i++) {
        this.ctx.beginPath();
        this.ctx.moveTo(95, (this.cheight - 100) - (this.cheight - 230) / 10 * i);
        this.ctx.lineTo(105, (this.cheight - 100) - (this.cheight - 230) / 10 * i);
        this.ctx.stroke();
        this.ctx.save();
        this.ctx.translate(90, (this.cheight - 100) - (this.cheight - 230) / 10 * i);
        this.ctx.rotate(0.5235988);
        this.ctx.textAlign = 'right';
        this.ctx.fillText(Math.round(i * stepy).toString(), 0, 0);
        this.ctx.restore();
      }
    }
    for (let j = 0; j < steps; j++) {
      this.ctx.beginPath();
      this.ctx.moveTo(100 + (this.cwidth - 230) / (steps - 1) * j, this.cheight - 95);
      this.ctx.lineTo(100 + (this.cwidth - 230) / (steps - 1) * j, this.cheight - 105);
      this.ctx.stroke();
      this.ctx.save();
      this.ctx.translate(105 + (this.cwidth - 230) / (steps - 1) * j, this.cheight - 80);
      this.ctx.rotate(-0.5235988);
      this.ctx.textAlign = 'right';
      this.ctx.fillText(graph.points[j].stringx, 0, 0);
      this.ctx.restore();
    }
  }

  drawCoordinateSystem(xAxis: string, yAxis: string) {
    this.ctx.strokeStyle = 'black';
    this.ctx.fillStyle = 'black';
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.moveTo(100, 100);
    this.ctx.lineTo(100, this.cheight - 100);
    this.ctx.lineTo(this.cwidth - 100, this.cheight - 100);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(this.cwidth - 100, this.cheight - 105);
    this.ctx.lineTo(this.cwidth - 100, this.cheight - 95);
    this.ctx.lineTo(this.cwidth - 80, this.cheight - 100);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.moveTo(95, 100);
    this.ctx.lineTo(105, 100);
    this.ctx.lineTo(100, 80);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.save();
    this.ctx.translate(90, 100);
    this.ctx.rotate(0.5235988);
    this.ctx.textAlign = 'right';
    this.ctx.fillText(yAxis, 0, 0);
    this.ctx.restore();
    this.ctx.save();
    this.ctx.translate(this.cwidth - 100, this.cheight - 80);
    this.ctx.rotate(-0.5235988);
    this.ctx.textAlign = 'right';
    this.ctx.fillText(xAxis, 0, 0);
    this.ctx.restore();
  }

  random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  randomColor() {
    return '#' + this.random(0, 250).toString(16).toUpperCase()
      + this.random(0, 250).toString(16).toUpperCase()
      + this.random(0, 250).toString(16).toUpperCase();
  }

  changeScale() {
    this.log = !this.log;
  }

  data() {
    this.graph.points.push({ x: 0, y: 2, stringx: '25. Feb' });
    this.graph.points.push({ x: 1, y: 2, stringx: '26. Feb' });
    this.graph.points.push({ x: 2, y: 4, stringx: '27. Feb' });
    this.graph.points.push({ x: 3, y: 5, stringx: '28. Feb' });
    this.graph.points.push({ x: 4, y: 10, stringx: '29. Feb' });
    this.graph.points.push({ x: 5, y: 10, stringx: '1. Mrz' });
    this.graph.points.push({ x: 6, y: 10, stringx: '2. Mrz' });
    this.graph.points.push({ x: 7, y: 18, stringx: '3. Mrz' });
    this.graph.points.push({ x: 8, y: 27, stringx: '4. Mrz' });
    this.graph.points.push({ x: 9, y: 37, stringx: '5. Mrz' });
    this.graph.points.push({ x: 10, y: 47, stringx: '6. Mrz' });
    this.graph.points.push({ x: 11, y: 74, stringx: '7. Mrz' });
    this.graph.points.push({ x: 12, y: 102, stringx: '8. Mrz' });
    this.graph.points.push({ x: 13, y: 112, stringx: '9. Mrz' });
    this.graph.points.push({ x: 14, y: 131, stringx: '10. Mrz' });
    this.graph.points.push({ x: 15, y: 182, stringx: '11. Mrz' });
    this.graph.points.push({ x: 16, y: 302, stringx: '12. Mrz' });
    this.graph.points.push({ x: 17, y: 504, stringx: '13. Mrz' });
    this.graph.points.push({ x: 18, y: 504, stringx: '14. Mrz' });
    this.graph.points.push({ x: 19, y: 800, stringx: '15. Mrz' });
    this.graph.points.push({ x: 20, y: 959, stringx: '16. Mrz' });
    this.graph.points.push({ x: 21, y: 1100, stringx: '17. Mrz' });
    this.graph.points.push({ x: 22, y: 1600, stringx: '18. Mrz' });
    this.graph.points.push({ x: 23, y: 1900, stringx: '19. Mrz' });
    this.graph.points.push({ x: 24, y: 2388, stringx: '20. Mrz' });
  }

}

interface Graph {
  points: Point[];
}

interface Point {
  x: number;
  stringx: string;
  y: number;
}
