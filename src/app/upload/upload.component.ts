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
    name: '',
    address: '',
    price: undefined,
    description: '',
    images: []
  };

  constructor(
    private realestateService: RealestateService
  ) {}

  onImagesUploaded(event): void {
    this.realestate.images = JSON.parse(event.response);
  }

  onSubmit(): void {
    this.realestateService.addRealestate(this.realestate)
      .subscribe(savedRealestate => this.realestate._id = savedRealestate._id);
  }

}
