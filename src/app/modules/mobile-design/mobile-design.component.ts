import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mobile-design',
  templateUrl: './mobile-design.component.html',
  styleUrls: ['./mobile-design.component.css']
})
export class MobileDesignComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  resources() {
    this.router.navigate(["/resources"]);
  }
}
