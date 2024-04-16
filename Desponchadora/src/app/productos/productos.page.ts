import { Component, OnInit } from '@angular/core';
import { CartService } from '../carrito/carrito.service';
import { AlertController } from '@ionic/angular';
import { ProductService } from './productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
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

  async addProduct() {
    const alert = await this.alertController.create({
      header: 'AGREGAR PRODUCTO/SERVICIO',
      message: 'AGREGA LOS DETALLES',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nombre'
        },
        {
          name: 'details',
          type: 'text',
          placeholder: 'Detalles'
        },
        {
          name: 'price',
          type: 'number',
          placeholder: 'Precio'
        },
        {
          name: 'stock',
          type: 'number',
          placeholder: 'Cantidad en Almacén'
        },
        {
          name: 'image',
          type: 'text',
          placeholder: 'URL de la Imagen'
        }
      ],
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel'
        },
        {
          text: 'GUARDAR',
          handler: (data) => {
            const newProduct = {
              Id: this.products.length + 1,
              Name: data.name,
              Details: data.details,
              Price: +data.price,
              Stock: +data.stock,
              Image: data.image
            };
            this.productService.addProduct(newProduct);
            this.loadProducts();
          }
        }
      ]
    });

    await alert.present();
  }

  async updateProduct(product: {
    Id: number;
    Name: string;
    Details: string;
    Price: number;
    Stock: number;
    Image: string;
  }) {
    const alert = await this.alertController.create({
      header: 'ACTUALIZAR PRODUCTO/SERVICIO',
      message: 'NUEVOS DETALLES DEL PRODUCTO',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nombre',
          value: product.Name
        },
        {
          name: 'details',
          type: 'text',
          placeholder: 'Detalles',
          value: product.Details
        },
        {
          name: 'price',
          type: 'number',
          placeholder: 'Precio',
          value: product.Price.toString()
        },
        {
          name: 'stock',
          type: 'number',
          placeholder: 'Cantidad en Almacén',
          value: product.Stock.toString()
        },
        {
          name: 'image',
          type: 'text',
          placeholder: 'URL de la Imagen',
          value: product.Image
        }
      ],
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel'
        },
        {
          text: 'GUARDAR',
          handler: (data) => {
            const updatedProduct = {
              ...product,
              Name: data.name,
              Details: data.details,
              Price: +data.price,
              Stock: +data.stock,
              Image: data.image
            };
            this.productService.updateProduct(updatedProduct);
            this.loadProducts();
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteProduct(product: {
    Id: number;
    Name: string;
    Details: string;
    Price: number;
    Stock: number;
    Image: string;
  }) {
    const alert = await this.alertController.create({
      header: 'ELIMINAR PRODUCTO/SERVICIO',
      message: `¿Quieres borrar ${product.Name}?`,
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel'
        },
        {
          text: 'ELIMINAR',
          handler: () => {
            this.productService.deleteProduct(product.Id);
            this.cartService.removeFromCart(product.Id);
            this.loadProducts();
          }
        }
      ]
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
