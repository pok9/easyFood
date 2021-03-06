import { Component, OnInit } from '@angular/core';
import { UserpassService } from '../userpass.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import jwt_decode from "jwt-decode"
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})


export class FeedsComponent implements OnInit {
  interpretations
  TOKEN
  displayModal: boolean;//dialog
  value: number = 0;
  myusername
  mynickname
  my_ID
  followSugg: any = new Array()

  ////about likeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
  likeCount: any = new Array()
  //divLike: any
  divLike: any = new Array()
  ////////////////////////////////
  txt; //ข้อความ
  localstorage
  gettoken
  avatarProfile: any
  postnewFeed: any//รับpost newfeed
  checkFollow: any
  items: MenuItem[];

  displayResponsiveDelete = false;//ลบโพสต์
  displayResponsiveEdit = false;//แก้ไขโพสต์
  //text : any;
  property: any


  constructor(private datapass: UserpassService, private router: Router, private http: HttpClient) {
    // console.log(datapass.username);
    //console.log('Constructor')
  }

  async ngOnInit() {
    //console.log('ngOnInit')

    if (localStorage.getItem('TOKEN') === null) {
      alert("Please login!")
      this.router.navigateByUrl('/login');
    }

    this.localstorage = JSON.parse(localStorage.getItem('TOKEN'))
    this.gettoken = this.localstorage.token
    this.my_ID = jwt_decode(this.gettoken)
    console.log(this.my_ID)
    console.log(this.selectedImg)
    //this.decode = jwt_decode(token)
    //console.log(this.decode.user)
    this.getSuggestion()
    let header = new HttpHeaders({

      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + this.gettoken
    });
    let option = {
      headers: header
    }

    let req = this.http.get('http://apifood.comsciproject.com/users/myAccount', option).subscribe(response => {
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

        this.mynickname = response["data"].nickName
        this.myusername = response["data"].username

        localStorage.setItem(
          'interpretations',
          JSON.stringify(this.interpretations)
        );


        //this.avatarProfile = this.interpretations.profile_img
        this.avatarProfile = this.interpretations.profile_img.replace("\\", "\/")
      }


    })

    let req2 = await this.http.get('http://apifood.comsciproject.com/post/newfeed', option).toPromise().then(response => {
      var d = new Date()

      var datePipe = new DatePipe('en-US');
      //console.log(Object.keys(response["feed"]).length)
      // console.log(d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear())
      // console.log(d.getHours()+":"+d.getMinutes()+":"+d.getSeconds)


      let year: Number
      let month: Number
      let day: Number
      let hours: Number
      let minutes: Number
      let second: Number
      for (let i = 0; i < Object.keys(response["feed"]).length; i++) {


        response["feed"][i].profile_img = response["feed"][i].profile_img.replace("\\", "\/")

        response["feed"][i].date = new Date(response["feed"][i].date)

        response["feed"][i].date = datePipe.transform(response["feed"][i].date, 'MM/dd/yyyy,HH:mm:ss a');
        //console.log(response["feed"][i].date)

        year = Number(response["feed"][i].date.substring(6, 10))
        month = Number(response["feed"][i].date.substring(0, 2))
        day = Number(response["feed"][i].date.substring(3, 5))
        hours = Number(response["feed"][i].date.substring(11, 13))
        minutes = Number(response["feed"][i].date.substring(14, 16))
        second = Number(response["feed"][i].date.substring(17, 19))

        // console.log(d.getDate() +" "+ day)

        // if(d.getFullYear() == year && d.getMonth()+1 == month && d.getDate() == day && d.getHours() == hours && d.getMinutes()-4 == minutes && d.getSeconds() > second)
        //     response["feed"][i].date = (d.getSeconds() - Number(second))+" วินาที"
        if (d.getFullYear() == year && d.getMonth() + 1 == month && d.getDate() == day && d.getHours() == hours && d.getMinutes() - 3 <= minutes)
          response["feed"][i].date = "เมื่อสักครู่"
        else if (d.getFullYear() == year && d.getMonth() + 1 == month && d.getDate() == day && d.getHours() == hours && d.getMinutes() - 3 > minutes)
          response["feed"][i].date = ((d.getMinutes() - 3) - Number(minutes)) + " นาที"
        else if (d.getFullYear() == year && d.getMonth() + 1 == month && d.getDate() == day && d.getHours() > hours)
          response["feed"][i].date = (d.getHours() - Number(hours)) + " ชั่วโมง"
        else if (d.getFullYear() == year && d.getMonth() + 1 == month && d.getDate() > day && (d.getDate() - Number(day) >= 6))
          response["feed"][i].date = (((d.getDate() / 7).toString().split('.')[0])) + " สัปดาห์"
        else if (d.getFullYear() == year && d.getMonth() + 1 == month && d.getDate() > day)
          response["feed"][i].date = (d.getDate() - Number(day)) + " วัน"
        else if (d.getFullYear() == year && d.getMonth() + 1 > month)
          response["feed"][i].date = (d.getMonth() - Number(month)) + " เดือน"
        else if (d.getFullYear() > year)
          response["feed"][i].date = (d.getFullYear() - Number(year)) + " ปี"

        //console.log(response["feed"][i].post_ID)
        //
        //////////////////เรียกหาจำนวน like เมื่อรอบแรก

        let reqestLike = this.http.get("http://apifood.comsciproject.com/post/getLikePost/" + response["feed"][i].post_ID, option).toPromise().then(response1 => {
          this.likeCount[i] = response1["countLike"]
          if (response1["user_ID"] == 1) {  //ไม่ใช่ user_ID แต่มันคือcount ใส่ผิด เบลออ
            this.divLike[i] = 1
            //console.log(this.divLike+"<<<<<<<<<<<<<<<")
          } else {
            this.divLike[i] = 0
          }
          //console.log(response1["countLike"]+" like")
        })


      }



      // for(var val of response["feed"]){
      //   console.log(val)
      // }
      this.postnewFeed = response["feed"]
      console.log(this.likeCount)
      // console.log(this.postnewFeed)
      // console.log(this.postnewFeed)

    })




