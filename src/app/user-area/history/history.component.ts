import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FoodService } from 'src/app/service/food.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  FoodPost = []
  FoodData: any = [];

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
        console.log(res)
        this.FoodPost = res
        this.setDataForFeed(res)
        console.log(this.FoodData)
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

  filterCurrectUserPosts() {
    var userData: any = localStorage.getItem("user-email")
    return this.FoodData.filter(
      (x: any) => x.post_by == userData
    )
  }

  deletePost(postid: any) {
    this.foodService.deleteFoodItem(postid);
    this.FoodData = this.FoodData.filter((x: any) => x.id != postid)
  }

}
