import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { Url } from './url';
import { Word } from './word';
import { User } from './user';
import { UrlService } from './url.service';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';

@Component({
    selector: 'register',
    templateUrl: './register.html',
    styleUrls: ['./app.component.css'],
    providers: [UrlService]
})

export class RegisterComponent {

    constructor(private urlService: UrlService, private http: Http, private router: Router,
        private authenticationService: AuthenticationService) { }

    user: User = {
        username: '',
        password: ''
    };

    ngOnInit() {
        this.authenticationService.logout();
    }

    register(username: string, password: string) {
        this.user.username = username;
        this.user.password = password;
        return this.http.post('http://localhost:8080/users/sign-up', this.user).subscribe(result => {
            this.router.navigate(['/login']);
        }, error => {
            alert('Error');
        });
    }

}

