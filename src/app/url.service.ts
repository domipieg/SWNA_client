import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Url } from './url';
import { Word} from './word';

@Injectable()
export class UrlService {

    constructor(private http: Http) { }

    sendLink(url: string) {
        return this.http.post('api/sendLink', url)
    }

}