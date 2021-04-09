import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';//router เปลี่ยนหน้าในไฟล์ .ts 1
import { UserpassService } from '../userpass.service'; //data passing  2 เอาไว้เก็บข้อมูล username และ password ตอน login
import { HttpClient, HttpHeaders } from '@angular/common/http'; //เชื่อต่อ http เช่น get post put delete
import jwt_decode from 'jwt-decode'

declare var FB: any

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
    (window as any).fbAsyncInit = function () {
      FB.init({
        appId: '428663138434493',
        cookie: true,
        xfbml: true,
        version: 'v10.0'
      });
      FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }



  login() {

    let json = { username: this.username, password: this.password };
    let request = this.http.post('https://apifood.comsciproject.com/users/login', json)
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

  token;
  id;
  name;
  profile_fbimg
  facebookData: any
  fbJson : any
   json: any 
   async submitLogin() {
    // let response = await FB.login().toPromise();
    // console.log('submitLogin', response);
    //   if (response.authResponse) {
    //     //this.toastr.successToastr('login successful', 'Success!');
    //     console.log("Hello FB")
    //     response = FB.getLoginStatus().toPromise();
    //     if (response.status === 'connected') {
    //       this.token = response.authResponse.accessToken
    //       console.log(this.token)
    //       //response = FB.api('/me/?fields=picture.width(400).height(400),name').toPromise();
    //     }
    //   }

    FB.login((response) => {
      console.log('submitLogin', response);
      if (response.authResponse) {
        //this.toastr.successToastr('login successful', 'Success!');
        console.log("Hello FB")
        
        
        FB.getLoginStatus(function (response) {
          if (response.status === 'connected') {
            this.token = response.authResponse.accessToken
            //id = response.authResponse.userID
            
           
        
         FB.api('/me/?fields=picture.width(400).height(400),name', function (response) {
              //console.log(response);
            this.id = response.id
            this.profile_fbimg = response.picture.data.url
            this. name = response.name
              //{ userID: this.id, name: this.name,profile_fbimg:this.profile_fbimg };
             this.json = { userID: this.id, name: this.name,profile_fbimg:this.profile_fbimg }

            //  let request = this.http.post('https://localhost:3000/users/loginFacebook', this.json).subscribe(response1=>{
            //    console.log(response1)
            //  })
             
            this.facebookData = {
             
              userID: this.id,
              name: this.name,
              profile_fbimg: this.profile_fbimg,
              
            };

            localStorage.setItem('FB', JSON.stringify(this.facebookData))

              
              if (response.error) {
                console.log(response.error.message);
              }
            }, { access_token: this.token });

            
            
            //window.location.href = '/feeds'

          }
        });
        // FB.api('/me/', function (response) {
        //   console.log(JSON.stringify(response));
        // });

        



      }
      else {
        console.log('User login failed');
      }
      
    });

   

    this.fbJson = JSON.parse(localStorage.getItem('FB'))
    this.json = { userID: this.fbJson['userID'], name: this.fbJson['name'],profile_fbimg:this.fbJson['profile_fbimg'] }
    //json = JSON.stringify(json)
     let request = this.http.post('https://apifood.comsciproject.com/users/loginFacebook', this.json).subscribe(response1=>{
       //console.log(response1)
       this.TOKEN = {
        token: response1["token"]
        
      }
      localStorage.setItem('TOKEN', JSON.stringify(this.TOKEN))
      
      console.log(response1["token"])

      let header = new HttpHeaders({

        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + response1["token"]
      });
      let option = {
        headers: header
      }
      console.log(option)

      let req = this.http.get('https://apifood.comsciproject.com/users/myAccount', option).subscribe(response => {
            console.log(response)
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

          })


      //localStorage.setItem('TOKEN', JSON.stringify(this.TOKEN))

      //window.location.href = '/feeds'

     }) //<<<<<<<<<<<
     //console.log(json)
    // console.log("userID: "+this.id)
    // console.log("name: "+this.name)
    // console.log("profile_img: "+this.profile_fbimg)
    
    //this.http.get()
  }


}
