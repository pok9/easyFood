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
  inputdata: any

  final: any

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
          "name": response["data"][datas].nickName,
          "image": response["data"][datas].profile_img
        }


        filtered.push(data)
      }
      this.output = filtered;
    })

  }

  test(event) {
    console.log(this.selectNumber)
    console.log(event)
  }

  send() {
    //console.log(this.inputdata)
    //console.log(this.inputdata.length)
    this.fact(this.inputdata, this.inputdata.length, 1)
  }

  fact(data: any, dataL: any, fact: any) {
    for (var i = 1; i <= dataL; i++) {
      fact = fact * i

    }
    //
    var H = fact
    fact = 1

    var tmp = []
    for (var i = 0; i < data.length; i++) {
      tmp[i] = data[i]
    }

    var counts = []
     var sort_arr = tmp.slice().sort()
     var current = null
     var count = 0
     for(var i=0; i< sort_arr.length;i++){
       if(sort_arr[i] != current){
         if(count > 0){
           if(count > 1){
             counts.push(count)
           }
           
          // console.log(current + ' comes --> ' + count + ' times')
         }
         current = sort_arr[i]
         count = 1
       }else{
         count ++
       }
     }
     if(count > 0){
      if(count > 1){
        counts.push(count)
      }
      //console.log(current + ' comes --> ' + count + ' times')
     }
     //console.log(H)
     //console.log(counts)
    var arrB = []
     for(var i=0;i<counts.length;i++){
      for (var j = 1; j <= counts[i]; j++) {
        fact = fact * j
  
      }
      arrB.push(fact)
      //console.log(fact)
      fact = 1
      
     }

     var B = 1;
     for (var i = 0; i < arrB.length; i++) {
      B = B * arrB[i];
     }
     //console.log(B)

     var finalResult = H/B
     //console.log(finalResult)
     this.final = finalResult
    
    /*6!        720   60
      3! * 2!   6*2             */
  }





}
