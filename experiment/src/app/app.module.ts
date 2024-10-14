import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChangedetectiontestComponent } from './changedetectiontest/changedetectiontest.component';
import { DetectionServiceService } from './changedetectiontest/detection-service.service';
import { CardComponent } from './card/card.component';
import { TestngTemplateComponent } from './testng-template/testng-template.component';
import { TestngmenuComponent } from './testngmenu/testngmenu.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    ChangedetectiontestComponent,
    CardComponent,
    TestngTemplateComponent,
    TestngmenuComponent,
  ],
  imports: [BrowserModule, MatMenuModule, MatIconModule],
  providers: [
    DetectionServiceService,
    provideAnimationsAsync(),
    provideAnimationsAsync('noop'),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
