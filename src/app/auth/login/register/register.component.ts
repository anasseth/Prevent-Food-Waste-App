import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

type NewUser = {
  email: string;
  password: string;
};
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

export class RegisterComponent implements OnInit {
  minPWLength = 8

  registerForm = this.fb.group({
    email: [
      this.newUser.email,
      Validators.compose([Validators.required, Validators.email]),
    ],
    password: [
      this.newUser.password,
      Validators.compose([Validators.required, Validators.minLength(this.minPWLength)]),
    ],
    confirmPassword: [null, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RegisterComponent>,
    private auth: AngularFireAuth,
    private snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA)
    public newUser: { email: string; password: string }
  ) { }

  ngOnInit(): void {
    this.registerForm.valueChanges.subscribe(
      (values: { email: string; password: string }) => {
        this.newUser.email = values.email;
        this.newUser.password = values.password;
      }
    );
  }

  registerUser() {
    if (!this.newUser.email || !this.newUser.password)
      throw new Error('Missing values in newUser');
    this.auth
      .createUserWithEmailAndPassword(this.newUser.email, this.newUser.password)
      .then((credentials) => {
        console.log(credentials);
        this.snackbar.open('Registrierung erfolgreich');
      })
      .catch(() => {
        this.snackbar.open('Anmeldung nicht erfolgreich');
      });
  }

  isRegistrationValid(): boolean {
    return this.doPasswordsMatch() && this.registerForm.valid;
  }

  doPasswordsMatch() {
    return this.registerForm.value.password === this.registerForm.value.confirmPassword;
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
