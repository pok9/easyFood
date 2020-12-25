import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserpassService {
  user_id : any; 
  success : any;
  username : any;
  fullname : any;
  nickname : any;
  imgProfile : any;
  status : any;
  constructor() { }
}
