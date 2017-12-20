import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { Url } from './url';
import { Word } from './word';
import { User } from './user';
import { UrlService } from './url.service';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'login',
    templateUrl: './login.html',
    styleUrls: ['./app.component.css'],
    providers: [UrlService]
})

export class LoginComponent {

    constructor(private urlService: UrlService, private http: Http, private router: Router,
        private authenticationService: AuthenticationService, private toastService: ToastrService) { }

    user: User = {
        username: '',
        password: ''
    };

    ngOnInit() {
        this.authenticationService.logout();
    }

    loading = false;
    error = '';

    sendCredentials(username: string, password: string) {
        this.user.username = username;
        this.user.password = password;
        this.loading = true;
        this.authenticationService.login(this.user.username, this.user.password)
            .subscribe(result => {
                if (result === true) {
                    this.router.navigate(['/']);
                } else {
                    alert('Username or password is incorrect');
                    this.loading = false;
                }
            }, error => {
                this.loading = false;
                this.toastService.error("Błąd logowania")
            });
    }
}

