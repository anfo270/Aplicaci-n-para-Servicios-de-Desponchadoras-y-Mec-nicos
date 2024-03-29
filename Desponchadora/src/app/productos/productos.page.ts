import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
  formularioProducto: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { 
    this.formularioProducto = this.fb.group({
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      cantidad: ['',],
      detalles: ['',Validators.required],
      imagen: ['', Validators.required]
    });
  }

  ngOnInit() {}

  guardarProducto() {
    if (this.formularioProducto.valid) {
      // Generar un ID único para el producto
      const id = '_' + Math.random().toString(36).substr(2, 9);

      // Obtener los valores del formulario
      const producto = {
        id: id,
        nombre: this.formularioProducto.value.nombre,
        precio: this.formularioProducto.value.precio,
        cantidad: this.formularioProducto.value.cantidad,
        detalles: this.formularioProducto.value.detalles,
        imagen: this.formularioProducto.value.imagen
      };

      // Obtener productos del LocalStorage y agregar el nuevo producto
      const productosLocalStorage = localStorage.getItem('productos');
      let productos = [];
      if (productosLocalStorage !== null) {
        productos = JSON.parse(productosLocalStorage);
      }
      productos.push(producto);

      // Guardar productos en el LocalStorage
      localStorage.setItem('productos', JSON.stringify(productos));

      // Redirigir a la página principal
      this.router.navigate(['/negocio']);
    }
  }

}
