import { Component, Input } from '@angular/core';
import { Realestate } from '../realestate';
import { RealestateService } from '../realestate.service';


@Component({
  selector: 'app-upload',
  templateUrl: './upload-realestate.component.html',
  styleUrls: ['./upload-realestate.component.css']
})
export class UploadRealestateComponent {
  @Input() afuConfig = {
    formatsAllowed: '.jpg,.png',
    uploadAPI: { url: 'http://localhost:3000/realestate/images' },
    multiple: true,
    theme: 'dragNDrop'
  };

  realestate = {} as Realestate;

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
