import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  @Input() afuConfig;

  constructor() {}

  ngOnInit() {
    this.afuConfig = {
      uploadAPI: {
        url: 'http://localhost:3000/realestate/images'
      }
    };
  }

}
