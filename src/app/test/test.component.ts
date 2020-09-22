//import component, ElementRef, input and the oninit method from angular core
import { Component, OnInit,ElementRef, ViewChild} from '@angular/core';
import { FormBuilder} from '@angular/forms';
import {HttpClient , HttpHeaders} from '@angular/common/http';
import * as myGlobals from '../global';
import { FileSelectDirective, FileUploader} from 'ng2-file-upload';
import { Subject } from 'rxjs/Subject'
import { MatDialogRef,MatToolbarModule } from '@angular/material';
import $ from 'jquery';
// import{GrdFilterPipe} from '../grd-filter.pipe'
import Swal from 'sweetalert2';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';



@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
request_status=false;
  constructor(private http:HttpClient) { 
 
  	}
	


  ngOnInit() {


  }

applyopp(id){
	console.log(id)
}

   
 }

 