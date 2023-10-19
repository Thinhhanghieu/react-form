import { Component, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    ValidationErrors,
    Validators
} from '@angular/forms';
import { Observable, of } from 'rxjs';

@Component({
    selector: 'app-sign-in-rf',
    templateUrl: './sign-in-rf.component.html',
    styleUrls: [ './sign-in-rf.component.scss' ]
})
export class SignInRfComponent implements OnInit {
    // signInForm = new FormGroup({
    //   username: new FormControl(''),
    //   password: new FormControl(''),
    //   rememberMe: new FormControl(false),
    // });

    signInForm: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.signInForm = this.fb.group({
            email: [
                '',
                Validators.compose([
                    Validators.minLength(6),
                ])
            ],
            password: [
                '',
                Validators.compose([
                    Validators.required,
                    Validators.minLength(6),
                    Validators.pattern(/^(?=.*[!@#$%^&*]+)[a-z0-9!@#$%^&*]{6,32}$/)
                ])
            ],
            rememberMe: false
        });

        // tslint:disable-next-line:no-unused-expression
        new FormControl('', Validators.required, this.isUserNameDuplicated);
    }

    onSubmit(): void {
        console.log(this.signInForm);
    }

    isUserNameDuplicated(control: AbstractControl): Observable<ValidationErrors> {
        return of(null);
    }
}
