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
  alert : boolean=false //แจ้งเตือน
  txtalert : string
  txtmessageAlert : string

  user_id : any; 
  success : any;
  username : any;
  password : any;
  fullname : any;
  imgProfile : any;
  status : any;

  interpretations; //Local Storage
  TOKEN;
  constructor(private router: Router, //router เปลี่ยนหน้าในไฟล์ .ts 1
    private data: UserpassService, //data passing  2 เอาไว้เก็บข้อมูล username และ password ตอน login
    private http: HttpClient,  //เชื่อต่อ http เช่น get post put delete                     
    
    ) {

  }

  ngOnInit(): void {
  }

  // getInterpretations(){
  //   if(localStorage.getItem('interpretations') === null)
  //     this.interpretations = [];
  //   else{
  //       this.interpretations = localStorage.getItem('interpretations')
  //   }
  // }
  
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
         this.txtalert = "success"
         this.alert = true

         console.log(response["data"])
         this.data.user_id = response["data"].user_ID;
         this.data.success = response["success"]
         this.data.username = response["data"].username;
         this.data.fullname = response["data"].fullName;
         this.data.nickname = response["data"].nickName;
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

         this.TOKEN = {
           token : response["token"]
         }

         localStorage.setItem('TOKEN', JSON.stringify(this.TOKEN))
         

         localStorage.setItem(
           'interpretations',
           JSON.stringify(this.interpretations)
         );
         
         this.router.navigateByUrl('/feeds');
       }else{
        console.log(JSON.stringify(response));
        this.txtmessageAlert = response["message"];
        
        this.txtalert = "danger"
         this.alert = true
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

 

  closeAlert(){
    this.alert = false
  }

}
