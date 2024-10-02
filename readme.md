https://github.com/juanpetterson/angular-the-complete-guide

# Chap 1: Intro

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
      <!-- <app-servers class="text-warning"></app-servers> --> # element selector
      <!-- <div app-servers class="text-warning"></div> --> # attribute selector
      <!-- <div class="app-servers text-warning"></div> --> # class selector
    </div>
  </div>
</div>

remark: attribute(intial values for dom) selector mostly used in directives(instruction of the dom)
```

- databinding: communincation between typescript and template

```
Code to template (output data) => string interpolation {{data}} , property binding [property]="data"
Template to code (Event binding) => (event)="expression"
Output data + react event (two way binding) => [(ngModel)]="data"

```

- string interpolation: can contain any single expression that can resolve a string e.g. {{2024}}, {{getString()}}
- property vs attribute

```
- Attributes: Set in the HTML and do not change unless updated in the DOM.
- Properties: Can be dynamically changed through JavaScript, and reflect the current state of the element.

<!-- Property Binding in Angular -->
<input [value]="name" /> //value is the property
<p [innerText]="allowNewServer"></p>

<!-- Attribute in Angular -->
<input value="{{name}}" /> // value="hello" is an attribute
```

- which is first constructor and property initialization

```
property initialization => constructor => ngOnInit
property initialization:
Good for setting default values that are static or don’t depend on any parameters or logic that the constructor might need.
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

- two way binding binds the event and output data of that element itself
- Directives are instruction of the dom

```
- components are directives with template
- Angular can create directives without template
e.g.
<p appTurnGreen>Receive a green background</p>

```

- ng-template vs ng-container
- Template variables: Allow you to reference elements or Angular components within the template. In this case, #noServer is a reference to the ng-template

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

# Chap 2: Start

- ng new recipe --no-strict --routing false --standalone false
- npm install bootstrap@3
- node_modules/bootstrap/dist/css/bootstrap.min.css
- ngclass vs class

```
    <div
      class="navbar-collapse"
      [ngClass]="{ collapse: collapsed }"
      (window:resize)="collapsed = true"
    >
    <div
      class="navbar-collapse"
      [class.collapse]="collapsed"
      (window:resize)="collapsed = true"
    >
```

# Chap 3

- component tag custom property (let property bindable for parent component)

```
  ### server-element.component.ts ###
  export class ServerElementComponent {
    @Input('srvElement') element: {
      type: string;
      name: string;
      content: string;
    };
  }

  ### app.component.html ###
    <div class="row">
    <div class="col-xs-12">
      <app-server-element
        *ngFor="let serverElement of serverElements"
        [srvElement]="serverElement"
      ></app-server-element>
    </div>
  </div>

```

- component tag custom event: (let event bindable for parent component)

```
  ### cockpit.component.ts ###
  export class CockpitComponent {
    @Output('svCreated') serverCreated = new EventEmitter<{
      serverName: string;
      serverContent: string;
    }>();

    newServerName = '';
    newServerContent = '';

    onAddServer() {
      this.serverCreated.emit({
        serverName: this.newServerName,
        serverContent: this.newServerContent,
      });
    }
  }

  ### app.component.html ###
  <app-cockpit
    (svCreated)="onServerAdded($event)"
  ></app-cockpit>

  ### app.component.ts ###
  onServerAdded(serverData: { serverName: string; serverContent: string }) {
    this.serverElements.push({
      type: 'server',
      name: serverData.serverName,
      content: serverData.serverContent,
    });
  }

```

- Angular gives same attribute to all elements in a component to enforce style encapsulation (F12)

```
@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrl: './server-element.component.css',
  // encapsulation:ViewEncapsulation.Emulated (default)
})
```

- access local reference in typescript using events

```
### html ###
<input type="text" class="form-control" #serverNameInput />
<button class="btn btn-primary" (click)="onAddServer(serverNameInput)">
      Add Server
</button>

### ts ###

  onAddServer(nameInput: HTMLInputElement) {
    this.serverCreated.emit({
      serverName: nameInput.value,
      serverContent: this.newServerContent,
    });
  }
```

