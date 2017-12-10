import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Url } from './url';
import { Word } from './word';
import { User } from './user';
import { UrlService } from './url.service';

@Component({
    selector: 'login',
    templateUrl: './login.html',
    styleUrls: ['./app.component.css'],
    providers: [UrlService]
})

export class LoginComponent {

    constructor(private urlService: UrlService, private http: Http) { }

    user: User = {
        name: '',
        password: ''
    };

    sendCredentials(username: string, password: string) {
        this.user.name = username;
        this.user.password = password;
        return this.http.post('/login', this.user).subscribe();
    }
}