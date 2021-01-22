import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';//router เปลี่ยนหน้าในไฟล์ .ts 1
import { HttpClient } from '@angular/common/http'; //เชื่อต่อ http เช่น get post put delete
import { UserpassService } from '../userpass.service';
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
      let url_deProfiel = "http://apifood.comsciproject.com/uploadProfile/img_avatar.png"

      let json = { username: this.username, password: this.password, fullName: this.fullname, nickName: this.nickName, status: 1, profile_img: url_deProfiel };
      let request = this.http.post('http://apifood.comsciproject.com/users/signup', json)
        .subscribe(response => {
          //console.log('not error ' + JSON.stringify(response));
          // this.router.navigateByUrl('/feeds');

          if (response["success"] == 1) {
            let json = { username: this.username, password: this.password };
            let req = this.http.post('http://apifood.comsciproject.com/users/login', json).subscribe(response => {
              this.data.user_id = response["data"].user_ID;
              this.data.success = response["success"]
              this.data.username = response["data"].username;
              this.data.fullname = response["data"].fullName;
              this.data.nickname = response["data"].nickName;
              console.log("response.profile_img = " + response["data"].profile_img);
              this.data.imgProfile = response["data"].profile_img;
              this.data.status = response["data"].status;


              this.interpretations = {
                success : response["success"],
                user_ID : response["data"].user_ID,
                username : response["data"].username,
                fullName : response["data"].fullName,
                nickName : response["data"].nickName,
                profile_img : response["data"].profile_img,
                status : response["data"].status
             };
    
             localStorage.setItem(
               'interpretations',
               JSON.stringify(this.interpretations)
             );
             this.TOKEN = {
              token : response["token"]
            }
   
            localStorage.setItem('TOKEN', JSON.stringify(this.TOKEN))
             

              this.router.navigateByUrl('/feeds');


            })
          }
          // this.data.user_id = response["data"].user_ID;
          //  this.data.success = response["success"]
          //  this.data.username = response["data"].username;
          //  this.data.fullname = response["data"].fullName;
          //  this.data.nickname = response["data"].nickName;
          //  this.data.imgProfile = response["data"].profile_img;
          //  this.data.status = response["data"].status;
        }, error => {
          console.log('Error ' + JSON.stringify(error));
        });
    }else{
      
    }
  }

  getToken(){
    if(localStorage.getItem('TOKEN') === null)
      this.TOKEN = [];
    else{
        this.TOKEN = localStorage.getItem('TOKEN')
    }
  }

}
