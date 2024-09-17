- ng new my-project --standalone false
- app.module.ts (bootstrap): which component should you aware when the whole application starts
- app.module.ts (declarations): components, directives, pipe
- app.module.ts (imports): modules
- with standalone: true and import => components do not have to added to any @ngModule
- we can still add css in the custom component still works
- app.component.ts (style): id does not work

```
### app.component.html ###
<div class="container">
  <div class="row">
    <div class="col-xs-12">
      <h3 class="text-primary">I'm in the App component</h3>
      <hr />
      <!-- <app-servers class="text-warning"></app-servers> --> #all works
      <!-- <div app-servers class="text-warning"></div> --> #all works
      <!-- <div class="app-servers text-warning"></div> --> #all works
    </div>
  </div>
</div>


```

- databinding: communincation between typescript and template

```
Code to template (output data) => string interpolation {{data}} , property binding [property]="data"
Event binding (react to user events) => (event)="expression"
Output data + react event (two way binding) => [(ngModel)]="data"

```

- string interpolation: can contain any single expression that can resolve to a string {{2024}}
- property vs attribute

```
- Attributes: Set in the HTML and do not change unless updated in the DOM.
- Properties: Can be dynamically changed through JavaScript, and reflect the current state of the element.

<!-- Property Binding in Angular -->
<input [value]="name" /> //value is the property

<!-- Attribute in Angular -->
<input value="{{name}}" /> // value="hello" is an attribute
```

- which is first constructor and property initialization

```
property initialization => constructor => ngOnInit
```

- type annotation vs type assertion

```
let a: string = "hello"; // Type annotation
let unknownValue: any = "Hello, World!";
let greeting: string = unknownValue as string; // Type assertion

```

- event binding (template to code)

```
- html click event are onclick while angular is (click)

-

### servers.component.html ###
<input type="text" class="form-control" (input)="onUpdateServerName($event)" />

### servers.component.ts ###
onUpdateServerName(event: any) {
    // console.log(event);
    this.serverName = (event.target as HTMLInputElement).value;
    // this.serverName = event.target.value;
  }
```

- two way binding binds the event and output data of that element
- Directives are instruction of the dom

```
- components are directives with template
- Angular can create directives without template
e.g.
<p appTurnGreen>Receive a green background</p>

```

- ng-template vs ng-container
- Template variables in Angular allow you to reference elements or Angular components within the template. In this case, #noServer is a reference to the <ng-template>

```
- directives: structural directives and attribute directives

- the following are structural directives
// the ng-template itself remains in the DOM as a hidden template, but its content (the <p> tag) is not rendered.
<ng-template [ngIf]="isVisible">
  <p>This content will render if isVisible is true</p>
</ng-template>

//If isVisible is false, nothing will appear in the DOM at all.
<ng-container *ngIf="isVisible">
  <p>This content will render if isVisible is true</p>
</ng-container>
```

- examples for else if using \*ngIf

```
<div *ngIf="status === 'loading'; else checkError">
  <p>Loading...</p>
</div>

<ng-template #checkError>
  <div *ngIf="status === 'error'; else successTemplate">
    <p>Error occurred while loading data.</p>
  </div>
</ng-template>

<ng-template #successTemplate>
  <div *ngIf="status === 'success'">
    <p>Data loaded successfully!</p>
  </div>
</ng-template>
```

- binding a property to directive

```
<p
  [ngStyle]="{ backgroundColor: getColor() }"
  [ngClass]="{ online: serverStatus === 'online' }"
>
  {{ 2024 }} server with ID:{{ serverId }} is {{ getServerStatus() }}
</p>

```

- why ngIf and ngFor do not need property binding

```
<div *ngIf="condition">Hello</div>

<ng-template [ngIf]="condition">
  <div>Hello</div>
</ng-template>

```

- \*ngFor example

```
<button class="btn btn-primary" (click)="addNumber()">Display details</button>
<p *ngIf="showDetails">{{ details }}</p>
<div
  *ngFor="let content of contents"
  [ngStyle]="{ color: getColor(content) }"
  [ngClass]="{ overFiveColor: content > 5 }"
>
  {{ content }}
</div>

<div
  *ngFor="let content of contents; let i = index"
  [ngStyle]="{ color: getColor(i + 1) }"
  [ngClass]="{ overFiveColor: i + 1 > 5 }"
>
  {{ content }}
</div>

```
