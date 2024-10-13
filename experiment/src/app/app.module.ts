import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChangedetectiontestComponent } from './changedetectiontest/changedetectiontest.component';
import { DetectionServiceService } from './changedetectiontest/detection-service.service';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [AppComponent, ChangedetectiontestComponent, CardComponent],
  imports: [BrowserModule],
  providers: [DetectionServiceService],
  bootstrap: [AppComponent],
})
export class AppModule {}
