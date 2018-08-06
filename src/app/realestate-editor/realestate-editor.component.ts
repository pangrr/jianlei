import { Component, Input, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { DomSanitizer } from '@angular/platform-browser';
import { MatChipInputEvent } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { RealestateService } from '../realestate.service';
import { Realestate, Redpocket, VisitingServices, Consultant } from '../realestate';
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './realestate-editor.component.html',
  styleUrls: ['./realestate-editor.component.css']
})
export class RealestateEditorComponent implements OnInit {
  @Input() afuConfig = {
    formatsAllowed: '.jpg,.png',
    uploadAPI: { url: `${environment.server}/api/realestate/images` },
    multiple: true
  };
  realestate: Realestate;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

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
      this.realestateService.getRealestate(this.route.snapshot.url[1].path)
        .subscribe(r => this.realestate = r);
    }
  }


  addImageFromUpload(event): void {
    this.realestate.images = this.realestate.images.concat(JSON.parse(event.response));
  }

  saveNewRealestate(): void {
    this.realestateService.addRealestate(this.realestate)
      .subscribe(savedRealestate => {
        this.realestate._id = savedRealestate._id;
        this.openSnackBar('新房产已保存');
    });
  }

  updateRealestate(): void {
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

  addImage(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.realestate.images.push(value);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeImage(image: string): void {
    const index = this.realestate.images.indexOf(image);

    if (index >= 0) {
      this.realestate.images.splice(index, 1);
    }
  }

  removeComment(index: number): void {
    this.realestate.comments.splice(index, 1);
  }

  addEmptyComment(): void {
    this.realestate.comments.push({
      account: '',
      text: '',
      date: ''
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
  }

  private openSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 1000,
    });
  }
}
