# Understanding Directives

## Types of Directives

### Attribute Directives

- Looks like a normal HTML attribute (possibly with databinding or event binding)
- Only affect/ change the element they are added to.

### Structural Directives

- Looks like a normal HTML attribure but have a leading \*
- Affect a whole area in the DOM (elements get added/ removed)

## Built-in Directives

### ngFor & ngIf

Syntax: `*ngIf="statement"`<br>
ngIf is used for outputting data conditionally.<br>
The statement is an boolean of an expression that returns a boolean.

Syntax: `*ngFor="let element of array"`<br>
ngFor is used to loop over an array and display elements for each element in the array

### ngClass & ngStyle

Syntax: `[ngStyle]="statement"`<br>
ngStyle is used for setting styles dynamically.

Syntax: `[ngClass]="statement"`<br>
ngClass is used for setting CSS classes dynamically.

The [] indicates that we want to bind to some property on that directive, and this property has the same name as the directive.

### ngSwitch

Syntax:

```
  <div [ngSwitch]="value">
    <p *ngSwitchCase="5">Value is 5</p>
    <p *ngSwitchCase="10">Value is 10</p>
    <p *ngSwitchCase="100">Value is 100</p>
    <p *ngSwitchDefault>Value is Default</p>
```

## Custom Directives

### Creating a Directive

You can create a directive manually or with the CLI.<br>
When using the manual approach, register the directive in _app.module.ts_ under the declarations array.

Syntax: `ng g d directive-name`.

```
  import { Directive } from "@angular/core";

  @Directive({
    selector: '[appDirectiveName]'
  })
  export class DirectiveName {

    constructor() {}

  }
```

### Custom Attribute Directives

- ElementRef => Reference to the element where the directive is placed on
- Renderer2 => Using a renderer is the best way for accessing the DOM.
- HostListener => Method Decorator to listen to an event on the host element
- HostBinding => Property Decorator to bind to a property of the host element

### Custom Structural Directives

- TemplateRef => Reference to the content that can be used to instantiate embedded views
- ViewContainerRef => Represents a container where one or more views can be attached to a component
