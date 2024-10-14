import { Component } from '@angular/core';

@Component({
  selector: 'app-testng-template',
  templateUrl: './testng-template.component.html',
  styleUrl: './testng-template.component.css',
})
export class TestngTemplateComponent {
  users = [
    { name: 'John Doe', age: 20 },
    { name: 'Jane Doe', age: 21 },
    { name: 'Bob Smith', age: 22 },
  ];
}
