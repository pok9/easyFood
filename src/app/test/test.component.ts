import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
  }
  yourFile: File;
getFile(fileInput) {
   this.yourFile = fileInput.target.files[0];
   console.log("ok");
}

}
