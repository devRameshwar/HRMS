import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AccountService } from 'src/app/service/account-configuration/account.service';


@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent {
  accountId: any = '';

  verificationForm!: FormGroup;


  constructor(private fb: FormBuilder, private activeRouter: ActivatedRoute,
    private signUpService: AccountService, private router: Router) {
    this.initializeForm();
  }

  initializeForm() {
    this.verificationForm = this.fb.group({
      verificationCode: ['', Validators.required]
    });
  }
  ngOnInit() {
    // Retrieve the accountId from the route parameters
    this.activeRouter.queryParams.subscribe((params) => {
      this.accountId = params['accountId'];
      console.log('Received accountId:', this.accountId);
    });
  }
  onSubmit() {
    if (this.verificationForm.valid) {
      console.log('Verification Code submitted:', this.verificationForm.value.verificationCode);
      this.signUpService.verifyVerificationCode(this.accountId, this.verificationForm.value).subscribe(
        (response) => {
          console.log('User Verification successfully:', response);
          this.router.navigate(['/sign-in']);
          // Handle success (e.g., navigate to a different page)
        },
        (error) => {
          console.error('Verification failed:', error);
          // Handle error (e.g., display an error message)
        }
      );
    }
  }
}
