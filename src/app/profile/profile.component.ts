import { Component, OnInit } from '@angular/core';
import { UserpassService } from '../userpass.service';
import { HttpClient } from '@angular/common/http'; //เชื่อต่อ http เช่น get post put delete
import { Router } from '@angular/router';//router เปลี่ยนหน้าในไฟล์ .ts 1
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  nickname: any;
  profile_img: any;

  user_id;
  username;

  interpretations;

  
  constructor(private datapass: UserpassService, private http: HttpClient,private router: Router) {
    this.nickname = datapass.nickname
    // this.profile_img = datapass.imgProfile
    // this.user_id = datapass.user_id

    this.username = datapass.username
    // console.log("datapass.imgProfile = " + datapass.imgProfile);
    // console.log(this.datapass.user_id)

    this.getInterpretations()
    console.log(this.interpretations.profile_img)
    
    this.user_id = this.interpretations.user_ID
    this.profile_img = this.interpretations.profile_img
    this.username = this.interpretations.username
  }

  ngOnInit(): void {
    
  }

  getInterpretations(){
    if(localStorage.getItem('interpretations') === null)
      this.interpretations = [];
    else{
        this.interpretations = JSON.parse(localStorage.getItem('interpretations'))
    }
  }

  updateImagePro(files: FileList) {

    var formdata = new FormData();
    formdata.append("profile_picture", files.item(0))

    formdata.append("uid", this.user_id)

    let request = this.http.post('http://apifood.comsciproject.com/users/uploadProfile', formdata)
      .subscribe(response => {
        if (response["success"] == 1) {
          let request = this.http.get('http://apifood.comsciproject.com/users/' + this.user_id).subscribe(response => {

            this.interpretations = {
              profile_img : response["data"].profile_img
            };
            
            this.profile_img = this.interpretations.profile_img
          
            // this.router.navigateByUrl('/profile/'+this.username );
            
          //  window.location.reload();

          //  console.log(this.datapass.user_id)

            
          })
        }
      }, error => {
        console.log('Error ' + JSON.stringify(error));
      });

    // http://apifood.comsciproject.com/users/uploadProfile

  }

}