- access local reference in typescript using @ViewChild()
- @ViewChild is a decorator that allows you to access a child component, directive, or DOM element from a parent component.

```
### html ###
<input type="text" class="form-control" #serverContentInput />

### ts ###
@ViewChild('serverContentInput') serverContentInput: ElementRef;

onAddServer(nameInput: HTMLInputElement) {
    this.serverCreated.emit({
      serverName: nameInput.value,
      serverContent: this.serverContentInput.nativeElement.value,
    });
  }
```

```
@ViewChild('serverContentInput') serverContentInput: ElementRef;

inside of ngOnInit(): {static: true}
outside of ngOnInit(): {static: false}  default
```

- projecting content from outside into components

```

  ### app.component.html ###
  <app-server-element
    *ngFor="let serverElement of serverElements"
    [srvElement]="serverElement"
  >
    <p>
      <strong *ngIf="serverElement.type === 'server'" style="color: red">{{
        serverElement.content
      }}</strong>
      <em *ngIf="serverElement.type === 'blueprint'">{{
        serverElement.content
      }}</em>
    </p>
  </app-server-element>

  ### server-element.component.html ###
  <div class="panel panel-default">
    <div class="panel-heading">{{ element.name }}</div>
    <div class="panel-body">
      <ng-content></ng-content>
    </div>
  </div>

```

- lifecycle

```
init phase: constructor -> ngOnChanges -> ngOnInit -> ngDoCheck -> ngAfterContent-> ngAfterContentChecked -> ngAfterViewInint-> ngAfterViewChecked
change phase: ngOnChanges -> ngDoCheck -> ngAfterContentChecked -> ngAfterViewChecked
```

- Besides ViewChild, there is also ContentChild in component.ts

```
inside of ngOnInit(): {static: true}
outside of ngOnInit(): {static: false}  default
```

# Chap 4

- attribute vs structural directives
- Dependency injection: Angular initializes for you (no need for manual instantiation due to same instance service)
- Directive also have life cycle (ngOnInit)

```
### basic-highlight.directive.ts ###

@Directive({
  selector: '[appBasicHighlight]'
})
export class BasicHighlightDirective implements OnInit {
  constructor(private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.elementRef.nativeElement.style.backgroundColor = 'green';
  }
}

### app.component.html ###
<p appBasicHighlight>Style me with basic directive!</p>

```

```
Both are equivalent:
 -  constructor(private elementRef: ElementRef) { }
 -  private elementRef: ElementRef;

    constructor(elementRef: ElementRef) {
      this.elementRef = elementRef;
    }
```

- accessing dom problem

```
# Direct DOM manipulation like elementRef.nativeElement.style will only work in a browser environment.
use this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue'); instead of this.elementRef.nativeElement.style.backgroundColor = 'blue';

# get the value is good, but setting directly is not suggest using elementRef
```

- hostListener (listen events)

```
export class BetterHighlightDirective implements OnInit {
  @Input() defaultColor: string = 'transparent';
  @Input() highlightColor: string = 'blue';

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');

  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent');
  }

}
```

- replacing rendering using @HostBinding (just like renderer, angular will deal the binding in its background)
- bind property and attributes

```

### better-highlight.directive.ts ###

export class BetterHighlightDirective implements OnInit {
  @Input() defaultColor: string = 'transparent';
  @Input() highlightColor: string = 'blue';
  @HostBinding('style.backgroundColor') backgroundColor: string;

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.backgroundColor = this.defaultColor;
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    this.backgroundColor = this.highlightColor;
  }
}
```

- Determine whether is property binding or not? (Answer:yes)

```
defaultColor="yellow"
```

- @hostListner vs @Output and Event Binding(let parent component to control the behavior.):

