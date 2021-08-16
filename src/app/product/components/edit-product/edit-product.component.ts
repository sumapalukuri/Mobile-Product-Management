import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { CameraDetailsModel, editMobilePayload, GetProductResponse, MemoryDetails, RamDetails } from '../../models/product.model';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  editMobileForm!: FormGroup;
  ramDetails: RamDetails[] = [];
  memoryDetails: MemoryDetails[] = [];
  cameraDetails: CameraDetailsModel[] = [];
  productDetail: GetProductResponse = {} as GetProductResponse;
  unsubscribe = new Subject();
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.editMobileForm = this.formBuilder.group({
      name: ['', Validators.required],
      ram: ['', Validators.required],
      memory: ['', Validators.required],
      camera: ['', Validators.required],
      price: ['', Validators.required],
    });
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
   * Function initialised to get the product details to display on the screen
   */
  ngOnInit(): void {
    if (this.ramDetails.length <= 0 || this.memoryDetails.length <= 0 || this.cameraDetails.length < 0) {
      this.router.navigate(['/mobiles'])
    }
    const mobileId = this.activatedRoute.snapshot.queryParams.id;
    this.isLoading = true;
    this.productService.getProductDetails(mobileId).pipe(takeUntil(this.unsubscribe)).subscribe(response => {
      if (response) {
        this.isLoading = false;
        this.productDetail = response
        this.editMobileForm.patchValue({
          camera: Number(response.camera),
          memory: Number(response.memory),
          name: response.name,
          price: response.price,
          ram: Number(response.ram)
        })
      } else {
        this.isLoading = false;
      }
    }, (error) => {
      this.isLoading = false;
      this.toastrErrorMessage(error);
    })
  }
  /**
   * Function used to edit the existing details of the mobile
   */
  onEdit(): void {
    if (this.editMobileForm.valid) {
      const payload: editMobilePayload = {
        data: {
          camera: this.editMobileForm.controls.camera.value.toString(),
          id: this.productDetail.id,
          memory: this.editMobileForm.controls.memory.value.toString(),
          name: this.editMobileForm.controls.name.value,
          price: this.editMobileForm.controls.price.value,
          ram: this.editMobileForm.controls.ram.value.toString()
        }
      }
      if (payload) {
        this.productService.editProductDetails(payload).pipe(takeUntil(this.unsubscribe)).subscribe(response => {
          if (response) {
            this.toastr.success("Product Edited successfully", "", { timeOut: 4000, positionClass: 'toast-top-center' })
            this.router.navigate(['/mobiles'])
          }
        },
          (error) => {
            this.toastrErrorMessage(error);
          })
      }
    }
  }
  /**
   * Function used to display the error message when service is failed
   */
  toastrErrorMessage(error: string): void {
    this.toastr.error(error, "", {
      timeOut: 4000, positionClass: 'toast-top-center'
    })
  }
  /**
   * Function used to unsubscribe to destroy the subscriptions
   */
  ngOnDestroy() {
    this.unsubscribe.next(true);
    this.unsubscribe.complete();
  }
}
