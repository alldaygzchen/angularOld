//test1: works since manually fetch updated data

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// export class DetectionServiceService {
//   public data = 'initial data';
//   changeData(newData: string) {
//     this.data = newData;
//   }
// }

//test1: works since angular change detection mechanism
// export class DetectionServiceService {
//   data = ['hello', 'world'];

//   changeData(index: number, newData: string) {
//     this.data[index] = newData;
//   }
// }

//test3: recommend approach without services
// export class DetectionServiceService {
//   data = ['hello', 'world'];

//   getData(): string[] {
//     return [...this.data];
//   }

//   changeData(index: number, newData: string) {
//     this.data[index] = newData;
//   }
// }

//test4: recommend approach with services
@Injectable({
  providedIn: 'root',
})
export class DetectionServiceService {
  private dataSubject = new BehaviorSubject<string[]>(['hello', 'world']);
  data$ = this.dataSubject.asObservable();

  changeData(index: number, newData: string): void {
    const currentData = this.dataSubject.getValue();
    const updatedData = [...currentData];
    updatedData[index] = newData;
    this.dataSubject.next(updatedData);
  }
}
