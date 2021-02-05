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
  constructor(private datapass: UserpassService, private router: Router, private http: HttpClient) {
    // console.log(datapass.username);

  }

  ngOnInit(): void {
    if (localStorage.getItem('TOKEN') === null) {
      alert("Please login!")
      this.router.navigateByUrl('/login');
    }
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
    
    formData.append("postImage",data.files[0])
    formData.append("caption",this.txt)
    formData.append("status_post","1")
    formData.append("privacy_post","1")
    // const file = data.files[0];
    this.interpretations = JSON.parse(localStorage.getItem('TOKEN'))
    this.TOKEN = this.interpretations.token
    let header = new HttpHeaders({

      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + this.TOKEN,
      'Accept' : "*/*"

    });
    let option = {
      headers: header
    }

    let interval = setInterval(() => {
      // this.value = this.value + Math.floor(Math.random() * 10) + 1;
      this.value = 100;
      if (this.value >= 100) {
        this.value = 100;
        //this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Process Completed' });
        clearInterval(interval);

        let req = this.http.post('http://apifood.comsciproject.com/post/createPost', formData, option).subscribe(response => {
          console.log("5555555555555555555")
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
