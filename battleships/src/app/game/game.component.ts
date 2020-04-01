import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'battleships-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  public playerField: Game = { rows: [] };

  constructor() { }

  ngOnInit(): void {
    for (let j = 0; j < 10; j++) {
      const row: Field[] = [];
      for (let i = 0; i < 10; i++) {
        row.push({ x: j, y: i, ship: false, highlight: 'white' });
      }
      this.playerField.rows.push({ fields: row });
    }
    console.log(this.playerField);
  }

  drop(ev, x, y) {
    ev.preventDefault();
    const ship = ev.dataTransfer.getData('text');
    // ev.target.appendChild(document.getElementById(ship));
    this.shipHighlight(ship, x, y, 'white');
    document.getElementById(ship).style.display = 'none';
  }

  allowDrop(ev, x, y) {
    ev.preventDefault();
    const ship = ev.dataTransfer.getData('text');
    this.shipHighlight(ship, x, y, 'blue');
  }

  leaveDrop(ev, x, y) {
    const ship = ev.dataTransfer.getData('text');
    this.shipHighlight(ship, x, y, 'white');
  }

  drag(ev) {
    ev.dataTransfer.setData('text', ev.target.id);
    console.log(ev.target.id);
  }

  shipHighlight(ship: string, x: number, y: number, color: string) {
    if (ship === 'ship0' || ship === 'ship1' || ship === 'ship2' || ship === 'ship3') {
      if (y === 9) {
        this.playerField.rows[x].fields[y].highlight = color;
        this.playerField.rows[x].fields[y - 1].highlight = color;
      } else {
        this.playerField.rows[x].fields[y].highlight = color;
        this.playerField.rows[x].fields[y + 1].highlight = color;
      }
    }
    if (ship === 'ship4' || ship === 'ship5' || ship === 'ship6') {
      if (y === 9) {
        this.playerField.rows[x].fields[y].highlight = color;
        this.playerField.rows[x].fields[y - 1].highlight = color;
        this.playerField.rows[x].fields[y - 2].highlight = color;
      } else if (y === 0) {
        this.playerField.rows[x].fields[y].highlight = color;
        this.playerField.rows[x].fields[y + 1].highlight = color;
        this.playerField.rows[x].fields[y + 2].highlight = color;
      } else {
        this.playerField.rows[x].fields[y].highlight = color;
        this.playerField.rows[x].fields[y + 1].highlight = color;
        this.playerField.rows[x].fields[y - 1].highlight = color;
      }
    }
  }

  addship() { }

}

interface Field {
  x: number;
  y: number;
  ship: boolean;
  highlight: string;
}

interface Row {
  fields: Field[];
}

interface Game {
  rows: Row[];
}