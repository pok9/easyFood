import { Component, OnInit } from '@angular/core';
import { faHouseUser } from '@fortawesome/free-solid-svg-icons';
import { faComments } from '@fortawesome/free-regular-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';
// import { faHome } from '@fortawesome/free-regular-svg-icons';
import { UserpassService } from '../userpass.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfirmationService } from 'primeng/api';
import {Router} from '@angular/router';
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


  constructor(private datapass: UserpassService, private http: HttpClient,private router : Router) {


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

  value(nickname){
    // let response = await this.http.get('http://apifood.comsciproject.com/users/convertNameToUsername/' + nickname).subscribe(response => {

    //   this.router.navigateByUrl('/profile/'+response["data"] )
     
    // })

    //let response = await this.http.get('http://apifood.comsciproject.com/users/convertNameToUsername/' + nickname).toPromise();
   // this.router.navigateByUrl('/profile/'+response["data"] )
    //console.log(response['data']);
    //location.reload()

    let response = this.http.get('http://apifood.comsciproject.com/users/convertNameToUsername/' + nickname).toPromise().then(data =>{
          console.log(data)
          if(data["success"] == 1){
          //   this.displayModal = false;
          //   this.value = 0;
          var test = '/profile/'+data["data"];
            window.location.href = test
           // this.router.navigateByUrl('/profile/'+data["data"] )
            //location.reload()
          }
        })
  }
  //===============================================SearchUser=======================================
}
