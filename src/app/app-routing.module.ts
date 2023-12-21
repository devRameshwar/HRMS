import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './comman-components/sign-up/sign-up.component';
import { VerificationComponent } from './comman-components/verification/verification.component';
import { SignInComponent } from './comman-components/sign-in/sign-in.component';


const routes: Routes = [
  { path: "sign-up", component: SignUpComponent },
  { path: "verification", component: VerificationComponent },
  { path: "SignUpComponent", component: SignUpComponent },
  { path: "sign-in", component: SignInComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
