// src/app/auth/login/login.component.ts
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
 imports: [ReactiveFormsModule, FormsModule, CommonModule, MaterialModule, RouterModule]
})
export class LoginComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  onSubmit() {
    this.auth.login(this.form.value).subscribe({
      next: (res: { token: any; }) => {
        console.log('Login response:', res);
        this.auth.saveToken(res.token);
        this.router.navigate(['/decks']);
      },
      error: (err: { error: { msg: any; }; }) => alert(err.error?.msg || 'Login failed')
    });
  }
}
