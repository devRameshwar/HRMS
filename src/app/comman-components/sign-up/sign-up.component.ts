import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/service/account-configuration/account.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private signUpService: AccountService,
    private router: Router) {
    this.initilizationForm();
  }

  initilizationForm() {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator]],
      type: ['ADMIN', Validators.required]
    });
  }

  passwordValidator(control: any) {
    const value: string = control.value;

    const upperCaseRegex = /[A-Z]/;

    const digitRegex = /\d/;

    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    const isValid =
      upperCaseRegex.test(value) &&
      digitRegex.test(value) &&
      specialCharRegex.test(value);

    return isValid ? null : { invalidPassword: true };
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log('Form submitted:', this.signupForm.value);
      this.signUpService.signUp(this.signupForm.value).subscribe(
        (response) => {
          console.log('User signed up successfully:', response);
          this.sendVerificationCode(response);
          // Handle success (e.g., navigate to a different page)
        },
        (error) => {
          console.error('Sign-up failed:', error);
          // Handle error (e.g., display an error message)
        }
      );
    }
  }


  sendVerificationCode(response: any) {

    const email = response.email;
    console.log(email);
    this.signUpService.sendVerificationCode(email).subscribe(
      (response: any) => {
        console.log('User Send Verification successfully:', response);
        if (response != null) {
          const accountId = response.accountId;
          this.router.navigate(['/verification'], { queryParams: { accountId: accountId } });
          // Handle success (e.g., navigate to a different page)
        }

      },
      (error) => {
        console.error('Verification failed:', error);
        // Handle error (e.g., display an error message)
      }
    );
  }


}


