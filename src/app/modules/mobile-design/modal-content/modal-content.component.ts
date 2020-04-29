import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.css']
})
export class ModalContentComponent implements OnInit {

  public details: any;
  public key = "";

  constructor(private firebase: AngularFireDatabase,
    private router: Router,
    private spinner: NgxSpinnerService) {
    this.details = JSON.parse(localStorage.getItem("organizationDetails"));
    this.key = localStorage.getItem("organizationKey");
    this.getDetails(this.details, this.key);
  }

  ngOnInit() {
  }

  /****** get organization accounts details for modal*/
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
      var bankAccounts = data.val();
      if (bankAccounts != null) {
        this.bankStatus = 1;
        for (let key in bankAccounts) {
          this.bankAccounts.push(bankAccounts[key]);
        }
      }
    });

    /****** Easypaisa ******/
    this.firebase.database.ref("EasyPaisaAccounts").child(key).once("value").then(data => {
      this.easypaisa = [];
      this.easypaiseStatus = 0;
      var easypaisa = data.val();
      if (easypaisa != null) {
        this.easypaiseStatus = 1;
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

  /****** cancel method ******/
  cancel() {
    this.router.navigate(["/"]);
  }
}
