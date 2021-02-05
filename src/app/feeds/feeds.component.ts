import { Component, OnInit } from '@angular/core';
import { UserpassService } from '../userpass.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  txt; //ข้อความ
  localstorage
  gettoken
  avatarProfile:any
  constructor(private datapass: UserpassService, private router: Router, private http: HttpClient) {
    // console.log(datapass.username);

  }

  ngOnInit(): void {
    if (localStorage.getItem('TOKEN') === null) {
      alert("Please login!")
      this.router.navigateByUrl('/login');
    }

    this.localstorage = JSON.parse(localStorage.getItem('TOKEN'))
    this.gettoken = this.localstorage.token
          //this.decode = jwt_decode(token)
          //console.log(this.decode.user)
          let header = new HttpHeaders({

            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + this.gettoken
          });
          let option = {
            headers: header
          }

    let req = this.http.get('http://apifood.comsciproject.com/users/myAccount',option).subscribe(response =>{
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
        

        this.avatarProfile = this.interpretations.profile_img
      }
    })
    
  }

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
  }

  public onFileUpload(data: { files: File }): void {
    const formData: FormData = new FormData();
    this.localstorage = JSON.parse(localStorage.getItem('TOKEN'))
    this.gettoken = this.localstorage.token

    formData.append("postImage",data.files[0])
    formData.append("caption",this.txt)
    formData.append("status_post","1")
    formData.append("privacy_post","1")
    formData.append("token",this.gettoken)
    

    

    let interval = setInterval(() => {
       this.value = this.value + Math.floor(Math.random() * 10) + 1;
      //this.value = 100;
      if (this.value >= 100) {
        this.value = 100;
        //this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Process Completed' });
        clearInterval(interval);

        let req = this.http.post('http://apifood.comsciproject.com/post/createPost', formData).subscribe(response => {
          
          console.log(response)
        })


        this.displayModal = false;
        this.value = 0;

      }
    }, 400);

    //formData.append('file', file, file.name);
  }
  //-------------------------------------upload_Post------------------------------------//

}
