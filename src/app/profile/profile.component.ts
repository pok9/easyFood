import { Component, OnInit } from '@angular/core';
import { UserpassService } from '../userpass.service';
import { HttpClient ,HttpHeaders} from '@angular/common/http'; //เชื่อต่อ http เช่น get post put delete
import { Router } from '@angular/router';//router เปลี่ยนหน้าในไฟล์ .ts 1
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  nickname: any;
  profile_img: any;
  fullname;
  user_id;
  username;
  token_user;

  interpretations;
  TOKEN;
  
  constructor(private datapass: UserpassService, private http: HttpClient,private router: Router) {
    this.nickname = datapass.nickname
    // this.profile_img = datapass.imgProfile
    // this.user_id = datapass.user_id

    this.username = datapass.username
    // console.log("datapass.imgProfile = " + datapass.imgProfile);
    // console.log(this.datapass.user_id)

    
  }

  ngOnInit(): void {
    if(localStorage.getItem('interpretations') === null){
      alert("Please login!")
      this.router.navigateByUrl('/login');
    }
    this.getInterpretations()
    this.getToken()
    console.log(this.interpretations.profile_img)
    
    this.user_id = this.interpretations.user_ID
    this.profile_img = this.interpretations.profile_img
    this.username = this.interpretations.username
    this.nickname = this.interpretations.nickName
    this.fullname = this.interpretations.fullName

    this.token_user = this.TOKEN.token
    
  }

  getInterpretations(){
    if(localStorage.getItem('interpretations') === null)
      this.interpretations = [];
    else{
        this.interpretations = JSON.parse(localStorage.getItem('interpretations'))
    }
  }

  getToken(){
    if(localStorage.getItem('TOKEN') === null)
      this.TOKEN = [];
    else{
        this.TOKEN = JSON.parse(localStorage.getItem('TOKEN'))
    }
  }

  updateImagePro(files: FileList) {

    var formdata = new FormData();
    formdata.append("profile_picture", files.item(0))

    formdata.append("uid", this.user_id)

    let header = new HttpHeaders({
      
      'Content-Type': 'application/json',
      'authorization': 'Bearer '+this.token_user
    });
    let option = {
      headers : header
    }

    let request = this.http.post('http://apifood.comsciproject.com/users/uploadProfile', formdata)
      .subscribe(response => {
        if (response["success"] == 1) {
          let request = this.http.get('http://apifood.comsciproject.com/users/' + this.user_id).subscribe(response => {

            this.interpretations = {
              success : response["success"],
              user_ID : response["data"].user_ID,
              username : response["data"].username,
              fullName : response["data"].fullName,
              nickName : response["data"].nickName,
              profile_img : response["data"].profile_img,
              status : response["data"].status,
              
            };
            
            this.profile_img = this.interpretations.profile_img

            localStorage.setItem(
              'interpretations',
              JSON.stringify(this.interpretations)
            );

            location.reload()
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
