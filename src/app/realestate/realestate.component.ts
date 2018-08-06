import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { MatDialog } from '@angular/material';
import { IImage, ɵa as SlideshowComponent } from 'ng-simple-slideshow';
import { Realestate } from '../realestate';
import { RelatedRealestate} from '../related-realestate';
import { RealestateService } from '../realestate.service';
import { CustomerRequestDialogComponent } from '../customer-request-dialog/customer-request-dialog.component';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-realestate',
  templateUrl: './realestate.component.html',
  styleUrls: ['./realestate.component.css']
})
export class RealestateComponent implements OnInit {
  @ViewChild('fullscreenSlideshow')
  private fullscreenSlideshow: SlideshowComponent;

  public realestate: Realestate;
  public description: string[];
  public relatedRealestates: RelatedRealestate[];
  public images: IImage[];
  public showFullscreenImages = false;

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

  getRealestate(): void {
    const id: string = this.route.snapshot.paramMap.get('id');
    this.realestateService.getRealestate(id)
      .subscribe(realestate => {
        this.images = this.buildImages(realestate.images);

        this.description = realestate.description.split(/\r?\n/);

        this.realestate = realestate;

        this.relatedRealestates = [];
        realestate.relatedRealestateIds.forEach(_id => {
          this.realestateService.getRealestate(_id)
            .subscribe(relatedRealestate => this.relatedRealestates.push(this.buildRelatedRealestate(relatedRealestate)));
        });
      });
  }

  openCustomerRequestDialog(request: string): void {
    this.customerRequestDialog.open(CustomerRequestDialogComponent, {
      width: '250px',
      data: { phone: '', name: '', request, realestateId: this.realestate._id, realestateName: this.realestate.name }
    });
  }

  private buildImages(imageNames: string[]): IImage[] {
    return imageNames.map((name, i) => {
      return {
        url: this.buildImageUrl(name),
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

  private buildImageUrl(imageName: string): string {
    return `${environment.server}/api/realestate/image/${imageName}`;
  }

  private buildRelatedRealestate(realestate: Realestate): RelatedRealestate {
    return {
      imageUrl: this.buildImageUrl(realestate.images[0]),
      name: realestate.name,
      address: realestate.address,
      price: realestate.price
    };
  }
}
