import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { NgxSpinnerService } from 'ngx-spinner';
import { SearchPipe } from "./../../../Services/Search/search.pipe";
import { Router } from '@angular/router';

@Component({
  selector: 'app-mobile-organizations',
  templateUrl: './mobile-organizations.component.html',
  styleUrls: ['./mobile-organizations.component.css']
})
export class MobileOrganizationsComponent implements OnInit {

  /****** Filers input ******/
  public searchText: any = "";
  /****** Organizations observer ******/
  allOrganizations: any[] = [];
  organizations: any[] = [];
  organizationsCount: number = 0;
  showingOrganizations: number = 0;
  /****** helping-with categories observer ******/
  helpingsWith: any[] = [];
  /****** looking-for categories observer */
  lookingsFor: any[] = [];

  /****** First & Last Key ******/
  public firstKey = "";
  public lastKey = "";
  public listItemsCounter = 0;

  /****** Previous & Next Button enabling ******/
  public enablePre = false;
  public enableNext = true;


  constructor(private firebase: AngularFireDatabase,
    private router: Router,
    private spinner: NgxSpinnerService) {
    var filteredArray = JSON.parse(localStorage.getItem("filteredOrganizations"));
    /****** Helping Categories ******/
    this.firebase.database.ref("HelpingWith").once("value").then(hData => {
      var helpData = hData.val();
      var helps = [];
      if (helpData.length != 0) {
        for (let key in helpData) {
          helps.push({
            key: key,
            name: helpData[key].name
          });
        }
      }
      return helps;
    }).then(helpings => {
      this.helpingsWith.push(helpings);
    });

    /****** Looking Categories ******/
    this.firebase.database.ref("LookingFor").once("value").then(lData => {
      var lookData = lData.val();
      var looks = [];
      if (lookData.length != 0) {
        for (let key in lookData) {
          looks.push({
            key: key,
            name: lookData[key].name
          });
        }
      }
      return looks;
    }).then(lookings => {
      this.lookingsFor.push(lookings);
    });

    /****** Organizations list size ******/
    this.firebase.database.ref("Organizations").once("value").then((orgData) => {
      var oData = orgData.val();
      if (oData.length != 0) {
        for (let key in oData) {
          if (oData[key].status == "Approved") {
            this.organizationsCount++;
            this.allOrganizations.push(oData[key]);
          }
        }
      }
    });

    if (filteredArray == null) {
      /****** Organizations list fetching operations */
      this.firebase.database.ref("Organizations").orderByKey().limitToFirst(11).once("value").then(orgData => {
        var oData = orgData.val();
        var counter = 0;
        if (oData.length != 0) {
          for (let key in oData) {
            if (oData[key].status == "Approved") {
              counter++;
              this.lastKey = key;
              if (counter <= 10) {
                this.organizations.push(oData[key]);
                this.showingOrganizations++;
              }
            }
          }
        }
      });
    } else {
      this.organizations = filteredArray;
      this.showingOrganizations = filteredArray.length;
      this.enableNext = false;
    }

  }


  /****** On Component initializing */
  ngOnInit() {
  }


  /****** Next Page Operation ******/
  nextPage(lastKey) {
    this.enablePre = true;
    this.spinner.show();
    this.firebase.database.ref("Organizations").orderByKey().startAt(lastKey).limitToFirst(11).once("value").then(data => {
      var nextData = data.val();
      var nextDataSize = Object.keys(nextData).length - 1;
      if (nextDataSize < 10) {
        this.enableNext = false;
      }
      this.listItemsCounter = nextDataSize;
      this.showingOrganizations = this.showingOrganizations + this.listItemsCounter;
      var counter = 0;
      var nextOrganizations = [];
      if (nextData.length != 0) {
        for (let key in nextData) {
          if (nextData[key].status == "Approved") {
            counter++;
            if (counter == 1) {
              this.firstKey = key;

            }
            this.lastKey = key;
            if (counter <= 10) {
              nextOrganizations.push(nextData[key]);
            }
          }
        }
      }
      return nextOrganizations
    }).then(newList => {
      this.organizations = newList;
    }).then(() => {
      this.spinner.hide();
    });
  }

  /****** Previous Page Operation ******/
  previousPage(firstKey) {
    this.spinner.show();
    this.firebase.database.ref("Organizations").orderByKey().endAt(firstKey).limitToLast(11).once("value").then(data => {
      var preData = data.val();
      if (this.showingOrganizations > 10) {
        this.enableNext = true;
      }
      this.showingOrganizations = this.showingOrganizations - this.listItemsCounter;
      if (this.showingOrganizations <= 10) {
        this.enablePre = false;
      }
      var preDataSize = Object.keys(preData).length - 1;
      this.listItemsCounter = preDataSize;
      var counter = 0;
      var preOrganizations = [];
      if (preData.length != 0) {
        for (let key in preData) {
          if (preData[key].status == "Approved") {
            counter++;
            if (counter == 1) {
              this.firstKey = key;
            }
            this.lastKey = key;
            if (counter <= 10) {
              preOrganizations.push(preData[key]);
            }
          }
        }
      }
      return preOrganizations
    }).then(newList => {
      this.organizations = newList;
    }).then(() => {
      this.spinner.hide();
    });
  }


  getDetails(details, key) {
    localStorage.setItem("organizationDetails", JSON.stringify(details));
    localStorage.setItem("organizationKey", key);
    this.router.navigate(["/mobile-modal"]);
  }

  filtersUI(allOrgs) {
    localStorage.setItem("allOrganizations", JSON.stringify(allOrgs));
    this.router.navigate(["/mobile-filters"]);
  }

}
