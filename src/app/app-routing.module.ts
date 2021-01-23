import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Toolbar } from 'primeng/toolbar';
import { from } from 'rxjs';
import { FeedsComponent } from './feeds/feeds.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { TestComponent } from './test/test.component';
import { ToolbarComponent} from './toolbar/toolbar.component';


const routes: Routes = [
  {path:'',component: LoginComponent},
  {path:'login',component: LoginComponent},
  {path:'profile/:username',component: ProfileComponent},
  {path:'feeds',component: FeedsComponent},
  {path:'signup',component: SignupComponent},
  {path:'test',component: TestComponent},
  {path: 'tool', component: ToolbarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
