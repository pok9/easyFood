import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';//router เปลี่ยนหน้าในไฟล์ .ts 1
import { UserpassService } from '../userpass.service'; //data passing  2 เอาไว้เก็บข้อมูล username และ password ตอน login
import { HttpClient } from '@angular/common/http'; //เชื่อต่อ http เช่น get post put delete
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  username: any;
  password: any;


  constructor(private router: Router, //router เปลี่ยนหน้าในไฟล์ .ts 1
    private data: UserpassService, //data passing  2 เอาไว้เก็บข้อมูล username และ password ตอน login
    private http: HttpClient  //เชื่อต่อ http เช่น get post put delete                     
  ) {

  }

  ngOnInit(): void {
  }

  login() {
    let request = this.http.get('http://localhost:3000/user')
          .subscribe(response => {
            console.log('Response: ' + JSON.stringify(response));
          },error =>{
            console.log('Error ' + JSON.stringify(error));
          });
    this.router.navigateByUrl('/feeds');
    // let json = {username : this.username,password:this.password};
    // let name = "pok";
    // let request = this.http.post('http://localhost:3000/authenticate',JSON.stringify(name))
    //   .subscribe(response => {
    //     console.log('not error ' + JSON.stringify(response));
    //     this.data.username = this.username;
    //     this.data.password = this.password;
    //     this.router.navigateByUrl('/feeds');
    //   }, error => {
    //     console.log('Error ' + JSON.stringify(error));
    //   });
  }
  signUp(){
    this.router.navigateByUrl('/signup');
  }

}
