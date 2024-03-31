import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertControllerService } from '../services/alert-controller.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-registro-login',
  templateUrl: './registro-login.page.html',
  styleUrls: ['./registro-login.page.scss'],
})
export class RegistroLoginPage implements OnInit {

  isPickerOpen = false;
  FormularioRegistro: FormGroup;

  constructor(
    public fb: FormBuilder,
    public alertController: AlertControllerService,
    private router: Router,
    private modalController: ModalController,
  ) {
    this.FormularioRegistro = this.fb.group({
      'Nombre': new FormControl("", Validators.required),
      'Apellido': new FormControl("", Validators.required),
      'Password': new FormControl("", Validators.required),
      'CorreoElectronico': new FormControl("", Validators.required),
      'ConfirmacionPassword': new FormControl("", Validators.required),
      'TipoUsuario': new FormControl("", Validators.required),
      'FechaNacimiento': new FormControl("", Validators.required)
    });

  }

  ngOnInit() {
  }

  Registrar() {
    var f = this.FormularioRegistro.value;
    if (f.Password !== f.ConfirmacionPassword) {
      this.alertController.mostrarAlerta('Contraseñas Incorrectas', "Las contraseñas no coinciden");
      return;
    }
    if (f.TipoUsuario = "Empresa") {
    }

  }


  Cancelar() {
    this.FormularioRegistro.patchValue({ TipoUsuario: null });
    this.router.navigate(['/login'])
  }

  public Columnas = [
    {
      name: 'Tipo_Usuario',
      options: [
        {
          text: 'Empresa',
          value: 'Empresa',
        },
        {
          text: 'Cliente',
          value: 'Cliente',
        },
      ],
    },
  ];

  public BotonesPicker = [
    {
      text: 'Cancel',
      role: 'cancel',
    },
    {
      text: 'Aceptar',
      handler: (value: any) => {
        this.FormularioRegistro.patchValue({ TipoUsuario: value.Tipo_Usuario.value });
      },
    },
  ];

  Abrir(isOpen: boolean) {
    this.isPickerOpen = isOpen;

  }
}
