import { FormControl, FormGroup, ValidationErrors } from "@angular/forms";

export function validateInputEmail(control: FormControl) {
  const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  const email = control.value;
  if (emailPattern.test(email)) {
    return null;
  } else if (email === "") {
    return { invalidEmail: true, message: "Email is required" };
  } else {
    return { invalidEmail: true, message: "Invalid email format" };
  }
}

export function validateInputPhone(control: FormControl) {
  const phonePattern = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
  const phone = control.value;
  if (phonePattern.test(phone)) {
    return null;
  } else if (phone === "") {
    return { invalidPhone: true, message: "Phone is required" };
  } else {
    return { invalidPhone: true, message: "Invalid phone format" };
  }
}

export function validateInputPassword(control: FormControl) {
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;
  const password = control.value;

  if (passwordPattern.test(password)) {
    return null;
  }

  return {
    invalidPassword: true,
    title: "Password must contain the following:",
    length: {
      class: password.length >= 8 ? "text-success" : "text-danger",
      message: "Password must be at least 8 characters long",
    },
    lowercase: {
      class: /(?=.*[a-z])/.test(password) ? "text-success" : "text-danger",
      message: "Password must contain at least one lowercase letter",
    },
    uppercase: {
      class: /(?=.*[A-Z])/.test(password) ? "text-success" : "text-danger",
      message: "Password must contain at least one uppercase letter",
    },
    numbers: {
      class: /(?=.*\d)/.test(password) ? "text-success" : "text-danger",
      message: "Password must contain at least one number",
    },
    symbols: {
      class: /(?=.*[#$@!%&*?])/.test(password) ? "text-success" : "text-danger",
      message: "Password must contain at least one symbol",
    },
  };
}

export function validateMatchedPasswords(
  firstControlName: string,
  secondControlName: string
) {
  return (formGroup: FormGroup): ValidationErrors | null => {
    const firstControlValue = formGroup.get(firstControlName).value;
    const secondControlValue = formGroup.get(secondControlName).value;

    return firstControlValue === secondControlValue
      ? null
      : {
          valueNotMatch: {
            firstControlValue,
            secondControlValue,
            messageErr: "Password not match",
          },
        };
  };
}

