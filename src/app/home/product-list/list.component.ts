import { Component } from '@angular/core';
import { HomeService } from '../home.service';

export interface IProduct {}

@Component({
  selector: 'app-product-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  standalone: false,
})
export class ProductListComponent {
  constructor(private productService: HomeService) {}
  products: any;
  async ngOnInit() {
    try {
      const result = await this.productService.getProducts();
      this.products = result.data.products;
      console.log(result);
    } catch (error) {}
  }

  onClickBuy(product: IProduct): void {
    console.log('Producto comprado en el padre:', product);
    //Al ngRx
  }
}
