# Understanding Components & Databinding

## Splitting Apps into Components

It's not ideal to have all the logic in one Component.<br>
Splitting it up helps to improve maintainability and let you reuse that Component.<br>
You can create Components with the CLI: `ng g c Component-name --skipTests true`

When you use different Components, you (probably) need to pass data between them.

## Property & Event Binding

An overview:

- HTML Elements => Native Properties & Events
- Directives => Custom Properties & Events
- Components => Custom Properties & Events

### Binding to Custom Properties

In the TypeScript file of the Child Component, we define a propety as an input:

```
  @Input() element;
```

We can now bind to this property in the template file of the Parent Component.

```
  [element]="..."
```

The Input decorator must be imported from @angular/core.<br>
This allows you that parent Components can bind to this property because they aren't accessible for other Components by default.

### Binding to Custom Events

In the TypeScript file of the Child Component:

```
  @Output() serverCreated = new EventEmitter<...>();

  ...

  onAddServer() {
    this.serverCreated.emit({...});
  }
```

In the template file of the Parent Component, we set up an listener for this event:

```
  (serverCreated)="onServerAdded($event)"
```

The Output decorator and EventEmitter must be imported from @angular/core.<br>
The method to handle the event (onServerAdded in this example) must be implemented in the parent Component's TypeScript file.

## View Encapsulation

Default CSS behaviour: No matter in which CSS-file you define a rule, it will be applied to the whole document.<br>
**=> Angular changes that default behaviour!**<br>
The CSS-files in Angular have the goal of encapsulating styles for the Component they belong to.<br>
How is this done? Angular gives all the elements in a Component the same attribute

```
  p {                           p [_ngcontent-ejo-c1] {
    color: blue;       =>         color: blue;
  }                             }
```

This is the default behaviour of View Encapsultation in Angular.<br>
The behaviour can be changed in the TypeScript file of a Component

```
  @Component({
    ...
    encapsulation: ViewEncapsulation.Emulated
  })
  export class ClassName {
    ...
  }
```

You have 3 options for the ViewEncapsulation

- ViewEncapsulation.Emulated
  - Default behaviour
- ViewEncapsulation.ShadowDom
  - Uses the shadow-DOM
  - Has the same effect as Emulated
  - Not supported by all browsers
- ViewEncapsulation.None
  - The syles of the Component are applied globally

## Lifecycle Hooks

Angular supports a couple of lifecycle hooks:

- **ngOnChanges** => Calles after a bound input property changes
- **ngOnInit** => Called once the Component is initialized
- **ngDoCheck** => Called during every change detection run
- **ngAfterContentInit** => Called after content (ng-content) has been projected into view
- **ngAfterContentChecked** => Calles every time the projected content has been checked
- **ngAfterViewInit** => Called after the Component's view (and child views) has been initialized
- **ngAfterViewChecked** => Called every time the view (and child views) have been checked
- **ngOnDestroy** => Called once the Component is about to be destroyed

**Use Interfaces**<br>
To use a lifecycle hook, you have to implement the corresponding interface.

```
  export class ServerElementComponent implements OnInit {
    ...

    ngOnInit(): void {
      ...
    }
  }
```

**ngOnChanges**<br>
ngOnChanges is the only lifecycle hook that receives an argument. It is an object with information about the change.

```
  ngOnChanges(changes: SimpleChanges): void {
    ...
  }
```

**ngAfterViewInit**<br>
AfterViewInit gives you access to the template elements. You can then access them and use their values and so on.<br>
Before this hook has been reached, you can't do that because the elements aren't rendered yet.

## Local References, Template Access and Projecting Content

### Local References

Template of a Component:

```
  <input
    ...
    #serverNameInput>
  <button
    ...
    (click)="onAddServer(serverNameInput)">
    Add Server
  </button>
```

The serverNameInput holds now a local reference to the input-element. In the onAddServer method in the TypeScript file of the Component, we can work with that input-element.

```
  onAddServer(nameInput: HTMLInputElement) {
    // you can use: nameInput.value
    ...
  }
```

**Important note:** A local reference is only available in the template where it is created.

### Template & DOM Access with @ViewChild

In the template file of a Component

```
  <input
    ...
    #serverContentInput>
```

Now we can direct access this element in the TypeScript file of the Component

```
  @ViewChild('serverContentInput, { static: true }) contentInput: ElementRef;

  ...

  onAddServer() {
    // you can use: this.contentInput.nativeElement.value
    ...
  }
```

In Angular 8+ you have to add { static: true } as a second argument to ALL usages of @ViewChild() (and also @ContentChild()) IF you plan on accessing the selected element inside of ngOnInit().<br>
If you DON'T access the selected element in ngOnInit (but anywhere else in your Component), set static: false instead!

**Important note:** Don't use this to update elements in the DOM, only to read some data.

### Projecting Content into Components with ng-content

**Important note:** Everthing you place between the opening and closing tag of your Component is lost by default.<br>
Parent Component's template file

```
  <app-server-component>
    <p #contentParagraph>
      ...
    </p>
  </app-server-component>
```

We can now project the HTML code between the tags into the template file of the Child Component:

```
  <ng-content></ng-content>
```

ng-content serves as a hook in your Component to mark the place for Angular where it should add any content it finds between the opening and closing tag. In the TypeScript file of the child Component, we can get access to this content:

```
  @ContentChild('contentParagraph', { static: true }) paragraph: ElementRef;

  ...

  ngAfterContentInit(): void {
    // From this hook on, you can use this.paragraph
    // Before this hook, the content is initialized yet
  }
```
