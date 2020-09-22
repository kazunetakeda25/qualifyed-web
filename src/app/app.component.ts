
import { HttpClient,HttpHeaders} from '@angular/common/http';
import * as $ from 'jquery';
import * as myGlobals from './global';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { Component, Input, ElementRef, ViewChild } from '@angular/core';



import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipsModule} from '@angular/material/chips';
import {MatChipInputEvent, MatCardModule,
  MatCheckboxModule,  MatInputModule,
  MatRadioModule,
} from '@angular/material';
//import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 api=myGlobals.api_url;	
     userapi=myGlobals.userapi_url;


      showMenu: boolean = false;

 constructor(private http:HttpClient,private rt:Router,private user:UserService){

 }

ngOnInit(){
  
}



  openDropdown(){
    this.showMenu = true 
  }

  closeDropdown(){
    this.showMenu = false
  }
}
