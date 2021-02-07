import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})


export class TestComponent implements OnInit {
  // selectedCountry: any;
  // filteredCountries: any[];

  // selectedCity3: string;
  // groupedCities: any[];

  constructor(private http: HttpClient) {
  //   this.groupedCities = [
  //     {
  //         label: 'Germany', value: 'de', 
  //         items: [
  //             {label: 'Berlin', value: 'Berlin'},
  //             {label: 'Frankfurt', value: 'Frankfurt'},
  //             {label: 'Hamburg', value: 'Hamburg'},
  //             {label: 'Munich', value: 'Munich'}
  //         ]
  //     },
  //     {
  //         label: 'USA', value: 'us', 
  //         items: [
  //             {label: 'Chicago', value: 'Chicago'},
  //             {label: 'Los Angeles', value: 'Los Angeles'},
  //             {label: 'New York', value: 'New York'},
  //             {label: 'San Francisco', value: 'San Francisco'}
  //         ]
  //     },
  //     {
  //         label: 'Japan', value: 'jp', 
  //         items: [
  //             {label: 'Kyoto', value: 'Kyoto'},
  //             {label: 'Osaka', value: 'Osaka'},
  //             {label: 'Tokyo', value: 'Tokyo'},
  //             {label: 'Yokohama', value: 'Yokohama'}
  //         ]
  //     }
  // ];

  }

  ngOnInit(): void {
  }



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
          "name" : response["data"][datas].nickName, 
          "image" : response["data"][datas].profile_img
        }
        

        filtered.push(data)
      }
      this.output = filtered;
    })

  }

  test(event){
    console.log(this.selectNumber)
    console.log(event)
  }

  

  

}
