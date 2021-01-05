import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../environments/environment';



@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    isError = false;
    imgSrc;
    constructor(
        private formBuilder: FormBuilder,
        private httpClient: HttpClient,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
        console.log('Router data', this.router);
        console.log('Route data', this.route);
        this.imgSrc = environment.LOGO_SRC;
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;
        this.isError = false;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }



        // let url = location.origin + '/FlexiCore/rest/authentication/login';
        let url =  environment.API_URL +  'authentication/login';

        this.httpClient.post(url,
            {
                mail: this.loginForm.get('username').value,
                password: this.loginForm.get('password').value
            })
            .subscribe(
                (data: any) => {
                    localStorage.setItem('authenticationkey', data.authenticationkey);
                    this.router.navigate(['swagger']);
                },
                error => {
                    this.loading = false;
                    this.isError = true;
                    console.log("Error", error);
                }
            );
    }
}
