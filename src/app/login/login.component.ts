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

  user_id : any; 
  success : any;
  username : any;
  password : any;
  fullname : any;
  imgProfile : any;
  status : any;


  constructor(private router: Router, //router เปลี่ยนหน้าในไฟล์ .ts 1
    private data: UserpassService, //data passing  2 เอาไว้เก็บข้อมูล username และ password ตอน login
    private http: HttpClient  //เชื่อต่อ http เช่น get post put delete                     
  ) {

  }

  ngOnInit(): void {
  }

  login() {
    // let request = this.http.get('http://localhost:3000/user')
    //       .subscribe(response => {
    //         console.log('Response: ' + JSON.stringify(response));
    //       },error =>{
    //         console.log('Error ' + JSON.stringify(error));
    //       });
    // this.router.navigateByUrl('/feeds');
    let json = {username :this.username,password:this.password};
    let request = this.http.post('http://apifood.comsciproject.com/users/login',json)
      .subscribe(response => {
       if(response["success"] == 1){

         console.log(response["data"])
         this.data.user_id = response["data"].user_ID;
         this.data.success = response["success"]
         this.data.username = response["data"].username;
         this.data.fullname = response["data"].fullName;
         this.data.nickname = response["data"].nickName;
         this.data.imgProfile = response["data"].profile_img;
         this.data.status = response["data"].status;
         

         this.router.navigateByUrl('/feeds');
       }else{
        console.log(JSON.stringify(response));
       }
        // this.data.username = this.username;
        // this.data.password = this.password;
        // 
      }, error => {
        console.log('Error ' + JSON.stringify(error));
      });
  }
  signUp(){
    this.router.navigateByUrl('/signup');
  }

}
