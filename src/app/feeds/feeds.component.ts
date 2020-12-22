import { Component, OnInit } from '@angular/core';
import { UserpassService } from '../userpass.service';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnInit {

  constructor(private datapass : UserpassService) { 
    console.log(datapass.username);
    console.log(datapass.password);
  }

  ngOnInit(): void {
  }

}
