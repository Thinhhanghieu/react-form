import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { FORM_SIGNUP_CONTROL_NAME } from '../constants/constants';

const validateMatchedControlsValue = (
    firstControlName: string,
    secondControlName: string
) => {
    return (formGroup: FormGroup): ValidationErrors | null => {
        const firstControlValue = formGroup.get(firstControlName).value;
        const secondControlValue = formGroup.get(secondControlName).value;

        return firstControlValue === secondControlValue
            ? null
            : {
                valueNotMatch: {
                    firstControlValue,
                    secondControlValue,
                    messageErr: 'Password not match'
                },
            };
    };
};

@Component({
    selector: 'app-form-group',
    templateUrl: './form-group.component.html',
    styleUrls: [ './form-group.component.scss' ]
})

export class FormGroupComponent implements OnInit {

    FC_NAME = FORM_SIGNUP_CONTROL_NAME;

    signUpForm: FormGroup = this.fb.group({
            [FORM_SIGNUP_CONTROL_NAME.firstname]: [
                '',
                [
                    Validators.minLength(6),
                    Validators.required
                ]
            ],
            [FORM_SIGNUP_CONTROL_NAME.lastname]: [
                '',
                Validators.compose([
                    Validators.required,
                ])
            ],
            [FORM_SIGNUP_CONTROL_NAME.phone]: [
                '',
                [
                    Validators.required,
                    this.isPhoneNumber
                ]
            ],
            [FORM_SIGNUP_CONTROL_NAME.email]: [
                '',
                [
                    Validators.required,
                    this.isEmailAddress
                ]
            ],
            [FORM_SIGNUP_CONTROL_NAME.password]: [
                '',
                [
                    Validators.required,
                    this.isPassword
                ]
            ],
            [FORM_SIGNUP_CONTROL_NAME.confirmPassword]: [
                '',
                [
                    Validators.required,
                    this.isPassword
                ]
            ],
            [FORM_SIGNUP_CONTROL_NAME.daydate]: [
                '',
                Validators.compose([
                    Validators.required,
                ])
            ],
            [FORM_SIGNUP_CONTROL_NAME.monthdate]: [
                '',
                Validators.compose([
                    Validators.required,
                ])
            ],
            [FORM_SIGNUP_CONTROL_NAME.yeardate]: [
                '',
                Validators.compose([
                    Validators.required,
                ])
            ],
            [FORM_SIGNUP_CONTROL_NAME.gender]: [
                '',
                Validators.compose([
                    Validators.required,
                ])
            ],
        },
        {
            validators: [
                validateMatchedControlsValue('password', 'confirmpassword'),
            ]
        }
    );


    constructor(
        private fb: FormBuilder,
    ) {
    }

    ngOnInit(): void {
        this.signUpForm.get(this.FC_NAME.password).valueChanges
            .subscribe((val) => {
                console.log(this.signUpForm)
            });
    }

    isEmailAddress(control: FormControl): { [key: string]: any } | null {
        const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        const email = control.value;
        console.log(control);
        if (emailPattern.test(email)) {
            return null;
        } else if (email === '') {
            return { invalidEmail: true, message: 'Email is required' };
        } else {
            return { invalidEmail: true, message: 'Invalid email format' };
        }
    }


    isPhoneNumber(control: FormControl) {
        const phonePattern = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
        const phone = control.value;
        if (phonePattern.test(phone)) {
            return null;
        } else if (phone === '') {
            return { invalidPhone: true, message: 'Phone is required' };
        } else {
            return { invalidPhone: true, message: 'Invalid phone format' };
        }
    }

    isPassword(control: FormControl) {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;
        const password = control.value;

        if (passwordPattern.test(password)) {
            return null;
        } else if (password === '') {
            return { invalidPassword: true, message: 'Password is required' };
        } else {
            return { invalidPassword: true, message: 'Invalid password format' };
        }
    }

    getDays(): number[] {
        const days: number[] = [];
        for (let i = 1; i <= 31; i++) {
            days.push(i);
        }
        return days;
    }

    getMonths(): number[] {
        const months: number[] = [];
        for (let i = 1; i <= 12; i++) {
            months.push(i);
        }
        return months;
    }

    getYears(): number[] {
        const years: number[] = [];
        const currentYear = new Date().getFullYear();
        for (let i = currentYear; i >= currentYear - 100; i--) {
            years.push(i);
        }
        return years;
    }

    onSubmit() {
        if (this.signUpForm.invalid) {
            return;
        }
        console.log(this.signUpForm);
    }

}
