import { Component, OnInit } from '@angular/core';
import { UserpassService } from '../userpass.service';
import { HttpClient, HttpHeaders } from '@angular/common/http'; //เชื่อต่อ http เช่น get post put delete
import { Router } from '@angular/router';//router เปลี่ยนหน้าในไฟล์ .ts 1
import { DataimgpassService } from '../dataimgpass.service';
import { DatePipe } from '@angular/common';
import { faHouseUser } from '@fortawesome/free-solid-svg-icons';//icon
import { faComments } from '@fortawesome/free-regular-svg-icons';//icon
import { faBell } from '@fortawesome/free-regular-svg-icons';//icon
import { ActivatedRoute } from '@angular/router'
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

  countFollowing = 0
  countFollower = 0
  countPost = 0
  position
  data: any = new Array()
  // public datapass;
  dataUser_id
  searchUser;
  checkFollow
  constructor(private datapass: UserpassService, private http: HttpClient, private router: Router, private imgpass: DataimgpassService, private route: ActivatedRoute) {
    this.searchUser = this.route.snapshot.params['username'];

    this.getInterpretations()
    this.getToken()
    //console.log('44444444')

    // let header = new HttpHeaders({

    //   'Content-Type': 'application/json',
    //   'authorization': 'Bearer ' + this.token_user
    // });
    // let option = {
    //   headers: header
    // }

    // this.http.get('http://apifood.comsciproject.com/follow/searchFollow', option).subscribe(response => {
    //   //this.countFollowing = response['data'].username
    //   console.log(response)
    // })
  }

  ngOnInit(): void {
    //console.log('55555555')
    this.token_user = this.TOKEN.token
    if (localStorage.getItem('interpretations') === null) {
      alert("Please login!")
      this.router.navigateByUrl('/login');
    }
    this.user_id = this.interpretations.user_ID

    let req = this.http.get("http://apifood.comsciproject.com/users/dataUser/" + this.searchUser).subscribe(response => {

      //console.log(response["data"].user_ID)
      this.dataUser_id = response["data"].user_ID
      if (response["success"] == 1 && (response["data"].user_ID) == this.user_id) {//ค้นหาตัวเอง เช่น pok แต่พิมพ์ pok
        this.profile_img = this.interpretations.profile_img
        this.profile_img_Copy = this.profile_img;//copy

        this.username = this.interpretations.username
        this.nickname = this.interpretations.nickName
        this.fullname = this.interpretations.fullName

        

        this.getFollowingCount()
        this.getFollowerCount()
        this.getPostCount()

        this.imgTest()
        
      } else if (response["success"] == 1) {//ค้นหาเพื่อน เช่นพิมพ์ lek

        let header = new HttpHeaders({

          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + this.token_user
        });
        let option = {
          headers: header
        }

        this.profile_img = response["data"].profile_img
        this.username = response["data"].username
        this.nickname = response["data"].nickName

        let req = this.http.get('http://apifood.comsciproject.com/follow/countFollowingUser/' + this.dataUser_id).subscribe(response => {
          this.countFollowing = response['countMyFollowing']
        })

        let req1 = this.http.get('http://apifood.comsciproject.com/follow/countFollowerUser/' + this.dataUser_id).subscribe(response => {
          this.countFollower = response['countMyFollower']
        })

        let req2 = this.http.get('http://apifood.comsciproject.com/post/countMyPostUser/' + this.dataUser_id).subscribe(response => {
          this.countPost = response['countMyPost']
        })

        let req3 = this.http.get("http://apifood.comsciproject.com/post/mypostUser/" + this.dataUser_id).subscribe(response => {
          this.data = new Array()
          let dataImg: any = response["data"]
          for (let i = 0; i < dataImg.length; i++) {
            this.data.push(dataImg[i])

          }
          //console.log(this.data)
        });
        this.http.get("http://apifood.comsciproject.com/follow/checkFollow/"+this.dataUser_id , option).subscribe(response => {
          this.checkFollow = response['checkFollow']
        });

      } else {//ค้นหาตัวเอง เช่น pok แต่พิมพ์ pokssasdfasdfsa
        this.dataUser_id = this.user_id
        this.profile_img = this.interpretations.profile_img
        this.profile_img_Copy = this.profile_img;//copy

        this.username = this.interpretations.username
        this.nickname = this.interpretations.nickName
        this.fullname = this.interpretations.fullName

        this.getFollowingCount()
        this.getFollowerCount()
        this.getPostCount()

        this.imgTest()
      }
    });
    // this.getInterpretations()
    // this.getToken()



  }

  testpok(){
    let header = new HttpHeaders({

      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + this.token_user
    });
    let option = {
      headers: header
    }
  }

  imgTest() {
    let header = new HttpHeaders({

      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + this.token_user
    });
    let option = {
      headers: header
    }
    let req = this.http.get("http://apifood.comsciproject.com/post/mypost", option).subscribe(response => {
      this.data = new Array()
      let dataImg: any = response["data"]
      for (let i = 0; i < dataImg.length; i++) {
        this.data.push(dataImg[i])

      }
      //console.log(this.data)
    });

  }

  displayImg : boolean
  selectedImg : any
  dateConvert : any
  selectImg(item : any){
    this.selectedImg = item
    
    console.log(this.selectedImg.date)
    var d = new Date()
    var datePipe = new DatePipe('en-US');
    let year:Number
    let month:Number
    let day:Number
    let hours:Number
    let minutes:Number
    let second:Number

    this.dateConvert = datePipe.transform(this.selectedImg.date, 'MM/dd/yyyy,HH:mm:ss a');
    console.log(this.dateConvert)
      year = Number(this.dateConvert.substring(6,10))
      month = Number(this.dateConvert.substring(0,2))
      day = Number(this.dateConvert.substring(3,5))
      hours = Number(this.dateConvert.substring(11,13))
      minutes = Number(this.dateConvert.substring(14,16))
      second = Number(this.dateConvert.substring(17,19))

      if(d.getFullYear() == year && d.getMonth()+1 == month && d.getDate() == day && d.getHours() == hours && d.getMinutes()-3 == minutes)
      this.dateConvert = "เมื่อสักครู่"
      else if(d.getFullYear() == year && d.getMonth()+1 == month && d.getDate() == day && d.getHours() == hours && d.getMinutes()-3 > minutes)
      this.dateConvert = ((d.getMinutes()-3) - Number(minutes))+" นาที"
        else if(d.getFullYear() == year && d.getMonth()+1 == month && d.getDate() == day && d.getHours() > hours) 
        this.dateConvert = (d.getHours() - Number(hours))+" ชั่วโมง"
        else if(d.getFullYear() == year && d.getMonth()+1 == month && d.getDate() > day && (d.getDate() - Number(day) >= 6))
        this.dateConvert = (((d.getDate()/7).toString().split('.')[0]))+" สัปดาห์"
        else if(d.getFullYear() == year && d.getMonth()+1 == month && d.getDate() > day)
        this.dateConvert = (d.getDate() - Number(day)) + " วัน"
        else if(d.getFullYear() == year && d.getMonth()+1 > month)
        this.dateConvert = (d.getMonth() - Number(month)) + " เดือน"
        else if(d.getFullYear() > year)
        this.dateConvert= (d.getFullYear() - Number(year)) + " ปี"

        this.displayImg = true
  }


  cancelSelectedImg(){
    this.displayImg = false
    
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

  getFollowingCount() {
    let header = new HttpHeaders({

      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + this.token_user
    });
    let option = {
      headers: header
    }
    let req = this.http.get('http://apifood.comsciproject.com/follow/countFollowing', option).subscribe(response => {
      this.countFollowing = response['countMyFollowing']
    })
  }

  getFollowerCount() {
    let header = new HttpHeaders({

      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + this.token_user
    });
    let option = {
      headers: header
    }
    let req = this.http.get('http://apifood.comsciproject.com/follow/countFollower', option).subscribe(response => {
      this.countFollower = response['countMyFollower']
    })
  }

  getPostCount() {
    let header = new HttpHeaders({

      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + this.token_user
    });
    let option = {
      headers: header
    }
    let req = this.http.get('http://apifood.comsciproject.com/post/countMyPost', option).subscribe(response => {
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
          let request = this.http.get('http://apifood.comsciproject.com/users/myAccount', option).subscribe(response => {

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

          let request = this.http.get('http://apifood.comsciproject.com/users/myAccount', option).subscribe(response => {

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
    //console.log(this.editname)
    let request0 = this.http.get('http://apifood.comsciproject.com/users/path_profileImage/' + this.user_id).subscribe(respone => {
      this.profileImagePath = respone["data"].profile_img
      //console.log(this.profileImagePath)
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



            //console.log(this.interpretations.nickName)
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
    } else {
      // var test = '/profile/'+this.username;
      //       window.location.href = test
      this.ngOnInit()
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
        //console.log(response["data"][datas].nickName)
        //console.log(response["data"][datas].profile_img)

        data = {
          "name": response["data"][datas].nickName,
          "image": response["data"][datas].profile_img
        }


        filtered.push(data)
      }
      this.output = filtered;
    })

  }
  value(nickname) {
    // let response = await this.http.get('http://apifood.comsciproject.com/users/convertNameToUsername/' + nickname).subscribe(response => {

    //   this.router.navigateByUrl('/profile/'+response["data"] )

    // })

    //let response = await this.http.get('http://apifood.comsciproject.com/users/convertNameToUsername/' + nickname).toPromise();
    // this.router.navigateByUrl('/profile/'+response["data"] )
    //console.log(response['data']);
    //location.reload()

    // let response = this.http.get('http://apifood.comsciproject.com/users/convertNameToUsername/' + nickname).toPromise().then(data =>{
    //       console.log(data)
    //       if(data["success"] == 1){
    //       //   this.displayModal = false;
    //       //   this.value = 0;
    //         //this.router.navigateByUrl('/profile/'+data["data"] )
    //         var test = '/profile/'+data["data"];
    //         window.location.href = test
    //         //location.reload()
    //       }
    //     })
  }
  //===============================================SearchUser=======================================
  followUser() {
    let json = { following_ID : this.dataUser_id};
    let header = new HttpHeaders({

      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + this.token_user,
    });
    let option = {
      headers: header
    }
    let request = this.http.post('http://apifood.comsciproject.com/follow/following',json,option)
        .subscribe(response => {
         
          console.log(response)
          
        }, error => {
          console.log('Error ' + JSON.stringify(error));
        });
        this.ngOnInit()
  }

  unfollowUser(){
    let json = { following_ID : this.dataUser_id};
    let header = new HttpHeaders({

      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + this.token_user,
    });
    let option = {
      headers: header
    }
    let request = this.http.post('http://apifood.comsciproject.com/follow/unfollowing',json,option)
        .subscribe(response => {
         
          console.log(response)
          
        }, error => {
          console.log('Error ' + JSON.stringify(error));
        });
        this.ngOnInit()
  }
}
