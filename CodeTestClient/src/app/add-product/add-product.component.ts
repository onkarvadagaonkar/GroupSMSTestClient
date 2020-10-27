import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ProductServiceService} from './../product-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(private datePipe:DatePipe,private formBuilder: FormBuilder,private router: Router, private productService: ProductServiceService) { }

  addForm: FormGroup;

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [],
      city: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      price: ['', Validators.required],
      status: ['', Validators.required],
      color: ['', Validators.required]
    });

  }

  onSubmit() {
    this.addForm.value.startDate = this.datePipe.transform(this.addForm.value.startDate,"yyyy-MM-dd HH:mm");
    this.addForm.value.endDate = this.datePipe.transform(this.addForm.value.endDate,"yyyy-MM-dd HH:mm");
    this.productService.createProduct(this.addForm.value)
      .subscribe( data => {
        this.router.navigate(['products']);
      });
  }
}
