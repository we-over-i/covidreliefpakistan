import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { NgxSpinnerService } from 'ngx-spinner';
import { FilterService } from "./../../../Filters/filter.service";
@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.css']
})
export class OrganizationsComponent implements OnInit {
  /****** Filers input ******/
  public searchText: any = "";
  /****** Organizations observer fetching all the organizations approved ******/
  allOrganizations: any[] = [];
  /****** Organizations observer only 10 ******/
  organizations: any[] = [];
  organizationsCount: number = 0;
  showingOrganizations: number = 0;
  /****** Organization Locations ******/
  organizationLocations: any[] = []
  /****** Organization types ******/
  organizationsTypes: any[] = [];
  /****** helping-with categories observer ******/
  helpingsWith: any[] = [];
  /****** looking-for categories observer */
  lookingsFor: any[] = [];

  /****** First & Last Key ******/
  public firstKey = "";
  public lastKey = "";
  public listItemsCounter = 0;

  /****** pagination previous and Next Buttons Enabling & Disabling factors ******/
  public enablePre = false;
  public enableNext = true;

  /****** Selectors ******/
  public locationSelected = "all";
  public typeSelected = "all";
  public providingSelected = "all";
  public needSelected = "all";

  /****** Constructor  *******/
  constructor(private firebase: AngularFireDatabase,
    private filtersService: FilterService,
    private spinner: NgxSpinnerService) {

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
  }

  uppercase(str) {
    var array1 = str.split(' ');
    var newarray1 = [];
    for (var x = 0; x < array1.length; x++) {
      newarray1.push(array1[x].charAt(0).toUpperCase() + array1[x].slice(1));
    }
    return newarray1.join(' ');
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

  /****** location Selector ******/
  selectedOrganizationLocation(locName) {
    this.enableNext = false;
    this.locationSelected = locName;
    var newList = [];
    newList = this.filtersService.selectorSearch(
      this.locationSelected, this.typeSelected, this.providingSelected, this.needSelected, this.allOrganizations
    )
    this.organizations = newList;
    this.showingOrganizations = newList.length;
  }

  /****** Type Selector ******/
  typeSelector(typeName) {
    this.enableNext = false;
    this.typeSelected = typeName;
    var newList = [];
    newList = this.filtersService.selectorSearch(
      this.locationSelected, this.typeSelected, this.providingSelected, this.needSelected, this.allOrganizations
    )
    this.organizations = newList;
    this.showingOrganizations = newList.length;
  }


  /****** Providing Selector ******/
  providingSelector(providingKey) {
    this.enableNext = false;
    this.providingSelected = providingKey;
    var newList = [];
    newList = this.filtersService.selectorSearch(
      this.locationSelected, this.typeSelected, this.providingSelected, this.needSelected, this.allOrganizations
    )
    this.organizations = newList;
    this.showingOrganizations = newList.length;
  }


  /****** Need Selector ******/
  needSelector(needKey) {
    this.enableNext = false;
    this.needSelected = needKey;
    var newList = [];
    newList = this.filtersService.selectorSearch(
      this.locationSelected, this.typeSelected, this.providingSelected, this.needSelected, this.allOrganizations
    )
    this.organizations = newList;
    this.showingOrganizations = newList.length;

  }

  /****** get organization accounts details for modal*/
  public bankAccounts = [];
  public bankStatus = 0;
  public easypaisa = [];
  public easypaiseStatus = 0;
  public jazzCash = [];
  public jazzCashStatus = 0;
  public addresses = [];
  public addressStatus = 0;
  public leftDisplay = "none";
  public rightDisplay = "none";

  /****** organization details ******/
  public name = "";
  public locs = "";
  public phones = "";
  public fLink = 0;
  public iLink = 0;
  public tLink = 0;
  getDetails(details, key) {
    this.spinner.show();
    this.name = details.name;
    this.locs = details.Locations;
    this.phones = details.Contacts;
    this.fLink = details.facebook;
    this.iLink = details.instagram;
    this.tLink = details.twitter;

    /***** bank accounts */
    this.firebase.database.ref("BankAccounts").child(key).once("value").then(data => {
      this.bankAccounts = [];
      this.bankStatus = 0;
      this.leftDisplay = "none";
      var bankAccounts = data.val();
      if (bankAccounts != null) {
        this.bankStatus = 1;
        this.leftDisplay = "block";
        for (let key in bankAccounts) {
          this.bankAccounts.push(bankAccounts[key]);
        }
      }
    });

    /****** Easypaisa ******/
    this.firebase.database.ref("EasyPaisaAccounts").child(key).once("value").then(data => {
      this.easypaisa = [];
      this.easypaiseStatus = 0;
      this.rightDisplay = "none";
      var easypaisa = data.val();
      if (easypaisa != null) {
        this.easypaiseStatus = 1;
        this.rightDisplay = "block";
        for (let key in easypaisa) {
          this.easypaisa.push(easypaisa[key]);
        }
      }
    });

    /***** JazzCash ******/
    this.firebase.database.ref("JazzCashAccounts").child(key).once("value").then(data => {
      this.jazzCash = [];
      this.jazzCashStatus = 0;
      var jazzCash = data.val();
      if (jazzCash != null) {
        this.jazzCashStatus = 1;
        for (let key in jazzCash) {
          this.jazzCash.push(jazzCash[key]);
        }
      }
    });

    /****** Donation address ******/
    this.firebase.database.ref("DonationsAddresses").child(key).once("value").then(data => {
      var addresses = data.val();
      this.addressStatus = 0;
      this.addresses = [];
      if (addresses != null) {
        this.addressStatus = 1;
        for (let key in addresses) {
          this.addresses.push(addresses[key]);
        }
      }
    }).then(() => {
      this.spinner.hide();
    });
  }

}
