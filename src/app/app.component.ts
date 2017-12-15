import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Url } from './url';
import { Word } from './word';
import { UrlService } from './url.service';
import { AuthenticationService } from './authentication.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UrlService]
})

export class AppComponent {
  constructor(private urlService: UrlService, private http: Http, private authenticationService: AuthenticationService) { }
  title = 'SWNA';
  url: Url = {
    text: ''
  };

  getToken() {
    if (this.authenticationService.getToken() == "") {
      return false;
    } else {
      return true;
    }
  }

  logout() {
    console.log("logout");
    this.authenticationService.logout();
  }

  words = new Array<Word>();
  sendEvent(url) {
    this.urlService.sendLink(url).subscribe(data => { this.words = data.json() as Word[] });
  }

  sendWord(word: string) {
    var i = 0;
    var wordToSend = "";
    while(i < word.length) {
      if (word[i] == " ") {
        wordToSend = word.substr(i+1, word.length);
        break;
      }
        i++;
    }
    this.urlService.sendWord(wordToSend).subscribe(data => { this.words = data.json() as Word[] });;
  }

}