```
@HostListener('mouseenter') mouseover(eventData: Event) {
  this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
}

vs

@Output() mouseEnterEvent = new EventEmitter<void>();

@HostListener('mouseenter') onMouseEnter() {
  this.mouseEnterEvent.emit();
}

```

- attribute directive like ngClass with a value

```
      <p appBetterHighlight [highlightColor]="'red'" [defaultColor]="'yellow'">
        Style me with a better directive!
      </p>

      with
      @Input() highlightColor: string = 'blue';


      vs

      <p [appBetterHighlight]="'red'" [defaultColor]="'yellow'">
        Style me with a better directive!
      </p>

      with

      @Input('appBetterHighlight') highlightColor: string = 'blue';

```

- Create custom strucutral directive
- TemplateRef: Refers to the template (HTML content) you want to insert.
- ViewContainerRef: Refers to the place in the DOM where the template will be inserted or removed.

```
### direcitve.ts ###

@Directive({
  selector: '[appUnless]',
})
export class UnlessDirective {
  @Input() set appUnless(condition: boolean) {
    if (!condition) {
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      this.vcRef.clear();
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private vcRef: ViewContainerRef
  ) {}
}

### html ###

<div *appUnless="onlyOdd">
  <li
    class="list-group-item"
    [ngClass]="{ odd: even % 2 !== 0 }"
    [ngStyle]="{
      backgroundColor: even % 2 !== 0 ? 'yellow' : 'transparent'
    }"
    *ngFor="let even of evenNumbers"
  >
    {{ even }}
  </li>
</div>

```

# Chap5

- service is about centralize
- Basics (logging service)

```
### logging.service.ts ###
export class LoggingService {
  logStatusChange(status: string) {
    console.log('A server status changed, new status: ' + status);
  }
}

### new-account.component.ts ###
@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  providers: [LoggingService],
})
export class NewAccountComponent {
  constructor(private loggingService: LoggingService) {}
  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountAdded.emit({
      name: accountName,
      status: accountStatus,
    });
    this.loggingService.logStatusChange(accountStatus);
  }
}

```

- Basics (Data service)

```

### account.service.ts ###
export class AccountsService {
  accounts = [
    {
      name: 'Master Account',
      status: 'active',
    },
    {
      name: 'Testaccount',
      status: 'inactive',
    },
    {
      name: 'Hidden Account',
      status: 'unknown',
    },
  ];

  addAccount(name: string, status: string) {
    this.accounts.push({ name, status });
  }

  updateStatus(id: number, status: string) {
    this.accounts[id].status = status;
  }
}

### app.component.ts ### (the instance is for all child component only when using app component)
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AccountsService],
})
export class AppComponent implements OnInit {
  accounts: { name: string; status: string }[] = [];
  constructor(private accountsService: AccountsService) {}
  ngOnInit() {
    this.accounts = this.accountsService.accounts;
  }
}


### new-account.component.ts ### (no AccountsService in providers)
import { Component, EventEmitter, Output } from '@angular/core';
import { LoggingService } from '../logging.service';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  providers: [LoggingService],
})
export class NewAccountComponent {
  constructor(
    private loggingService: LoggingService,
    private accountsService: AccountsService
  ) {}

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountsService.addAccount(accountName, accountStatus);
    this.loggingService.logStatusChange(accountStatus);
  }
}

```

- Injecting a service to a service

```
@Injectable() // injectable (loggingService)
export class AccountsService {
  accounts = [
    {
      name: 'Master Account',
      status: 'active',
    }
  ];

  constructor(private loggingService: LoggingService) {}

  addAccount(name: string, status: string) {
    this.accounts.push({ name, status });
    this.loggingService.logStatusChange(status);
  }

  updateStatus(id: number, status: string) {
    this.accounts[id].status = status;
    this.loggingService.logStatusChange(status);
  }
```

- cross component injection with service and EventEmitter
- even it is global, changes to the properties of the service won't automatically trigger re-rendering of components that use it.

