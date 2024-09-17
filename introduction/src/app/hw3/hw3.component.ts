import { Component } from '@angular/core';
import { bufferToggle } from 'rxjs';

@Component({
  selector: 'app-hw3',
  templateUrl: './hw3.component.html',
  styleUrl: './hw3.component.css',
})
export class Hw3Component {
  details = 'display details';
  showDetails = false;
  contents: number[] = [];
  addedContent = 0;

  addNumber() {
    this.addedContent = this.addedContent + 1;
    this.contents.push(this.addedContent);
    this.showDetails = !this.showDetails;
  }

  getColor(content: number): string {
    if (content > 5) {
      return 'blue';
    }
    return 'black';
  }
}
