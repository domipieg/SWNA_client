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
        return this.http.post('http://localhost:8080/api/sendWord', word, { headers: this.headers });
    }

    private loadHeaders() {
        this.headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': this.authenticationService.getToken()
        });
    }
}