```

### accounts.service.ts ###
@Injectable()
export class AccountsService {
  accounts = [
    {
      name: 'Master Account',
      status: 'active',
    }
  ];

  statusUpdated = new EventEmitter<string>();

  constructor(private loggingService: LoggingService) {}

  addAccount(name: string, status: string) {
    this.accounts.push({ name, status });
    this.loggingService.logStatusChange(status);
  }

  updateStatus(id: number, status: string) {
    this.accounts[id].status = status;
    this.loggingService.logStatusChange(status);
  }
}

### account.component.ts ###
export class AccountComponent {
  onSetTo(status: string) {
    this.accountService.updateStatus(this.id, status);
    // this.loggingService.logStatusChange(status);
    this.accountService.statusUpdated.emit(status);
  }
}

### new-account.component.ts ###
export class NewAccountComponent {
  constructor(
    private accountsService: AccountsService
  ) {
    this.accountsService.statusUpdated.subscribe((status: string) =>
      alert('New status: ' + status)
    );
  }
  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountsService.addAccount(accountName, accountStatus);

  }
}


## another solution: @Injectable({ providedIn: 'root' }) to all services and no providers in app.module.ts
```

- pushing data methods: 1.directly 2. new EventEmitter (sometimes you do not want to directly update original value)

```
export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngredients() {
    // return this.ingredients; //ok
    return this.ingredients.slice(); // work with copy array
  }

  addIngredient(ingredient: Ingredient) {
    // this.ingredients.push(ingredient); //ok
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {

    this.ingredients.push(...ingredients);
    this.ingredientsChanged.emit(this.ingredients.slice());
    console.log(this.ingredients);
  }
}
```

- functions of getting properties of services should be called in the correct component

# Chap6

- Setting routers basic

```
### app.module.ts ###

// create app_routes
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'servers',
    component: ServersComponent,
  },
];

// import RouteModule
imports: [BrowserModule, FormsModule, RouterModule.forRoot(appRoutes)],

### app.component.html ###
<router-outlet></router-outlet>
```

- Navigating with Router Links (routerLink prevent the default of sending request to the server,thus no refresh occurs)
- why /? ans: absolute path
- e.g. relative path: ./server ,server

```
    <li role="presentation"><a routerLink="/servers">Servers</a></li>
    <li role="presentation"><a [routerLink]="['/users']">Users</a></li>
```

- Styling Active Router Links

```
<li
  role="presentation"
  routerLinkActive="active"
  [routerLinkActiveOptions]="{ exact: true }"
>
  <a routerLink="/">Home</a>
</li>
<li role="presentation" routerLinkActive="active">
  <a routerLink="/servers">Servers</a>
</li>
<li role="presentation" routerLinkActive="active">
  <a [routerLink]="['/users']">Users</a>
</li>
```

- Navigating Programmatically

```
### home.component.html ####
<button class="btn btn-primary" (click)="onLoadServers()">Load Server</button>

### home.component.ts### (import router)
export class HomeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  onLoadServers() {
    this.router.navigate(['/servers']);
  }
}
```

- this.router.navigate does not recoginize relative path
- import ActivatedRoute

```
  constructor(
    private serversService: ServersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onReload() {
    <!-- this.router.navigate(['/servers'], { relativeTo: this.route }); -->
  }
```

- getting parameters from route (route parameter)

```
### app.module.ts ###
const appRoutes: Routes = [
  {
    path: 'users/:id/:name',
    component: UserComponent,
  },
];

### user.component.ts ###
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user: { id: number; name: string };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name'],
    };
  }
}
```

- async tasks: subscribing to something that might happen in the future, and once that event occurs, a piece of code will execute in response.
- observables work with async tasks
- if we are in the same component , the route will not work
- this.route.params is a observables

```
export class UserComponent implements OnInit {
  user: { id: number; name: string };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name'],
    };
    this.route.params.subscribe((params: Params) => {
      this.user.id = params['id'];
      this.user.name = params['name'];
    });
  }
}
```

