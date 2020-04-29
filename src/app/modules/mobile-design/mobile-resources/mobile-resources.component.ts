import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mobile-resources',
  templateUrl: './mobile-resources.component.html',
  styleUrls: ['./mobile-resources.component.css']
})
export class MobileResourcesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  /****** cancel method ******/
  cancel() {
    this.router.navigate(["/"]);
  }
}
