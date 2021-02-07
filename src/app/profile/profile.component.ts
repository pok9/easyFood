import { Component, OnInit } from '@angular/core';
import { UserpassService } from '../userpass.service';
import { HttpClient, HttpHeaders } from '@angular/common/http'; //เชื่อต่อ http เช่น get post put delete
import { Router } from '@angular/router';//router เปลี่ยนหน้าในไฟล์ .ts 1
import { DataimgpassService} from '../dataimgpass.service';

import { faHouseUser } from '@fortawesome/free-solid-svg-icons';//icon
import { faComments } from '@fortawesome/free-regular-svg-icons';//icon
import { faBell } from '@fortawesome/free-regular-svg-icons';//icon
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // ******* icon ********
  iconhome = faHouseUser;
  iconmessage = faComments;
  iconbell = faBell;
  // ******* icon ********
  nickname: any;
  profile_img: any;
  profile_img_Copy: any;

  fullname;
  user_id;
  username;
  token_user;

  interpretations;
  TOKEN;

  localstorage
  gettoken

  countFollowing:any
  countFollower:any
  countPost:any
  position
  data: any = new Array()
  // public datapass;
  constructor(private datapass: UserpassService, private http: HttpClient, private router: Router, private imgpass: DataimgpassService ) {
    // this.nickname = datapass.nickname

    // console.log(this.nickname+"99999998888888")
    // console.log(datapass.nickname+"99999998888888")
    // // this.nickname = this.interpretations.nickName
    // // this.profile_img = datapass.imgProfile
    // // this.user_id = datapass.user_id

    // this.username = datapass.username
    // console.log(this.username+"99999998888888")
    // console.log(datapass.username+"99999998888888")
    // // console.log("datapass.imgProfile = " + datapass.imgProfile);
    // // console.log(this.datapass.user_id)
    
    this.getInterpretations()
    this.profile_img = this.interpretations.profile_img
    this.username = this.interpretations.username;
  }

   ngOnInit(): void {
    if (localStorage.getItem('interpretations') === null) {
      alert("Please login!")
      this.router.navigateByUrl('/login');
    }
    this.getInterpretations()
    this.getToken()
    console.log(this.interpretations.profile_img)

    this.user_id = this.interpretations.user_ID

    this.profile_img = this.interpretations.profile_img
    this.profile_img_Copy = this.profile_img;//copy

    this.username = this.interpretations.username
    this.nickname = this.interpretations.nickName
    this.fullname = this.interpretations.fullName

    this.token_user = this.TOKEN.token
    //this.getFollowingCount()
    this.getFollowingCount()
    this.getFollowerCount()
    this.getPostCount()
    //console.log(this.countFollowing)
    //test
    //console.log(this.imgTest())
    this.imgTest()
  }

  imgTest(){
    let header = new HttpHeaders({

      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + this.token_user
    });
    let option = {
      headers: header
    }
    let req = this.http.get("http://apifood.comsciproject.com/post/mypost",option).subscribe(response =>{
      this.data = new Array()
      let dataImg:any = response["data"]
      for(let i = 0; i< dataImg.length;i++){
        this.data.push(dataImg[i])

      }
      console.log(this.data)
    });
    
  }

  getInterpretations() {
    if (localStorage.getItem('interpretations') === null)
      this.interpretations = [];
    else {
      this.interpretations = JSON.parse(localStorage.getItem('interpretations'))
    }
  }

  getToken() {
    if (localStorage.getItem('TOKEN') === null)
      this.TOKEN = [];
    else {
      this.TOKEN = JSON.parse(localStorage.getItem('TOKEN'))
    }
  }

  getFollowingCount(){
    let header = new HttpHeaders({

      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + this.token_user
    });
    let option = {
      headers: header
    }
    let req = this.http.get('http://apifood.comsciproject.com/follow/countFollowing',option).subscribe(response =>{
       this.countFollowing = response['countMyFollowing']
    })
  }

  getFollowerCount(){
    let header = new HttpHeaders({

      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + this.token_user
    });
    let option = {
      headers: header
    }
    let req = this.http.get('http://apifood.comsciproject.com/follow/countFollower',option).subscribe(response =>{
       this.countFollower = response['countMyFollower']
    })
  }

  getPostCount(){
    let header = new HttpHeaders({

      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + this.token_user
    });
    let option = {
      headers: header
    }
    let req = this.http.get('http://apifood.comsciproject.com/post/countMyPost',option).subscribe(response =>{
       this.countPost = response['countMyPost']
    })
  }

  updateImagePro(files: FileList) {

    var formdata = new FormData();
    formdata.append("profile_picture", files.item(0))

    formdata.append("uid", this.user_id)

    let header = new HttpHeaders({

      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + this.token_user
    });
    let option = {
      headers: header
    }

    let request = this.http.post('http://apifood.comsciproject.com/users/uploadProfile', formdata)
      .subscribe(response => {
        if (response["success"] == 1) {

          let header = new HttpHeaders({

            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + this.token_user
          });
          let option = {
            headers: header
          }
          let request = this.http.get('http://apifood.comsciproject.com/users/myAccount',option).subscribe(response => {

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

            this.profile_img = this.interpretations.profile_img
            this.profile_img_Copy = this.profile_img;//copy



            location.reload()



          })
        }
      }, error => {
        console.log('Error ' + JSON.stringify(error));
      });

    // http://apifood.comsciproject.com/users/uploadProfile

  }

  //****************** แก้ไขข้อมูล ************************ */
  displayModal: boolean;
  profileImagePath: any;
  editname: String;
  showModalDialog() {
    this.editname = this.nickname
    this.displayModal = true;
  }

  onEditPro(files: FileList) {
    var formdata = new FormData();
    formdata.append("profile_picture", files.item(0))

    formdata.append("uid", this.user_id)

    //getToken

          let header = new HttpHeaders({

            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + this.token_user
          });
          let option = {
            headers: header
          }
    
    
    let request = this.http.post('http://apifood.comsciproject.com/users/uploadProfile', formdata)
      .subscribe(response => {
        if (response["success"] == 1) {

          let request = this.http.get('http://apifood.comsciproject.com/users/myAccount',option ).subscribe(response => {

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

            this.profile_img_Copy = this.interpretations.profile_img



            // location.reload()



          })
        }
      }, error => {
        console.log('Error ' + JSON.stringify(error));
      });

  }
  confirmEdit() {
    // this.methodUpload()
    console.log(this.editname)
    let request0 = this.http.get('http://apifood.comsciproject.com/users/path_profileImage/' + this.user_id).subscribe(respone => {
      this.profileImagePath = respone["data"].profile_img
      console.log(this.profileImagePath)
    })
    if (this.editname !== undefined) {
      let json = { newNickname: this.editname, user_id: this.user_id };
      let request = this.http.post('http://apifood.comsciproject.com/users/editNickname', json)
        .subscribe(response => {
          if (response["success"] == 1) {
            // let request = this.http.get('http://apifood.comsciproject.com/users/' + this.user_id).subscribe(response => {

            
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

            
            
            console.log(this.interpretations.nickName)
            this.nickname = this.interpretations.nickName
            
            // this.profile_img = this.interpretations.profile_img
            // this.profile_img_Copy = this.profile_img

            // this.profileImagePath = undefined
            // this.datapass.nickname = this.interpretations.nickName
            // this.datapass.username = this.interpretations.username
            this.profile_img = this.interpretations.profile_img
            // this.datapass.profile_img = this.interpretations.profile_img
            this.editname = undefined
            
            // location.reload()



            // })
          }
        }, error => {
          console.log('Error ' + JSON.stringify(error));
        });
    }else{
      location.reload()
    }

    
    this.displayModal = false
  }

  cancelEdit() {
    // this.checkfile = undefined;

    if (this.profileImagePath !== undefined) {
      let json = { profileImagePath: this.profileImagePath, user_id: this.user_id };
      let request = this.http.post('http://apifood.comsciproject.com/users/path_updateprofileImage', json)
        .subscribe(response => {
          if (response["success"] == 1) {

            // let request = this.http.get('http://apifood.comsciproject.com/users/' + this.user_id).subscribe(response => {

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

            this.profile_img = this.interpretations.profile_img
            this.profile_img_Copy = this.profile_img

            this.profileImagePath = undefined
            this.editname = undefined

            // location.reload()



            // })
          }
        }, error => {
          console.log('Error ' + JSON.stringify(error));
        });
    }
    
    this.displayModal = false;

  }
  //****************** แก้ไขข้อมูล ************************ */


  //****************** NavBar ************************ */
  logoutLocalstorege() {
    localStorage.removeItem('interpretations')
    localStorage.removeItem('TOKEN')
  }

  test() {
    // this.localstorage = JSON.parse(localStorage.getItem('TOKEN'))
    // this.gettoken = this.localstorage.token
    // let json = { username: "1" };

    // let header = new HttpHeaders({

    //   'Content-Type': 'application/json',
    //   'authorization': 'Bearer ' + this.gettoken
    // });
    // let option = {
    //   headers: header
    // }


    // let req = this.http.post('http://apifood.comsciproject.com/users/test', json, option).subscribe(response => {
    //   console.log(response)
    // })

    //let req = this.http.post
  }
  displayModal1
  showPositionDialog(position: string) {
    this.position = position
    this.displayModal1 = true;
  }
  //****************** NavBar ************************ */


  //===============================================SearchUser=======================================
  output: string[];
  selectNumber: any;
  search(event) {
    let filtered: any[] = [];
    let query = event.query;
    let country
    let data;
    let req = this.http.get('http://apifood.comsciproject.com/users/searchUser/' + query).subscribe(response => {
      for (let datas in response["data"]) {
        country = response["data"][datas].nickName
        console.log(response["data"][datas].nickName)
        console.log(response["data"][datas].profile_img)

        data = {
          "name": response["data"][datas].nickName,
          "image": response["data"][datas].profile_img
        }


        filtered.push(data)
      }
      this.output = filtered;
    })

  }
  value(event){
    console.log(event)
  }
  //===============================================SearchUser=======================================

}
