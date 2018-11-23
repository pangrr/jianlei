import { Component, Input, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { DomSanitizer } from '@angular/platform-browser';
import { MatChipInputEvent } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { RealestateService } from '../realestate.service';
import { Realestate, Redpocket, VisitingServices, Consultant, Coordinate } from '../realestate';
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './realestate-editor.component.html',
  styleUrls: ['./realestate-editor.component.css']
})
export class RealestateEditorComponent implements OnInit {

  @Input() imagesUploadConfig = {
    formatsAllowed: '.jpg,.png',
    uploadAPI: { url: `${environment.server}/api/realestate/images` },
    multiple: true
  };

  @Input() descriptionImageUploadConfig = {
    formatsAllowed: '.jpg,.png',
    uploadAPI: { url: `${environment.server}/api/realestate/images` },
    multiple: false
  };

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  realestate: Realestate;
  imageUrls: string[] = [];
  descriptionImageUrl: string;


  constructor(
    private realestateService: RealestateService,
    private route: ActivatedRoute,
    public iconRegistry: MatIconRegistry,
    public sanitizer: DomSanitizer,
    public snackBar: MatSnackBar
  ) {
    iconRegistry.addSvgIcon(
      'cancel',
      sanitizer.bypassSecurityTrustResourceUrl('assets/cancel.svg'));

    this.clearRealestateToEdit();
  }

  ngOnInit(): void {
    if (this.route.snapshot.url.length === 2) {
      this.realestateService.getRealestate(this.getRealestateIdFromCurrentUrl())
        .subscribe(realestate => {
          // TODO remove after all realestates have coordinates
          if (!realestate.coordinate) {
            realestate.coordinate = {
              longitude: undefined, latitude: undefined
            };
          }

          // TODO remove after all realestates have news
          if (!realestate.news) {
            realestate.news = [];
          }

          this.realestate = realestate;
          this.imageUrls = this.imageNamesToImageUrls(realestate.images);
        });
    }
  }

  onImagesUploaded(event): void {
    const uploadedImageNames = JSON.parse(event.response);
    this.imageUrls = this.imageUrls.concat(this.imageNamesToImageUrls(uploadedImageNames));
  }

  onDescriptionImageUploaded(event): void {
    const uploadedImageName = JSON.parse(event.response)[0];
    this.descriptionImageUrl = this.imageNameToImageUrl(uploadedImageName);
  }

  saveNewRealestate(): void {
    this.realestate.images = this.imageUrlsToImageNames(this.imageUrls);
    this.realestate.descriptionImage = this.imageUrlToImageName(this.descriptionImageUrl);

    this.realestateService.addRealestate(this.realestate)
      .subscribe(savedRealestate => {
        this.realestate._id = savedRealestate._id;
        this.openSnackBar('新房产已保存');
    });
  }

  updateRealestate(): void {
    this.realestate.images = this.imageUrlsToImageNames(this.imageUrls);
    this.realestate.descriptionImage = this.imageUrlToImageName(this.descriptionImageUrl);

    this.realestateService.updateRealestate(this.realestate)
      .subscribe(_ => {
        this.openSnackBar('房产已更新');
      });
  }

  removeRelatedRealestate(id: string): void {
    const index = this.realestate.relatedRealestateIds.indexOf(id);
    if (index >= 0) {
      this.realestate.relatedRealestateIds.splice(index, 1);
    }
  }

  addRelatedRealestate(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.realestate.relatedRealestateIds.push(value);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeDescriptionImageUrl(): void {
    this.descriptionImageUrl = undefined;
  }

  removeImageUrl(url: string): void {
    const index = this.imageUrls.indexOf(url);
    if (index >= 0) {
      this.imageUrls.splice(index, 1);
    }
  }

  removeComment(index: number): void {
    this.realestate.comments.splice(index, 1);
  }

  addEmptyComment(): void {
    this.realestate.comments.push({
      account: undefined,
      text: undefined,
      date: undefined
    });
  }

  removeNews(index: number): void {
    this.realestate.news.splice(index, 1);
  }

  addNews(): void {
    this.realestate.news.push({
      title: undefined,
      url: undefined
    });
  }

  clearRealestateToEdit(): void {
    this.realestate = {} as Realestate;
    this.realestate.redpocket = {} as Redpocket;
    this.realestate.consultant = {} as Consultant;
    this.realestate.visitServices = {} as VisitingServices;
    this.realestate.comments = [];
    this.realestate.images = [];
    this.realestate.relatedRealestateIds = [];
    this.realestate.coordinate = {} as Coordinate;
    this.imageUrls = [];
  }

  private getRealestateIdFromCurrentUrl(): string {
    return this.route.snapshot.url[1].path;
  }

  private openSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 1000,
    });
  }

  private imageUrlsToImageNames(imageUrls: string[]): string[] {
    return imageUrls.map(url => this.imageUrlToImageName(url));
  }

  private imageNamesToImageUrls(imageNames: string[]): string[] {
    return imageNames.map(name => this.imageNameToImageUrl(name));
  }

  private imageNameToImageUrl(imageName: string): string {
    return `${environment.server}/api/realestate/image/${imageName}`;
  }

  private imageUrlToImageName(imageUrl: string): string {
    return imageUrl.split('/').reverse()[0];
  }
}
