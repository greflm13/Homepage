import { Directive, Input, ElementRef, OnInit, OnChanges, DoCheck } from '@angular/core';

@Directive({
  selector: '[autofocus]'
})
export class AutofocusDirective implements OnInit, OnChanges, DoCheck {
  @Input()
  appAutofocus: boolean;
  private el: any;

  constructor(private elementRef: ElementRef) {
    this.el = this.elementRef.nativeElement;
  }

  ngOnInit() {
    this.el.focus();
  }

  ngOnChanges() {
    this.el.focus();
  }

  ngDoCheck() {
    // this.el.focus();
  }
}
