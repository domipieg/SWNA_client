import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { Url } from './url';
import { Word } from './word';
import { User } from './user';
import { UrlService } from './url.service';
import { AuthenticationService } from './authentication.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
    selector: 'added',
    templateUrl: './added-words.html',
    styleUrls: ['./app.component.css'],
    providers: [UrlService]
})

export class AddedWordsComponent {
    
    constructor(private urlService: UrlService, private http: Http, private router: Router,
        private toastService: ToastrService) { }

    public p;

    words = new Array<Word>();
    ngOnInit() {
        this.urlService.getAddedWords().subscribe(data => {
            this.words = data.json();
        });
    }

    sendWordToTranslation(word: string) {
        console.log(Date.now());
        this.urlService.sendWordToTranslation(word).subscribe(result => {
            this.toastService.info(result.text());
        }, error => {
            this.toastService.error("Błąd!")
        });
    }

    deleteAddedWord(wordToSend: string) {
        this.urlService.deleteAddedWord(wordToSend).subscribe(result => {
            window.location.reload();
        }, error => {
            this.toastService.error("Błąd!")
        });
    }

    repeated(id: number) {
       this.urlService.repeated(id).subscribe(result => {
            this.toastService.success("Powtórka została wykonana");
            window.location.reload();
        }, error => {
            this.toastService.error("Błąd!")
        });
    }

    dateOfExpiration(word: Word) {
        if(word.date > (Date.now() - 10000)) {
            return false;
        } else {
            return true;
        }
    }
// - 500000000
}

