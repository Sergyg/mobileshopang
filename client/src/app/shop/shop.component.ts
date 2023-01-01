import { Component, OnInit } from '@angular/core';
import {IProduct} from "../shared/models/products";
import {ShopService} from "./shop.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {IBrand} from "../shared/models/brand";
import {IType} from "../shared/models/productType";
import {ShopParams} from "../shared/models/shopParams";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit{
  products: IProduct[];
  brands: IBrand[];
  types: IType[];
  shopParams = new ShopParams();
  totalCount: number;
  sortOption = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to High', value: 'priceAsc'},
    {name: 'Price: High to Low', value: 'priceDesc'},

  ]

  constructor(private shopServise: ShopService) {

  }

  ngOnInit() {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }
  getProducts(){
    this.shopServise.getProducts(this.shopParams)
      .subscribe(response =>{
    this.products = response.data;
    this.shopParams.pageNumber = response.pageIndex;
    this.shopParams.pageSize = response.pageSize;
    this.totalCount = response.count;
  }, error => {
    console.log(error);
  });
  }

  getBrands(){
    this.shopServise.getBrands().subscribe(response =>{
        this.brands = [{id: 0, name: "All"}, ...response];
      }, error => {
        console.log(error);
      });
  }
  getTypes(){
    this.shopServise.getTypes().subscribe(response =>{
      this.types = [{id: 0, name: "All"}, ...response];
    }, error => {
      console.log(error);
    });

  }
  onBrandSelected(brandId: number) {
    this.shopParams.brandId = brandId;
    this.getProducts();

  }
  onTypeSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this.getProducts();

  }

  onSortSelected(sort: string){
    this.shopParams.sort = sort;
    this.getProducts();
  }
  onPageChanged(event: any){
    this.shopParams.pageNumber = event.page;
    this.getProducts();
  }
}
