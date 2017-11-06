import { Component } from '@angular/core';

import { Url } from './url';
import { Word } from './word';
import { UrlService } from './url.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UrlService]
})


export class AppComponent {
  constructor(private urlService: UrlService) { }
  title = 'SWNA';
  url: Url = {
    text: ''
  };
  
  words = new Array<Word>();
  sendEvent(url) {
    this.urlService.sendLink(url).subscribe(data => {this.words = data.json() as Word[]});
  }
  
}


