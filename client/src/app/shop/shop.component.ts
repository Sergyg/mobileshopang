import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IProduct} from "../shared/models/products";
import {ShopService} from "./shop.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {IBrand} from "../shared/models/brand.product";
import {IType} from "../shared/models/type.product";
import {ParamsShop} from "../shared/models/params.shop";
import {Pagination} from "../shared/models/pagination";
import {parseJson} from "@angular/cli/src/utilities/json-file";
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelect} from "@angular/material/select";
import {MatOption} from "@angular/material/core";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit{
  @ViewChild('select') select: MatSelect;
  @ViewChild('search', {static: false}) searchTerm: ElementRef;
  products: IProduct[];
  brands: IBrand[];
  types: IType[];
  shopParams = new ParamsShop();
  pagination = new Pagination();
  totalCount: number;
  sortOption = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to High', value: 'priceAsc'},
    {name: 'Price: High to Low', value: 'priceDesc'},

  ]

  constructor(private shopService: ShopService) {

  }

  ngOnInit() {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }
  getProducts(){
    this.shopService.getProducts(this.shopParams)
      .subscribe(response =>{
      this.products = response.body;
      this.pagination = JSON.parse(response.headers.get("pagination"));
     this.shopParams.pageNumber = this.pagination.currentPage;
    this.shopParams.pageSize = this.pagination.pageSize;
     this.totalCount = this.pagination.totalCount;

  }, error => {
    console.log(error);
  });
  }

  getBrands(){
       this.shopService.getBrands().subscribe(response =>{
        this.brands = [{productBrandId: 0, name: "All"}, ...response];
      }, error => {
        console.log(error);
      });
  }
  getTypes(){
    this.shopService.getTypes().subscribe(response =>{
      this.types = [{productTypeId: 0, name: "All"}, ...response];
    }, error => {
      console.log(error);
    });

  }
  onBrandSelected() {
    let newStatus = true;
    this.select.options.forEach((item: MatOption) => {
      if (!item.selected) {
        this.shopParams.brandId = this.select.value;
        this.shopParams.pageNumber = 1;
        this.getProducts();
        newStatus = false;
      }

    });
  };

  onTypeSelected(productTypeId= []) {
    this.shopParams.typeId = productTypeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();

  }

  onSortSelected(sort: string){
    this.shopParams.sort = sort;
    this.getProducts();
  }
  onPageChanged(event: any){
    if(this.shopParams.pageNumber !== event) {
      this.shopParams.pageNumber = event;
      this.getProducts();
    }

  }
  onSearch(){
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }
  onReset(){
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ParamsShop()
    this.getProducts()
  }


  allSelected=false;
  // foods: any[] = [
  //   {value: 'steak-0', viewValue: 'Steak'},
  //   {value: 'pizza-1', viewValue: 'Pizza'},
  //   {value: 'tacos-2', viewValue: 'Tacos'}
  // ];
  setAll(event: boolean) {
    if (this.allSelected) {
      this.select.options.forEach((item: MatOption) => item.select());
    } else {
      this.select.options.forEach((item: MatOption) => item.deselect());

    }

    console.log(event)
  }
  optionClick() {
    let newStatus = true;
    this.select.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });

    this.allSelected = newStatus;

    console.log(this.select.value)

  }

}

