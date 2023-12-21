// sign-in.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/service/account-configuration/account.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  signInForm!: FormGroup;

  constructor(private fb: FormBuilder, private signInService: AccountService, private router: Router) { }
  ngOnInit() {
    this.formInitilization();
  }

  formInitilization() {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  signIn() {
    console.log('Form Data:', this.signInForm.value);
    this.signInService.signIn(this.signInForm.value).subscribe((data) => {
      console.log(data);
      this.routingBasedOnType(data);
    }, (error) => {
      console.log(error);
    });
    this.signInForm.reset();
  }

    routingBasedOnType(data: any) {
      const type = data.type;
      console.log(type);

      switch (type) {
        case 'ADMIN':
          this.router.navigate(['/admin']);
          break;
        case 'USER':
          this.router.navigate(['/user']);
          break;
        case 'SUPERADMIN':
          this.router.navigate(['/superadmin']);
          break;
        default:
          // Handle the case when the user type is not recognized
          break;
      }
    }
  }
