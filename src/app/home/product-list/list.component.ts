import { Component } from '@angular/core';
import { HomeService } from '../home.service';
import { IProduct } from './component/pruduct-interface';
@Component({
  selector: 'app-product-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  standalone: false,
})
export class ProductListComponent {
  constructor(private productService: HomeService) {}
  products: IProduct[] = [];

  async ngOnInit() {
    try {
      const result = await this.productService.getProducts();
      this.products = result.data.products;
      console.log(result);
    } catch (error) {}
  }

  onClickBuy(product: IProduct) {
    console.log('Producto comprado en el padre:', product);
  }
}
