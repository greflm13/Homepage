import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MinesweeperComponent, MinesweeperModalComponent, SaveComponent } from './minesweeper/minesweeper.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpgetService } from './httpget.service';
import { HttpputService } from './httpput.service';
import { FieldsizeService } from './fieldsize.service';

@NgModule({
  declarations: [AppComponent, MinesweeperComponent, MinesweeperModalComponent, SaveComponent],
  imports: [BrowserModule, NgbModule.forRoot(), FormsModule, HttpModule],
  providers: [HttpgetService, HttpputService, FieldsizeService],
  entryComponents: [MinesweeperModalComponent, SaveComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
