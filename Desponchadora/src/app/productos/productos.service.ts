import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    private productsKey = 'products';

    getProducts(): {
        Id: number;
        Name: string;
        Details: string;
        Price: number;
        Stock: number;
        Image: string;
    }[] {
        const productsStr = localStorage.getItem(this.productsKey);
        return productsStr ? JSON.parse(productsStr) : [];
    }

    private saveProducts(products: {
        Id: number;
        Name: string;
        Details: string;
        Price: number;
        Stock: number;
        Image: string;
    }[]): void {
        localStorage.setItem(this.productsKey, JSON.stringify(products));
    }

    addProduct(newProduct: {
        Id: number;
        Name: string;
        Details: string;
        Price: number;
        Stock: number;
        Image: string;
    }): void {
        const products = this.getProducts();
        products.push(newProduct);
        this.saveProducts(products);
    }

    updateProduct(updatedProduct: {
        Id: number;
        Name: string;
        Details: string;
        Price: number;
        Stock: number;
        Image: string;
    }): void {
        const products = this.getProducts();
        const index = products.findIndex((p) => p.Id === updatedProduct.Id);
    if (index !== -1) {
        products[index] = updatedProduct;
        this.saveProducts(products);
    }
    }

    deleteProduct(productId: number): void {
        const products = this.getProducts();
        const updatedProducts = products.filter((p) => p.Id !== productId);
        this.saveProducts(updatedProducts);
    }
    
}
