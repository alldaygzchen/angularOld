import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
  ContentChild,
} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrl: './server-element.component.css',
  // encapsulation:ViewEncapsulation.Emulated
})
export class ServerElementComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  @Input('srvElement') element: {
    type: string;
    name: string;
    content: string;
  };
  @Input() name: string;
  @ViewChild('heading') header: ElementRef;
  @ContentChild('contentParagraph') paragraph: ElementRef;

  constructor() {
    console.log('constructor called');
  }
  // called after a bound input property changes
  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges called');
    console.log(changes);
  }

  ngOnInit() {
    console.log('ngOnInit called');
  }
  // couple time in develop mode
  ngDoCheck(): void {
    console.log('ngDoCheck called');
  }
  ngAfterContentInit(): void {
    console.log('ngAfterContentInit called');
    console.log(
      '- ngAfterContentInit',
      this.paragraph.nativeElement.textContent
    );
  }
  // couple time in develop mode
  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked called');
    console.log(
      '- ngAfterContentChecked',
      this.paragraph.nativeElement.textContent
    );
  }
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit called');
    console.log('- ngAfterViewInit', this.header.nativeElement.textContent);
  }
  // couple time in develop mode
  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked called');
    console.log('- ngAfterViewChecked ', this.header.nativeElement.textContent);
  }
  ngOnDestroy(): void {
    console.log('ngOnDestroy called');
  }
}
