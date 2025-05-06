import { Component } from '@angular/core';
import { HomeService } from '../home.service';
import { IProduct } from './component/pruduct-interface';
import { loadProducts } from '../../../store/products/products.actions';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

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
  products$: Observable<IProduct[]> = this.store.select(
    (state) => state.products.products
  );
  constructor(
    private readonly productService: HomeService,
    private readonly store: Store<{ products: { products: IProduct[] } }>
  ) {}
  products: IProduct[] = [];
  categories: ICategories[] = [];
  statusModal: boolean = false;
  tbnText: string = 'Agregar producto';
  newProduct = {
    id: 0,
    title: '',
    description: '',
    price: 0,
    stock: 0,
  };

  async ngOnInit() {
    try {
      this.store.dispatch(loadProducts());
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
    this.tbnText = 'Agregar producto';
    const modal = document.getElementById('modalProduct');
    if (modal) {
      const bsModal = new (window as any).bootstrap.Modal(modal);
      bsModal.show();
    }
  }

  async onClickUpdateProduct(event: Event) {
    event.preventDefault();
    console.log(this.newProduct);
    try {
      const result = await this.productService.putProduct(
        this.newProduct.id,
        JSON.stringify(this.newProduct)
      );
      console.log(result);
      if (result) {
        console.log('Producto actualizado correctamente');
        this.getAllProducts();
        this.newProduct = {
          id: 0,
          title: '',
          description: '',
          price: 0,
          stock: 0,
        };
        const modal = document.getElementById('modalProduct');
        if (modal) {
          const bsModal = new (window as any).bootstrap.Modal(modal);
          bsModal.hide();
        }
      } else {
        alert('Error al actualizar el producto');
      }
    } catch (error) {
      console.log(error);
    }
  }

  openModalEditProduct(product: IProduct) {
    this.tbnText = 'Editar producto';
    const modal = document.getElementById('modalProduct');
    if (modal) {
      const bsModal = new (window as any).bootstrap.Modal(modal);
      bsModal.show();
    }
    this.newProduct = {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      stock: product.stock,
    };
  }

  onClick(event: Event) {
    event.preventDefault();
    if (this.newProduct.id === 0) {
      this.onClickAddProduct(event);
    } else {
      this.onClickUpdateProduct(event);
    }
  }

  async onClickAddProduct(event: Event) {
    event.preventDefault();
    console.log(this.newProduct);
    try {
      const result = await this.productService.postProduct(this.newProduct);
      console.log(result);
      if (result) {
        console.log('Producto agregado correctamente');
        this.products.push(result);
        this.newProduct = {
          id: 0,
          title: '',
          description: '',
          price: 0,
          stock: 0,
        };
        const modal = document.getElementById('modalProduct');
        if (modal) {
          const bsModal = new (window as any).bootstrap.Modal(modal);
          bsModal.hide();
        }
      } else {
        alert('Error al agregar el producto');
      }
    } catch (error) {
      console.log(error);
    }
  }

  onDelete(product: IProduct) {
    return this.productService.deleteProduct(product.id);
  }
}
