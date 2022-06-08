import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FoodPost } from '../model/FoodPost';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class FoodService {
  imageDetailList!: AngularFireList<any>;

  constructor(private firestore: AngularFirestore, private firebase: AngularFireDatabase, public snackbar: MatSnackBar) { }

  createFoodItem(data: any) {
    return new Promise<FoodPost>((resolve, reject) => {
      this.firestore
        .collection("New-Food-Post")
        .add(data)
        .then(res => { }, err => reject(err));
    });
  }

  deleteFoodItem(id: any) {
    return new Promise<FoodPost>((resolve, reject) => {
      this.firestore
        .collection("New-Food-Post")
        .doc(id)
        .delete()
        .then(res => {
          this.snackbar.open(
            "Erfolgreich löschen !",
            'Close',
            { duration: 4000 })
        }, err => {
          this.snackbar.open(
            "Löschen fehlgeschlagen !",
            'Close',
            { duration: 4000 })
          reject(err)
        });
    });
  }

  getAllFoodItem() {
    return this.firestore.collection("New-Food-Post").snapshotChanges();
  }

}
