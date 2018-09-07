import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { MatDialog } from '@angular/material';
import { IImage, ɵa as SlideshowComponent } from 'ng-simple-slideshow';
import { Realestate } from '../realestate';
import { RealestateService } from '../realestate.service';
import { CustomerRequestDialogComponent } from '../customer-request-dialog/customer-request-dialog.component';
import { environment } from '../../environments/environment';
import { AbmComponent } from 'angular-baidu-maps';


declare const BMap: any;


@Component({
  selector: 'app-realestate',
  templateUrl: './realestate.component.html',
  styleUrls: ['./realestate.component.css']
})
export class RealestateComponent implements OnInit {
  @ViewChild('fullscreenSlideshow')
  private fullscreenSlideshow: SlideshowComponent;
  @ViewChild('map') mapComp: AbmComponent;


  public realestate: Realestate;
  public description: string[];
  public relatedRealestates: Realestate[] = [];
  public images: IImage[];
  public imageUrls: string[];
  public showFullscreenImages = false;
  public mapOptions: any = {};

  constructor(
    private route: ActivatedRoute,
    private realestateService: RealestateService,
    public iconRegistry: MatIconRegistry,
    public sanitizer: DomSanitizer,
    public customerRequestDialog: MatDialog,
    private changeDetector: ChangeDetectorRef
  ) {
    iconRegistry.addSvgIcon(
      'phone',
      sanitizer.bypassSecurityTrustResourceUrl('assets/phone.svg'));
    iconRegistry.addSvgIcon(
      'account',
      sanitizer.bypassSecurityTrustResourceUrl('assets/account.svg'));
  }

  ngOnInit(): void {
    this.getRealestate();
  }


  openCustomerRequestDialog(request: string): void {
    this.customerRequestDialog.open(CustomerRequestDialogComponent, {
      width: '250px',
      data: { phone: '', name: '', request, realestateId: this.realestate._id, realestateName: this.realestate.name }
    });
  }

  markRealestateInMap(map: any): void {
    const point = new BMap.Point(this.realestate.coordinate.longitude, this.realestate.coordinate.latitude);
    map.centerAndZoom(point, 15);
    map.enableScrollWheelZoom(true);
    const label = new BMap.Label(
      `<a href="./realestate/${this.realestate._id}" target="_blank" style="color: white;background: rgb(228, 0, 0);">
      ${this.realestate.name}
      </a>`,
      { position: point, offset: new BMap.Size(-30, -30) }
    );
    map.addOverlay(label);
  }


  private getRealestate(): void {
    const id: string = this.route.snapshot.paramMap.get('id');
    this.realestateService.getRealestate(id)
      .subscribe(realestate => {
        this.images = this.buildImages(realestate.images);
        this.imageUrls = realestate.images.map(imageName => this.imageNameToImageUrl(imageName));

        this.populateRelatedRealestates(realestate);

        this.description = realestate.description.split(/\r?\n/);

        this.realestate = realestate;
      });
  }

  private populateRelatedRealestates(realestate: Realestate): void {
    realestate.relatedRealestateIds.forEach(_id => {
      this.realestateService.getRealestate(_id)
        .subscribe(
          relatedRealestate => this.relatedRealestates.push(this.realestateService.replaceImageNamesWithImageUrls(relatedRealestate))
        );
    });
  }

  private buildImages(imageNames: string[]): IImage[] {
    return imageNames.map((name, i) => {
      return {
        url: this.imageNameToImageUrl(name),
        clickAction: () => {
          this.showFullscreenImages = true;
          this.changeDetector.detectChanges();
          // goToSlide(0) doesn't work as expected
          if (i > 0) {
            this.fullscreenSlideshow.goToSlide(i);
          }
        }
      };
    });
  }

  private imageNameToImageUrl(imageName: string): string {
    return `${environment.server}/api/realestate/image/${imageName}`;
  }
}
