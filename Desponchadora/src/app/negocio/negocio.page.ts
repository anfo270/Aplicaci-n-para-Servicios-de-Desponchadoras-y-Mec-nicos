import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; // Importa AlertController

@Component({
  selector: 'app-negocio',
  templateUrl: './negocio.page.html',
  styleUrls: ['./negocio.page.scss'],
})
export class NegocioPage implements OnInit {
  formularionegocio: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertController: AlertController // Inyecta AlertController
  ) {
    this.formularionegocio = this.fb.group({
      nombre: ['', Validators.required],
      tipo: ['', Validators.required],
      propietario: ['', Validators.required],
      direccion: ['', Validators.required],
      contacto: ['', Validators.required],
      imagen: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  async guardarNegocio() {
    if (this.formularionegocio.valid) {
      // Generar un ID único para el producto
      const id = '_' + Math.random().toString(36).substr(2, 9);

      // Obtener los valores del formulario
      const negocio = {
        id: id,
        nombre: this.formularionegocio.value.nombre,
        tipo: this.formularionegocio.value.tipo, // Corregido: "precio" a "tipo"
        propietario: this.formularionegocio.value.propietario, // Corregido: "cantidad" a "propietario"
        direccion: this.formularionegocio.value.direccion, // Corregido: "detalles" a "direccion"
        contacto: this.formularionegocio.value.contacto, // Corregido: "detalles" a "contacto"
        imagen: this.formularionegocio.value.imagen
      };

      // Obtener productos del LocalStorage y agregar el nuevo producto
      const negocioLocalStorage = localStorage.getItem('negocios');
      let negocios = [];
      if (negocioLocalStorage !== null) {
        negocios = JSON.parse(negocioLocalStorage);
      }
      negocios.push(negocio);

      // Guardar productos en el LocalStorage
      localStorage.setItem('negocios', JSON.stringify(negocios));

      // Mostrar la alerta
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'El negocio se guardó correctamente.',
        buttons: ['OK']
      });
      await alert.present();

      // Redirigir a la página principal
      this.router.navigate(['/productos']);
    } else {
      // Mostrar alerta de error
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, completa todos los campos.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}
