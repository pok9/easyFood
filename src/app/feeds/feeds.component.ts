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
  constructor(private datapass : UserpassService,private router: Router) { 
    // console.log(datapass.username);
    
  }

  ngOnInit(): void {
    if(localStorage.getItem('interpretations') === null){
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

}
