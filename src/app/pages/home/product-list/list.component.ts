import { Component } from '@angular/core';
import { HomeService } from '../home.service';
import { IProduct } from './component/pruduct-interface';

interface ICategories {
  slug: string;
  name: string;
  url: string;
}
@Component({
  selector: 'app-product-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  standalone: false,
})
export class ProductListComponent {
  constructor(private productService: HomeService) {}
  products: IProduct[] = [];
  categories: ICategories[] = [];
  statusModal: boolean = false;

  async ngOnInit() {
    try {
      const result = await this.productService.getProducts();
      const data = await this.productService.getCategories();
      this.categories = data;
      this.products = result.data.products;
      console.log(result);
      console.log(data);
    } catch (error) {}
  }

  onClickBuy(product: IProduct) {
    console.log('Producto comprado en el padre:', product);
  }

  async onChangeInputSearch(event: Event) {
    const word = (event.target as HTMLInputElement).value;
    try {
      const result = await this.productService.getSearchProduct(word);
      this.products = result.products;
    } catch (error) {
      console.log('Hubo un error en onChangeInputSearch :' + error);
    }
  }

  async onSelectCategory(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    if (value === '.: Todos :.') {
      this.getAllProducts();
      return;
    }
    try {
      const result = await this.productService.getSearchProductByCategories(
        value
      );
      this.products = result.products;
    } catch (error) {
      console.log('Hubo un error en onSelectCategory :' + error);
    }
  }

  async getAllProducts() {
    try {
      const result = await this.productService.getProducts();
      this.products = result.data.products;
    } catch (error) {}
  }

  openModalProduct() {
    const modal = document.getElementById('modalProduct');
    if (modal) {
      const bsModal = new (window as any).bootstrap.Modal(modal);
      bsModal.show();
    }
  }
}
