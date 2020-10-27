import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
import { Product } from '../Product';
import {ProductServiceService} from './../product-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  

  product :Product;
  editForm: FormGroup;
  constructor(private datePipe:DatePipe,private formBuilder: FormBuilder,private router: Router, private productService: ProductServiceService) { }

  ngOnInit() {
    
    let productUpdate : Product = JSON.parse(window.localStorage.getItem("product"));
    this.editForm = this.formBuilder.group({
      productId: [productUpdate.productId],
      city: [productUpdate.city, Validators.required],
      startDate: [productUpdate.startDate, Validators.required],
      endDate: [productUpdate.endDate, Validators.required],
      price: [productUpdate.price, Validators.required],
      color: [productUpdate.color, Validators.required],
      status: [productUpdate.status, Validators.required]
    });
  }

  onSubmit() {
    this.editForm.value.startDate = this.datePipe.transform(this.editForm.value.startDate,"yyyy-MM-dd HH:mm");
    this.editForm.value.endDate = this.datePipe.transform(this.editForm.value.endDate,"yyyy-MM-dd HH:mm");
    this.productService.updateProduct(this.editForm.value)
      .subscribe(
        data => {
         
            alert('Product updated successfully.');
            this.router.navigate(['products']);
         
        },
        error => {
          alert(error);
        });
  }

}
