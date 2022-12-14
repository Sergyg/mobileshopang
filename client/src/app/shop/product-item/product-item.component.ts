import {Component, Input, OnInit} from '@angular/core';
import {IProduct} from "../../shared/models/products";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit{
  @Input() product: IProduct;

  ngOnInit(): void {
  }


}
