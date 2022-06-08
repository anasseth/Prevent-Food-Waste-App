import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ContactUs } from '../model/Contact';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})


export class ContactUsService {
  constructor(private firestore: AngularFirestore, private firebase: AngularFireDatabase, private snackbar: MatSnackBar) { }

  postContactUsQuery(data: any) {
    return new Promise<ContactUs>((resolve, reject) => {
      this.firestore
        .collection("Contact-Us-Query")
        .add(data)
        .then(res => {
          this.snackbar.open(
            "Ihre Anfrage wurde gesendet !",
            'Close',
            { duration: 4000 }
          );
        }, err => reject(err));
    });
  }
}
