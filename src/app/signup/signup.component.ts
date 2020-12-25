import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';//router เปลี่ยนหน้าในไฟล์ .ts 1
import { HttpClient } from '@angular/common/http'; //เชื่อต่อ http เช่น get post put delete
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  username : any;
  password : any;
  fullname : any;
  nickName : any;
  constructor(private router: Router,private http: HttpClient) { }

  ngOnInit(): void {
  }

  signup(){
    console.log(this.username);
    console.log(this.password);
    console.log(this.fullname);
    console.log(this.nickName);

    let json = {username :this.username,password:this.password,fullName:this.fullname,nickName:this.nickName,status : 1,profile_img:"213"};
    let request = this.http.post('http://apifood.comsciproject.com/users/signup',json)
      .subscribe(response => {
        console.log('not error ' + JSON.stringify(response));
        // this.router.navigateByUrl('/feeds');
      }, error => {
        console.log('Error ' + JSON.stringify(error));
      });

    this.router.navigateByUrl('/feeds');
  }

}
