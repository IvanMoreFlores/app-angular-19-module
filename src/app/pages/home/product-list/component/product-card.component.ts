import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IProduct } from './pruduct-interface';
import {
  addProduct,
  decreaseProduct,
  increaseProduct,
} from '../../../../store/product/product.actions';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  standalone: false,
})
export class CardProductComponent {
  @Input() product!: IProduct;
  @Output() buyProduct = new EventEmitter<IProduct>();
  product$!: Observable<IProduct | undefined>;
  //Pruct$ -> Prodcuto del store redux - si(IProduct) No(undefined)

  constructor(private readonly store: Store<{ products: IProduct[] }>) {}

  ngOnInit(): void {
    this.product$ = this.store.pipe(
      select((state) =>
        state.products.find((product) => product.id === this.product.id)
      )
    );
    // del redux sacame el producto que tenga este ID de product
    this.product$.subscribe((product) => {
      if (product) {
        product.count = 0;
      }
    });
  }
  onClickBuy(): void {
    console.log('Producto comprado:', this.product);
    this.store.dispatch(addProduct({ product: this.product }));
  }

  increaseCount(): void {
    this.store.dispatch(increaseProduct({ id: this.product.id }));
  }

  decreaseCount(): void {
    this.store.dispatch(decreaseProduct({ id: this.product.id }));
  }
}
