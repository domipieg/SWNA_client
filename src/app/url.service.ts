import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Http, Headers, Response } from '@angular/http';
import { Url } from './url';
import { Word } from './word';

import { AuthenticationService } from './authentication.service';

@Injectable()
export class UrlService {

    constructor(private http: Http, private authenticationService: AuthenticationService) { }

    private headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': this.authenticationService.getToken()
    });

    sendLink(url: string) {
        this.loadHeaders()
        return this.http.post('http://localhost:8080/api/sendLink', url, { headers: this.headers })
    }

    sendWord(word: string) {
        this.loadHeaders();
        return this.http.post('http://localhost:8080/api/addWord', word, { headers: this.headers });
    }

     sendWordToTranslation(word: string) {
        this.loadHeaders();
        return this.http.post('http://localhost:8080/api/englishWord', word, { headers: this.headers });
    }

    deleteWord(word: string) {
        this.loadHeaders();
        return this.http.post('http://localhost:8080/api/addToDeleteWord', word, { headers: this.headers });
    }

    getAddedWords() {
        this.loadHeaders();
        return this.http.get('http://localhost:8080/api/getAddedWords', { headers: this.headers });
    }

    getDeletedWords() {
        this.loadHeaders();
        return this.http.get('http://localhost:8080/api/getDeletedWord', { headers: this.headers });
    }

    deleteDeletedWord(word: string) {
        this.loadHeaders();
        return this.http.post('http://localhost:8080/api/deleteDeletedWord', word, { headers: this.headers });
    }

    deleteAddedWord(word: string) {
        this.loadHeaders();
        return this.http.post('http://localhost:8080/api/deleteAddedWord', word, { headers: this.headers });
    }

     repeated(id: number) {
        this.loadHeaders();
        return this.http.post('http://localhost:8080/api/repeated', id, { headers: this.headers });
    }

    private loadHeaders() {
        this.headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': this.authenticationService.getToken()
        });
    }
}