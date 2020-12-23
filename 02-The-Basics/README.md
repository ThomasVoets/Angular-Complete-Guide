# The Basics

## How an Angular App gets Loaded and Started

1. The _index.html_ file is served by the server and the app starts by an imported script.
   - The _index.html_ file has an \<app-root>\</app-root> element in it's body
2. The code in _main.ts_ is executed first.
   - platformBrowserDynamic().bootstrapModule(AppModule)
   - This starts the app with the AppModule
3. In the file _app.module.ts_ there is a bootstrap array
   - bootstrap: [AppComponent]
   - This AppComponent is the component created by the CLI
   - _app.component.ts_ => selector: 'app-root'
4. Angular can now inject the content of AppComponent in the \<app-root>\</app-root> element of the _index.html_ file

## Components

- Components are a key-feature in Angular. You build your whole application by composing it from a couple of components which you create on your own.
- The root component, AppComponent, will be the component where we will nest or add out other components to.
- Each component has it's own template (HTML), styling and business logic.

**Creating Components & AppModule**<br>
Each component should have it's own folder in the src-folder. A good practice is that the component name is also the folder name.

- _.component.ts_
  - Create a class and add the @Component decorator to it to turn it into a component.
  - Provide the selector and templateUrl in the decorator
  - Display your component by placing the selector (as an element) in another _.html_ file (e.g. _app.component.html_)

AppModule is basicly a bundle of functionalities of our app and it gives Angular the information which features does our app have. It is just an empty TS class with a @NgModule decorator

- _app.module.ts_
  - Angular uses this file to bundle different pieces (e.g. components) into packages.
  - Add your component to the declarations array

You can automate this process by using the CLI

- Create new component: `ng generate component name` or shorter `ng g c name`
- The component is created in the folder 'name' and added to the declaraions array in _app.module.ts_

## Templates, Styles & Selectors

**Template**

- templateUrl: point to an external _.html_ file
- template: write your HTML inline

Note: template or templateUrl must be present in the @Component decorator

**Styles**

- Use Bootstrap
- styleUrls: array with pointer to external _.css_ files
- styles: write your CSS inline (in an array)

**Selectors**

- Select by element => selector: 'app-servers'
- Select by attribute => selector: '[app-servers]'
- Select by class => selector: '.app-servers'

Select by Id won't work.<br>
For components, you typically select by element.

## Databinding

### What is Databinding

Databinding = Communication

1.  Output data
    - String Interpolation
    - Property Binding
2.  React to (user) Events
    - Event Binding
3.  Combination of Both
    - Two-Way-Binding => [(ngModel)]="data"

### String Interpolation

Syntax: `{{ data }}`<br>
Everything between the curly braces must be a string or must be able to be converted to a string.

### Property Binding

Syntax: `[property]="data"`<br>
Bind to a property of a HTML element. Data must converted to the required type for the specific property you are binding to.

### Event Binding

Syntax: `(event)="expression"`<br>
Bind to an event of a HTML element. The expression is the code that gets executed when the event happens.<br>
You can get access to the event by passing _$event_ as an argument to the expression.

### Two-Way-Binding

Syntax: `[(ngModel)]="data"`<br>
To use Two-Way-Binding, add FormsModule to the imports array in _app.module.ts_.

## Directives

Directives are instructions in the DOM.<br>
Angular has some built-in directives, but you can also make your own directives.<br>

**Structural Directives**<br>
Marked with a _\*_ in front of the name. They change the structure of the DOM.<br>

**Attribute Directives**<br>
They change the element they were placed on.

### ngIf Directive

Syntax: `*ngIf="statement"`<br>
ngIf is used for outputting data conditionally.<br>
The statement is an boolean of an expression that returns a boolean.

### ngStyle Directive

Syntax: `[ngStyle]="statement"`<br>
ngStyle is used for setting styles dynamically.<br>
The [ ] indicates that we want to bind to some property on that directive, and this property is also called ngStyle. The statement is an JavaScript object.

### ngClass Directive

Syntax: `[ngClass]="statement"`<br>
ngClass is used for setting CSS classes dynamically.<br>
The [] indicates that we want to bind to some property on that directive, and this property is also called ngClass. The statement is an JavaScript object.

### ngFor Directive

Syntax: `*ngFor="let element of array"`
ngFor is used to loop over an array and display elements for each element in the array
