import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('contentParagraph') paragraph: ElementRef;
  oddNumbers: number[] = [];
  evenNumbers: number[] = [];

  serverElements = [
    { type: 'server', name: 'serverName', content: 'serverContent' },
  ];

  ngOnInit() {
    console.log('app.ts ngOnInit called');
  }

  onServerAdded(serverData: { serverName: string; serverContent: string }) {
    this.serverElements.push({
      type: 'server',
      name: serverData.serverName,
      content: serverData.serverContent,
    });
  }

  onBlueprintAdded(bluePrintData: {
    serverName: string;
    serverContent: string;
  }) {
    this.serverElements.push({
      type: 'blueprint',
      name: bluePrintData.serverName,
      content: bluePrintData.serverContent,
    });
  }

  onChangeFirst() {
    this.serverElements[0].name = 'Changed!';
  }
  onDestroyFirst() {
    this.serverElements.splice(0, 1);
  }

  ngAfterViewInit(): void {
    console.log('app.ts ngAfterViewInit called');
    console.log(
      '- app.ts ngAfterViewInit',
      this.paragraph.nativeElement.textContent
    );
  }

  onIntervalFired(firedNumber: number) {
    if (firedNumber % 2 === 0) {
      this.evenNumbers.push(firedNumber);
    } else {
      this.oddNumbers.push(firedNumber);
    }
  }
}
