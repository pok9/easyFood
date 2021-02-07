import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  selectedCountry: any;
  filteredCountries: any[];

  constructor() {

  }

  ngOnInit(): void {
  }

  // countries = ["1SSS", "2SSS", "3SSS"]

  // filterCountry(event) {
  //   //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
  //   let filtered: any[] = [];
  //   let query = event.query;
  //   // console.log(query);
  //   for (let i = 0; i < this.countries.length; i++) {
  //     let country = this.countries[i];

  //     // if(country == query)
  //     filtered.push(country);

  //     // if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
  //     //     filtered.push(country);
  //     // }
  //   }

  //   this.filteredCountries = filtered;
  // }

  


  selectNumber: any;
  output: any[];
  search(event) {
    let numbers: string[] = ['onne', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
    
    let filtered: any[] = [];
    
    // var keys = Object.keys(myObject).length;
    for (let i = 0; i < numbers.length; i++) {
      let country = numbers[i];

      // if(country == query)
      filtered.push(country);
      console.log(i)
      // if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
      //     filtered.push(country);
      // }
    }
    // console.log('event', event);
    // this.output = numbers.filter(c => c.startsWith(event.query));
    this.output = filtered;
  }






}
