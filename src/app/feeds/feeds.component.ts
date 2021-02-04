import { Component, OnInit } from '@angular/core';
import { UserpassService } from '../userpass.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnInit {
  interpretations
  TOKEN
  displayModal: boolean;//dialog
  uploadedFiles: any[] = [];//upload imageProfile
  constructor(private datapass: UserpassService, private router: Router) {
    // console.log(datapass.username);

  }
  onUpload(event) {
    for (let file of event.files) {
      console.log("1");
      this.uploadedFiles.push(file);
    }
    console.log("5555");
    // this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
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
      this.interpretations = JSON.parse(localStorage.getItem('interpretations'))
    }
  }

  getToken() {
    if (localStorage.getItem('TOKEN') === null)
      this.interpretations = [];
    else {
      this.interpretations = localStorage.getItem('TOKEN')
    }
  }

  showModalDialog() {
    this.displayModal = true;
  }


}
