import { Component, OnInit } from '@angular/core';
import { CartService } from '../carrito/carrito.service';
import { AlertController } from '@ionic/angular';
import { ProductService } from '../productos/productos.service';

@Component({
  selector: 'app-productos1',
  templateUrl: './productos1.page.html',
  styleUrls: ['./productos1.page.scss'],
})
export class Productos1Page implements OnInit {
  public products: {
    Id: number;
    Name: string;
    Details: string;
    Price: number;
    Stock: number;
    Image: string;
  }[];

  constructor(
    private alertController: AlertController,
    private productService: ProductService,
    private cartService: CartService
  ) {
    this.products = [];
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.products = this.productService.getProducts();
  }

  async showProductDetails(product: {
    Id: number;
    Name: string;
    Details: string;
    Price: number;
    Stock: number;
    Image: string;
  }) {
    const alert = await this.alertController.create({
      header: `${product.Name}`,
      subHeader: `Precio: $${product.Price.toFixed(2)}`,
      message: `Detalles: ${product.Details}`,
      buttons: ['CERRAR']
    });

    await alert.present();
  }

  async agregarAlCarrito(product: any) {
    this.cartService.addToCart(product);
    const alert = await this.alertController.create({
      header: 'Producto Agregado',
      message: `Se agregó ${product.Name} al carrito.`,
      buttons: ['OK']
    });
    await alert.present();
  }
}