    this.items = [
      {
        label: 'แก้ไขโพสต์', icon: 'pi pi-refresh', command: () => {
          //console.log("12312312 = "+this.text)
          this.displayEdit();
        }
      },
      {
        label: 'ลบโพสต์', icon: 'pi pi-times', command: () => {
          this.displaydelete();
        }
      },
      { label: 'Angular.io', icon: 'pi pi-info', url: 'http://angular.io' },
      { separator: true },
      { label: 'Setup', icon: 'pi pi-cog', routerLink: ['/setup'] }
    ];

    console.log(this.postnewFeed);
  }

  //กด likeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
  like(index, pid) {
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + this.gettoken
    });
    let option = {
      headers: header
    }

    let json = { pid: pid }
    let request = this.http.post('http://apifood.comsciproject.com/post/likepost', json, option).subscribe(response => {
      if (response["success"] == 1) {
        this.likeCount[index] = response["countLike"]
        if (response["countMyLiked"] == 1) {
          this.divLike[index] = 1
        } else {
          this.divLike[index] = 0
        }

        //console.log(this.divLike+"<<<<<<<<<<<")
      }
    })
  }

  ////////////////////////////////// -ลบโพสต์- /////////////////////////////////////
  displaydelete() {
    this.displayResponsiveDelete = true;
  }
  displayResponsivedelete(postId) {
    console.log(postId.post_ID);
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + this.gettoken
    });
    let option = {
      headers: header
    }

    let json = { post_ID: postId.post_ID };
    let request = this.http.post('http://apifood.comsciproject.com/post/deletePost', json, option)
      .subscribe(response => {

        if (response["success"] == 1) {
          location.reload();
        }


      })

    this.displayResponsiveDelete = false;
  }
  ////////////////////////////////// -ลบโพสต์- /////////////////////////////////////

  ////////////////////////////////// -แก้ไขโพสต์- /////////////////////////////////////

  displayEdit() {
    this.displayResponsiveEdit = true;
  }
  displayResponsiveEdits(postId) {
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + this.gettoken
    });
    let option = {
      headers: header
    }
    let json = { post_ID: postId.post_ID, caption: this.property };

    let request = this.http.post('http://apifood.comsciproject.com/post/editPost', json, option)
      .subscribe(response => {
        console.log(response)
        if (response["success"] == 1) {
          location.reload();
        }


      })

    console.log(postId.post_ID)
    console.log(this.property);
    this.displayResponsiveEdit = false;
  }

  ////////////////////////////////// -แก้ไขโพสต์- /////////////////////////////////////

  getInterpretations() {
    if (localStorage.getItem('interpretations') === null) {
      this.router.navigateByUrl('/login');
    }
    else {
      this.interpretations = JSON.parse(localStorage.getItem('TOKEN'))
    }
  }

  getToken() {
    if (localStorage.getItem('TOKEN') === null)
      this.interpretations = [];
    else {
      this.interpretations = localStorage.getItem('TOKEN')
    }
  }

  //-------------------------------------upload_Post------------------------------------//
  showModalDialog() {
    this.displayModal = true;
    this.uploadSS = true
  }
  uploadSS = false
  public onFileUpload(data: { files: File }): void {
    const formData: FormData = new FormData();
    this.localstorage = JSON.parse(localStorage.getItem('TOKEN'))
    this.gettoken = this.localstorage.token

    formData.append("postImage", data.files[0])
    formData.append("caption", this.txt)
    formData.append("status_post", "1")
    formData.append("privacy_post", "1")
    formData.append("token", this.gettoken)




    let interval = setInterval(() => {
      //this.value = this.value + Math.floor(Math.random() * 1) + 1;
      this.value += 1
      //this.value = 100;
      //this.value = 0


      if (this.value >= 100) {
        this.value = 100;
      }
      //
      //this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Process Completed' });


      if (this.uploadSS == true) {
        this.uploadSS = false
        let req = this.http.post('http://apifood.comsciproject.com/post/createPost', formData).toPromise().then(data => {
          //console.log(data)
          //if (this.value >= 100) {


          if (data["success"] == 1) {

            clearInterval(interval);
            this.value = 100;
            setTimeout(() => {
              this.displayModal = false;
              location.reload()

            }, 3000)

          }
          // }

        })
      }




      //}

    }, 400);



    //formData.append('file', file, file.name);
  }


  //-------------------------------------upload_Post------------------------------------//

  // <!-- -----------------------------------------dialog-------------------------------------------------------- -->
  displayImg: boolean
  selectedImg: any
  dateConvert: any

  selectImg(item: any) {
    this.property = item["caption"]
    this.selectedImg = item
    this.displayImg = true
    console.log(this.selectedImg)
  }

  cancelSelectedImg() {
    this.displayImg = false
    this.divEdit = true
    this.divEdit1 = false
  }

  divEdit: boolean = true
  divEdit1: boolean = false
  selectImgEdit() {
    this.divEdit = false
    this.divEdit1 = true
  }

  cancelSelectedImgEdit() {
    this.divEdit = true
    this.divEdit1 = false

  }
  // <!-- -----------------------------------------dialog-------------------------------------------------------- -->

  getSuggestion() {
    let header = new HttpHeaders({

      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + this.gettoken
    });
    let option = {
      headers: header
    }

    let req = this.http.get("http://apifood.comsciproject.com/follow/randFollow", option).subscribe(response => {



      for (let i = 0; i < 5; i++) {
        this.http.get("http://apifood.comsciproject.com/follow/checkFollow/" + response["results"][i].user_ID, option).subscribe(response1 => {
          this.checkFollow = response1['checkFollow']
          console.log(response1['checkFollow'])
          if (response1['checkFollow'] != 1) {
            this.followSugg.push(response["results"][i])
          }

        })
      }
    })
  }

  indexOfFollow = [0, 0, 0, 0, 0]
  follow(id, index) {

    let header = new HttpHeaders({

      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + this.gettoken
    });
    let option = {
      headers: header
    }
    console.log(index)
    let json = { following_ID: id };
    let request = this.http.post('http://apifood.comsciproject.com/follow/following', json, option)
      .subscribe(response => {

        if (response["success"] == 1) {
          this.indexOfFollow[index] = 1
        }
        //console.log(response)

      })


  }

  unfollow(id, index) {

    let header = new HttpHeaders({

      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + this.gettoken
    });
    let option = {
      headers: header
    }
    console.log(index)
    let json = { following_ID: id };
    let request = this.http.post('http://apifood.comsciproject.com/follow/unfollowing', json, option)
      .subscribe(response => {

        if (response["success"] == 1) {
          this.indexOfFollow[index] = 0
        }
        //console.log(response)

      })


  }


}
