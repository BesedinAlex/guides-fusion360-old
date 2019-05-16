import { Component } from '@angular/core';
import {ContentService} from '../services/content.service';

@Component({
  selector: 'app-guides',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {

  private readonly guides;

  constructor(private data: ContentService) {
    this.guides = data.guides;
    console.log(this.guides);
  }

}
