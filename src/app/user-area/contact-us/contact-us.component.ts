import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from "@angular/fire/storage";
import { map, finalize } from "rxjs/operators";
import { Observable } from "rxjs";
import { FoodService } from 'src/app/service/food.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ContactUsService } from 'src/app/service/contact-us.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  postContactForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    message: new FormControl(''),
    email: new FormControl(''),
    contactNumber: new FormControl('')
  })

  constructor(
    public router: Router,
    private storage: AngularFireStorage,
    public contactService: ContactUsService,
    private auth: AngularFireAuth,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  submitForm() {
    this.contactService.postContactUsQuery(this.postContactForm.value).then(
      res => {
        console.log("Your Query Has Been Sent !")
        console.log(res)
      }
    )
  }

}
