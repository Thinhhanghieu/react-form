import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { FORM_SIGNUP_CONTROL_NAME } from "../constants/constants";
import {
  validateInputEmail,
  validateInputPhone,
  validateInputPassword,
  validateMatchedPasswords,
} from "../validators/form-validation";

const currentYear = new Date().getFullYear();
const defaultYear = currentYear - 18;
@Component({
  selector: "app-form-group",
  templateUrl: "./form-group.component.html",
  styleUrls: ["./form-group.component.scss"],
})
export class FormGroupComponent {
  FC_NAME = FORM_SIGNUP_CONTROL_NAME;

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  signUpForm: FormGroup = this.fb.group(
    {
      [FORM_SIGNUP_CONTROL_NAME.firstname]: [
        "",
        [Validators.minLength(6), Validators.required],
      ],
      [FORM_SIGNUP_CONTROL_NAME.lastname]: [
        "",
        [Validators.required]
      ],
      [FORM_SIGNUP_CONTROL_NAME.phone]: [
        "",
        [Validators.required, validateInputPhone],
      ],
      [FORM_SIGNUP_CONTROL_NAME.email]: [
        "",
        [Validators.required, validateInputEmail],
      ],
      [FORM_SIGNUP_CONTROL_NAME.password]: [
        "",
        [Validators.required, validateInputPassword],
      ],
      [FORM_SIGNUP_CONTROL_NAME.confirmPassword]: [
        "",
        [Validators.required, validateInputPassword],
      ],
      [FORM_SIGNUP_CONTROL_NAME.daydate]: [
        1,
        [Validators.required]
      ],
      [FORM_SIGNUP_CONTROL_NAME.monthdate]: [
        "January",
        [Validators.required]
      ],
      [FORM_SIGNUP_CONTROL_NAME.yeardate]: [
        defaultYear, [Validators.required]
      ],
      [FORM_SIGNUP_CONTROL_NAME.gender]: [
        "",
        [Validators.required]
      ],
    },
    {
      validators: [
        validateMatchedPasswords(
          this.FC_NAME.password,
          this.FC_NAME.confirmPassword
        ),
      ],
    }
  );

  constructor(private fb: FormBuilder) {}

  checkKeyUp(event: KeyboardEvent) {
    if (event.key.startsWith("Arrow")) {
      event.preventDefault();
    }
  }

  getDays(): number[] {
    const days: number[] = [];
    const month = this.signUpForm.get(this.FC_NAME.monthdate).value;
    if (
      month === "January" ||
      month === "March" ||
      month === "May" ||
      month === "July" ||
      month === "August" ||
      month === "October" ||
      month === "December"
    ) {
      for (let i = 1; i <= 31; i++) {
        days.push(i);
      }
    } else if (
      month === "April" ||
      month === "June" ||
      month === "September" ||
      month === "November"
    ) {
      for (let i = 1; i <= 30; i++) {
        days.push(i);
      }
    } else if (month === "February") {
      const year = this.signUpForm.get(this.FC_NAME.yeardate).value;
      const isLeapYear =
        (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
      const maxDays = isLeapYear ? 29 : 28;
      for (let i = 1; i <= maxDays; i++) {
        days.push(i);
      }
    }
    return days;
  }

  getMonths(): string[] {
    return [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
  }

  getYears(): number[] {
    const years: number[] = [];
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= currentYear - 100; i--) {
      years.push(i);
    }
    return years;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  onSubmit() {
    // trigger validation on submit
    this.signUpForm.markAllAsTouched();
    if (this.signUpForm.invalid) {
      return;
    }
  }
}
