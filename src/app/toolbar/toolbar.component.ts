import { Component, OnInit } from '@angular/core';
import { faHouseUser } from '@fortawesome/free-solid-svg-icons';
import { faComments } from '@fortawesome/free-regular-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';
// import { faHome } from '@fortawesome/free-regular-svg-icons';
import { UserpassService } from '../userpass.service';


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

  constructor(private datapass: UserpassService) {
    

    this.getInterpretations()
    this.profile_img = this.interpretations.profile_img
    this.username = this.interpretations.username;
    
    //this.profile_img = this.interpretations.imgProfile;
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

  logoutLocalstorege(){
    localStorage.removeItem('interpretations')
    localStorage.removeItem('TOKEN')
  }

}
