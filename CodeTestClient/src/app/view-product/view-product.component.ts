import { Component, OnInit } from '@angular/core';
import { Product } from '../Product';
import { ProductServiceService } from '../product-service.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent {

  products: Product[];

  constructor(private productService:ProductServiceService,private router: Router ) {
    this.products=undefined;
    this.getAllProducts();
  }


  getAllProducts()
  {
      this.productService.getProducts().subscribe( data => {
            this.products = data.responseData;          
      });
  }

  addProduct()
  {
    this.router.navigate(['add-product']);
  }

  editProduct(product)
  {
    window.localStorage.removeItem("product");
    window.localStorage.setItem("product", JSON.stringify(product));
    this.router.navigate(['edit-product']);
  } 

  deleteProduct(product)
  {
    this.productService.deleteProduct(product.productId).subscribe((succss)=>{
        alert("Record deleted successfully");
        window.location.reload();
    },(error)=>{
      
    })
  }



}
