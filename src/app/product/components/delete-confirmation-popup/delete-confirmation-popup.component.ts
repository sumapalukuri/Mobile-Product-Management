import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation-popup',
  templateUrl: './delete-confirmation-popup.component.html',
  styleUrls: ['./delete-confirmation-popup.component.css']
})
export class DeleteConfirmationPopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationPopupComponent>
  ) { }

  ngOnInit(): void {
  }

  onConfirm(): void {
    const deleteData = true;
    this.dialogRef.close({deleteProduct: deleteData});
  }
}