- Delete subscription
- add paramsSubscription: Subscription

```
export class UserComponent implements OnInit, OnDestroy {
  user: { id: number; name: string };
  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name'],
    };
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.user.id = params['id'];
      this.user.name = params['name'];
    });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
```

- passing query parameters and navigating programmatically

```
### servers.component.html ###
<a
  [routerLink]="['/servers', 5, 'edit']"
  [queryParama]="{ allowEdit: '1' }"
  fragment="loading"
  class="list-group-item"
  *ngFor="let server of servers"
>
  {{ server.name }}
</a>

<hr>

### home.component.html ###

<button class="btn btn-primary" (click)="onLoadServers(1)">Load Server</button>

### home.component.ts ###

export class HomeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  onLoadServers(id: number) {
    this.router.navigate(['/servers', id, 'edit'], {
      queryParams: { allowEdit: '1' },
      fragment: 'loading',
    });
  }
}

```

- getting parameters from route (query parameter)

```
    ### edit-server.component.ts ###
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);
    this.route.queryParams.subscribe();
    this.route.fragment.subscribe();
```

- nested routes basics

```

### app.modules.ts ###
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'users',
    component: UsersComponent,
    children: [
      {
        path: ':id/:name',
        component: UserComponent,
      },
    ],
  },
]

### users.component.ts ###
add <router-outlet><router-outlet/>
```

- queryParams preserve

```
### server.component.ts### (navigating programmatically)
  onEdit() {
    this.router.navigate(['edit'], {
      relativeTo: this.route,
      queryParamsHandling: 'preserve',
    });
  }

### edit-server.component.ts ### (allowEdit=false)
export class EditServerComponent implements OnInit {
  server: { id: number; name: string; status: string };
  serverName = '';
  serverStatus = '';
  allowEdit = false;

  constructor(
    private route: ActivatedRoute,
    private serversService: ServersService
  ) {}

  ngOnInit() {
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);
    this.route.queryParams.subscribe((queryParams: Params) => {
      console.log('sds', queryParams['allowEdit']);
      this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
    });
    this.route.fragment.subscribe();
    this.server = this.serversService.getServer(1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.serverName,
      status: this.serverStatus,
    });
  }
}
```

- redirecting and wildcard Routes
- path matching with component vs redirect
- the difference is that components allow for more specific matching, while redirects tend to match everything starting with the given path, unless you explicitly tell them to match fully.

```
const appRoutes: Routes = [ ...
  {
    path: 'not-found',
    component: PageNotFoundComponent,
  },
  {
    path: '**',
    redirectTo: '/not-found',
  },
];
```

- app-routing.module.ts

```
### app.module.ts ###
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    ServersComponent,
    UserComponent,
    EditServerComponent,
    ServerComponent,
    PageNotFoundComponent,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule], // load AppRoutingModule
  providers: [ServersService],
  bootstrap: [AppComponent],
})
export class AppModule {}

### app-routing.module.ts ###
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule], // config RouterModule
})
export class AppRoutingModule {}

```

- route accessing guard
- protecting routes with guard (whole route)
- login logic in service
- the auth guard will be failed if insert by url (this may be fix in the later course)

```
1. Create ### auth.service.ts ###
2. Create ### auth-guard.service.ts ### with canActivate

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticated().then((authenticated: boolean) => {
      if (authenticated) {
        return true;
      } else {
        this.router.navigate(['/']);
        return false;
      }
    });
  }

3. Add AuthGuard in ### app.module.ts ###

{
  path: 'servers',
  canActivate: [AuthGuard],
  component: ServersComponent,
  children: [
    {
      path: ':id',
      component: ServerComponent,
    },
    {
      path: ':id/edit',
      component: EditServerComponent,
    },
  ],
},
4. Add services in providers ### app.module.ts###
providers: [ServersService, AuthService, AuthGuard],

```

- only child routes protected (child routes)

