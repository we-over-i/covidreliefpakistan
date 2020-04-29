import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { MobileFiltersService } from 'src/app/Filters/mobile-filters.service';

@Component({
  selector: 'app-mobile-filters',
  templateUrl: './mobile-filters.component.html',
  styleUrls: ['./mobile-filters.component.css']
})
export class MobileFiltersComponent implements OnInit {

  /****** All organizations list ******/
  allOrganizations: any[] = [];

  /****** Collections set ******/
  organizationLocations: any[] = []
  organizationsTypes: any[] = [];
  helpingsWith: any[] = [];
  lookingsFor: any[] = [];

  /****** filtered collections ******/
  public locationSelected = [];
  public typeSelected = [];
  public providingSelected = [];
  public needSelected = [];

  constructor(public router: Router, public firebase: AngularFireDatabase, private mobileFiltersService: MobileFiltersService) {

    /****** All organizations ******/
    this.allOrganizations = JSON.parse(localStorage.getItem("allOrganizations"));

    /****** Locations ******/
    this.firebase.database.ref("Locations").once("value").then(data => {
      var locs = data.val();
      var allLocs = [];
      if (locs.length != 0) {
        for (let key in locs) {
          var getStr = this.uppercase(locs[key].name);
          allLocs.push(getStr);
        }
      }
      return allLocs;
    }).then(locs => {
      this.organizationLocations = locs;
    });
    /****** Types ******/
    this.firebase.database.ref("Types").once("value").then(data => {
      var types = data.val();
      var allTypes = [];
      if (types.length != 0) {
        for (let key in types) {
          var getStr = this.uppercase(types[key].type);
          allTypes.push(getStr);
        }
      }
      return allTypes;
    }).then(types => {
      this.organizationsTypes = types;
    });
    /****** Helping Categories ******/
    this.firebase.database.ref("HelpingWith").once("value").then(hData => {
      var helpData = hData.val();
      var helps = [];
      if (helpData.length != 0) {
        for (let key in helpData) {
          var getStr = this.uppercase(helpData[key].name);
          helps.push({
            key: key,
            name: getStr
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
          var getStr = this.uppercase(lookData[key].name);
          looks.push({
            key: key,
            name: getStr
          });
        }
      }
      return looks;
    }).then(lookings => {
      this.lookingsFor.push(lookings);
    });
  }

  ngOnInit() {
  }

  uppercase(str) {
    var array1 = str.split(' ');
    var newarray1 = [];
    for (var x = 0; x < array1.length; x++) {
      newarray1.push(array1[x].charAt(0).toUpperCase() + array1[x].slice(1));
    }
    return newarray1.join(' ');
  }

  /****** cancel method ******/
  cancel() {
    this.router.navigate(["/"]);
  }


  /****** Locations ******/
  /****** check if the items are selected ******/
  locationChecked(item) {
    if (this.locationSelected.indexOf(item) != -1) {
      return true;
    }
  }
  /****** when checkbox change, add/remove the item from the array ******/
  onLocationChange(checked, item) {
    if (checked) {
      this.locationSelected.push(item);
    } else {
      this.locationSelected.splice(this.locationSelected.indexOf(item), 1);
    }
  }

  /****** Types *******/
  /****** check if the items are selected ******/
  typeChecked(item) {
    if (this.typeSelected.indexOf(item) != -1) {
      return true;
    }
  }
  /****** when checkbox change, add/remove the item from the array ******/
  onTypeChange(checked, item) {
    if (checked) {
      this.typeSelected.push(item);
    } else {
      this.typeSelected.splice(this.typeSelected.indexOf(item), 1);
    }
  }


  /****** Providing ******/
  /****** check if the items are selected ******/
  provdingChecked(item) {
    if (this.providingSelected.indexOf(item) != -1) {
      return true;
    }
  }
  /****** when checkbox change, add/remove the item from the array ******/
  onProvidingChange(checked, item) {
    if (checked) {
      this.providingSelected.push(item);
    } else {
      this.providingSelected.splice(this.providingSelected.indexOf(item), 1);
    }
  }

  /****** Need Selected ******/
  /****** check if the items are selected ******/
  needChecked(item) {
    if (this.needSelected.indexOf(item) != -1) {
      return true;
    }
  }
  /****** when checkbox change, add/remove the item from the array ******/
  onNeedChange(checked, item) {
    if (checked) {
      this.needSelected.push(item);
    } else {
      this.needSelected.splice(this.needSelected.indexOf(item), 1);
    }
  }

  /*** Apply filters button ***/
  applyFilters() {
    this.mobileFiltersService.filter(
      this.locationSelected,
      this.typeSelected,
      this.providingSelected,
      this.needSelected,
      this.allOrganizations
    );
  }

  /*** Clear filters button ***/
  clearFilters() {
    this.locationSelected = [];
    this.typeSelected = [];
    this.providingSelected = [];
    this.needSelected = [];
  }

}
