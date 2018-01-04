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
    selector: 'deleted',
    templateUrl: './deleted-words.html',
    styleUrls: ['./app.component.css'],
    providers: [UrlService]
})

export class DeletedWordsComponent {

    constructor(private urlService: UrlService, private http: Http, private router: Router,
        private toastService: ToastrService) { }

    public p;

    words = new Array<Word>();
    ngOnInit() {
        this.urlService.getDeletedWords().subscribe(data => {
            this.words = data.json();
        });
    }

    deleteDeletedWord(wordToSend: string) {
        this.urlService.deleteDeletedWord(wordToSend).subscribe(result => {
            window.location.reload();
        }, error => {
            this.toastService.error("Błąd!")
        });
    }

}

