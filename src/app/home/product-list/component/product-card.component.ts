import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IProduct } from './pruduct-interface';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  standalone: false,
})
export class CardProductComponent {
  @Input() product!: IProduct;  
  @Output() buyProduct = new EventEmitter<IProduct>(); 
  onClickBuy(): void {
    console.log('Producto comprado:', this.product);
  }
  
}
