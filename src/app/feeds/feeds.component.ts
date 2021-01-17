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
  constructor(private datapass : UserpassService,private router: Router) { 
    // console.log(datapass.username);
    
  }

  ngOnInit(): void {
    if(localStorage.getItem('TOKEN') === null){
      alert("Please login!")
      this.router.navigateByUrl('/login');
    }
  }

  getInterpretations(){
    if(localStorage.getItem('interpretations') === null){
      this.router.navigateByUrl('/login');
    }
   else{
        this.interpretations = JSON.parse(localStorage.getItem('interpretations'))
    }
  }

  getToken(){
      if(localStorage.getItem('TOKEN') === null)
        this.interpretations = [];
      else{
          this.interpretations = localStorage.getItem('TOKEN')
      }
    }
    

}
