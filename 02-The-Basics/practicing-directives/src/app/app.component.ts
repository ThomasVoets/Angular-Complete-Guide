import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showSecret: boolean = false;
  numberOfClick: number = 0;

  logItems: number[] = [];

  onToggleDetails(): void {
    this.showSecret = !this.showSecret;

    this.numberOfClick++;
    this.logItems.push(this.numberOfClick)
  }

}
