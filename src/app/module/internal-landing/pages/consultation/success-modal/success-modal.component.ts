import { Component, Input, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.css']
})
export class SuccessModalComponent implements OnInit{
  @Input() prediction: any | null;

  constructor(
    private _modalRef: MdbModalRef<SuccessModalComponent>
  ) {

  }

  ngOnInit(): void {
  }

  closeModal() {
    this._modalRef.close();
  }
}
