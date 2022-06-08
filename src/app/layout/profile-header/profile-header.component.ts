import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.css']
})
export class ProfileHeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  getPageName() {
    if (this.router.url.slice(6) == 'contact-us') {
      return 'Kontaktiere uns';
    }
    else if (this.router.url.slice(6) == 'about') {
      return 'über uns';
    }
    else if (this.router.url.slice(6) == 'feed') {
      return 'Produkt-Feed';
    }
    else if (this.router.url.slice(6) == 'home') {
      return 'Home';
    }
    else if (this.router.url.slice(6) == 'post') {
      return 'Beitrag Erstellen';
    }
    else if (this.router.url.slice(6) == 'history') {
      return 'Alte Postliste';
    }
    else {
      return '';
    }
  }
}
