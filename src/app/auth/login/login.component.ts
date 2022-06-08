import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from './register/register.component';
import { Router } from '@angular/router';

type NewUser = {
  email: string;
  password: string;
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  adminCredentials: any;
  isLogin: boolean = true;
  isChangePassword: boolean = false;
  isSignUp: boolean = false;

  loginForm = this.fb.group({
    email: [null, Validators.compose([Validators.required, Validators.email])],
    password: [null, Validators.required],
  });

  get user() {
    return this.auth.user;
  }

  constructor(
    private fb: FormBuilder,
    private auth: AngularFireAuth,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    public router: Router
  ) { }

  onSubmit(): void {
    const credentials: { email: string; password: string } =
      this.loginForm.value;
    this.auth
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        this.snackbar.open('Login successful', 'Close', { duration: 2000 });
        this.router.navigate(["/user/feed"])
      })
      .catch(() => {
        this.snackbar.open(
          'Anmeldung nicht erfolgreich. Bitte geben Sie gültige Anmeldeinformationen ein.',
          'Close',
          { duration: 4000 }
        );
      }).finally(
        () => {
          localStorage.setItem("user-email", credentials.email)
        }
      );
  }

  startRegistration(): void {
    const newUser = {
      email: '',
      password: '',
    };
    this.dialog
      .open(RegisterComponent, { width: '80%', data: newUser })
      .afterClosed()
      .subscribe((newUser: NewUser | string) => {
        console.log(newUser);
        if (typeof newUser === 'string') {
          this.snackbar.open('Stornierte Registrierung!', 'Close', {
            duration: 2500,
          });
          return;
        }
      });
  }

  logout() {
    this.auth.signOut();
  }



}
