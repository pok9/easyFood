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
  username : any;
  profile_img : any;
  constructor(private datapass : UserpassService) {
    this.username = datapass.username;
    this.profile_img = datapass.imgProfile;
   }

  ngOnInit(): void {
  }

}
