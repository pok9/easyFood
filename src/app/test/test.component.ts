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

  countries = ["1SSS","2SSS","3SSS"]

  filterCountry(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered : any[] = [];
    let query = event.query;
    // console.log(query);
    for(let i = 0; i < this.countries.length; i++) {
        let country = this.countries[i];

        // if(country == query)
          filtered.push(country);
          
        // if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        //     filtered.push(country);
        // }
    }
    
    this.filteredCountries = filtered;
}

numbers: string[] = ['onne','two','three','four','five','six','seven','eight','nine','ten'];
output: string[];
selectNumber: any;
search(event) {
  console.log('event',event);
  this.output = this.numbers.filter(c => c.startsWith(event.query));
}

  




}