```
### auth-guard.service.ts ###
 canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }

### app-routing.module.ts ###
{
  path: 'servers',
  canActivateChild: [AuthGuard],
  component: ServersComponent,
  children: [
    {
      path: ':id',
      component: ServerComponent,
    },
    {
      path: ':id/edit',
      component: EditServerComponent,
    },
  ],
},
```

- route deactive guard
- deactivate logic in the component

```
### app.module.ts ###

providers: [ServersService, AuthService, AuthGuard, CanDeactivateGuard],

### can-deactive-guard.service.ts ###

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export class CanDeactivateGuard
  implements CanDeactivate<CanComponentDeactivate>
{
  canDeactivate(
    component: CanComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivate();
  }
}

### app-routing.module.ts ###
{
  path: 'servers',
  canActivateChild: [AuthGuard],
  component: ServersComponent,
  children: [
    {
      path: ':id',
      component: ServerComponent,
    },
    {
      path: ':id/edit',
      component: EditServerComponent,
      canDeactivate: [CanDeactivateGuard],
    },
  ],
},

### edit-server.component.ts ###

canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
  if (!this.allowEdit) {
    return true;
  }
  if (
    (this.serverName !== this.server.name ||
      this.serverStatus !== this.server.status) &&
    !this.changesSaved
  ) {
    return confirm('Do you want to discard the changes?');
  } else {
    return true;
  }
}
```

- Passing static data through route

```
### app-routing.module.ts ###
{
  path: 'not-found',
  component: ErrorPageComponent,
  data: { message: 'Page not found!' },
},


### error-page.component.ts ###
export class ErrorPageComponent implements OnInit {
  errorMessage: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // this.errorMessage = this.route.snapshot.data['message'];
    this.route.data.subscribe((data: Data) => {
      this.errorMessage = data['message'];
    });
  }
  }
```

- resolver: run code before a route is render
- the alternative method is to load in the OnInit method
- the resolver will always run when rerendering unlike component need to subscribe
- passing dynamic data through route

```
### app.module.ts ###
  providers: [ServersService,AuthService,AuthGuard,CanDeactivateGuard,ServerResolver,],

### app.routing.modules.ts ###
  {
    path: 'servers',
    canActivateChild: [AuthGuard],
    component: ServersComponent,
    children: [
      {
        path: ':id',
        component: ServerComponent,
        resolve: { server: ServerResolver },
      },
      {
        path: ':id/edit',
        component: EditServerComponent,
        canDeactivate: [CanDeactivateGuard],
      },
    ],
  },

### server-resolver.service.ts ###
interface Server {
  id: number;
  name: string;
  status: string;
}

@Injectable()
export class ServerResolver implements Resolve<Server> {
  constructor(private serversService: ServersService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Server> | Promise<Server> | Server {
    return this.serversService.getServer(+route.params['id']);
  }
}

### server.component.ts ###
  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      this.server = data['server'];
    });
    //   const id = +this.route.snapshot.params['id'];
    //   this.server = this.serversService.getServer(id);
    //   this.route.params.subscribe((params: Params) => {
    //     this.server = this.serversService.getServer(+params['id']);
    //   });
  }
```

- services: logging, data, auth-guard, can-deactivate-guard, resolver
- The server has to be configured in a way that it serves the index.html instead of a 404 page in each case an unknown url is requested, so that Angular's router can handle the correct routing

```
// Fallback to index.html for unknown routes using express
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/angular-app/index.html'));
});
```

- Angular route observable clean out by default
- Angular change detection mechanism, Zone js and service thoughts
- Angular change detection mechanism is only suitable for @Input decorator, @Output decorator and DOM events

```
1. zone.js detects an event (like an API response)
2. Angular starts change detection at the root (AppComponent)
3. Angular checks each child component in the tree
4. If it finds a change, it updates the UI for that component
5. If no observable and event triggers,changes to a service's property  (even in a component-specific service)  may not be reflected in the UI.

```
