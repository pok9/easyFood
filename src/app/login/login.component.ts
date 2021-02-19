import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';//router เปลี่ยนหน้าในไฟล์ .ts 1
import { UserpassService } from '../userpass.service'; //data passing  2 เอาไว้เก็บข้อมูล username และ password ตอน login
import { HttpClient,HttpHeaders } from '@angular/common/http'; //เชื่อต่อ http เช่น get post put delete
import jwt_decode from 'jwt-decode'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  alert: boolean = false //แจ้งเตือน
  txtalert: string
  txtmessageAlert: string

  user_id: any;
  success: any;
  username: any;
  password: any;
  fullname: any;
  imgProfile: any;
  status: any;
  decode: any
  interpretations; //Local Storage
  TOKEN;
  constructor(private router: Router, //router เปลี่ยนหน้าในไฟล์ .ts 1
    private data: UserpassService, //data passing  2 เอาไว้เก็บข้อมูล username และ password ตอน login
    private http: HttpClient,  //เชื่อต่อ http เช่น get post put delete                     

  ) {

  }

  ngOnInit(): void {
  }


  login() {

    let json = { username: this.username, password: this.password };
    let request = this.http.post('http://apifood.comsciproject.com/users/login', json)
      .subscribe(response => {
        if (response["success"] == 1) {
          this.txtalert = "success"
          this.alert = true

          var token = response["token"]
          //this.decode = jwt_decode(token)
          //console.log(this.decode.user)
          let header = new HttpHeaders({

            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
          });
          let option = {
            headers: header
          }

          let req = this.http.get('http://apifood.comsciproject.com/users/myAccount',option).subscribe(response => {
            console.log(response["data"].username)
            if (response["success"] == 1) {
              this.interpretations = {
                success: response["success"],
                user_ID: response["data"].user_ID,
                username: response["data"].username,
                fullName: response["data"].fullName,
                nickName: response["data"].nickName,
                profile_img: response["data"].profile_img,
                status: response["data"].status
              };

              localStorage.setItem(
                'interpretations',
                JSON.stringify(this.interpretations)
              );
              //this.router.navigateByUrl('/feeds');
              window.location.href='/feeds'

            }

          })




          this.TOKEN = {
            token: response["token"]
          }

          localStorage.setItem('TOKEN', JSON.stringify(this.TOKEN))




        } else {
          console.log(JSON.stringify(response));
          this.txtmessageAlert = response["message"];

          this.txtalert = "danger"
          this.alert = true
        }

      }, error => {
        console.log('Error ' + JSON.stringify(error));
      });
  }
  signUp() {
    this.router.navigateByUrl('/signup');
  }



  closeAlert() {
    this.alert = false
  }

}
