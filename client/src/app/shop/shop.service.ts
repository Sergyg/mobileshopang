import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Pagination} from "../shared/models/pagination";
import {IBrand} from "../shared/models/brand.product";
import {IType} from "../shared/models/type.product";
import {map, of} from "rxjs";
import {ParamsShop} from "../shared/models/params.shop";
import {IProduct} from "../shared/models/products";
import {ShopParams} from "../shared/models/shopParams";

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/'
  products: IProduct[] = [];
  brands: IBrand[] = [];
  types: IType[] = [];
  pagination: Pagination[] = [];
  // pagination = new Pagination();

  shopParams = new ShopParams();

  constructor(private http: HttpClient) { }

  getProducts(shopParams: ParamsShop ){
    let params = new HttpParams();
    console.log(shopParams.brandId.length, shopParams.typeId)
    if (shopParams.brandId.length !==0) {
      var str =  shopParams.brandId
        .join(", ")
      console.log(str)
      params = params.append('brandId', str, options
        )
    }

    if (shopParams.typeId.length !==0){
      {
        params = params.append('typeId', shopParams.typeId.toString())
      }

    }
    if (shopParams.search) {
      params = params.append('search', shopParams.search);
    }
    params = params.append('orderBy', shopParams.sort);
    params = params.append('pageNumber', shopParams.pageNumber.toString());
    params = params.append('pageSize', shopParams.pageSize.toString());


    return this.http.get<IProduct[]>(this.baseUrl + 'products', {observe: 'response', params})
      .pipe(
        map(response => {
          return response;
        })
      )
  }
  getProduct(id: number) {
    return this.http.get<IProduct>(this.baseUrl + 'products/' + id)
  }

  getBrands(){
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands');
  }
  getTypes(){
    return this.http.get<IType[]>(this.baseUrl + 'products/types');
  }
}

