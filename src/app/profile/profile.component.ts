import { Component, OnInit } from '@angular/core';
import { UserpassService } from '../userpass.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  nickname : any;
  profile_img : any;
  constructor(private datapass : UserpassService) { 
    this.nickname = datapass.nickname
    this.profile_img = datapass.imgProfile
  }

  ngOnInit(): void {
  }

}
