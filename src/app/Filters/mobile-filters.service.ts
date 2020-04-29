import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MobileFiltersService {

  constructor(private router: Router) { }

  /****** Generic Search using Recursion Method ******/
  filter(locArray, typeArray, providingArray, needArray, allObjects) {
    var updatedList = [];
    for (var i = 0; i < 4; i++) {
      /*** location ***/
      if (i == 0) {
        if (locArray.length == 0 || locArray == null) {
          updatedList = allObjects;
        } else {
          updatedList = this.searchByLocation(locArray, allObjects)
        }
      }

      /*** Type ***/
      if (i == 1) {
        if (typeArray.length == 0 || typeArray == null) {
          updatedList = updatedList;
        } else {
          updatedList = this.searchByType(typeArray, updatedList)
        }
      }

      /*** Providing ***/
      if (i == 2) {
        if (providingArray.length == 0 || providingArray == null) {
          updatedList = updatedList;
        } else {
          updatedList = this.searchByProviding(providingArray, updatedList)
        }
      }

      /*** Need ***/
      if (i == 3) {
        if (needArray.length == 0 || needArray == null) {
          updatedList = updatedList;
        } else {
          updatedList = this.searchByNeed(needArray, updatedList)
        }
      }
    }
    localStorage.setItem("filteredOrganizations", JSON.stringify(updatedList));
    this.router
      .navigateByUrl("/", {
        skipLocationChange: false
      })
      .then(() => this.router.navigate(["/"]));
  }

  /****** Serach by location ******/
  searchByLocation(locs, arrayOfObjects) {
    var collection = [];
    var keys = [];
    for (let name of locs) {
      for (var i = 0; i < arrayOfObjects.length; i++) {
        for (let loc of arrayOfObjects[i].Locations) {
          if (loc == name) {
            if (this.existanceCheck(keys, arrayOfObjects[i].key)) {
            } else {
              collection.push(arrayOfObjects[i]);
              keys.push(arrayOfObjects[i].key);
            }
          }
        }
      }
    }
    return collection;
  }

  /****** Search by type ******/
  searchByType(types, arrayOfObjects) {
    var collection = [];
    var keys = [];
    for (let type of types) {
      for (var i = 0; i < arrayOfObjects.length; i++) {
        if (arrayOfObjects[i].type === type) {
          if (this.existanceCheck(keys, arrayOfObjects[i].key)) {
          } else {
            collection.push(arrayOfObjects[i]);
            keys.push(arrayOfObjects[i].key);
          }
        }
      }
    }
    return collection;
  }

  /****** Search by providing ******/
  searchByProviding(pKeys, arrayOfObjects) {
    var collection = [];
    var keys = [];
    for (let key of pKeys) {
      for (var i = 0; i < arrayOfObjects.length; i++) {
        for (let help of arrayOfObjects[i].Helpings) {
          if (help == key) {
            if (this.existanceCheck(keys, arrayOfObjects[i].key)) {
            } else {
              collection.push(arrayOfObjects[i]);
              keys.push(arrayOfObjects[i].key);
            }
          }
        }
      }
    }
    return collection;
  }

  /****** Search  by need ******/
  searchByNeed(nKeys, arrayOfObjects) {
    var collection = [];
    var keys = [];
    for (let key of nKeys) {
      for (var i = 0; i < arrayOfObjects.length; i++) {
        for (let looking of arrayOfObjects[i].Lookings) {
          if (looking == key) {
            if (this.existanceCheck(keys, arrayOfObjects[i].key)) {
            } else {
              collection.push(arrayOfObjects[i]);
              keys.push(arrayOfObjects[i].key);
            }
          }
        }
      }
    }
    return collection;
  }

  existanceCheck(array, item) {
    const found = array.some(el => el === item);
    if (found) {
      return true;
    } else {
      return false;
    }
  }
}
