import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IProduct } from './pruduct-interface';
import { addProduct } from '../../../../store/product/product.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  standalone: false,
})
export class CardProductComponent {

  constructor(private store: Store<{products: IProduct[]}>){}

  @Input() product!: IProduct;  
  @Output() buyProduct = new EventEmitter<IProduct>(); 
  onClickBuy(): void {
    console.log('Producto comprado:', this.product);
    this.store.dispatch(addProduct({product: this.product}))
  }
  
}
