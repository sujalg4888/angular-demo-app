import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './static/about/about.component';
import { SignupComponent } from './general/signup/signup.component';
import { LoginComponent } from './general/login/login.component';
import { PrivacyPolicyComponent } from './static/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './static/terms-and-conditions/terms-and-conditions.component';
import { NotFoundComponent } from './static/not-found/not-found.component';
import { FaqComponent } from './static/faq/faq.component';
import { AuthGuard } from './guards/auth.guard';
import { MyAccountComponent } from './my-account/my-account.component';
import { ResetPasswordComponent } from './general/reset-password/reset-password.component';
import { VerifyAccountComponent } from './general/verify-account/verify-account.component';

export const routes: Routes = [
    {
        path: '', component: HomeComponent
    },
    {
        path: 'about', component: AboutComponent
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'sign-up', component: SignupComponent
    },
    {
        path: 'my-account/:userId', component: MyAccountComponent, canActivate: [AuthGuard]
    },
    {
        path: 'faq', component: FaqComponent
    },
    {
        path: 'privacy-policy', component: PrivacyPolicyComponent
    },
    {
        path: 'terms-and-conditions', component: TermsAndConditionsComponent
    },
    {
        path : "reset-password", component:  ResetPasswordComponent
    },
    {
        path: 'verify-account/:userId', component: VerifyAccountComponent
    },
    {
        path: '**', component: NotFoundComponent
    }
];
