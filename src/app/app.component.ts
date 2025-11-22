import { Component } from '@angular/core';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // title = 'ng-video-game-db';
  constructor(private loader: LoaderService) {}

loadSomething() {
  this.loader.show();

  setTimeout(() => {
    this.loader.hide();
  }, 2000);
}
}
