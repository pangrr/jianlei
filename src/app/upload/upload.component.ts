import { Component, Input } from '@angular/core';
import { Realestate } from '../realestate';
import { RealestateService } from '../realestate.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  @Input() afuConfig = {
    formatsAllowed: '.jpg,.png',
    uploadAPI: { url: 'http://localhost:3000/realestate/images' },
    multiple: true,
    theme: 'dragNDrop'
  };

  realestate: Realestate = {
    _id: undefined,
    name: '红育坡一号',
    address: '石桥铺',
    price: 9999,
    description: '外语校',
    images: ['1530572349916.jpg', '1530572349917.jpg']
  };

  constructor(
    private realestateService: RealestateService
  ) {}

  onImagesUploaded(event): void {
    this.realestate.images = event.response;
  }

  onSubmit(): void {
    this.realestateService.addRealestate(this.realestate)
      .subscribe(savedRealestate => this.realestate._id = savedRealestate._id);
  }

}
