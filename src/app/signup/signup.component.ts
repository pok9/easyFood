import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';//router เปลี่ยนหน้าในไฟล์ .ts 1
// import { HttpClient } from '@angular/common/http'; //เชื่อต่อ http เช่น get post put delete
import { UserpassService } from '../userpass.service';
import jwt_decode from 'jwt-decode'
import { HttpClient, HttpHeaders } from '@angular/common/http'; //เชื่อต่อ http เช่น get post put delete
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  username: any;
  password: any;
  fullname: any;
  nickName: any;
  captcha: any;
  siteKey
  decode: any
  interpretations; //Local Storage
  TOKEN
  constructor(private router: Router, private http: HttpClient, private data: UserpassService) {
    //this.siteKey = '6LdieiUaAAAAAIYEXn_XHHc81QgOgkBnCi1cw633';
  }

  ngOnInit(): void {
  }

  // showResponse() {
  //   //call to a backend to verify against recaptcha with private key
  //   console.log('showResponsesss');
  // }


  signup() {
    // console.log(this.username);
    // console.log(this.password);
    // console.log(this.fullname);
    // console.log(this.nickName);
    if (this.captcha !== undefined) {
      let url_deProfiel = "https://apifood.comsciproject.com/uploadProfile/img_avatar.png"

      let json = { username: this.username, password: this.password, fullName: this.fullname, nickName: this.nickName, status: 1, profile_img: url_deProfiel };
      let request = this.http.post('https://apifood.comsciproject.com/users/signup', json)
        .subscribe(response => {
          //console.log('not error ' + JSON.stringify(response));
          // this.router.navigateByUrl('/feeds');
          //console.log(response["success"].username)
          if (response["success"] == 1) {
            let json = { username: this.username, password: this.password };
            let req = this.http.post('https://apifood.comsciproject.com/users/login', json).subscribe(response => {

              if (response["success"] == 1) {
                var token = response["token"]
                this.decode = jwt_decode(token)

                let header = new HttpHeaders({

                  'Content-Type': 'application/json',
                  'authorization': 'Bearer ' + token
                });
                let option = {
                  headers: header
                }


                let req = this.http.get('https://apifood.comsciproject.com/users/myAccount', option).subscribe(response => {
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
                    window.location.href = '/feeds'

                  }

                }) // get user
                this.TOKEN = {
                  token: response["token"]
                }
      
                localStorage.setItem('TOKEN', JSON.stringify(this.TOKEN))
      

              }


            }) //login
          }
        }, error => {
          console.log('Error ' + JSON.stringify(error));
        });
    } else {

    }
  }

  getToken() {
    if (localStorage.getItem('TOKEN') === null)
      this.TOKEN = [];
    else {
      this.TOKEN = localStorage.getItem('TOKEN')
    }
  }

}
