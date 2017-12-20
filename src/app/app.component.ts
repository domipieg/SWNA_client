import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Url } from './url';
import { Word } from './word';
import { UrlService } from './url.service';
import { AuthenticationService } from './authentication.service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UrlService]
})

export class AppComponent {
  constructor(private urlService: UrlService, private http: Http, private authenticationService: AuthenticationService,
    private toastService: ToastrService) { }
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
    this.urlService.sendLink(url).subscribe(data => {
      this.words = data.json() as Word[]
    }, error => {
      this.toastService.error("Błąd!")
    });
  }

   wordsExist() {
    if (this.words.length == 0) {
      return true;
    } else {
      return false;
    }
  }

  sendWord(word: string) {
    var i = 0;
    var wordToSend = "";
    while (i < word.length) {
      if (word[i] == " ") {
        wordToSend = word.substr(i + 1, word.length);
        break;
      }
      i++;
    }
    this.urlService.sendWord(wordToSend).subscribe(result => {
      this.toastService.success("Słowo zostało dodane");
    }, error => {
      this.toastService.error("Błąd!")
    });

  }

  deleteWord(word: string) {
    var i = 0;
    var wordToSend = "";
    while (i < word.length) {
      if (word[i] == " ") {
        wordToSend = word.substr(i + 1, word.length);
        break;
      }
      i++;
    }
    this.urlService.deleteWord(wordToSend).subscribe(result => {
      this.toastService.success("Słowo zostało usunięte");
    }, error => {
      this.toastService.error("Błąd!")
    });

  }

  sendWordToTranslation(word: string) {
    var i = 0;
    var wordToSend = "";
    while (i < word.length) {
      if (word[i] == " ") {
        wordToSend = word.substr(i + 1, word.length);
        break;
      }
      i++;
    }
    this.urlService.sendWordToTranslation(wordToSend).subscribe(result => {
      this.toastService.info(result.text());
    }, error => {
      this.toastService.error("Błąd!")
    });
  }
}


