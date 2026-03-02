import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MinesweeperComponent, MinesweeperModalComponent, SaveComponent } from './minesweeper/minesweeper.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpgetService } from './httpget.service';
import { HttpputService } from './httpput.service';
import { FieldsizeService } from './fieldsize.service';

@NgModule({
    declarations: [AppComponent, MinesweeperComponent, MinesweeperModalComponent, SaveComponent],
    imports: [BrowserModule, NgbModule, FormsModule],
    providers: [HttpgetService, HttpputService, FieldsizeService],
    bootstrap: [AppComponent]
})
export class AppModule {}
