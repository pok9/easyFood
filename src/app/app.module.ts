import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import {ToolbarModule} from 'primeng/toolbar';
import { FormsModule } from '@angular/forms';
import {CardModule} from 'primeng/card';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InputTextModule} from 'primeng/inputtext';

import {ButtonModule} from 'primeng/button';
import { FeedsComponent } from './feeds/feeds.component';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component'; //observable เช่น get,post
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { TestComponent } from './test/test.component';

import {PasswordModule} from 'primeng/password';

import {DropdownModule} from 'primeng/dropdown';

import {CaptchaModule} from 'primeng/captcha';
import { NgxCaptchaModule } from 'ngx-captcha';
import {DialogModule} from 'primeng/dialog';
import {FileUploadModule} from 'primeng/fileupload';//upload file
import {AutoCompleteModule} from 'primeng/autocomplete';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    FeedsComponent,
    SignupComponent,
    ToolbarComponent,
    TestComponent,

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToolbarModule,
    FormsModule,
    CardModule,
    BrowserAnimationsModule,
    InputTextModule,
    ButtonModule,
    HttpClientModule,
    FontAwesomeModule,
    PasswordModule,
    DropdownModule,
    NgxCaptchaModule,
    CaptchaModule,
    DialogModule,
    FileUploadModule,
    AutoCompleteModule
    
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
