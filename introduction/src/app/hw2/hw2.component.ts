import { Component } from '@angular/core';

@Component({
  selector: 'app-hw2',
  templateUrl: './hw2.component.html',
  styleUrl: './hw2.component.css',
})
export class Hw2Component {
  userName = '';

  onReset(event: any) {
    this.userName = '';
  }

  isEmpty() {
    if (this.userName == '') {
      return true;
    }
    return false;
  }
}
