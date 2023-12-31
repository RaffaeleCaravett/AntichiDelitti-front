import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as AOS from 'aos';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
searchForm:any;

ngOnInit(): void {
  AOS.init();
  this.searchForm=new FormGroup({
titolo:new FormControl(''),
localita:new FormControl(''),
tema:new FormControl(''),
categoria:new FormControl(''),
  })
}
search(){}


}
