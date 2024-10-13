import { Component, OnDestroy, OnInit } from '@angular/core';
import { DetectionServiceService } from './detection-service.service';
import { Subscription } from 'rxjs';
// test1: works since manually fetch updated data
// @Component({
//   selector: 'app-changedetectiontest',
//   templateUrl: './changedetectiontest.component.html',
//   styleUrl: './changedetectiontest.component.css',
// })
// export class ChangedetectiontestComponent {
//   // Manually fetch updated data
//   currentData: string;

//   constructor(public detectionService: DetectionServiceService) {
//     // Manually fetch updated data
//     this.currentData = this.detectionService.data;
//   }

//   updateData() {
//     this.detectionService.changeData('Updated Data');

//     // Manually fetch updated data
//     // this.currentData = this.detectionService.data;
//   }
// }

//test2: works since angular change detection mechanism
// @Component({
//   selector: 'app-changedetectiontest',
//   templateUrl: './changedetectiontest.component.html',
//   styleUrl: './changedetectiontest.component.css',
// })
// export class ChangedetectiontestComponent {
//   data: string[];

//   constructor(public detectionService: DetectionServiceService) {
//     this.data = this.detectionService.data;
//   }

//   updateData() {
//     this.detectionService.changeData(1, 'Updated Data');
//   }
// }

//test3: recommend approach without services
// @Component({
//   selector: 'app-changedetectiontest',
//   templateUrl: './changedetectiontest.component.html',
//   styleUrl: './changedetectiontest.component.css',
// })
// export class ChangedetectiontestComponent {
//   data: string[];

//   constructor(public detectionService: DetectionServiceService) {
//     this.data = this.detectionService.getData();
//   }

//   updateData() {
//     this.detectionService.changeData(1, 'Updated Data');
//     this.data = this.detectionService.getData();
//   }
// }

//test4: recommend approach with services
@Component({
  selector: 'app-changedetectiontest',
  templateUrl: './changedetectiontest.component.html',
  styleUrls: ['./changedetectiontest.component.css'],
})
export class ChangedetectiontestComponent implements OnInit, OnDestroy {
  data: string[];
  subscription: Subscription;

  constructor(public detectionService: DetectionServiceService) {}

  ngOnInit() {
    this.subscription = this.detectionService.data$.subscribe((data) => {
      this.data = data;
    });
  }

  updateData() {
    this.detectionService.changeData(1, 'Updated Data');
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
