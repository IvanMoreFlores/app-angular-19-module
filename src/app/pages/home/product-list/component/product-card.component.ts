import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IProduct } from './pruduct-interface';
import {
  addProduct,
  decreaseProduct,
  deleteProduct,
  increaseProduct,
} from '../../../../store/cart/product.actions';
import { select, Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  standalone: false,
})
export class CardProductComponent {
  @Input() product!: IProduct;
  @Output() buyProduct = new EventEmitter<IProduct>();
  @Output() editProduct = new EventEmitter<IProduct>();
  @Output() deleteProduct = new EventEmitter<IProduct>();
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
    console.log('Producto comprado en el hijo:', this.product);
    this.store.dispatch(addProduct({ product: this.product }));
  }

  onUpdate(product: IProduct) {
    return this.editProduct.emit(product);
  }

  onDelete(product: IProduct) {
    return this.deleteProduct.emit(product);
  }

  // onClickBuy() {
  //   return this.buyProduct.emit(this.product);
  // }

  increaseCount(): void {
    this.store.dispatch(increaseProduct({ id: this.product.id }));
  }

  decreaseCount(): void {
    // this.product
    this.product$.pipe(take(1)).subscribe((product) => {
      console.log('Producto en el store:', product);
      if (!product) return;
      if (product && (product.count ?? 0) > 1) {
        this.store.dispatch(decreaseProduct({ id: this.product.id }));
      }
      if (product && product.count === 1) {
        this.store.dispatch(deleteProduct({ id: this.product.id }));
      }
    });
  }
}
