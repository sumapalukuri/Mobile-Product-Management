import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CameraDetailsModel, MemoryDetails, RamDetails } from '../../models/product.model';
import { ProductService } from '../../service/product.service';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit, OnDestroy {

  addMobileForm!: FormGroup;
  cameraDetails: CameraDetailsModel[] = [];
  memoryDetails: MemoryDetails[] = [];
  ramDetails: RamDetails[] = [];

  unsubscribe = new Subject();

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.addMobileForm = this.formBuilder.group({
      name: ['', Validators.required],
      ram: ['', Validators.required],
      memory: ['', Validators.required],
      camera: ['', Validators.required],
      price: ['', Validators.required],
    })
    this.productService.ramDetails$.subscribe(response => {
      this.ramDetails = response
    })
    this.productService.memoryDetails$.subscribe(response => {
      this.memoryDetails = response
    })
    this.productService.cameraDetails$.subscribe(response => {
      this.cameraDetails = response
    })
  }
  /**
   * Function used to navigayte to list page when the product details are not available
   */
  ngOnInit(): void {
    if (this.ramDetails.length <= 0 || this.memoryDetails.length <= 0 || this.cameraDetails.length < 0) {
      this.router.navigate(['/mobiles'])
    }
  }

  /**
   * On adding the mobile, if the adding is success, then routing to the mobile list page
   */
  onSubmit(): void {
    if (this.addMobileForm.valid) {
      const payload = {
        data: {
          camera: this.addMobileForm.controls.camera.value.toString(),
          id: "",
          memory: this.addMobileForm.controls.memory.value.toString(),
          name: this.addMobileForm.controls.name.value,
          price: this.addMobileForm.controls.price.value,
          ram: this.addMobileForm.controls.ram.value.toString()
        }
      }
      if (payload) {
        this.productService.postProductDetails(payload).pipe(takeUntil(this.unsubscribe)).subscribe(response => {
          if (response) {
            this.toastr.success("Product Added successfully", "", { timeOut: 4000, positionClass: 'toast-top-center' })
            this.router.navigate(['/mobiles'])
          }
        }, (error) => {
          this.toastr.error(error, "", {
            timeOut: 4000, positionClass: 'toast-top-center'
          })
        })
      }
    }
  }
  /**
   * Function used to unsubscribe the subscriptions
   */
  ngOnDestroy() {
    this.unsubscribe.next(true);
    this.unsubscribe.complete();
  }

}


