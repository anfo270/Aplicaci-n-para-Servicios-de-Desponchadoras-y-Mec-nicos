import { Component, OnInit } from '@angular/core';
import { CartService } from './carrito.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  productos: {
    Id: number;
    Name: string;
    Details: string;
    Price: number;
    Image: string;
  }[] = [];

  constructor(
    private cartService: CartService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.productos = this.cartService.getCart();
  }

  async removeFromCart(producto: any) {
    const alert = await this.alertController.create({
      header: 'Eliminar del Carrito',
      message: `¿Quieres eliminar ${producto.Name} del carrito?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.cartService.removeFromCart(producto.Id);
            this.loadCart();
          }
        }
      ]
    });
    await alert.present();
  }
}
