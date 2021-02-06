import { Component, OnInit } from '@angular/core';
import { faHouseUser } from '@fortawesome/free-solid-svg-icons';
import { faComments } from '@fortawesome/free-regular-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';
// import { faHome } from '@fortawesome/free-regular-svg-icons';
import { UserpassService } from '../userpass.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})



export class ToolbarComponent implements OnInit {
  iconhome = faHouseUser;
  iconmessage = faComments;
  iconbell = faBell;
  username: any;
  profile_img: any;

  interpretations;
  localstorage;
  gettoken;

  displayModal
  position
  

  constructor(private datapass: UserpassService, private http: HttpClient) {


    this.getInterpretations()
    this.profile_img = this.interpretations.profile_img
    this.username = this.interpretations.username;

    //this.profile_img = this.interpretations.imgProfile;
  }

  ngOnInit(): void {
    
  }

  getInterpretations() {
    if (localStorage.getItem('interpretations') === null)
      this.interpretations = [];
    else {
      this.interpretations = JSON.parse(localStorage.getItem('interpretations'))
    }
  }

  logoutLocalstorege() {
    localStorage.removeItem('interpretations')
    localStorage.removeItem('TOKEN')
  }

  test() {
    this.localstorage = JSON.parse(localStorage.getItem('TOKEN'))
    this.gettoken = this.localstorage.token
    let json = { username: "1" };

    let header = new HttpHeaders({

      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + this.gettoken
    });
    let option = {
      headers: header
    }


    let req = this.http.post('http://apifood.comsciproject.com/users/test1', json, option).subscribe(response => {
      console.log(response)
    })

    //let req = this.http.post
  }

  showPositionDialog(position: string) {
    this.position = position
    this.displayModal = true;
  }
 

}
