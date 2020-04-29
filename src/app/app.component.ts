import { Component, AfterViewInit } from "@angular/core";
import * as firebase from "firebase/app";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements AfterViewInit {
  ngAfterViewInit() {
    firebase.analytics().logEvent("eventname", {
      "firsttimeuser": true,
      "username": "hafiz"
    });
  }
}
