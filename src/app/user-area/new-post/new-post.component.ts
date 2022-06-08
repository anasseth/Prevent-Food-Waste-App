import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from "@angular/fire/storage";
import { map, finalize } from "rxjs/operators";
import { Observable } from "rxjs";
import { FoodService } from 'src/app/service/food.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  title = "cloudsSorage";
  selectedFile!: File;
  fb: any;
  downloadURL!: Observable<string>;
  FoodPost: any = [];
  showFoodDetail: boolean = true;
  showUploadPicture: boolean = false;
  showConfirm: boolean = false;

  imgSrc!: string;
  selectedImage: any = null;
  isImageSelected: boolean = false;

  formTemplate = new FormGroup({
    caption: new FormControl('test', Validators.required),
    category: new FormControl('test'),
    imageUrl: new FormControl('', Validators.required)
  })

  postDetailForm = new FormGroup({
    name: new FormControl(''),
    category: new FormControl(null),
    location: new FormControl(''),
    price: new FormControl(''),
    additionalDetail: new FormControl(''),
    post_by: new FormControl(''),
    phone: new FormControl(''),
    imageURL: new FormControl('')
  })

  constructor(public router: Router, private storage: AngularFireStorage, public foodService: FoodService, private auth: AngularFireAuth,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }

  moveToUploadPicture() {
    this.showFoodDetail = !this.showFoodDetail;
    this.showUploadPicture = !this.showUploadPicture;
  }
  moveToConfirm() {
    this.showUploadPicture = false;
    this.showFoodDetail = false
    this.showConfirm = !this.showConfirm;
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
      this.isImageSelected = true;
    }
    else {
      this.imgSrc = '';
      this.selectedImage = null;
      this.isImageSelected = false;
    }
  }

  onSubmit() {
    if (this.formTemplate.valid) {
      var filePath = `${this.formTemplate.value.category}/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.formTemplate.value['imageUrl'] = url;
            this.postDetailForm.controls.imageURL.setValue(url)
            this.postDetailForm.controls.post_by.setValue(localStorage.getItem("user-email"))
            this.foodService.createFoodItem(this.postDetailForm.value).then(
              res => {
                console.log("Beitrag erfolgreich erstellt !")
                console.log(res)
              }
            )
          })
        })
      ).subscribe(
        () => {
          this.snackbar.open(
            'Vorgang abgeschlossen',
            'Close',
            { duration: 4000 }
          );
          this.resetForm();
          this.router.navigate(['/user/home'])
        }
      );
    }
  }

  get formControls() {
    return this.formTemplate['controls'];
  }

  resetForm() {
    this.formTemplate.reset();
    this.formTemplate.setValue({
      caption: 'test',
      imageUrl: '',
      category: 'test'
    });
    this.imgSrc = '';
    this.selectedImage = null;
    this.isImageSelected = false;
  }

}
