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
  nickname : any;
  fullname : any;
  constructor(private router: Router,private http: HttpClient) { }

  ngOnInit(): void {
  }

  signup(){
    console.log(this.username);
    console.log(this.password);
    console.log(this.nickname);
    console.log(this.fullname);

    let json = {username :this.username,password:this.password,nickname:this.nickname,fullname:this.fullname,status : 0};
    let request = this.http.post('http://localhost:3000/api/users/signup',json)
      .subscribe(response => {
        console.log('not error ' + JSON.stringify(response));
        // this.router.navigateByUrl('/feeds');
      }, error => {
        console.log('Error ' + JSON.stringify(error));
      });

    this.router.navigateByUrl('/feeds');
  }

}
