import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() { }

  /****** Generic Search using Recursion Method ******/
  selectorSearch(locName, typeName, providingKey, needKey, arrayOfAllObjects) {
    var updatedList = [];
    for (var i = 0; i < 4; i++) {
      /*** location ***/
      if (i == 0) {
        if (locName == "all") {
          updatedList = arrayOfAllObjects;
        } else {
          updatedList = this.searchByLocation(locName, arrayOfAllObjects)
        }
      }

      /*** Type ***/
      if (i == 1) {
        if (typeName == "all") {
          updatedList = updatedList;
        } else {
          updatedList = this.searchByType(typeName, updatedList)
        }
      }

      /*** Providing ***/
      if (i == 2) {
        if (providingKey == "all") {
          updatedList = updatedList;
        } else {
          updatedList = this.searchByProviding(providingKey, updatedList)
        }
      }

      /*** Need ***/
      if (i == 3) {
        if (needKey == "all") {
          updatedList = updatedList;
        } else {
          updatedList = this.searchByNeed(needKey, updatedList)
        }
      }
    }
    return updatedList;
  }

  /****** Serach by location ******/
  searchByLocation(name, arrayOfObjects) {
    var collection = [];
    for (var i = 0; i < arrayOfObjects.length; i++) {
      for (let loc of arrayOfObjects[i].Locations) {
        if (loc == name) {
          collection.push(arrayOfObjects[i]);
        }
      }
    }
    return collection;
  }

  /****** Search by type ******/
  searchByType(key, arrayOfObjects) {
    var collection = [];
    for (var i = 0; i < arrayOfObjects.length; i++) {
      if (arrayOfObjects[i].type === key) {
        collection.push(arrayOfObjects[i]);
      }
    }
    return collection;
  }

  /****** Search by providing ******/
  searchByProviding(key, arrayOfObjects) {
    var collection = [];
    for (var i = 0; i < arrayOfObjects.length; i++) {
      for (let help of arrayOfObjects[i].Helpings) {
        if (help == key) {
          collection.push(arrayOfObjects[i]);
        }
      }
    }
    return collection;
  }

  /****** Search  by need ******/
  searchByNeed(key, arrayOfObjects) {
    var collection = [];
    for (var i = 0; i < arrayOfObjects.length; i++) {
      for (let looking of arrayOfObjects[i].Lookings) {
        if (looking == key) {
          collection.push(arrayOfObjects[i]);
        }
      }
    }
    return collection;
  }
}
