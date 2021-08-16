import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { CameraDetailsModel, ListModel, MemoryDetails, RamDetails } from '../../models/product.model';
import { ProductService } from '../../service/product.service';
import { DeleteConfirmationPopupComponent } from '../delete-confirmation-popup/delete-confirmation-popup.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

  productsList: ListModel[] = [];

  cameraDetails: CameraDetailsModel[] = [];
  memoryDetails: MemoryDetails[] = [];
  ramDetails: RamDetails[] = [];

  unsubscribe = new Subject();
  constructor(
    private productService: ProductService,
    private router: Router,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) { }

  /**
   * Function used to get the product list and the product details
   */
  ngOnInit(): void {
    this.getListOfProducts();
    this.getMobileDetailsToChoose();
  }
  /**
   * Function used to get the product list
   */
  getListOfProducts(): void {
    this.productService.getProductsList().pipe(takeUntil(this.unsubscribe)).subscribe(response => {
      if (response.data.length > 0) {
        this.productsList = response.data;
      }
    },
      (error) => {
        this.toastrMessage(error);
      })
  }
  /**
   * Function used to get the product details like ram, memory and camera details
   */
  getMobileDetailsToChoose(): void {
    forkJoin([
      this.productService.getCameraDetails(),
      this.productService.getMemoryDetails(),
      this.productService.getRamDetails()
    ]).pipe(takeUntil(this.unsubscribe)).subscribe(([cameraData, memoryData, RamData]) => {
      this.cameraDetails = cameraData;
      this.memoryDetails = memoryData;
      this.ramDetails = RamData;
      if (this.productsList.length > 0) {
        this.productsList.forEach(product => {
          this.cameraDetails.forEach(detail => {
            if (Number(product.camera) === detail.code) {
              product.cameraLabel = detail.label
            }
          })
          this.memoryDetails.forEach(detail => {
            if (Number(product.memory) === detail.code) {
              product.memoryLabel = detail.label
            }
          })
          this.ramDetails.forEach(detail => {
            if (Number(product.ram) === detail.code) {
              product.ramLabel = detail.label
            }
          })
        })
      }
    }, (error) => {
      this.toastrMessage(error);
    })
  }
  /**
   * Function used to navigate to add product screen
   */
  onClickOfAdd(): void {
    this.router.navigate(['/add-mobile'])
  }

  /**
   * Function used to open the dialog for confirming the delete
   * @param product : Deleted Product
   */
  openDialog(product: ListModel): void {
    const dialogRef = this.dialog.open(DeleteConfirmationPopupComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.deleteProduct === true) {
        this.productService.deleteProduct(product.id).pipe(takeUntil(this.unsubscribe)).subscribe(response => {
          if (response) {
            this.toastr.success("Product deleted successfully", "", { timeOut: 4000, positionClass: 'toast-top-center' });
            this.getListOfProducts();
            this.getMobileDetailsToChoose();
          }
        }, (error) => {
          this.toastrMessage(error);
        })
      }
    });
  }
  /**
   * Function used for toastr error message
   */
  toastrMessage(error: string): void {
    this.toastr.error(error, "", {
      timeOut: 4000, positionClass: 'toast-top-center'
    })
  }
  /**
 * Function used to unsubscribe the subscriptions
 */
  ngOnDestroy() {
    this.unsubscribe.next(true);
    this.unsubscribe.complete();
  }

}
