import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/service/food.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnInit {

  cartItem: number = 0;
  FoodPost = []
  FoodData: any = [];
  selectedFood: any = {}
  showPopup: boolean = false
  searchTerm: any = '';
  constructor(
    public foodService: FoodService,
    private auth: AngularFireAuth,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getAllFoodPost()
  }

  getAllFoodPost() {
    console.log(1)
    this.FoodData = []
    this.foodService
      .getAllFoodItem()
      .subscribe((res: any) => {
        console.log(2)
        this.FoodPost = res
        console.log("uncorrected : ", res)
        this.setDataForFeed(res)
        console.log("corrected : ", this.FoodData)
        this.snackbar.open(
          'Beiträge erfolgreich geladen',
          'Close',
          { duration: 4000 }
        );
      });
  }

  setDataForFeed(res: any) {
    this.FoodData = [];
    for (let index = 0; index < res.length; index++) {
      var obj = res[index].payload.doc.data()
      obj.id = res[index].payload.doc.id
      this.FoodData.push(obj)
    }
  }

  selectFood(obj?: any) {
    this.selectedFood = obj
    this.showPopup = true;
  }

}
