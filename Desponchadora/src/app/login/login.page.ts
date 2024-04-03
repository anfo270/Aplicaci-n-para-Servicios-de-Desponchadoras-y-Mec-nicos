import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from "../services/firebase.service";
import { AlertControllerService } from '../services/alert-controller.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { encrypt } from '../util/util-encrypt'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  mostrarPassword1: boolean = false;
  FormularioInicio: FormGroup;
  path = "usuarios"

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private firebaseService: FirebaseService,
    private alertController: AlertControllerService
  ) {
    this.FormularioInicio = this.fb.group({
      'Password': new FormControl("", Validators.required),
      'CorreoElectronico': new FormControl("", [Validators.required, Validators.email]),
    });
  }
  ngOnInit() {
  }

  login() {
    var f = this.FormularioInicio.value;
    f.Password = encrypt(f.Password, 'asd159');
    if (this.FormularioInicio.invalid) {
      this.alertController.mostrarAlerta('Campos Inválidos', 'Por favor complete todos los campos correctamente.');
      return;
    }

    try {
      this.firebaseService.getcolleccionByEmailandPassword(this.path, f.CorreoElectronico.toUpperCase(), f.Password).subscribe(users => {
        if (users && users.length > 0) {
          console.log(users);
          this.alertController.mostrarAlerta('Bienvenido', 'Ingresaste')
        } else {
          this.alertController.mostrarAlerta('Error', 'Credenciales inválidas. Por favor, inténtelo de nuevo.');
        }
      });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      this.alertController.mostrarAlerta('Error', 'Hubo un problema al intentar iniciar sesión. Por favor, inténtelo de nuevo más tarde.');
    }
  }
  toggleMostrarPassword1() {
    this.mostrarPassword1 = !this.mostrarPassword1;
  }
}